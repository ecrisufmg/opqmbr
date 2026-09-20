"""
Posições do Mapa de produções (PLANO_MAPA_PRODUCOES.md): cada marca é uma
**produção**, e a posição dela vem dos dados da própria produção — não da posição
do projeto a que pertence.

Duas organizações dos mesmos pontos:

  a. **por semelhança de texto** — embeddings multilíngues (`MODELO_EMBEDDING`)
     do texto da produção (tipo + subtipo + título + campos de detalhe de
     assunto), depois UMAP 2D e 3D com semente fixa. Junto, um HDBSCAN (não
     supervisionado) sobre a redução 2D, como etiqueta opcional de "cluster".
  b. **por rede de autoria** — proximidade por quem assina em comum, mais o
     vínculo à instituição e ao projeto. A produção vira um vetor esparso
     (autores + instituição + projeto, cada fator com o seu peso), e o UMAP
     (cosseno) projeta esse vetor: produções de um mesmo grupo ficam tão mais
     juntas quanto mais recorrente for a ligação. Os pesos são `PESO_AUTOR`,
     `PESO_INSTITUICAO` e `PESO_PROJETO` — decisão explícita, aqui no topo.

Além das posições, o módulo calcula a **aderência** de cada produção a cada uma
das 9 subáreas da ANPPOM (similaridade de cosseno entre o embedding da produção e
a glosa de cada subárea, ×100), para o modo "por aderência" do filtro de subárea.
Sai em `derivados/aderencia_producoes.json`, separado do arquivo de posições.

Determinismo (critério E1): mesma semente e mesmos dados → mesmo resultado.
`--autoteste` roda as funções puras (texto, cobertura) sem banco nem modelo.
Não faz parte do caminho de reprodução da base (stdlib pura, CLAUDE.md): tem venv
próprio (`.venv/`) com sentence-transformers, umap-learn, hdbscan.

Usage:
    python3 -m analise.posicoes_producoes [--db PATH] [--out PATH] [--amostra N]
    python3 -m analise.posicoes_producoes --autoteste
"""

import argparse
import json
import random
import sqlite3
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
DEFAULT_DB = REPO_ROOT / "sucupira.db"
DEFAULT_OUT = REPO_ROOT / "derivados" / "posicoes_producoes.parquet"

MODELO_EMBEDDING = "paraphrase-multilingual-MiniLM-L12-v2"
SEMENTE = 42

# Título com menos do que isso de caracteres é "título curto": contribui pouco
# para o embedding sozinho — a cobertura reporta, e o texto é reforçado pelos
# campos de detalhe quando existirem (§2.1, "medir a qualidade").
TITULO_CURTO = 24

# Pesos da rede de autoria (b): quanto cada fator puxa as produções para perto.
# Decisão explícita, ainda não calibrada com o autor — ajuste aqui e rode de novo.
PESO_AUTOR = 1.0
PESO_INSTITUICAO = 0.5
PESO_PROJETO = 1.0

# Campos de detalhe que carregam ASSUNTO (§2.1: nome do evento, título dos anais,
# periódico, editora, descrição…). Campo fora da lista — página, URL, ISBN, data —
# não entra no embedding: ruído, não assunto.
CAMPOS_ASSUNTO = (
    "Título em Inglês",
    "Tema",
    "Natureza do Conteúdo",
    "Natureza da Obra",
    "Natureza do texto",
    "Título da Obra",
    "Título dos Anais",
    "ISSN / Título do periódico",
    "Título do jornal ou revista",
    "Nome do evento",
    "Evento",
    "Nome da editora",
    "Editora",
    "Observação",
    "Observações",
    "(PAC) Descrição da Produção",
    "(PAC) Detalhamento do contexto da apresentação",
    "(PAC) Descrição dos avanços para o conhecimento",
    "(PAC) Descrição do impacto social e cultural com relação ao público contemplado",
)


def texto_da_producao(nome, tipo, subtipo, detalhe):
    """O texto que entra no embedding: tipo + subtipo + título + os campos de
    detalhe que carregam assunto, nessa ordem e sem campos vazios."""
    partes = [p for p in (tipo, subtipo, nome) if p and str(p).strip()]
    for item in CAMPOS_ASSUNTO:
        v = (detalhe or {}).get(item)
        if v and str(v).strip() and str(v).strip() != "-":
            partes.append(str(v).strip())
    return " ".join(partes).strip()


def carregar_producoes(con):
    rows = con.execute("""
        SELECT id_producao, nome, tipo, subtipo, id_programa, id_projeto, ano_base
        FROM producoes
        ORDER BY id_producao
    """).fetchall()
    chaves = ("id_producao", "nome", "tipo", "subtipo", "id_programa", "id_projeto", "ano_base")
    return [dict(zip(chaves, r)) for r in rows]


def carregar_sigla_por_programa(con):
    return {
        r[0]: r[1]
        for r in con.execute("""
            SELECT p.id_programa, i.sigla
            FROM programas p JOIN instituicoes i ON i.id_ies = p.id_ies
        """)
    }


def carregar_detalhes_assunto(con):
    """id_producao -> {item: valor}, só os campos de assunto."""
    alvo = set(CAMPOS_ASSUNTO)
    saida: dict = {}
    for r in con.execute("""
        SELECT id_producao, item, valor FROM producao_detalhe
        WHERE valor IS NOT NULL AND TRIM(valor) NOT IN ('', '-')
        ORDER BY id_producao, ordem
    """):
        if r[1] not in alvo:
            continue
        saida.setdefault(r[0], {})[r[1]] = (r[2] or "").strip()
    return saida


def carregar_autores(con):
    """id_producao -> lista de id_pessoa (como str), na ordem de autoria."""
    saida: dict = {}
    for r in con.execute("""
        SELECT id_producao, id_pessoa FROM autoria
        WHERE id_pessoa IS NOT NULL
        ORDER BY id_producao, ordem
    """):
        saida.setdefault(r[0], []).append(str(r[1]))
    return saida


def gerar_embeddings(textos, modelo=None):
    from sentence_transformers import SentenceTransformer

    modelo = modelo or SentenceTransformer(MODELO_EMBEDDING)
    return modelo.encode(textos, show_progress_bar=True, normalize_embeddings=True)


def reduzir(embeddings, n_componentes, semente=SEMENTE):
    import umap

    return umap.UMAP(
        n_components=n_componentes,
        metric="cosine",
        random_state=semente,
        n_neighbors=15,
        min_dist=0.1 if n_componentes == 2 else 0.0,
    ).fit_transform(embeddings)


def clusterizar(embeddings_reduzidos, min_cluster_size=25):
    import hdbscan

    return hdbscan.HDBSCAN(
        min_cluster_size=min_cluster_size,
        metric="euclidean",
        cluster_selection_method="eom",
    ).fit_predict(embeddings_reduzidos)


def cobertura(textos, nomes):
    import re

    titulo_curto = 0
    vazio = 0
    com_detalhe = 0
    for nome, texto in zip(nomes, textos):
        t = re.sub(r"\s+", " ", nome or "").strip()
        tem_detalhe = len(texto) > len(t) + 4
        if not t:
            vazio += 1
        elif len(t) < TITULO_CURTO and not tem_detalhe:
            titulo_curto += 1
        if tem_detalhe:
            com_detalhe += 1
    total = len(textos)
    return {
        "total": total,
        "vazio": vazio,
        "titulo_curto_sem_detalhe": titulo_curto,
        "com_detalhe": com_detalhe,
        "suficiente": total - vazio - titulo_curto,
    }


def avaliar_vizinhos(embeddings, nomes, ids, k=6, amostra=5):
    import numpy as np

    rng = random.Random(SEMENTE)
    idx = rng.sample(range(len(ids)), min(amostra, len(ids)))
    for i in idx:
        sim = embeddings @ embeddings[i]
        ordem = np.argsort(-sim)
        viz = [j for j in ordem if j != i][:k]
        print(f"\n· {nomes[i]!r} ({ids[i]})")
        for j in viz:
            print(f"    {sim[j]:.3f}  {nomes[j]!r} ({ids[j]})")


# ---------------------------------------------------------------------------
# Aderência às subáreas da ANPPOM
#
# A aderência das produções NÃO é calculada aqui: ela é **herdada do projeto** a
# que cada produção pertence (o mesmo modelo calibrado de `analise/aderencia.py`,
# que o autor validou às cegas). `build_public.py` cruza `derivados/aderencia.json`
# (projetos) com o `id_projeto` de cada produção — produção sem projeto fica com
# aderência zero. Herdar em vez de recalcular mantém o Mapa de produções na MESMA
# escala e calibração do Mapa de projetos, e evita um modelo novo (não calibrado)
# só para as produções.
# ---------------------------------------------------------------------------


def layout_autoria(linhas, sigla_por_programa, autores, semente=SEMENTE):
    """Posições (b) por rede de autoria: um vetor esparso por produção com os
    autores (peso `PESO_AUTOR`), a instituição (`PESO_INSTITUICAO`) e o projeto
    (`PESO_PROJETO`), reduzido por UMAP (cosseno). Devolve (x, y) por produção."""
    import scipy.sparse as sp
    import umap

    autor_idx: dict = {}
    for ids in autores.values():
        for a in ids:
            if a not in autor_idx:
                autor_idx[a] = len(autor_idx)
    n_autores = len(autor_idx)

    siglas = sorted({s for s in sigla_por_programa.values() if s})
    sigla_idx = {s: i for i, s in enumerate(siglas)}
    n_siglas = len(siglas)

    projs = sorted({str(l["id_projeto"]) for l in linhas if l.get("id_projeto")})
    proj_idx = {p: i for i, p in enumerate(projs)}
    n_projs = len(projs)

    n = len(linhas)
    lin, col, val = [], [], []
    for i, l in enumerate(linhas):
        for a in autores.get(l["id_producao"], []):
            lin.append(i)
            col.append(autor_idx[a])
            val.append(PESO_AUTOR)
        s = sigla_por_programa.get(l["id_programa"])
        if s and s in sigla_idx:
            lin.append(i)
            col.append(n_autores + sigla_idx[s])
            val.append(PESO_INSTITUICAO)
        p = l.get("id_projeto")
        if p and str(p) in proj_idx:
            lin.append(i)
            col.append(n_autores + n_siglas + proj_idx[str(p)])
            val.append(PESO_PROJETO)

    X = sp.csr_matrix(
        (val, (lin, col)), shape=(n, n_autores + n_siglas + n_projs)
    )
    print(
        f"Layout de autoria: {n} produções × {n_autores} autores, "
        f"{n_siglas} instituições, {n_projs} projetos "
        f"(pesos autor={PESO_AUTOR}, instituição={PESO_INSTITUICAO}, projeto={PESO_PROJETO}).",
    )
    coords = umap.UMAP(
        metric="cosine", random_state=semente, n_neighbors=15, min_dist=0.1,
    ).fit_transform(X)
    return coords[:, 0], coords[:, 1]


def executar(db_path, out_path, amostra):
    import pandas as pd
    from analise.nucleo import classe_da_rubrica

    con = sqlite3.connect(db_path)
    linhas = carregar_producoes(con)
    sigla_por_programa = carregar_sigla_por_programa(con)
    detalhes = carregar_detalhes_assunto(con)
    autores = carregar_autores(con)
    con.close()

    ids = [l["id_producao"] for l in linhas]
    nomes = [l["nome"] or "" for l in linhas]
    textos = [
        texto_da_producao(l["nome"], l["tipo"], l["subtipo"], detalhes.get(l["id_producao"]))
        for l in linhas
    ]
    print(f"{len(ids)} produções carregadas.")

    cob = cobertura(textos, nomes)
    print(
        f"Cobertura: {cob['suficiente']}/{cob['total']} com texto suficiente; "
        f"{cob['com_detalhe']} com campo de detalhe de assunto; "
        f"{cob['titulo_curto_sem_detalhe']} com título curto e sem detalhe; "
        f"{cob['vazio']} sem título.",
    )

    print(f"Gerando embeddings ({MODELO_EMBEDDING})…")
    from sentence_transformers import SentenceTransformer

    modelo = SentenceTransformer(MODELO_EMBEDDING)
    embeddings = gerar_embeddings(textos, modelo)

    print("Reduzindo para visualização (UMAP, 2D)…")
    coords_2d = reduzir(embeddings, 2)
    print("Reduzindo para visualização (UMAP, 3D)…")
    coords_3d = reduzir(embeddings, 3)

    print("Clusterizando (HDBSCAN, etiqueta opcional)…")
    labels = clusterizar(coords_2d)
    n_ruido = int((labels == -1).sum())
    n_clusters = len(set(labels.tolist()) - {-1})
    print(f"  {n_clusters} clusters, {n_ruido} em ruído ({100 * n_ruido // len(ids)}%).")

    aut_x, aut_y = layout_autoria(linhas, sigla_por_programa, autores)

    if amostra:
        avaliar_vizinhos(embeddings, nomes, ids, k=6, amostra=amostra)

    df = pd.DataFrame({
        "id_producao": ids,
        "nome": nomes,
        "tipo": [l["tipo"] for l in linhas],
        "subtipo": [l["subtipo"] for l in linhas],
        "classe": [classe_da_rubrica(l["tipo"], l["subtipo"]) for l in linhas],
        "ano": [l["ano_base"] for l in linhas],
        "id_programa": [l["id_programa"] for l in linhas],
        "id_projeto": [l["id_projeto"] for l in linhas],
        "sigla": [sigla_por_programa.get(l["id_programa"]) for l in linhas],
        "n_texto": [len(t) for t in textos],
        "tem_detalhe": [l["id_producao"] in detalhes for l in linhas],
        "x": coords_2d[:, 0],
        "y": coords_2d[:, 1],
        "x3d": coords_3d[:, 0],
        "y3d": coords_3d[:, 1],
        "z3d": coords_3d[:, 2],
        "aut_x": aut_x,
        "aut_y": aut_y,
        "cluster": labels.astype(int),
    })

    out_path.parent.mkdir(parents=True, exist_ok=True)
    # pandas grava None como NaN; em coluna numérica o `df.where(..., None)` não
    # segura o None (volta a NaN), então converte tudo para object antes.
    df = df.astype(object).where(pd.notna(df), None)
    df.to_parquet(out_path, index=False)
    with open(out_path.with_suffix(".json"), "w", encoding="utf-8") as f:
        json.dump(df.to_dict(orient="records"), f, ensure_ascii=False, allow_nan=False)
    print(f"Escrito {out_path} e {out_path.with_suffix('.json')} ({len(df)} linhas).")


def autoteste():
    d = {"Tema": "x", "Evento": "-", "Nome do evento": "Festival Y", "Idioma": "pt"}
    t = texto_da_producao("Título", "TÉCNICA", "MÚSICA", d)
    assert t == "TÉCNICA MÚSICA Título x Festival Y", repr(t)

    c = cobertura(["a b"], ["curto"])
    assert c["titulo_curto_sem_detalhe"] == 1 and c["suficiente"] == 0

    c2 = cobertura(["Um título razoavelmente longo com detalhe"], ["Um título razoavelmente longo com detalhe x y"])
    assert c2["suficiente"] == 1
    print("autoteste: ok (texto, cobertura).")


def main():
    parser = argparse.ArgumentParser(
        description="Posições do Mapa de produções (embeddings + UMAP + aderência + rede de autoria).",
    )
    parser.add_argument("--db", default=str(DEFAULT_DB))
    parser.add_argument("--out", default=str(DEFAULT_OUT))
    parser.add_argument("--amostra", type=int, default=0,
                        help="Imprime os vizinhos mais próximos de N produções sorteadas (avaliação qualitativa).")
    parser.add_argument("--autoteste", action="store_true")
    args = parser.parse_args()

    if args.autoteste:
        autoteste()
        return

    db_path = Path(args.db)
    if not db_path.exists():
        raise FileNotFoundError(f"Banco não encontrado: {db_path}")
    executar(db_path, Path(args.out), args.amostra)


if __name__ == "__main__":
    main()
