"""
Aderência de cada projeto a cada subárea de nível 1 — o **híbrido calibrado** (PLANO §4.2.6).

Por que híbrido (medido às cegas, 30 casos julgados pelo autor, 2026-09-19):

  * o **rótulo do LLM** (`classificacao_projetos.json`) acerta o grupo PRINCIPAL em 25/30
    casos, mas não diz nada sobre as demais áreas (separa "relevante × irrelevante" em 31%
    dos pares — quase acaso);
  * as **facetas** (`glosas.json`, similaridade de cosseno com o resumo) separam "relevante ×
    irrelevante" em 78% dos pares, mas acertam o principal em só 12–15/30;
  * o escore das facetas **não prevê o grau** (A/B/C/D/E): serve para dizer *relevante ou não*.

O modelo é uma regressão linear pequena (Ridge, 3 entradas + intercepto) que prevê o **grau do
autor** (I=0, E=1 … A=5) para cada par (projeto, área) a partir de:

    llm        1 se a área é o rótulo do LLM, senão 0
    percentil  posição do projeto entre os 934 no escore das facetas dessa área (0..1)
    relativo   escore da área relativo ao intervalo do próprio projeto (0..1)

Nada disto treina o modelo de embeddings (congelado): calibra-se só a pontuação. Com poucos
julgamentos a margem é grande (±13 pontos com 30 casos) — o resultado **não é probabilidade**
e a interface deve dizê-lo. Toda validação é "deixar um caso de fora" (LOCO).

Ponto de parada do plano: se o híbrido não segurar `TOPO_MIN` no principal e `PARES_MIN` em
relevante × irrelevante, `--gerar` recusa (use `--forcar` só sabendo o que faz).

Uso (precisa do `.venv`: numpy, scipy, scikit-learn, sentence-transformers):
    .venv/bin/python -m analise.aderencia               # valida (deixa-um-de-fora) e mostra
    .venv/bin/python -m analise.aderencia --gerar       # + grava derivados/aderencia.json
    .venv/bin/python -m analise.aderencia --conferir    # confere gabarito × corpus × artefato
    python3 -m analise.aderencia --autoteste            # autoteste das funções puras (sem venv)
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
SAIDA = REPO_ROOT / "derivados" / "aderencia.json"

VERSAO = 1
ENTRADAS = ("llm", "percentil", "relativo")
ALPHA = 1.0
#: pontos de parada (fração de casos com o principal certo; fração de pares relevante × irrelevante)
TOPO_MIN = 0.75
PARES_MIN = 0.72
MIN_CASOS = 20
LETRAS = ["I", "E", "D", "C", "B", "A"]  # índice = grau 0..5
#: cortes (em % de aderência) oferecidos no controle "alcance" do Atlas. As previsões são bimodais:
#: acima de ~35% só há a área PRINCIPAL de cada projeto; a informação nova está na faixa 20–35%.
CORTES_ALCANCE = (35, 30, 25, 20)
GRAU_RELEVANTE = 2  # "D" ou mais conta como relevante ao medir a precisão de cada corte


# ---------------------------------------------------------------- funções puras (autoteste)

def faixa(grau: float) -> str:
    """Grau previsto (0..5, contínuo) → letra do autor. Corte no meio entre dois graus."""
    return LETRAS[max(0, min(5, int(grau + 0.5)))]


def percentual(grau: float) -> int:
    """0..100 para a interface. **Não é probabilidade**: é o grau previsto na escala do autor."""
    return int(round(100 * max(0.0, min(5.0, grau)) / 5))


# ---------------------------------------------------------------- dados

def _carregar():
    from analise import laboratorio_glosas as L

    ids, textos, titulos = L.carregar_corpus()
    E = L.embeddings_projetos(ids, textos)
    y = L.rotulos(ids)
    areas = L.carregar_glosas()
    return L, ids, E, y, areas


def entradas(L, E, y, areas):
    """Matrizes n×9 de cada entrada do modelo, mais o escore bruto das facetas."""
    import numpy as np
    from scipy.stats import rankdata

    F, dono, _ = L.embeddings_facetas(areas)
    _, A = L.pontuar(E, F, dono, len(areas))
    P = np.stack([rankdata(A[:, k]) / len(A) for k in range(len(areas))], axis=1)
    amp = A.max(axis=1, keepdims=True) - A.min(axis=1, keepdims=True)
    R = (A - A.min(axis=1, keepdims=True)) / np.where(amp == 0, 1, amp)
    return {"llm": np.eye(len(areas))[y], "percentil": P, "relativo": R}, A


def julgados(L, ids, areas):
    """[(posição do projeto, graus 0..5 por área)] dos casos com `graus` no gabarito."""
    import numpy as np

    pos = {i: n for n, i in enumerate(ids)}
    nomes = [n for n, _ in areas]
    gab = json.loads(L.GABARITO.read_text(encoding="utf-8"))["casos"]
    return [
        (pos[pid], np.array([L.GRAUS[g["graus"][n]] for n in nomes]))
        for pid, g in gab.items()
        if "graus" in g and pid in pos
    ]


def _X(m, i, quais):
    import numpy as np

    return np.stack([m[q][i] for q in quais], axis=1)  # 9 × entradas


# ---------------------------------------------------------------- validação

def _metricas(pares):
    """`pares` = [(escores das 9 áreas, graus das 9 áreas)]."""
    import numpy as np
    from scipy.stats import kendalltau

    taus, topo, topo_ab, ok, n = [], 0, 0, 0, 0
    for sc, gr in pares:
        t = kendalltau(gr, sc)[0]
        taus.append(t if t == t else 0.0)
        topo += int(gr[int(np.argmax(sc))] == gr.max())
        topo_ab += int(gr[int(np.argmax(sc))] >= 4)
        for a in range(len(gr)):
            for b in range(len(gr)):
                if gr[a] == 0 and gr[b] > 0:
                    n += 1
                    ok += int(sc[a] < sc[b])
    return {"tau": float(np.mean(taus)), "topo": topo, "topo_AB": topo_ab, "casos": len(pares),
            "pares": ok / n if n else 0.0}


def validar(m, casos):
    """Deixa-um-caso-de-fora para: só LLM, só facetas e híbrido."""
    import numpy as np
    from sklearn.linear_model import Ridge

    conjuntos = {"só rótulo do LLM": None, "só facetas": ("percentil", "relativo"), "híbrido calibrado": ENTRADAS}
    res = {}
    for nome, quais in conjuntos.items():
        pares = []
        for h, (ih, gh) in enumerate(casos):
            if quais is None:
                pares.append((entradas_llm(m, ih), gh))
                continue
            Xt = np.vstack([_X(m, i, quais) for j, (i, _) in enumerate(casos) if j != h])
            yt = np.concatenate([g for j, (_, g) in enumerate(casos) if j != h])
            pares.append((Ridge(alpha=ALPHA).fit(Xt, yt).predict(_X(m, ih, quais)), gh))
        res[nome] = _metricas(pares)
    return res


def entradas_llm(m, i):
    return m["llm"][i].astype(float)


def tabela_alcances(m, casos):
    """Por corte: quantos pares (projeto, área) aparecem e que fração deles o autor julgou relevante
    (grau ≥ D). Usa previsões **de fora da amostra** (deixa-um-caso-de-fora) — não otimistas."""
    import numpy as np
    from sklearn.linear_model import Ridge

    pct, grau = [], []
    for h, (ih, gh) in enumerate(casos):
        Xt = np.vstack([_X(m, i, ENTRADAS) for j, (i, _) in enumerate(casos) if j != h])
        yt = np.concatenate([g for j, (_, g) in enumerate(casos) if j != h])
        prev = Ridge(alpha=ALPHA).fit(Xt, yt).predict(_X(m, ih, ENTRADAS))
        pct += [percentual(v) for v in prev]
        grau += list(gh)
    pct, grau = np.array(pct), np.array(grau)
    linhas = []
    for corte in CORTES_ALCANCE:
        sel = pct >= corte
        linhas.append({"limiar": corte, "pares": int(sel.sum()),
                       "precisao": round(float((grau[sel] >= GRAU_RELEVANTE).mean()), 2) if sel.any() else None})
    return linhas


def treinar(m, casos):
    import numpy as np
    from sklearn.linear_model import Ridge

    Xt = np.vstack([_X(m, i, ENTRADAS) for i, _ in casos])
    yt = np.concatenate([g for _, g in casos])
    mdl = Ridge(alpha=ALPHA).fit(Xt, yt)
    return mdl, {q: round(float(c), 4) for q, c in zip(ENTRADAS, mdl.coef_)} | {"intercepto": round(float(mdl.intercept_), 4)}


# ---------------------------------------------------------------- main

def _mostrar(res, n_casos):
    print(f"\nValidação deixando um caso de fora — {n_casos} casos julgados às cegas")
    print(f"  {'modelo':22s} tau   principal certo   principal em {{A,B}}   relevante × irrelevante")
    for nome, r in res.items():
        print(f"  {nome:22s} {r['tau']:.2f}   {r['topo']:2d}/{r['casos']}              {r['topo_AB']:2d}/{r['casos']}"
              f"                  {r['pares']:.0%}")


def gerar_saida(L, ids, E, y, areas, mdl, coef, res, n_casos, m, alcances):
    import numpy as np

    n = len(ids)
    grau = np.clip(np.stack([mdl.predict(_X(m, i, ENTRADAS)) for i in range(n)]), 0, 5)
    SAIDA.parent.mkdir(exist_ok=True)
    SAIDA.write_text(json.dumps({
        "versao": VERSAO,
        "gerado_em": datetime.now().isoformat(timespec="seconds"),
        "n_julgamentos": n_casos,
        "areas": [nm for nm, _ in areas],
        "entradas": list(ENTRADAS),
        "coeficientes": coef,
        "alcances": alcances,
        "validacao": {k: {kk: (round(vv, 3) if isinstance(vv, float) else vv) for kk, vv in v.items()} for k, v in res.items()},
        "ids": ids,
        "grau": np.round(grau, 2).tolist(),
        "rotulo_llm": [int(v) for v in y],
    }, ensure_ascii=False), encoding="utf-8")
    print(f"\nGravado {SAIDA.relative_to(REPO_ROOT)} ({n} projetos × {len(areas)} áreas).")
    dist = np.bincount([LETRAS.index(faixa(g)) for g in grau.ravel()], minlength=6)
    print("  faixas previstas (pares projeto×área): " + " · ".join(f"{LETRAS[k]} {dist[k]}" for k in range(5, -1, -1)))


def conferir(L, ids, areas):
    """Gabarito × corpus × artefato. Sai com erro se algo estiver fora de lugar."""
    problemas = []
    pos = set(ids)
    gab = json.loads(L.GABARITO.read_text(encoding="utf-8"))["casos"]
    nomes = [n for n, _ in areas]
    for pid, g in gab.items():
        if pid not in pos:
            problemas.append(f"gabarito: projeto {pid} não está no corpus atual")
        if "graus" in g:
            if set(g["graus"]) != set(nomes):
                problemas.append(f"gabarito: {pid} tem áreas diferentes das 9 (faltam/sobram)")
            for a, v in g["graus"].items():
                if v not in L.GRAUS:
                    problemas.append(f"gabarito: {pid}/{a} grau inválido {v!r}")
    if SAIDA.exists():
        s = json.loads(SAIDA.read_text(encoding="utf-8"))
        if s["ids"] != ids:
            problemas.append("aderencia.json: ids diferentes do corpus atual — rode --gerar")
        if s["areas"] != nomes:
            problemas.append("aderencia.json: áreas diferentes das de glosas.json — rode --gerar")
        if any(not (0 <= v <= 5) for linha in s["grau"] for v in linha):
            problemas.append("aderencia.json: grau fora de 0..5")
    else:
        print("  (derivados/aderencia.json ainda não existe — rode --gerar)")
    for p in problemas:
        print("ERRO:", p)
    if problemas:
        sys.exit(1)
    print("OK — gabarito, corpus e artefato coerentes")


def autoteste():
    assert [faixa(g) for g in (0, 0.49, 0.5, 1, 2.4, 2.5, 3.6, 4.5, 5, 7, -3)] == \
        ["I", "I", "E", "E", "D", "C", "B", "A", "A", "A", "I"], "faixa()"
    assert percentual(0) == 0 and percentual(5) == 100 and percentual(2.5) == 50 and percentual(9) == 100 and percentual(-1) == 0
    assert LETRAS == ["I", "E", "D", "C", "B", "A"] and LETRAS[0] == "I"
    assert list(CORTES_ALCANCE) == sorted(CORTES_ALCANCE, reverse=True), "cortes do alcance: do mais restrito ao mais amplo"
    assert 0 < TOPO_MIN <= 1 and 0 < PARES_MIN <= 1 and set(ENTRADAS) == {"llm", "percentil", "relativo"}
    print("autoteste OK")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--gerar", action="store_true", help="grava derivados/aderencia.json")
    ap.add_argument("--forcar", action="store_true", help="grava mesmo abaixo do ponto de parada")
    ap.add_argument("--conferir", action="store_true")
    ap.add_argument("--autoteste", action="store_true")
    args = ap.parse_args()

    if args.autoteste:
        return autoteste()
    L, ids, E, y, areas = _carregar()
    if args.conferir:
        return conferir(L, ids, areas)

    casos = julgados(L, ids, areas)
    if len(casos) < MIN_CASOS:
        sys.exit(f"Só {len(casos)} casos julgados com graus (mínimo {MIN_CASOS}). Julgue mais.")
    m, _A = entradas(L, E, y, areas)
    res = validar(m, casos)
    _mostrar(res, len(casos))
    mdl, coef = treinar(m, casos)
    print(f"\nCoeficientes (grau previsto = intercepto + Σ coef × entrada): {coef}")

    h = res["híbrido calibrado"]
    ok = h["topo"] / h["casos"] >= TOPO_MIN and h["pares"] >= PARES_MIN
    print(f"Ponto de parada (principal ≥ {TOPO_MIN:.0%} e relevante×irrelevante ≥ {PARES_MIN:.0%}): "
          f"{'passou' if ok else 'NÃO PASSOU — voltar ao autor'}")
    if args.gerar:
        if not ok and not args.forcar:
            sys.exit("Recusado: o híbrido não passou no ponto de parada (use --forcar para gravar assim mesmo).")
        alc = tabela_alcances(m, casos)
        print("\nAlcances (previsão de fora da amostra; precisão = fração julgada relevante, grau ≥ D):")
        for a in alc:
            print(f"  ≥ {a['limiar']}%: {a['pares']} pares, precisão {a['precisao']:.0%}" if a["precisao"] is not None else f"  ≥ {a['limiar']}%: nenhum par")
        gerar_saida(L, ids, E, y, areas, mdl, coef, res, len(casos), m, alc)


if __name__ == "__main__":
    main()
