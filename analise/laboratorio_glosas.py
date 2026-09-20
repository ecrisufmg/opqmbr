"""
Laboratório de glosas: mede, ajusta e sugere as facetas que definem cada
subárea de nível 1 (ANPPOM) para o cálculo de **aderência textual**.

Por que existe (conversa de 2026-09-19): o Atlas classifica cada projeto em UMA
subárea (`classificacao_projetos.json`, leitura de LLM, sem revisão humana). Para
mostrar o quanto cada projeto adere a cada área — em vez de só o rótulo estanque —
é preciso um peso por área. O peso é a similaridade de cosseno entre o embedding
do resumo do projeto e o embedding de **facetas** (descrições curtas, no registro
de resumo, de cada frente de pesquisa da área), definidas em `analise/glosas.json`.

Duas camadas, para não girar em círculo em cima de rótulos não revisados:

  1. **Conhecimento do campo** — `glosas.json`, escrito à mão (e revisto pelo autor).
  2. **Dados** — este script propõe facetas e termos ausentes usando só o NÚCLEO DE
     CONSENSO: projetos em que o rótulo do LLM e as facetas concordam. Duas fontes
     independentes concordando é um filtro melhor do que confiar numa só.

A concordância com os rótulos é uma checagem, NÃO um alvo: otimizar as glosas para
igualar um rótulo sem revisão só reproduziria o que o LLM já fez. A métrica que
vale é o veredito humano sobre os casos de fronteira (`--revisao`).

Uso (precisa do `.venv`: sentence-transformers, scikit-learn):
    .venv/bin/python -m analise.laboratorio_glosas               # diagnóstico
    .venv/bin/python -m analise.laboratorio_glosas --sugerir     # facetas/termos que os dados sugerem
    .venv/bin/python -m analise.laboratorio_glosas --revisao 40  # casos de fronteira para julgar

Os embeddings dos projetos ficam em `derivados/embeddings_projetos.npz` (reconstruível;
apague para refazer). Relatórios em `derivados/glosas_*.md`.
"""

import argparse
import collections
import json
import sqlite3
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
DB = REPO_ROOT / "sucupira.db"
GLOSAS = REPO_ROOT / "analise" / "glosas.json"
CLASSIFICACAO = REPO_ROOT / "analise" / "classificacao_projetos.json"
CACHE = REPO_ROOT / "derivados" / "embeddings_projetos.npz"
REL_SUGESTOES = REPO_ROOT / "derivados" / "glosas_sugestoes.md"
REL_REVISAO = REPO_ROOT / "derivados" / "glosas_revisao.md"
GABARITO = REPO_ROOT / "analise" / "gabarito_glosas.json"
REL_GRAUS = REPO_ROOT / "derivados" / "glosas_revisao_graus.md"
CHAVE_GRAUS = REPO_ROOT / "derivados" / "glosas_revisao_chave.json"

#: escala ordinal do autor por (projeto, área). Em branco = I. Números soltos ("0,35") eram
#: arbitrários; uma escala ordinal aplicada com consistência mede o que importa (a ORDEM).
GRAUS = {"A": 5, "B": 4, "C": 3, "D": 2, "E": 1, "I": 0}
ROTULO_GRAU = "A muito alto · B alto · C intermediário · D baixo · E muito baixo · I sem relevância (em branco = I)"

#: temperatura do softmax por calibração. Menor = mais "duro". O escore bruto é
#: um cosseno (diferenças de ~0,05 entre áreas); o z-score está em desvios-padrão.
TEMPERATURA = {"nenhuma": 0.05, "z": 0.7}


# ---------------------------------------------------------------- carga

def carregar_corpus():
    """(ids, textos, títulos) na mesma ordem de `clustering.carregar_descricoes`."""
    from analise import clustering as c

    con = sqlite3.connect(DB)
    pares = c.carregar_descricoes(con)
    nomes = dict(con.execute("SELECT id_projeto, nome FROM projetos").fetchall())
    con.close()
    ids = [p[0] for p in pares]
    return ids, [p[1] for p in pares], [nomes.get(i) or "(sem título)" for i in ids]


def embeddings_projetos(ids, textos):
    import numpy as np

    if CACHE.exists():
        z = np.load(CACHE, allow_pickle=False)
        if list(z["ids"]) == ids:
            return z["E"]
        print("Cache de embeddings desatualizado (ids mudaram) — refazendo.")
    from analise import clustering as c

    print(f"Gerando embeddings dos {len(ids)} projetos ({c.MODELO_EMBEDDING}) — ~1–2 min, uma vez só…")
    E = c.gerar_embeddings(textos)
    CACHE.parent.mkdir(exist_ok=True)
    np.savez(CACHE, E=E, ids=np.array(ids))
    return E


def carregar_glosas():
    """[(nome_da_area, [(nome_faceta, texto), ...]), ...] na ordem de ANPPOM_SUBAREAS."""
    from analise import clustering as c

    dados = json.loads(GLOSAS.read_text(encoding="utf-8"))["areas"]
    esperado = [n for n, _ in c.ANPPOM_SUBAREAS]
    obtido = [a["nome"] for a in dados]
    if obtido != esperado:
        sys.exit(f"glosas.json fora de ordem/nomes.\n  esperado: {esperado}\n  obtido:   {obtido}")
    for a in dados:
        if not a["facetas"]:
            sys.exit(f"Área sem facetas: {a['nome']}")
    return [(a["nome"], [(f["nome"], f["texto"]) for f in a["facetas"]]) for a in dados]


def rotulos(ids):
    import numpy as np

    mapa = json.loads(CLASSIFICACAO.read_text(encoding="utf-8"))
    return np.array([mapa[i] for i in ids])


# ---------------------------------------------------------------- cálculo

def embeddings_facetas(areas):
    """(matriz F×384, área de cada faceta, nome de cada faceta)."""
    import numpy as np
    from analise import clustering as c
    from sentence_transformers import SentenceTransformer

    textos, dono, nomes = [], [], []
    for k, (_, facetas) in enumerate(areas):
        for nome, texto in facetas:
            textos.append(texto)
            dono.append(k)
            nomes.append(nome)
    modelo = SentenceTransformer(c.MODELO_EMBEDDING)
    return modelo.encode(textos, normalize_embeddings=True), np.array(dono), nomes


def pontuar(E, F, dono, n_areas, k=2):
    """Escore bruto por área = MÉDIA DAS `k` MELHORES facetas da área.

    Média das 2 melhores, não o máximo: o máximo deixa uma faceta isolada e
    parecida por acaso decidir a área (medido em 2026-09-19: 0,470 de concordância
    com o LLM no máximo × 0,525 na média das 2 melhores; o rótulo não é alvo, mas
    a diferença acusa ruído). Toda área tem ≥ k facetas.
    """
    import numpy as np

    S = E @ F.T  # n × facetas
    A = np.stack([np.sort(S[:, dono == a], axis=1)[:, ::-1][:, :k].mean(axis=1) for a in range(n_areas)], axis=1)
    return S, A


def calibrar(A, modo="nenhuma"):
    """`nenhuma` (padrão) ou `z`.

    O z-score por área foi tentado para tirar o viés de "linha de base" entre
    áreas (uma glosa genérica parece-se com tudo), e **piorou**: ele pressupõe
    que toda área tem a mesma prevalência no corpus, o que é falso — forçou 143
    projetos para Musicoterapia (2,5% do corpus) e derrubou a concordância. Fica
    como opção só para reproduzir a comparação.
    """
    if modo == "z":
        return (A - A.mean(axis=0)) / A.std(axis=0)
    return A


def pesos(Z, T):
    import numpy as np

    z = Z / T
    z = z - z.max(axis=1, keepdims=True)
    p = np.exp(z)
    return p / p.sum(axis=1, keepdims=True)


# ---------------------------------------------------------------- diagnóstico

def diagnosticar(areas, ids, E, y, T, calibracao):
    import numpy as np

    nomes = [n for n, _ in areas]
    curto = [n.split(" e ")[0][:16] for n in nomes]
    F, dono, nomes_f = embeddings_facetas(areas)
    S, A = pontuar(E, F, dono, len(areas))
    Z = calibrar(A, calibracao)
    W = pesos(Z, T)

    print(f"\n{len(ids)} projetos · {len(areas)} áreas · {len(nomes_f)} facetas (calibração {calibracao}, T={T})")

    print("\n== 1. Sobreposição entre áreas (maior cosseno entre facetas de áreas diferentes)")
    FF = F @ F.T
    pares = []
    for i in range(len(areas)):
        for j in range(i + 1, len(areas)):
            bloco = FF[np.ix_(dono == i, dono == j)]
            pares.append((float(bloco.max()), i, j, int(np.unravel_index(bloco.argmax(), bloco.shape)[0]),
                          int(np.unravel_index(bloco.argmax(), bloco.shape)[1])))
    fi = {k: [x for x in range(len(dono)) if dono[x] == k] for k in range(len(areas))}
    for s, i, j, a, b in sorted(pares, reverse=True)[:6]:
        print(f"  {s:.2f}  {curto[i]} × {curto[j]}   «{nomes_f[fi[i][a]]}» ~ «{nomes_f[fi[j][b]]}»")
    print("  (referência: as glosas antigas chegavam a 0,80; abaixo de ~0,70 já é bem separado)")

    dup = [(float(FF[a, b]), a, b) for a in range(len(dono)) for b in range(a + 1, len(dono))
           if dono[a] == dono[b] and FF[a, b] > 0.85]
    if dup:
        print("  facetas quase duplicadas dentro da mesma área (>0,85):")
        for s, a, b in dup:
            print(f"    {s:.2f}  «{nomes_f[a]}» ~ «{nomes_f[b]}»")

    print("\n== 2. Quão discriminantes são os pesos")
    top = np.sort(W, axis=1)[:, ::-1]
    print(f"  peso mediano do 1º grupo: {np.median(top[:, 0]):.2f} · do 2º: {np.median(top[:, 1]):.2f}")
    print(f"  projetos com 2º peso ≥ 0,25 (fronteira): {(top[:, 1] >= 0.25).sum()} de {len(ids)}")
    dominante = W.argmax(axis=1)
    print("  projetos por grupo dominante  →  " + " · ".join(
        f"{curto[k]} {int((dominante == k).sum())}" for k in range(len(areas))))
    print("  rótulos do LLM                →  " + " · ".join(
        f"{curto[k]} {int((y == k).sum())}" for k in range(len(areas))))

    print("\n== 3. Facetas: alguma nunca vence, ou engole a área?")
    vence = collections.Counter()
    for i in range(len(ids)):
        k = dominante[i]
        cand = [x for x in range(len(dono)) if dono[x] == k]
        vence[max(cand, key=lambda x: S[i, x])] += 1
    for k in range(len(areas)):
        tot = sum(vence[x] for x in fi[k]) or 1
        linhas = [f"{nomes_f[x][:38]} {vence[x]}" + (" ⚠ larga" if vence[x] / tot > 0.6 else " ⚠ morta" if vence[x] < 3 else "")
                  for x in fi[k]]
        print(f"  {curto[k]:16s} " + " | ".join(linhas))

    print("\n== 4. Checagem contra os rótulos do LLM (sem revisão — informativo, NÃO é alvo)")
    for rotulo, M in (("sem calibração", A), ("z-score", calibrar(A, "z"))):
        print(f"  concordância {rotulo}: {(M.argmax(axis=1) == y).mean():.3f}")
    conf = collections.Counter((y[i], dominante[i]) for i in range(len(ids)) if y[i] != dominante[i])
    print("  maiores desvios (rótulo LLM → dominante pelas facetas):")
    for (a, b), n in conf.most_common(6):
        print(f"    {n:3d}  {curto[a]} → {curto[b]}   (de {int((y == a).sum())})")
    consenso = int((dominante == y).sum())
    print(f"  NÚCLEO DE CONSENSO (LLM e facetas concordam): {consenso} projetos ({consenso / len(ids):.0%})")
    return F, dono, nomes_f, S, A, Z, W


# ---------------------------------------------------------------- dados sugerem

def _tokens(texto):
    from analise import clustering as c

    w = c._tokenizar(texto)
    return set(w) | {a + " " + b for a, b in zip(w, w[1:])}


def termos_distintivos(grupo, tokens, total, n_total, topn, minimo=5):
    """Log-odds com prior: termos frequentes no grupo e raros fora dele."""
    import math

    cont = collections.Counter()
    for i in grupo:
        cont.update(tokens[i])
    n = len(grupo)
    pont = []
    for t, f in cont.items():
        if total[t] < minimo or f < 3:
            continue
        a = (f + 0.5) / (n + 1)
        b = (total[t] - f + 0.5) / (n_total - n + 1)
        pont.append((math.log(a / (1 - a)) - math.log(b / (1 - b)), t))
    pont.sort(reverse=True)
    return [t for _, t in pont[:topn]]


def sugerir(areas, ids, textos, titulos, E, y, F, dono, nomes_f, W):
    import numpy as np
    from sklearn.cluster import KMeans
    from sklearn.metrics import silhouette_score
    from analise import clustering as c

    dominante = W.argmax(axis=1)
    tokens = [_tokens(t) for t in textos]
    total = collections.Counter()
    for tk in tokens:
        total.update(tk)

    linhas = [
        "# Sugestões de facetas — o que os dados sugerem",
        "",
        "Gerado por `python3 -m analise.laboratorio_glosas --sugerir`. Usa apenas o **núcleo de consenso** "
        "(rótulo do LLM = grupo dominante pelas facetas), para não aprender os vieses de uma fonte só. "
        "São **candidatos**: leia, escolha, reescreva em `analise/glosas.json` no registro de resumo, sem negações e sem nomes próprios.",
        "",
    ]
    for k, (nome, facetas) in enumerate(areas):
        nucleo = [i for i in range(len(ids)) if y[i] == k and dominante[i] == k]
        linhas += [f"## {nome}", "", f"Núcleo de consenso: **{len(nucleo)}** projetos "
                   f"(de {int((y == k).sum())} rotulados).", ""]
        texto_facetas = " ".join(t.lower() for _, t in facetas)
        outros = [i for i in range(len(ids)) if i not in set(nucleo)]

        termos = termos_distintivos(nucleo, tokens, total, len(ids), 40)
        ausentes = [t for t in termos if t not in texto_facetas][:20]
        linhas += ["**Termos que distinguem a área e ainda não aparecem nas facetas:** "
                   + (", ".join(ausentes) or "—"), ""]

        if len(nucleo) >= 12:
            Xn = E[nucleo]
            melhor = None
            for kk in range(2, min(6, len(nucleo) // 4) + 1):
                km = KMeans(n_clusters=kk, n_init=10, random_state=c.SEMENTE).fit(Xn)
                s = silhouette_score(Xn, km.labels_)
                if melhor is None or s > melhor[0]:
                    melhor = (s, kk, km)
            if melhor:
                s, kk, km = melhor
                linhas += [f"**Frentes que os dados enxergam dentro do núcleo** ({kk} grupos, silhueta {s:.2f}):", ""]
                for g in range(kk):
                    membros = [nucleo[j] for j in range(len(nucleo)) if km.labels_[j] == g]
                    centro = km.cluster_centers_[g]
                    centro = centro / np.linalg.norm(centro)
                    cos_faceta = F[dono == k] @ centro
                    idx_f = [x for x in range(len(dono)) if dono[x] == k]
                    proxima = idx_f[int(cos_faceta.argmax())]
                    med = sorted(membros, key=lambda i: -float(E[i] @ centro))[:3]
                    dist = termos_distintivos(membros, tokens, total, len(ids), 8, minimo=4)
                    aviso = "  ⚠ **nenhuma faceta cobre bem esta frente**" if cos_faceta.max() < 0.55 else ""
                    linhas += [
                        f"- **Grupo {g + 1}** — {len(membros)} projetos · faceta mais próxima: "
                        f"«{nomes_f[proxima]}» (cos {cos_faceta.max():.2f}){aviso}",
                        f"  - termos: {', '.join(dist)}",
                        *[f"  - exemplo: {titulos[i][:110]}" for i in med],
                    ]
                linhas.append("")
        linhas.append("")
    REL_SUGESTOES.write_text("\n".join(linhas), encoding="utf-8")
    print(f"\nSugestões escritas em {REL_SUGESTOES.relative_to(REPO_ROOT)}")


# ---------------------------------------------------------------- revisão humana

def revisao(areas, ids, textos, titulos, y, W, n):
    import numpy as np

    nomes = [a for a, _ in areas]
    dom = W.argmax(axis=1)
    top2 = np.sort(W, axis=1)[:, ::-1]
    # metade: onde o LLM e as facetas MAIS discordam (peso do dominante − peso do rótulo);
    # metade: onde as facetas estão mais indecisas (menor margem entre 1º e 2º).
    # Fora os casos que o autor já julgou (`gabarito_glosas.json`): a revisão seguinte é o
    # conjunto de TESTE, e ajustar as facetas olhando para ele o contaminaria.
    julgados = set(json.loads(GABARITO.read_text(encoding="utf-8"))["casos"]) if GABARITO.exists() else set()
    disc = [(W[i, dom[i]] - W[i, y[i]], i) for i in range(len(ids)) if dom[i] != y[i] and ids[i] not in julgados]
    disc.sort(reverse=True)
    indec = sorted(((top2[i, 0] - top2[i, 1], i) for i in range(len(ids)) if dom[i] == y[i] and ids[i] not in julgados))
    escolhidos = [i for _, i in disc[: n // 2]]
    escolhidos += [i for _, i in indec if i not in escolhidos][: n - len(escolhidos)]

    linhas = [
        "# Casos de fronteira para julgar",
        "",
        f"{len(escolhidos)} projetos. Para cada um, escreva em **Veredito** a subárea que você acha correta "
        "(ou `várias: X + Y`). É o único gabarito humano do projeto — serve para decidir qual dos dois "
        "(rótulo do LLM ou facetas) acerta onde discordam, e para ajustar as glosas.",
        "",
    ]
    for i in escolhidos:
        ordem = np.argsort(-W[i])[:3]
        pesos_txt = " · ".join(f"{nomes[k].split(' e ')[0]} {W[i, k]:.2f}" for k in ordem)
        linhas += [
            f"## {titulos[i]}",
            f"- id `{ids[i]}` · rótulo do LLM: **{nomes[y[i]]}** · facetas: {pesos_txt}",
            f"- {textos[i][:600].strip()}{'…' if len(textos[i]) > 600 else ''}",
            "- **Veredito:** ",
            "",
        ]
    destino = REL_REVISAO
    # NUNCA sobrescrever um arquivo em que o autor já escreveu vereditos (aconteceu em
    # 2026-09-19: os vereditos da rodada 1 foram apagados por um `--revisao` repetido).
    k = 1
    while destino.exists() and "**Veredito:** " in destino.read_text(encoding="utf-8").replace("**Veredito:** \n", ""):
        k += 1
        destino = REL_REVISAO.with_name(f"glosas_revisao_{k}.md")
    destino.write_text("\n".join(linhas), encoding="utf-8")
    print(f"\n{len(escolhidos)} casos escritos em {destino.relative_to(REPO_ROOT)}")


# ---------------------------------------------------------------- gabarito humano

#: o limiar de "peso relevante" que o próprio autor usa nos vereditos ("acima de 0,15").
LIMIAR_ALTO = 0.15


def avaliar_gabarito(areas, ids, y, W, verbose=True):
    """Confere os pesos contra os vereditos do autor (`gabarito_glosas.json`).

    Três testes por caso: **principal** (o grupo dominante está entre os apontados),
    **alto** (cada área listada tem peso ≥ 0,15) e **baixo** (cada área listada fica
    abaixo do teto). Compara com o rótulo do LLM no teste "principal".

    Os casos foram escolhidos por discordância — não é acurácia populacional.
    """
    if not GABARITO.exists():
        return
    nomes = [n for n, _ in areas]
    idx = {n: k for k, n in enumerate(nomes)}
    pos = {i: n for n, i in enumerate(ids)}
    casos = json.loads(GABARITO.read_text(encoding="utf-8"))["casos"]
    dom = W.argmax(axis=1)
    tp = tl = ta = tb = 0
    okp = okl = oka = okb = 0
    falhas = []
    for pid, g in casos.items():
        if pid not in pos:
            continue
        i = pos[pid]
        motivos = []
        if g.get("principal"):
            alvo = {idx[a] for a in g["principal"]}
            tp += 1
            tl += 1
            if dom[i] in alvo:
                okp += 1
            else:
                motivos.append(f"principal: facetas dizem {nomes[dom[i]].split(' e ')[0]}, autor {'/'.join(a.split(' e ')[0] for a in g['principal'])}")
            if y[i] in alvo:
                okl += 1
        for a in g.get("alto", []):
            ta += 1
            if W[i, idx[a]] >= LIMIAR_ALTO:
                oka += 1
            else:
                motivos.append(f"alto: {a.split(' e ')[0]} {W[i, idx[a]]:.2f} < {LIMIAR_ALTO}")
        for a, teto in g.get("baixo", {}).items():
            tb += 1
            if W[i, idx[a]] <= teto:
                okb += 1
            else:
                motivos.append(f"baixo: {a.split(' e ')[0]} {W[i, idx[a]]:.2f} > {teto}")
        if motivos:
            falhas.append((pid, motivos))
    print(f"\n== 5. Contra o gabarito humano ({len(casos)} casos; escolhidos por discordância — não é acurácia populacional)")
    print(f"  grupo principal correto: facetas {okp}/{tp}  ·  rótulo do LLM {okl}/{tl}")
    print(f"  áreas que deveriam ter peso ≥ {LIMIAR_ALTO}: {oka}/{ta}  ·  áreas que deveriam ficar baixas: {okb}/{tb}")
    if verbose:
        for pid, ms in falhas:
            print(f"    {pid}: " + " | ".join(ms))
    return okp, tp, oka, ta, okb, tb


# ---------------------------------------------------------------- revisão às cegas, em graus

def revisao_graus(areas, ids, textos, titulos, y, W, n):
    """Gera uma revisão **às cegas** (sem mostrar o rótulo do LLM nem os pesos das facetas:
    o palpite do modelo ancora o julgamento) com uma grade A–E/I por área. A chave com o que
    o modelo achava fica em `derivados/glosas_revisao_chave.json`, fora da vista."""
    import numpy as np

    nomes = [a for a, _ in areas]
    dom = W.argmax(axis=1)
    top2 = np.sort(W, axis=1)[:, ::-1]
    julgados = set(json.loads(GABARITO.read_text(encoding="utf-8"))["casos"]) if GABARITO.exists() else set()
    disc = sorted(((W[i, dom[i]] - W[i, y[i]], i) for i in range(len(ids)) if dom[i] != y[i] and ids[i] not in julgados), reverse=True)
    indec = sorted(((top2[i, 0] - top2[i, 1], i) for i in range(len(ids)) if dom[i] == y[i] and ids[i] not in julgados))
    escolhidos = [i for _, i in disc[: n // 2]]
    escolhidos += [i for _, i in indec if i not in escolhidos][: n - len(escolhidos)]
    # embaralha de forma determinística: a ordem por discordância também entregaria o palpite
    escolhidos.sort(key=lambda i: (hash(ids[i]) % 9973))

    linhas = [
        "# Revisão às cegas — graus por área", "",
        f"{len(escolhidos)} projetos. Para **cada área**, escreva uma letra depois dos dois-pontos: {ROTULO_GRAU}. "
        "Pode deixar em branco tudo que é irrelevante. Só é preciso julgar quantos casos você quiser — "
        "os que ficarem sem nenhuma letra são ignorados.", "",
    ]
    chave = {}
    for i in escolhidos:
        linhas += [f"## {titulos[i]}", f"- id `{ids[i]}`",
                   f"- {textos[i][:600].strip()}{'…' if len(textos[i]) > 600 else ''}", "- **Graus:**"]
        linhas += [f"  - {nome}: " for nome in nomes]
        linhas.append("")
        chave[ids[i]] = {"rotulo_llm": nomes[y[i]], "pesos": {nomes[k]: round(float(W[i, k]), 3) for k in range(len(nomes))}}
    destino = REL_GRAUS
    k = 1
    while destino.exists() and _tem_graus_preenchidos(destino.read_text(encoding="utf-8")):
        k += 1
        destino = REL_GRAUS.with_name(f"glosas_revisao_graus_{k}.md")
    destino.write_text("\n".join(linhas), encoding="utf-8")
    CHAVE_GRAUS.write_text(json.dumps(chave, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n{len(escolhidos)} casos (às cegas) escritos em {destino.relative_to(REPO_ROOT)}")


def _tem_graus_preenchidos(texto):
    import re

    return re.search(r"^\s+- [^:\n]+:\s*[A-Ea-eIi]\s*$", texto, re.M) is not None


def importar_graus(caminho, areas):
    """Lê o markdown de graus e grava os casos julgados em `gabarito_glosas.json` (campo `graus`)."""
    import re

    nomes = [n for n, _ in areas]
    gab = json.loads(GABARITO.read_text(encoding="utf-8"))
    novos = 0
    for bloco in re.split(r"^## ", Path(caminho).read_text(encoding="utf-8"), flags=re.M)[1:]:
        m = re.search(r"id `([^`]+)`", bloco)
        if not m:
            continue
        graus = {}
        for nome in nomes:
            g = re.search(rf"^\s+- {re.escape(nome)}:\s*([A-Ea-eIi])?\s*$", bloco, re.M)
            if g and g.group(1):
                graus[nome] = g.group(1).upper()
        if not graus:
            continue  # caso não julgado
        gab["casos"].setdefault(m.group(1), {})["graus"] = {nome: graus.get(nome, "I") for nome in nomes}
        novos += 1
    GABARITO.write_text(json.dumps(gab, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{novos} casos julgados importados para {GABARITO.relative_to(REPO_ROOT)}")


def avaliar_graus(areas, ids, A):
    """Concordância **ordinal** entre os graus do autor e o escore de cada área (Kendall tau-b
    por projeto) e se a área de maior escore está entre as de maior grau."""
    if not GABARITO.exists():
        return
    import numpy as np
    from scipy.stats import kendalltau

    nomes = [n for n, _ in areas]
    pos = {i: n for n, i in enumerate(ids)}
    taus, topo, n_casos = [], 0, 0
    for pid, g in json.loads(GABARITO.read_text(encoding="utf-8"))["casos"].items():
        if "graus" not in g or pid not in pos:
            continue
        i = pos[pid]
        graus = np.array([GRAUS[g["graus"][n]] for n in nomes])
        n_casos += 1
        if graus.max() == 0:
            continue
        t = kendalltau(graus, A[i])[0]
        if t == t:
            taus.append(t)
        topo += int(graus[A[i].argmax()] == graus.max())
    if n_casos:
        print(f"\n== 6. Contra os graus A–E do autor ({n_casos} casos)")
        print(f"  tau de Kendall médio (ordem dos graus × ordem dos escores; 1 = idêntica, 0 = acaso): {np.mean(taus):.2f}")
        print(f"  a área de maior escore tem o maior grau do autor em {topo}/{n_casos} casos")


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--sugerir", action="store_true", help="propõe facetas e termos a partir do núcleo de consenso")
    ap.add_argument("--revisao", type=int, metavar="N", help="escreve N casos de fronteira para julgamento humano")
    ap.add_argument("--calibracao", choices=["nenhuma", "z"], default="nenhuma",
                    help="nenhuma (padrão, melhor) ou z-score por área (piora; ver `calibrar`)")
    ap.add_argument("--revisao-graus", type=int, metavar="N", help="revisão ÀS CEGAS com grade A–E/I por área (recomendada)")
    ap.add_argument("--importar", metavar="ARQ.md", help="importa os graus preenchidos para o gabarito")
    ap.add_argument("--T", type=float, default=None, help="temperatura do softmax (padrão: 0,05 sem calibração; 0,7 com z)")
    args = ap.parse_args()

    ids, textos, titulos = carregar_corpus()
    E = embeddings_projetos(ids, textos)
    y = rotulos(ids)
    areas = carregar_glosas()
    if args.importar:
        importar_graus(args.importar, areas)

    T = args.T if args.T is not None else TEMPERATURA[args.calibracao]
    F, dono, nomes_f, S, A, Z, W = diagnosticar(areas, ids, E, y, T, args.calibracao)
    avaliar_gabarito(areas, ids, y, W)
    avaliar_graus(areas, ids, A)
    if args.revisao_graus:
        revisao_graus(areas, ids, textos, titulos, y, W, args.revisao_graus)
    if args.sugerir:
        sugerir(areas, ids, textos, titulos, E, y, F, dono, nomes_f, W)
    if args.revisao:
        revisao(areas, ids, textos, titulos, y, W, args.revisao)


if __name__ == "__main__":
    main()
