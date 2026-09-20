"""
Generates site/public/data/*.json — the public data bundle.

Reads sucupira.db + derivados/indices.parquet (or .json fallback).
Applies all suppression rules from privacidade.py.
Writes JSON files that the static Vite site will fetch.

Política de publicação (revista em 2026-09-18 — transparência total, decisão do
usuário; os dados vêm da Plataforma Sucupira, que os publica):

  - Nomes de pessoas APARECEM: autores de cada produção (producoes_projeto.json)
    e membros de cada projeto (membros_projeto.json).
  - Título do projeto (atlas*.json), título e link de toda produção: públicos.
  - A descrição de cada projeto (descricao_projeto.json), as produções sem projeto
    (producoes_sem_projeto.json), a ficha de cada projeto com o **fomento** — o par
    projeto↔agência (ficha_projeto.json) — e o **detalhe integral de cada produção**
    (detalhe_producao_<SIGLA>.json, um arquivo por programa) também saem.
  - Sem supressão de célula pequena: toda contagem sai como é (SUPPRESSION_THRESHOLD
    = 0 em privacidade.py, a chave para reinstalar a regra antiga de n < 5).
  - Continua sem sair: id_pessoa e id_projeto reais (o atlas usa um id substituto
    persistido, ver build_atlas / derivados/id_map_projetos.json).
  - Sai `id_producao` da Plataforma (já é público: está no link de cada produção).

Usage:
    python3 -m analise.build_public [--db PATH] [--out DIR]
"""

import argparse
import json
import re
import sqlite3
import sqlite3 as _sqlite3
from pathlib import Path

from analise.privacidade import (
    suppress_count,
    safe_percent,
    suppress_row,
    build_id_map,
)
from analise import ciclo_vida
from analise import esquema_producao
from analise.agencias import (
    AGENCIAS as AGENCIAS_FOMENTO,
    ESFERAS as ESFERAS_FOMENTO,
    ROTULO_ESFERA as ROTULO_ESFERA_FOMENTO,
    identificar as identificar_agencia,
)
from analise.idiomas import e_estrangeiro as idioma_estrangeiro
from analise.paises import (
    BRASIL as PAIS_BRASIL,
    e_internacional as pais_internacional,
    paises as listar_paises,
)
from analise.nucleo import (
    CLASSES,
    CLASSE_POR_RUBRICA,
    DESCRICAO_CLASSE,
    NUCLEO,
    ROTULO_CLASSE,
    classe_da_rubrica,
    e_administrativo,
)

REPO_ROOT = Path(__file__).parent.parent
DEFAULT_DB = REPO_ROOT / "sucupira.db"
DEFAULT_OUT = REPO_ROOT / "site" / "public" / "data"

ANOS_QUADRIENIO = (2021, 2022, 2023, 2024)
ANOS_TODOS = (2020, 2021, 2022, 2023, 2024, 2025)


def _con(db_path: Path) -> sqlite3.Connection:
    con = sqlite3.connect(db_path)
    con.row_factory = sqlite3.Row
    return con


# Coordenadas das cidades-sede (WGS84, centro do município), para o mapa da rede.
# Tabela à mão, e não geocodificação: são 20 cidades que não mudam de lugar, e
# uma tabela versionada é auditável — um serviço de geocodificação não é. Chave =
# (município, UF), porque nome de cidade se repete entre estados.
COORDENADAS_SEDE = {
    ("Belém", "PA"): (-1.4558, -48.4902),
    ("Belo Horizonte", "MG"): (-19.9167, -43.9345),
    ("Brasília", "DF"): (-15.7939, -47.8828),
    ("Campinas", "SP"): (-22.9099, -47.0626),
    ("Curitiba", "PR"): (-25.4284, -49.2733),
    ("Florianópolis", "SC"): (-27.5954, -48.5480),
    ("Goiânia", "GO"): (-16.6869, -49.2648),
    ("João Pessoa", "PB"): (-7.1195, -34.8450),
    ("Maringá", "PR"): (-23.4205, -51.9331),
    ("Natal", "RN"): (-5.7945, -35.2110),
    ("Paranavaí", "PR"): (-23.0731, -52.4650),
    ("Porto Alegre", "RS"): (-30.0346, -51.2177),
    ("Recife", "PE"): (-8.0476, -34.8770),
    ("Rio de Janeiro", "RJ"): (-22.9068, -43.1729),
    ("Salvador", "BA"): (-12.9777, -38.5016),
    ("São João del Rei", "MG"): (-21.1356, -44.2619),
    ("São Paulo", "SP"): (-23.5505, -46.6333),
    ("Uberlândia", "MG"): (-18.9186, -48.2772),
}


# ---------------------------------------------------------------------------
# 1. Programas — cards de overview (Página 1)
# ---------------------------------------------------------------------------

def build_programas(con) -> list[dict]:
    rows = con.execute("""
        SELECT
            p.id_programa,
            i.sigla,
            i.nome AS nome_ies,
            i.uf,
            i.regiao,
            i.municipio,
            i.categoria_administrativa,
            i.ror_id,
            pn.nota_quadrienio_anterior AS nota_anterior,
            pn.nota_quadrienal_2025 AS nota_2025,
            pn.variacao
        FROM programas p
        JOIN instituicoes i ON i.id_ies = p.id_ies
        LEFT JOIN programa_nota pn ON pn.id_programa = p.id_programa
        ORDER BY i.sigla
    """).fetchall()

    saida = []
    for r in rows:
        d = dict(r)
        # A planilha da CAPES grava a nota como texto, e usa "A" para
        # "sem nota" (programa em implantação, ou primeira avaliação). Publicar
        # isso cru faz o front comparar string com número em silêncio — foi o que
        # produziu "0 programas com nota 7" com a UNICAMP em 7 na tela.
        d["nota_anterior"] = _nota_numerica(d["nota_anterior"])
        d["nota_2025"] = _nota_numerica(d["nota_2025"])
        d["variacao"] = (
            d["nota_2025"] - d["nota_anterior"]
            if d["nota_2025"] is not None and d["nota_anterior"] is not None
            else None
        )
        coord = COORDENADAS_SEDE.get((d["municipio"], d["uf"]))
        if coord is None:
            # Sem coordenada o programa some do mapa em silêncio; melhor gritar.
            print(f"  AVISO: sem coordenada para {d['sigla']} ({d['municipio']}/{d['uf']})")
        d["lat"], d["lon"] = coord if coord else (None, None)
        saida.append(d)
    return saida


def _nota_numerica(valor) -> "int | None":
    """Nota da CAPES como inteiro; None para 'A', vazio ou qualquer não numérico."""
    if valor is None:
        return None
    texto = str(valor).strip()
    return int(texto) if texto.isdigit() else None


# ---------------------------------------------------------------------------
# 2. Produção por programa × ano × tipo (Streamgraph, Página 2)
# ---------------------------------------------------------------------------

def build_producao_por_ano(con) -> list[dict]:
    rows = con.execute("""
        SELECT
            i.sigla,
            pr.ano_base,
            pr.tipo,
            pr.subtipo,
            COUNT(*) n
        FROM producoes pr
        JOIN programas p ON p.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = p.id_ies
        WHERE pr.ano_base IN (?,?,?,?,?,?)
        GROUP BY i.sigla, pr.ano_base, pr.tipo, pr.subtipo
        ORDER BY i.sigla, pr.ano_base, pr.tipo, pr.subtipo
    """, ANOS_TODOS).fetchall()
    # `classe` vai junto de cada linha para o front poder alternar entre "total
    # registrado" e "núcleo comparável" sem reimplementar a regra do §4.1a — que
    # é versionada em analise/nucleo.py e só existe lá.
    return [dict(r, classe=classe_da_rubrica(r["tipo"], r["subtipo"])) for r in rows]


# ---------------------------------------------------------------------------
# 3. Totais nacionais por ano (Página 1 — headline numbers)
#    Deduplicates by (normalized_title, ano_base) to avoid double-counting.
# ---------------------------------------------------------------------------

def build_totais_nacionais(con) -> list[dict]:
    # Unique (title, year) pairs to deduplicate the 280 duplicate works
    rows = con.execute("""
        SELECT
            pr.ano_base,
            pr.tipo,
            COUNT(DISTINCT lower(trim(pr.nome)) || '|' || pr.ano_base) n_unique,
            COUNT(*) n_bruto
        FROM producoes pr
        WHERE pr.ano_base IN (?,?,?,?,?,?) AND pr.nome IS NOT NULL
        GROUP BY pr.ano_base, pr.tipo
        ORDER BY pr.ano_base, pr.tipo
    """, ANOS_TODOS).fetchall()
    return [dict(r) for r in rows]


# ---------------------------------------------------------------------------
# 4. Índices por programa (cards detalhados + parallel coordinates, Página 8)
#    Loads from derivados/indices.{parquet,json} if available.
# ---------------------------------------------------------------------------

def build_indices(repo_root: Path) -> list[dict] | None:
    parquet = repo_root / "derivados" / "indices.parquet"
    json_f = repo_root / "derivados" / "indices.json"

    if parquet.exists():
        try:
            import pandas as pd
            df = pd.read_parquet(parquet)
            # `to_dict` devolve NaN para valor ausente, e json.dump o escreve como
            # `NaN` — que não é JSON: o JSON.parse do navegador falha e o site
            # quebra. `to_json` já emite `null`.
            return json.loads(df.to_json(orient="records"))
        except ImportError:
            pass

    if json_f.exists():
        with open(json_f, encoding="utf-8") as f:
            return json.load(f)

    return None


# ---------------------------------------------------------------------------
# 5. Rede inter-programas via pessoas compartilhadas (Página 5)
#    Public: only the 19×19 matrix of shared-person counts.
# ---------------------------------------------------------------------------

def build_rede_programas(con) -> dict:
    # Matrix: sigla_a, sigla_b, n_pessoas
    rows = con.execute("""
        WITH pp AS (
            SELECT DISTINCT a.id_pessoa, pr.id_programa
            FROM autoria a JOIN producoes pr ON pr.id_producao = a.id_producao
            WHERE pr.ano_base IN (?,?,?,?,?,?)
        )
        SELECT i1.sigla sigla_a, i2.sigla sigla_b, COUNT(DISTINCT x.id_pessoa) n
        FROM pp x JOIN pp y ON y.id_pessoa = x.id_pessoa AND y.id_programa > x.id_programa
        JOIN programas g1 ON g1.id_programa = x.id_programa
        JOIN programas g2 ON g2.id_programa = y.id_programa
        JOIN instituicoes i1 ON i1.id_ies = g1.id_ies
        JOIN instituicoes i2 ON i2.id_ies = g2.id_ies
        GROUP BY x.id_programa, y.id_programa
        ORDER BY n DESC
    """, ANOS_TODOS).fetchall()

    edges = []
    for r in rows:
        cell = suppress_count(r["n"])
        edges.append({
            "a": r["sigla_a"],
            "b": r["sigla_b"],
            "n": cell["value"],
            "suppressed": cell["suppressed"],
        })

    # Network aggregate metrics (degree, density) — public
    siglas = list({e["a"] for e in edges} | {e["b"] for e in edges})
    degree = {s: 0 for s in siglas}
    for e in edges:
        if not e["suppressed"]:
            degree[e["a"]] = degree.get(e["a"], 0) + 1
            degree[e["b"]] = degree.get(e["b"], 0) + 1

    n_nodes = len(siglas)
    possible = n_nodes * (n_nodes - 1) / 2
    published_edges = [e for e in edges if not e["suppressed"]]
    density = round(len(published_edges) / possible, 3) if possible else None

    return {
        "edges": edges,
        "aggregate": {
            "n_programs": n_nodes,
            "density": density,
            "degree_distribution": sorted(degree.values()),
        },
    }


# ---------------------------------------------------------------------------
# 5b. Perfil de cada programa: quadro de pessoas, produção por membro e o
#     "raio de colaboração" (Página 5).
#
#     Tudo agregado por programa — nenhuma linha por pessoa sai daqui.
# ---------------------------------------------------------------------------

VINCULOS_INTERNOS = ("Docente", "Discente", "Egresso", "Pós-doc")
VINCULOS_EXTERNOS = ("Participante externo", "Sem vínculo")


def build_perfil_programas(con) -> list[dict]:
    prog = {
        r["id_programa"]: (r["sigla"], r["regiao"], r["uf"])
        for r in con.execute("""
            SELECT p.id_programa, i.sigla, i.regiao, i.uf
            FROM programas p JOIN instituicoes i ON i.id_ies = p.id_ies
        """)
    }

    # Pessoa -> programas em que ela aparece como autora, em qualquer ano. É o
    # único vínculo interinstitucional que a base tem: `producoes.id_programa` é
    # único, então coautoria entre programas não existe por construção.
    programas_da_pessoa: dict[str, set] = {}
    for r in con.execute("""
        SELECT CAST(a.id_pessoa AS TEXT) AS pessoa, pr.id_programa AS prog
        FROM autoria a JOIN producoes pr ON pr.id_producao = a.id_producao
        WHERE a.id_pessoa IS NOT NULL
    """):
        programas_da_pessoa.setdefault(r["pessoa"], set()).add(r["prog"])

    autores_por_producao: dict[tuple, list] = {}
    for r in con.execute("""
        SELECT pr.id_producao, pr.id_programa, CAST(a.id_pessoa AS TEXT) AS pessoa, a.tipo_vinculo
        FROM producoes pr JOIN autoria a ON a.id_producao = pr.id_producao
        WHERE pr.ano_base IN (?,?,?,?)
    """, ANOS_QUADRIENIO):
        autores_por_producao.setdefault((r["id_producao"], r["id_programa"]), []).append(
            (r["pessoa"], r["tipo_vinculo"])
        )

    contagem: dict[str, dict] = {}
    for (_, id_programa), autores in autores_por_producao.items():
        sigla, regiao, uf = prog[id_programa]
        c = contagem.setdefault(sigla, {k: 0 for k in (
            "total", "autoria_unica", "interna", "mesma_uf", "regional", "interregional",
            "com_externo", "docente_discente", "coautoria",
        )})
        c["total"] += 1

        if len(autores) < 2:
            # Autoria única não diz nada sobre colaboração: classificá-la como
            # "interna" inflaria o fechamento de quem simplesmente registra
            # trabalho solo. Fica numa faixa própria, declarada.
            c["autoria_unica"] += 1
        else:
            c["coautoria"] += 1
            outros = set()
            for pessoa, _ in autores:
                if pessoa:
                    outros |= programas_da_pessoa.get(pessoa, set()) - {id_programa}
            # Faixa pelo alcance MAIOR que a obra atinge: quem toca outra região
            # não vira "mesma UF" só porque também tem um parceiro vizinho.
            if any(prog[o][1] != regiao for o in outros):
                c["interregional"] += 1
            elif any(prog[o][2] != uf for o in outros):
                c["regional"] += 1
            elif outros:
                c["mesma_uf"] += 1
            else:
                c["interna"] += 1

        vinculos = {v for _, v in autores}
        if any(v in VINCULOS_EXTERNOS for v in vinculos):
            c["com_externo"] += 1
        if "Docente" in vinculos and ({"Discente", "Egresso"} & vinculos):
            c["docente_discente"] += 1

    pessoas = {}
    for r in con.execute("""
        SELECT i.sigla, a.tipo_vinculo, COUNT(DISTINCT CAST(a.id_pessoa AS TEXT)) AS n
        FROM autoria a
        JOIN producoes pr ON pr.id_producao = a.id_producao
        JOIN programas g ON g.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = g.id_ies
        WHERE pr.ano_base IN (?,?,?,?)
        GROUP BY i.sigla, a.tipo_vinculo
    """, ANOS_QUADRIENIO):
        pessoas.setdefault(r["sigla"], {})[r["tipo_vinculo"]] = r["n"]

    saida = []
    for sigla, regiao, _uf in sorted(prog.values()):
        c = contagem.get(sigla)
        q = pessoas.get(sigla, {})
        docentes = q.get("Docente", 0)
        discentes = q.get("Discente", 0)
        egressos = q.get("Egresso", 0)
        posdoc = q.get("Pós-doc", 0)
        externos = q.get("Participante externo", 0)
        membros = docentes + discentes + egressos + posdoc

        linha = {
            "sigla": sigla,
            "regiao": regiao,
            "n_docentes": suppress_count(docentes)["value"],
            "n_discentes": suppress_count(discentes)["value"],
            "n_egressos": suppress_count(egressos)["value"],
            "n_posdoc": suppress_count(posdoc)["value"],
            "n_externos": suppress_count(externos)["value"],
            "n_membros": suppress_count(membros)["value"],
        }
        if c is None:
            # Programa sem produção no quadriênio (UFG, em implantação). Zero
            # aqui é o valor certo, mas precisa ser distinguível de "não medido".
            linha.update({k: 0 for k in (
                "producoes", "autoria_unica", "interna", "mesma_uf", "regional",
                "interregional", "com_externo", "docente_discente", "coautoria",
            )})
            linha["sem_producao"] = True
        else:
            linha.update({
                "producoes": c["total"],
                "autoria_unica": c["autoria_unica"],
                "interna": c["interna"],
                "mesma_uf": c["mesma_uf"],
                "regional": c["regional"],
                "interregional": c["interregional"],
                "com_externo": c["com_externo"],
                "docente_discente": c["docente_discente"],
                "coautoria": c["coautoria"],
                "sem_producao": False,
            })
        saida.append(linha)
    return saida


# ---------------------------------------------------------------------------
# 5b-quater. Endogenia por projeto e endogamia acadêmica (§4.1b.5).
#
#   Duas das quatro medidas do capítulo "o quanto cada programa é fechado"
#   (§4.3 Cap. 6). A primeira (por coautoria) já sai de build_perfil_programas
#   — interna / coautoria — e não é recalculada aqui. A quarta (temática, por
#   entropia dos clusters de projeto) depende do clustering da Fase 3, que
#   ainda não existe: fica de fora, e o front avisa disso.
#
#   Privacidade: os numeradores contam PESSOAS, não produções — um valor
#   pequeno aqui aponta para gente específica de um jeito que uma contagem de
#   obras não aponta. Por isso passam por suppress_count como qualquer outra
#   contagem de indivíduos na base, e o percentual acompanha a supressão do
#   numerador: publicar só o percentual seria reconstruir o valor suprimido
#   por conta própria.
# ---------------------------------------------------------------------------

def build_endogenia(con) -> list[dict]:
    prog = {
        r["id_programa"]: r["sigla"]
        for r in con.execute("""
            SELECT p.id_programa, i.sigla
            FROM programas p JOIN instituicoes i ON i.id_ies = p.id_ies
        """)
    }

    # --- por projeto: quanto os membros de projeto do programa NÃO aparecem
    #     em projeto de nenhum outro programa.
    programas_do_membro: dict[str, set] = {}
    membros_do_programa: dict[str, set] = {}
    for r in con.execute("""
        SELECT DISTINCT CAST(m.id_pessoa AS TEXT) AS pessoa, a.id_programa AS prog
        FROM projeto_membro m
        JOIN projeto_ano a ON a.id_projeto = m.id_projeto
        WHERE m.id_pessoa IS NOT NULL AND a.id_programa IS NOT NULL
    """):
        programas_do_membro.setdefault(r["pessoa"], set()).add(r["prog"])
        membros_do_programa.setdefault(r["prog"], set()).add(r["pessoa"])

    endogenia_projeto = {}
    for id_programa, pessoas in membros_do_programa.items():
        total = len(pessoas)
        exclusivos = sum(1 for p in pessoas if len(programas_do_membro[p]) == 1)
        endogenia_projeto[id_programa] = (exclusivos, total)

    # --- endogamia acadêmica: docente que também aparece como Discente ou
    #     Egresso no MESMO programa, em qualquer ano. Proxy, não taxa: só
    #     enxerga quem publicou nas duas fases (§4.3 Cap. 6.3).
    docentes: dict[str, set] = {}
    formados_aqui: dict[str, set] = {}
    for r in con.execute("""
        SELECT DISTINCT CAST(a.id_pessoa AS TEXT) AS pessoa, pr.id_programa AS prog, a.tipo_vinculo AS vinc
        FROM autoria a JOIN producoes pr ON pr.id_producao = a.id_producao
        WHERE a.id_pessoa IS NOT NULL AND a.tipo_vinculo IN ('Docente','Discente','Egresso')
    """):
        (docentes if r["vinc"] == "Docente" else formados_aqui).setdefault(
            r["prog"], set()
        ).add(r["pessoa"])

    endogamia = {}
    for id_programa, pessoas in docentes.items():
        total = len(pessoas)
        formados = len(pessoas & formados_aqui.get(id_programa, set()))
        endogamia[id_programa] = (formados, total)

    def _linha(pares: dict, id_programa) -> tuple:
        num, den = pares.get(id_programa, (0, 0))
        cel = suppress_count(num)
        pct = None if cel["suppressed"] else safe_percent(num, den)
        return cel["value"], cel["suppressed"], den, pct

    saida = []
    for id_programa, sigla in sorted(prog.items(), key=lambda kv: kv[1]):
        proj_n, proj_supr, proj_den, proj_pct = _linha(endogenia_projeto, id_programa)
        aca_n, aca_supr, aca_den, aca_pct = _linha(endogamia, id_programa)
        saida.append({
            "sigla": sigla,
            "membros_projeto_exclusivos": proj_n,
            "membros_projeto_exclusivos_suprimido": proj_supr,
            "membros_projeto_total": proj_den,
            "pct_endogenia_projeto": proj_pct,
            "docentes_formados_no_programa": aca_n,
            "docentes_formados_no_programa_suprimido": aca_supr,
            "docentes_total": aca_den,
            "pct_endogamia_academica": aca_pct,
        })
    return saida


# ---------------------------------------------------------------------------
# 5b-bis. Coautoria docente + discente, por tipo de produção.
#
#   A participação em % responde "que fração da produção passa pela orientação";
#   esta tabela responde "orientação em quê" — e as duas perguntas não são a
#   mesma. Um programa pode ter metade da produção orientada e ela ser toda
#   recital, ou toda artigo.
# ---------------------------------------------------------------------------

def build_coautoria_docente_discente(con) -> list[dict]:
    rows = con.execute("""
        WITH marcadas AS (
            SELECT
                pr.id_producao,
                i.sigla,
                pr.tipo,
                pr.subtipo,
                MAX(CASE WHEN a.tipo_vinculo = 'Docente' THEN 1 ELSE 0 END) tem_docente,
                MAX(CASE WHEN a.tipo_vinculo IN ('Discente','Egresso') THEN 1 ELSE 0 END) tem_discente,
                COUNT(*) n_autores
            FROM producoes pr
            JOIN autoria a ON a.id_producao = pr.id_producao
            JOIN programas g ON g.id_programa = pr.id_programa
            JOIN instituicoes i ON i.id_ies = g.id_ies
            WHERE pr.ano_base IN (?,?,?,?)
            GROUP BY pr.id_producao, i.sigla, pr.tipo, pr.subtipo
        )
        SELECT
            sigla,
            tipo,
            subtipo,
            SUM(CASE WHEN tem_docente = 1 AND tem_discente = 1 THEN 1 ELSE 0 END) n_conjunta,
            SUM(CASE WHEN n_autores > 1 THEN 1 ELSE 0 END) n_coautoria,
            COUNT(*) n_total
        FROM marcadas
        GROUP BY sigla, tipo, subtipo
        HAVING n_total > 0
        ORDER BY sigla, n_conjunta DESC
    """, ANOS_QUADRIENIO).fetchall()
    return [dict(r) for r in rows]


# ---------------------------------------------------------------------------
# 5b-ter. Rede medida em OBRAS, por tipo de produção (cartograma).
#
#   Medida diferente da de `rede_programas` de propósito. Lá a aresta é
#   "pessoas em comum"; aqui é "obras em que os dois programas se tocam" — uma
#   coautoria do programa A que inclui alguém que também atua em B.
#
#   O motivo é prático e está documentado na tela: filtrar pessoas em comum por
#   tipo de produção derruba quase tudo abaixo do limiar de 5 (303 pares viram
#   16). Em obras sobram 333 pares publicáveis, e o filtro por tipo passa a
#   significar alguma coisa. As duas medidas convivem, cada uma rotulada.
#
#   Inclui o laço interno: coautorias em que todos os autores estão ligados só
#   àquele programa. É o que o cartograma desenha como link de volta ao nó.
# ---------------------------------------------------------------------------

N_CATEGORIAS = 8
OUTROS = "OUTROS"


def _categorias_principais(con) -> list[str]:
    """As N maiores por volume nacional no quadriênio, + OUTROS.

    Espelha `categoriasPrincipais()` do front; publicada no JSON para as duas
    pontas não divergirem em silêncio se o volume mudar.
    """
    rows = con.execute("""
        SELECT COALESCE(NULLIF(pr.subtipo, ''), pr.tipo) AS cat, COUNT(*) n
        FROM producoes pr
        WHERE pr.ano_base IN (?,?,?,?)
        GROUP BY cat ORDER BY n DESC
    """, ANOS_QUADRIENIO).fetchall()
    principais = [r["cat"] for r in rows[:N_CATEGORIAS]]
    return principais + [OUTROS] if len(rows) > N_CATEGORIAS else principais


def build_rede_obras_por_tipo(con) -> dict:
    categorias = _categorias_principais(con)

    def categoria(tipo, subtipo) -> str:
        c = subtipo or tipo
        return c if c in categorias else OUTROS

    programas_da_pessoa: dict[str, set] = {}
    for r in con.execute("""
        SELECT CAST(a.id_pessoa AS TEXT) AS pessoa, pr.id_programa AS prog
        FROM autoria a JOIN producoes pr ON pr.id_producao = a.id_producao
        WHERE a.id_pessoa IS NOT NULL
    """):
        programas_da_pessoa.setdefault(r["pessoa"], set()).add(r["prog"])

    sigla_de = {
        r["id_programa"]: r["sigla"]
        for r in con.execute("""
            SELECT p.id_programa, i.sigla FROM programas p
            JOIN instituicoes i ON i.id_ies = p.id_ies
        """)
    }

    autores: dict[tuple, list] = {}
    for r in con.execute("""
        SELECT pr.id_producao, pr.id_programa, pr.tipo, pr.subtipo, CAST(a.id_pessoa AS TEXT) AS pessoa
        FROM producoes pr JOIN autoria a ON a.id_producao = pr.id_producao
        WHERE pr.ano_base IN (?,?,?,?)
    """, ANOS_QUADRIENIO):
        chave = (r["id_producao"], r["id_programa"], categoria(r["tipo"], r["subtipo"]))
        autores.setdefault(chave, []).append(r["pessoa"])

    arestas: dict[tuple, int] = {}
    internas: dict[tuple, int] = {}
    volume: dict[tuple, int] = {}

    for (_, id_programa, cat), pessoas in autores.items():
        volume[(sigla_de[id_programa], cat)] = volume.get((sigla_de[id_programa], cat), 0) + 1
        if len(pessoas) < 2:
            continue
        outros = set()
        for p in pessoas:
            if p:
                outros |= programas_da_pessoa.get(p, set()) - {id_programa}
        if not outros:
            chave = (sigla_de[id_programa], cat)
            internas[chave] = internas.get(chave, 0) + 1
            continue
        for o in outros:
            par = tuple(sorted((sigla_de[id_programa], sigla_de[o])))
            arestas[(par[0], par[1], cat)] = arestas.get((par[0], par[1], cat), 0) + 1

    return {
        "categorias": categorias,
        "arestas": [
            {"a": a, "b": b, "categoria": c, "n": suppress_count(n)["value"],
             "suppressed": suppress_count(n)["suppressed"]}
            for (a, b, c), n in sorted(arestas.items(), key=lambda kv: -kv[1])
        ],
        "internas": [
            {"sigla": s, "categoria": c, "n": suppress_count(n)["value"],
             "suppressed": suppress_count(n)["suppressed"]}
            for (s, c), n in sorted(internas.items(), key=lambda kv: -kv[1])
        ],
        "volume": [
            {"sigla": s, "categoria": c, "n": n}
            for (s, c), n in sorted(volume.items(), key=lambda kv: -kv[1])
        ],
    }


# ---------------------------------------------------------------------------
# 5c. Rede entre regiões — a diagonal (intra-região) é o ponto da figura.
# ---------------------------------------------------------------------------

def build_rede_ufs(con) -> list[dict]:
    """Mesma coisa da matriz de regiões, um nível abaixo.

    A diagonal só tem valor onde há mais de um PPGMus no estado (SP, MG, PR e
    RJ). Nos demais ela é vazia por construção, não por falta de colaboração —
    a tela precisa dizer isso.
    """
    return _rede_por_recorte(con, "uf")


def build_rede_regioes(con) -> list[dict]:
    return _rede_por_recorte(con, "regiao")


def _rede_por_recorte(con, coluna: str) -> list[dict]:
    # `coluna` é escolhida por este módulo, nunca por entrada externa — as duas
    # únicas chamadas passam literais.
    assert coluna in ("uf", "regiao")
    rows = con.execute(f"""
        WITH pp AS (
            SELECT DISTINCT a.id_pessoa, pr.id_programa
            FROM autoria a JOIN producoes pr ON pr.id_producao = a.id_producao
            WHERE pr.ano_base IN (?,?,?,?,?,?)
        )
        SELECT i1.{coluna} AS ra, i2.{coluna} AS rb, COUNT(*) AS n
        FROM pp x
        JOIN pp y ON y.id_pessoa = x.id_pessoa AND y.id_programa > x.id_programa
        JOIN programas g1 ON g1.id_programa = x.id_programa
        JOIN programas g2 ON g2.id_programa = y.id_programa
        JOIN instituicoes i1 ON i1.id_ies = g1.id_ies
        JOIN instituicoes i2 ON i2.id_ies = g2.id_ies
        GROUP BY i1.{coluna}, i2.{coluna}
    """, ANOS_TODOS).fetchall()

    # Soma os dois sentidos: o par (Sul, Sudeste) e (Sudeste, Sul) são a mesma
    # relação, e a query só produz um deles dependendo do id.
    par: dict[tuple, int] = {}
    for r in rows:
        chave = tuple(sorted((r["ra"], r["rb"])))
        par[chave] = par.get(chave, 0) + r["n"]

    return [
        {"a": a, "b": b, "n": suppress_count(n)["value"], "suppressed": suppress_count(n)["suppressed"]}
        for (a, b), n in sorted(par.items(), key=lambda kv: -kv[1])
    ]


# ---------------------------------------------------------------------------
# 5d. Comparabilidade de volume (§4.1a): núcleo comparável, títulos
#     administrativos e índice de granularidade de registro.
#
#     Responde à pergunta que o total bruto não responde: quanto do volume de um
#     programa é obra de pesquisa ou criação, e quanto é registro de atividade.
#     A regra de classificação mora em analise/nucleo.py — aqui só se aplica.
# ---------------------------------------------------------------------------

def _mediana(valores: list[float]) -> "float | None":
    v = sorted(x for x in valores if x is not None)
    if not v:
        return None
    meio = len(v) // 2
    return v[meio] if len(v) % 2 else (v[meio - 1] + v[meio]) / 2


def build_comparabilidade(con) -> dict:
    # Começa com os 20 programas zerados: um programa sem produção no quadriênio
    # (UFG, em implantação) tem de aparecer como zero declarado, não sumir da
    # tabela como se não tivesse sido medido.
    linhas = {
        r["sigla"]: {k: 0 for k in ("total", "administrativos", *CLASSES)}
        for r in con.execute("""
            SELECT i.sigla FROM programas p JOIN instituicoes i ON i.id_ies = p.id_ies
        """)
    }
    for r in con.execute("""
        SELECT i.sigla, pr.tipo, pr.subtipo, pr.nome
        FROM producoes pr
        JOIN programas p ON p.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = p.id_ies
        WHERE pr.ano_base IN (?,?,?,?)
    """, ANOS_QUADRIENIO):
        c = linhas[r["sigla"]]
        c["total"] += 1
        c[classe_da_rubrica(r["tipo"], r["subtipo"])] += 1
        if e_administrativo(r["nome"], r["tipo"], r["subtipo"]):
            c["administrativos"] += 1

    # Docentes = quem aparece como autor com vínculo Docente no quadriênio. Não é
    # o quadro credenciado: quem não publicou não está aqui, e isso puxa a taxa
    # para cima. Mesmo denominador do heatmap normalizado, de propósito.
    docentes = {
        r["sigla"]: r["n"]
        for r in con.execute("""
            SELECT i.sigla, COUNT(DISTINCT CAST(a.id_pessoa AS TEXT)) n
            FROM autoria a
            JOIN producoes pr ON pr.id_producao = a.id_producao
            JOIN programas g ON g.id_programa = pr.id_programa
            JOIN instituicoes i ON i.id_ies = g.id_ies
            WHERE pr.ano_base IN (?,?,?,?) AND a.tipo_vinculo = 'Docente'
            GROUP BY i.sigla
        """, ANOS_QUADRIENIO)
    }

    programas = []
    for sigla, c in linhas.items():
        n_doc = suppress_count(docentes.get(sigla, 0))["value"]
        por_doc = round(c["total"] / n_doc, 2) if n_doc else None
        por_doc_nucleo = round(c[NUCLEO] / n_doc, 2) if n_doc else None
        programas.append({
            "sigla": sigla,
            "total": c["total"],
            **{f"n_{k}": c[k] for k in CLASSES},
            "administrativos": c["administrativos"],
            "n_docentes": n_doc,
            "pct_nucleo": safe_percent(c[NUCLEO], c["total"]),
            "por_docente": por_doc,
            "por_docente_nucleo": por_doc_nucleo,
        })

    # Índice de granularidade: produções por docente ÷ mediana nacional. Fica ao
    # lado do volume porque é o aviso que falta em toda barra de tamanho —
    # 2,0 significa "registra o dobro por docente", não "produz o dobro".
    mediana_total = _mediana([p["por_docente"] for p in programas])
    mediana_nucleo = _mediana([p["por_docente_nucleo"] for p in programas])
    for p in programas:
        p["granularidade"] = (
            round(p["por_docente"] / mediana_total, 2)
            if p["por_docente"] and mediana_total else None
        )
        p["granularidade_nucleo"] = (
            round(p["por_docente_nucleo"] / mediana_nucleo, 2)
            if p["por_docente_nucleo"] and mediana_nucleo else None
        )

    programas.sort(key=lambda p: -p["total"])

    return {
        "periodo": [ANOS_QUADRIENIO[0], ANOS_QUADRIENIO[-1]],
        "classes": [
            {"chave": c, "rotulo": ROTULO_CLASSE[c], "descricao": DESCRICAO_CLASSE[c]}
            for c in CLASSES
        ],
        "rubricas": [
            {"tipo": t, "subtipo": s, "classe": k}
            for (t, s), k in sorted(CLASSE_POR_RUBRICA.items())
        ],
        "mediana_por_docente": mediana_total,
        "mediana_por_docente_nucleo": mediana_nucleo,
        "programas": programas,
    }


# ---------------------------------------------------------------------------
# 5e. Concentração da produção entre os docentes (§4.1b.1)
#
#     Responde: um programa concentra a produção em poucos docentes? E ele é
#     especializado num tipo só?
#
#     Esta é a medida mais perigosa do ponto de vista de privacidade em todo o
#     site, e o desenho gira em torno disso. Curva de Lorenz com um ponto por
#     pessoa **é** dado individual: num programa de 11 docentes, o último degrau
#     da curva é o maior produtor, com nome recuperável por quem conhece a área.
#     Por isso cada ponto da curva agrega **pelo menos 5 pessoas** (o mesmo k do
#     §3.2), e programa com menos de 10 docentes-autores não ganha curva nenhuma.
#     Máximo, decil superior e lista ordenada não saem daqui em hipótese alguma.
# ---------------------------------------------------------------------------

def _gini(valores: list[int]) -> "float | None":
    """Gini de uma distribuição não negativa. Agregado por construção."""
    v = sorted(valores)
    n = len(v)
    total = sum(v)
    if n == 0 or total == 0:
        return None
    soma_ponderada = sum((i + 1) * x for i, x in enumerate(v))
    return round((2 * soma_ponderada) / (n * total) - (n + 1) / n, 3)


def _quantil(valores_ordenados: list[int], q: float) -> "float | None":
    if not valores_ordenados:
        return None
    pos = q * (len(valores_ordenados) - 1)
    baixo = int(pos)
    alto = min(baixo + 1, len(valores_ordenados) - 1)
    peso = pos - baixo
    return round(valores_ordenados[baixo] * (1 - peso) + valores_ordenados[alto] * peso, 1)


# Blocos da curva de Lorenz: mais que isso não se lê num gráfico pequeno. (Até
# 2026-09-18 havia também um mínimo de 5 pessoas por bloco, por privacidade; foi
# retirado com a supressão de células pequenas.)
LORENZ_MAX_BLOCOS = 10
# Menos que isso e os quartis não descrevem nada: é limite estatístico, não de
# privacidade (o de privacidade era 2 × 5 = 10, retirado em 2026-09-18).
MIN_PESSOAS_QUARTIS = 4


def _lorenz_agregada(valores: list[int]) -> "list[dict] | None":
    """Curva de Lorenz em até LORENZ_MAX_BLOCOS blocos de pessoas.

    Devolve None quando não há como traçar uma curva: menos de duas pessoas, ou
    produção total zero.
    """
    v = sorted(valores)
    n = len(v)
    total = sum(v)
    blocos = min(n, LORENZ_MAX_BLOCOS)
    if blocos < 2 or total == 0:
        return None

    pontos = [{"pop": 0.0, "producao": 0.0, "n_pessoas": 0}]
    acumulado = 0
    inicio = 0
    for b in range(blocos):
        fim = round((b + 1) * n / blocos)
        acumulado += sum(v[inicio:fim])
        pontos.append({
            "pop": round(fim / n, 3),
            "producao": round(acumulado / total, 3),
            "n_pessoas": fim - inicio,
        })
        inicio = fim
    return pontos


def build_concentracao(con) -> dict:
    por_programa: dict[str, list[int]] = {}
    for r in con.execute("""
        SELECT i.sigla, COUNT(DISTINCT pr.id_producao) AS n
        FROM autoria a
        JOIN producoes pr ON pr.id_producao = a.id_producao
        JOIN programas g ON g.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = g.id_ies
        WHERE pr.ano_base IN (?,?,?,?)
          AND a.tipo_vinculo = 'Docente' AND a.id_pessoa IS NOT NULL
        GROUP BY i.sigla, CAST(a.id_pessoa AS TEXT)
    """, ANOS_QUADRIENIO):
        por_programa.setdefault(r["sigla"], []).append(r["n"])

    # Especialização: HHI sobre a participação de cada rubrica no programa.
    # 1/HHI é o "número efetivo de tipos" — quantos tipos o programa teria se
    # publicasse igualmente em todos eles. Não toca em pessoa nenhuma.
    tipos: dict[str, dict[str, int]] = {}
    for r in con.execute("""
        SELECT i.sigla, COALESCE(NULLIF(pr.subtipo, ''), pr.tipo) AS cat, COUNT(*) n
        FROM producoes pr
        JOIN programas g ON g.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = g.id_ies
        WHERE pr.ano_base IN (?,?,?,?)
        GROUP BY i.sigla, cat
    """, ANOS_QUADRIENIO):
        tipos.setdefault(r["sigla"], {})[r["cat"]] = r["n"]

    saida = []
    for sigla, valores in sorted(por_programa.items()):
        v = sorted(valores)
        n = len(v)
        cats = tipos.get(sigla, {})
        total_cat = sum(cats.values())
        hhi = sum((x / total_cat) ** 2 for x in cats.values()) if total_cat else None

        linha = {
            "sigla": sigla,
            "n_docentes": suppress_count(n)["value"],
            "producoes": sum(v),
            "gini": _gini(v),
            "lorenz": _lorenz_agregada(v),
            "tipos_efetivos": round(1 / hhi, 1) if hhi else None,
            "n_tipos": len(cats),
        }
        # Mediana e IQR só com gente suficiente para o quartil querer dizer algo.
        if n >= MIN_PESSOAS_QUARTIS:
            linha.update({
                "mediana": _quantil(v, 0.5),
                "p25": _quantil(v, 0.25),
                "p75": _quantil(v, 0.75),
            })
        else:
            linha.update({"mediana": None, "p25": None, "p75": None})
        saida.append(linha)

    return {
        "periodo": [ANOS_QUADRIENIO[0], ANOS_QUADRIENIO[-1]],
        "programas": saida,
    }


# ---------------------------------------------------------------------------
# 5f. Projetos e financiamento (§4.1b.2 e §4.1b.3)
#
#     Duas perguntas de uma vez: quanto da produção está amarrada a um projeto
#     (que é indicador de preenchimento antes de ser de pesquisa), e de onde vem
#     o dinheiro.
#
#     Privacidade (§3.2): agência é agregada **por esfera** dentro do programa e
#     **por agência** no país. O par projeto↔agência não sai daqui, e nome de
#     projeto não existe em lugar nenhum do pacote público.
#
#     Armadilha do modelo: `projetos` NÃO tem id_programa — o vínculo está em
#     `projeto_ano`. SQL ingênuo erra aqui, e erra em silêncio.
# ---------------------------------------------------------------------------

def build_ciclo_vida(con, programa_do_projeto: dict) -> dict:
    """Composição dos projetos por categoria de ciclo de vida (PLANO §4.4.1).

    A regra mora em `analise/ciclo_vida.py`; aqui só se conta. Sem supressão de
    célula pequena (política de 2026-09-18): as contagens saem como são.
    """
    projetos = ciclo_vida.carregar_con(con)
    por_id, limiar = ciclo_vida.classificar(projetos)
    assert set(por_id) == set(programa_do_projeto), \
        "todo projeto precisa ter programa (via projeto_ano) e classe"

    categoria_de = {
        pid: ciclo_vida.categoria(v["classe"], v["janela"]) for pid, v in por_id.items()
    }

    def contar(ids):
        c = dict.fromkeys(ciclo_vida.CATEGORIAS, 0)
        for pid in ids:
            c[categoria_de[pid]] += 1
        return c

    programas = []
    primeira_por_programa = []
    for sigla in sorted(set(programa_do_projeto.values())):
        ids = {p for p, s in programa_do_projeto.items() if s == sigla}
        programas.append({
            "sigla": sigla,
            "n_projetos": len(ids),
            "categorias": contar(ids),
        })
        primeira_por_programa.append({
            "sigla": sigla,
            **ciclo_vida.curva_primeira_obra([p for p in projetos if p["id_projeto"] in ids]),
        })

    return {
        "janela": [ciclo_vida.JANELA_INICIO, ciclo_vida.ANO_REF],
        "limiar_prolifico": round(limiar, 1),
        "categorias": [
            {
                "chave": c,
                "rotulo": ciclo_vida.ROTULO_CATEGORIA[c],
                "descricao": ciclo_vida.DESCRICAO_CATEGORIA[c],
            }
            for c in ciclo_vida.CATEGORIAS
        ],
        "nacional": contar(por_id),
        "programas": programas,
        # Tempo até a primeira obra (Kaplan-Meier), só projetos iniciados na janela.
        "primeira_obra": {
            "nacional": ciclo_vida.curva_primeira_obra(projetos),
            "programas": primeira_por_programa,
        },
    }


def build_ciclo_vida_projetos(con, repo_root: Path) -> "dict | None":
    """Uma linha por projeto para o Gantt (PLANO §4.4.2): título, datas, situação,
    categoria de ciclo de vida e obras por ano (os "ticks" da barra).

    Transparência total (decisão do usuário, 2026-09-18): título de todo projeto é
    público. Chaveado por id substituto (nunca `id_projeto` real). Arquivo à parte
    e sob demanda (~250 KB), para o capítulo `/projetos` não pagar por ele no mount.
    """
    id_map = _mapa_projetos(repo_root)
    if id_map is None:
        return None
    programa_do_projeto = _programas_dos_projetos(con)
    projetos = ciclo_vida.carregar_con(con)
    por_id, _ = ciclo_vida.classificar(projetos)
    nome = {r["id_projeto"]: r["nome"] for r in con.execute("SELECT id_projeto, nome FROM projetos")}

    obras: dict[str, dict[str, int]] = {}
    for r in con.execute("""
        SELECT id_projeto, ano_base, COUNT(*) n FROM (
          SELECT id_projeto, ano_base FROM producoes WHERE id_projeto IS NOT NULL
          UNION ALL
          SELECT id_projeto, ano_base FROM teses WHERE id_projeto IS NOT NULL
        ) GROUP BY id_projeto, ano_base
    """):
        obras.setdefault(r["id_projeto"], {})[str(r["ano_base"])] = r["n"]

    linhas = []
    for p in projetos:
        pid = p["id_projeto"]
        v = por_id[pid]
        linhas.append({
            "id": id_map[pid],
            "sigla": programa_do_projeto[pid],
            "titulo": nome.get(pid),
            "inicio": (p["inicio"] or "")[:10] or None,
            "fim": (p["fim"] or "")[:10] or None,
            "situacao": p["situacao"],
            "categoria": ciclo_vida.categoria(v["classe"], v["janela"]),
            "obras": obras.get(pid, {}),
        })
    linhas.sort(key=lambda x: (x["sigla"], x["inicio"] or "", x["titulo"] or ""))
    return {
        "janela": [ciclo_vida.JANELA_INICIO, ciclo_vida.ANO_REF],
        "projetos": linhas,
    }


# Faixas de produções por projeto, em escala logarítmica (a cauda é pesada: em faixas
# lineares tudo cairia na primeira barra). O zero fica à parte, e é uma barra como as outras.
FAIXAS_PRODUCOES = (
    ("0", 0), ("1", 1), ("2", 2), ("3–4", 4), ("5–9", 9),
    ("10–19", 19), ("20–49", 49), ("50–99", 99), ("100+", float("inf")),
)


def _programas_dos_projetos(con) -> dict:
    """id_projeto -> sigla do programa (via `projeto_ano`; `projetos` não tem id_programa)."""
    programa_do_projeto = {}
    for r in con.execute("""
        SELECT DISTINCT pa.id_projeto, i.sigla
        FROM projeto_ano pa
        JOIN programas g ON g.id_programa = pa.id_programa
        JOIN instituicoes i ON i.id_ies = g.id_ies
        WHERE pa.id_programa IS NOT NULL
    """):
        # Um projeto pode aparecer em várias abas do mesmo programa; a primeira
        # sigla basta, porque a coleta é por programa e não há projeto
        # compartilhado entre dois.
        programa_do_projeto.setdefault(r["id_projeto"], r["sigla"])
    return programa_do_projeto


def build_projetos(con) -> dict:
    programa_do_projeto = _programas_dos_projetos(con)

    esferas_do_projeto: dict[str, set] = {}
    agencias_do_projeto: dict[str, set] = {}
    for r in con.execute("SELECT id_projeto, agencia FROM projeto_financiador"):
        sigla, esfera = identificar_agencia(r["agencia"])
        esferas_do_projeto.setdefault(r["id_projeto"], set()).add(esfera)
        agencias_do_projeto.setdefault(r["id_projeto"], set()).add(sigla)

    producoes_do_projeto: dict[str, int] = {}
    for r in con.execute("""
        SELECT id_projeto, COUNT(*) n FROM producoes
        WHERE id_projeto IS NOT NULL GROUP BY id_projeto
    """):
        producoes_do_projeto[r["id_projeto"]] = r["n"]

    natureza = {
        r["id_projeto"]: r["natureza"]
        for r in con.execute("SELECT id_projeto, natureza FROM projetos")
    }

    # --- por programa ------------------------------------------------------
    por_programa: dict[str, dict] = {}
    for r in con.execute("""
        SELECT i.sigla FROM programas p JOIN instituicoes i ON i.id_ies = p.id_ies
    """):
        por_programa[r["sigla"]] = {
            "sigla": r["sigla"],
            "n_projetos": 0,
            "n_financiados": 0,
            "n_orfaos": 0,
            "producoes_de_projetos": 0,
            **{f"esfera_{e}": 0 for e in ESFERAS_FOMENTO},
        }

    for id_projeto, sigla in programa_do_projeto.items():
        c = por_programa.get(sigla)
        if c is None:
            continue
        c["n_projetos"] += 1
        esferas = esferas_do_projeto.get(id_projeto, set())
        if esferas:
            c["n_financiados"] += 1
            # Projeto com duas agências conta nas duas esferas: são fontes
            # distintas, e somar esferas não é para dar o total de projetos.
            for e in esferas:
                c[f"esfera_{e}"] += 1
        n_prod = producoes_do_projeto.get(id_projeto, 0)
        c["producoes_de_projetos"] += n_prod
        if n_prod == 0:
            c["n_orfaos"] += 1

    # Produção vinculada a projeto, por programa: a taxa é de preenchimento
    # antes de ser de pesquisa, e é assim que a tela a apresenta.
    vinculo = {
        r["sigla"]: (r["com_projeto"], r["total"])
        for r in con.execute("""
            SELECT i.sigla,
                   SUM(CASE WHEN pr.id_projeto IS NOT NULL THEN 1 ELSE 0 END) com_projeto,
                   COUNT(*) total
            FROM producoes pr
            JOIN programas g ON g.id_programa = pr.id_programa
            JOIN instituicoes i ON i.id_ies = g.id_ies
            WHERE pr.ano_base IN (?,?,?,?)
            GROUP BY i.sigla
        """, ANOS_QUADRIENIO)
    }

    saida_programas = []
    for sigla, c in sorted(por_programa.items()):
        com_projeto, total = vinculo.get(sigla, (0, 0))
        linha = dict(c)
        linha["pct_financiados"] = safe_percent(c["n_financiados"], c["n_projetos"])
        linha["pct_orfaos"] = safe_percent(c["n_orfaos"], c["n_projetos"])
        linha["pct_producao_com_projeto"] = safe_percent(com_projeto, total)
        linha["producoes_quadrienio"] = total
        # Contagem por esfera é célula pequena: suprime abaixo do limiar.
        for e in ESFERAS_FOMENTO:
            linha[f"esfera_{e}"] = suppress_count(c[f"esfera_{e}"])["value"]
        saida_programas.append(linha)

    # --- nacional ----------------------------------------------------------
    projetos_por_agencia: dict[str, int] = {}
    for id_projeto, siglas in agencias_do_projeto.items():
        for s in siglas:
            projetos_por_agencia[s] = projetos_por_agencia.get(s, 0) + 1

    esfera_de = {}
    for _, sigla, esfera in AGENCIAS_FOMENTO:
        esfera_de[sigla] = esfera

    # Toda agência identificada aparece, sempre — nunca agrupada num balde
    # anônimo tipo "outras N agências" (isso jogava fora justamente a
    # informação que a lista existe para mostrar: quem financia, mesmo que
    # pouco). O que precisa de supressão é a CONTAGEM: um financiamento único
    # e exótico é quase uma assinatura de quem o recebeu, então agência com
    # menos de 5 projetos mantém o nome e some só o número (mesmo padrão de
    # `suppress_count` usado em qualquer outra contagem de indivíduos/projeto
    # pequena demais no site).
    agencias_publicaveis = [
        {
            "agencia": sigla,
            "esfera": esfera_de.get(sigla, "outra"),
            "n_projetos": suppress_count(n)["value"],
        }
        for sigla, n in sorted(projetos_por_agencia.items(), key=lambda kv: -kv[1])
    ]

    distribuicao = {}
    for id_projeto in programa_do_projeto:
        n = producoes_do_projeto.get(id_projeto, 0)
        faixa = next(f for f, teto in FAIXAS_PRODUCOES if n <= teto)
        distribuicao[faixa] = distribuicao.get(faixa, 0) + 1

    contagens = sorted(producoes_do_projeto.get(p, 0) for p in programa_do_projeto)
    com_producao = [n for n in contagens if n > 0]

    def _mediana(v):
        return None if not v else (v[len(v) // 2] if len(v) % 2 else (v[len(v) // 2 - 1] + v[len(v) // 2]) / 2)

    naturezas: dict[str, int] = {}
    for id_projeto in programa_do_projeto:
        chave = (natureza.get(id_projeto) or "NÃO INFORMADA").title()
        naturezas[chave] = naturezas.get(chave, 0) + 1

    return {
        "periodo": [ANOS_QUADRIENIO[0], ANOS_QUADRIENIO[-1]],
        "esferas": [{"chave": e, "rotulo": ROTULO_ESFERA_FOMENTO[e]} for e in ESFERAS_FOMENTO],
        "programas": saida_programas,
        "agencias": agencias_publicaveis,
        "distribuicao_producoes": [
            {"faixa": f, "n_projetos": distribuicao.get(f, 0)} for f, _ in FAIXAS_PRODUCOES
        ],
        # Cauda pesada: a mediana, não a média, é o que se reporta.
        "producoes_por_projeto": {
            "mediana": _mediana(contagens),
            "mediana_entre_os_com_producao": _mediana(com_producao),
            "maximo": contagens[-1] if contagens else None,
        },
        "naturezas": [
            {"natureza": k, "n": v} for k, v in sorted(naturezas.items(), key=lambda kv: -kv[1])
        ],
        "n_projetos": len(programa_do_projeto),
        "n_financiados": sum(1 for p in programa_do_projeto if p in agencias_do_projeto),
        "ciclo_vida": build_ciclo_vida(con, programa_do_projeto),
    }


# ---------------------------------------------------------------------------
# 6. Distribuição de notas: Música vs. ARTES vs. Brasil (Página 8)
# ---------------------------------------------------------------------------

def build_distribuicao_notas(con) -> dict:
    def _dist(where_clause, params=()):
        rows = con.execute(f"""
            SELECT nota_final, COUNT(*) n
            FROM avaliacao_quadrienal_2025
            WHERE nota_final IS NOT NULL AND {where_clause}
            GROUP BY nota_final ORDER BY nota_final
        """, params).fetchall()
        return {str(r["nota_final"]): r["n"] for r in rows}

    return {
        "musica": _dist("area_avaliacao = 'ARTES' AND id_programa IS NOT NULL"),
        "artes": _dist("area_avaliacao = 'ARTES'"),
        "brasil": _dist("1=1"),
    }


# ---------------------------------------------------------------------------
# 7. Internacionalização agregada (Página 1 / Página 8)
# ---------------------------------------------------------------------------

def build_internacionalizacao(con) -> dict:
    """Internacionalização por programa, com os dois campos normalizados.

    O que mudou em 2026-08-06, e por quê: a versão anterior filtrava com
    `lower(valor) NOT IN ('brasil','brazil','')` e `NOT IN ('português', …)`,
    contando como internacional tudo o que não fosse essas palavras — inclusive
    `Online`, `Porto Alegre` e `x` no campo de país e, pior, `Idioma Nacional`,
    que é a categoria da Plataforma para português e responde por 1.255
    registros. As regras agora moram em `analise/paises.py` e
    `analise/idiomas.py`, com autoteste, e "não dá para saber" sai do
    denominador em vez de virar um dos dois lados.
    """
    detalhe: dict[str, dict] = {}
    for r in con.execute("""
        SELECT i.sigla, pr.id_producao, d.item, d.valor
        FROM producoes pr
        JOIN programas g ON g.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = g.id_ies
        JOIN producao_detalhe d ON d.id_producao = pr.id_producao
        WHERE pr.ano_base IN (?,?,?,?) AND d.item IN ('(PAC) País','Idioma')
    """, ANOS_QUADRIENIO):
        alvo = detalhe.setdefault(r["sigla"], {"pais": {}, "idioma": {}})
        chave = "pais" if r["item"] == "(PAC) País" else "idioma"
        atual = (
            pais_internacional(r["valor"]) if chave == "pais"
            else idioma_estrangeiro(r["valor"])
        )
        # Uma produção pode ter o campo repetido; qualquer sinal de estrangeiro
        # basta para a obra contar como internacional.
        anterior = alvo[chave].get(r["id_producao"])
        alvo[chave][r["id_producao"]] = atual if anterior is None else (anterior or atual)

    totais = {
        r["sigla"]: r["n"]
        for r in con.execute("""
            SELECT i.sigla, COUNT(*) n FROM producoes pr
            JOIN programas g ON g.id_programa = pr.id_programa
            JOIN instituicoes i ON i.id_ies = g.id_ies
            WHERE pr.ano_base IN (?,?,?,?) GROUP BY i.sigla
        """, ANOS_QUADRIENIO)
    }

    programas = []
    for sigla in sorted(totais):
        d = detalhe.get(sigla, {"pais": {}, "idioma": {}})
        com_pais = [v for v in d["pais"].values() if v is not None]
        com_idioma = [v for v in d["idioma"].values() if v is not None]
        programas.append({
            "sigla": sigla,
            "pct_intl_pais": safe_percent(sum(com_pais), len(com_pais)),
            "n_com_pais": len(com_pais),
            "pct_intl_idioma": safe_percent(sum(com_idioma), len(com_idioma)),
            "n_com_idioma": len(com_idioma),
            # Cobertura junto: sem ela, "0% internacional" e "campo vazio" se
            # confundem, e os dois existem na base.
            "cobertura_pais": safe_percent(len(com_pais), totais[sigla]),
            "cobertura_idioma": safe_percent(len(com_idioma), totais[sigla]),
            "n_total": totais[sigla],
        })

    # Ranking nacional de países, sem o Brasil. País com menos de 5 obras vira
    # "outros": um país exótico é quase uma assinatura de quem esteve lá.
    contagem: dict[str, set] = {}
    for r in con.execute("""
        SELECT pr.id_producao, d.valor FROM producoes pr
        JOIN producao_detalhe d ON d.id_producao = pr.id_producao
        WHERE pr.ano_base IN (?,?,?,?) AND d.item = '(PAC) País'
    """, ANOS_QUADRIENIO):
        for pais in listar_paises(r["valor"]):
            contagem.setdefault(pais, set()).add(r["id_producao"])

    # Todo país aparece, com a contagem que tem. (Até 2026-09-18, país com menos
    # de 5 obras era agrupado em "Outros N países".)
    ranking = [
        {"pais": pais, "n_obras": len(obras)}
        for pais, obras in sorted(contagem.items(), key=lambda kv: -len(kv[1]))
        if pais != PAIS_BRASIL
    ]

    # Participação externa declarada pelo próprio programa: o sinal mais direto
    # de gente de fora dos 20, e o único que não depende de campo livre.
    externos = [
        dict(r) for r in con.execute("""
            SELECT pr.ano_base, a.tipo_vinculo,
                   COUNT(DISTINCT pr.id_producao) n_obras,
                   COUNT(DISTINCT CAST(a.id_pessoa AS TEXT)) n_pessoas
            FROM autoria a
            JOIN producoes pr ON pr.id_producao = a.id_producao
            WHERE pr.ano_base IN (?,?,?,?)
              AND a.tipo_vinculo IN ('Participante externo','Sem vínculo')
            GROUP BY pr.ano_base, a.tipo_vinculo
            ORDER BY pr.ano_base
        """, ANOS_QUADRIENIO)
    ]

    return {
        "periodo": [ANOS_QUADRIENIO[0], ANOS_QUADRIENIO[-1]],
        "programas": programas,
        "paises": ranking,
        "n_paises_distintos": len([p for p in contagem if p != PAIS_BRASIL]),
        "externos_por_ano": externos,
    }


# ---------------------------------------------------------------------------
# 8. Cobertura da base, falhas e lacunas (§4.1.11 — apêndice de dados)
#
#    Tudo lido do banco e dos CSVs de falha, para o apêndice não virar prosa
#    fixa que envelhece em silêncio quando a base muda.
# ---------------------------------------------------------------------------

def build_cobertura(con, repo_root: Path) -> dict:
    def escalar(sql, params=()):
        return con.execute(sql, params).fetchone()[0]

    tabelas = [
        ("programas", "Programas de pós-graduação"),
        ("instituicoes", "Instituições"),
        ("producoes", "Produções"),
        ("producao_detalhe", "Campos de detalhe de produção"),
        ("autoria", "Vínculos autor↔produção"),
        ("pessoas", "Pessoas"),
        ("projetos", "Projetos de pesquisa"),
        ("projeto_financiador", "Registros de financiamento"),
        ("teses", "Teses e dissertações"),
        ("disciplinas", "Disciplinas"),
    ]
    contagens = [
        {"tabela": t, "rotulo": r, "n": escalar(f"SELECT COUNT(*) FROM {t}")}
        for t, r in tabelas
    ]

    anos = con.execute(
        "SELECT MIN(ano_base), MAX(ano_base) FROM producoes WHERE ano_base IS NOT NULL"
    ).fetchone()

    # Falhas: só o agregado por motivo. Os CSVs têm id de programa e URL com
    # identificador — nada disso sai daqui.
    falhas = []
    for arquivo, rotulo in (
        ("_falhas.csv", "coleção"),
        ("_falhas_producoes.csv", "detalhe de produção"),
    ):
        caminho = repo_root / "sucupira_dados" / "csv" / arquivo
        if not caminho.exists():
            continue
        import csv as _csv

        with open(caminho, encoding="utf-8") as f:
            linhas = list(_csv.DictReader(f))
        por_motivo: dict[str, int] = {}
        for linha in linhas:
            motivo = (linha.get("motivo") or "sem motivo").strip()
            por_motivo[motivo] = por_motivo.get(motivo, 0) + 1
        falhas.append({
            "arquivo": arquivo,
            "etapa": rotulo,
            "n": len(linhas),
            "por_motivo": [
                {"motivo": m, "n": n} for m, n in sorted(por_motivo.items(), key=lambda kv: -kv[1])
            ],
        })

    campos = []
    total_prod = escalar("SELECT COUNT(*) FROM producoes")
    for item, rotulo in (("Idioma", "Idioma"), ("(PAC) País", "País de realização")):
        n = escalar(
            "SELECT COUNT(DISTINCT id_producao) FROM producao_detalhe WHERE item = ?", (item,)
        )
        campos.append({"campo": rotulo, "n": n, "pct": safe_percent(n, total_prod)})
    com_projeto = escalar("SELECT COUNT(*) FROM producoes WHERE id_projeto IS NOT NULL")
    campos.append({
        "campo": "Vínculo com projeto",
        "n": com_projeto,
        "pct": safe_percent(com_projeto, total_prod),
    })

    # Obras reportadas por mais de um programa: risco de dupla contagem em
    # qualquer total nacional, e por isso os totais nacionais são deduplicados.
    duplicadas = escalar("""
        SELECT COUNT(*) FROM (
            SELECT lower(trim(nome)) t, ano_base
            FROM producoes WHERE nome IS NOT NULL
            GROUP BY t, ano_base HAVING COUNT(DISTINCT id_programa) > 1
        )
    """)

    # A lacuna de cobertura, lida da planilha oficial: programas de Música (ou de
    # prática musical) avaliados em 2025 e ausentes da base — todos profissionais.
    fora = [
        dict(r) for r in con.execute("""
            SELECT codigo_programa, nome_programa, sigla_ies, nivel, nota_final
            FROM avaliacao_quadrienal_2025
            WHERE area_avaliacao = 'ARTES' AND na_base = 0
              AND (upper(nome_programa) LIKE '%MÚSIC%' OR upper(nome_programa) LIKE '%MUSIC%')
            ORDER BY sigla_ies
        """)
    ]

    # Recorte comparável em nível nacional, para o apêndice repetir o número que
    # o capítulo de regimes mostra por programa.
    por_classe: dict[str, int] = {c: 0 for c in CLASSES}
    n_admin = 0
    for r in con.execute("SELECT nome, tipo, subtipo FROM producoes WHERE ano_base IN (?,?,?,?)", ANOS_QUADRIENIO):
        por_classe[classe_da_rubrica(r["tipo"], r["subtipo"])] += 1
        if e_administrativo(r["nome"], r["tipo"], r["subtipo"]):
            n_admin += 1

    return {
        "contagens": contagens,
        "anos": {"primeiro": anos[0], "ultimo": anos[1]},
        "falhas": falhas,
        "campos": campos,
        "obras_em_mais_de_um_programa": duplicadas,
        "fora_da_base": fora,
        "quadrienio": {
            "periodo": [ANOS_QUADRIENIO[0], ANOS_QUADRIENIO[-1]],
            "por_classe": [
                {"chave": c, "rotulo": ROTULO_CLASSE[c], "n": por_classe[c]} for c in CLASSES
            ],
            "administrativos": n_admin,
        },
    }


# ---------------------------------------------------------------------------
# 7. Atlas de projetos: clustering por assunto (§4.2.2 / Fase 3).
#
#    Lê derivados/clusters.parquet, escrito por `analise/clustering.py`
#    (venv próprio: sentence-transformers, umap-learn, hdbscan — fora do
#    caminho de reprodução da base). Se o clustering ainda não rodou, o
#    arquivo não existe e esta função devolve None — main() avisa e pula o
#    JSON, do mesmo jeito que já faz para indices.parquet.
#
#    Privacidade (decisão 1, PLANO §5, 2026-08-08): id_projeto real nunca sai
#    daqui — cada projeto ganha um id substituto, persistido em
#    derivados/id_map_projetos.json (fora do git) para ficar estável entre
#    builds. Título do projeto: até 2026-09-18 só saía para clusters com pelo
#    menos 10 projetos (cluster pequeno + título identifica quase tanto quanto
#    título + coordenador). Decisão do usuário em 2026-09-18: **não restringir
#    mais** — o título de qualquer projeto pode aparecer. O limiar continua
#    parâmetro (LIMIAR_TITULO_PUBLICO), agora em 1, para poder ser reinstalado
#    sem reescrever a lógica. Nomes de membros continuam fora de qualquer JSON.
#
#    Tema de cada cluster é a subárea — as 8 oficiais da ANPPOM (2025) mais
#    "Musicoterapia" destacada da SA-8 como categoria própria (pedido do
#    usuário, 9 no total; ver analise/clustering.py). Atribuída por leitura
#    de título+resumo (humana/LLM, `analise/classificacao_projetos.json`,
#    versionado — zero-shot por embedding fica de fallback) — sem "ruído":
#    todo projeto cai em alguma subárea. As palavras-chave (TF-IDF) continuam
#    automáticas e sem revisão; o JSON carrega um aviso disso para o front
#    repetir.
# ---------------------------------------------------------------------------

LIMIAR_TITULO_PUBLICO = 1  # era 10 até 2026-09-18; 1 = título de todo projeto é público


def _carregar_id_map_projetos(repo_root: Path, ids_reais: list) -> dict:
    path = repo_root / "derivados" / "id_map_projetos.json"
    mapa = {}
    if path.exists():
        with open(path, encoding="utf-8") as f:
            mapa = json.load(f)
    faltantes = [i for i in ids_reais if i not in mapa]
    if faltantes:
        mapa.update(build_id_map(faltantes))
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(mapa, f, ensure_ascii=False, indent=2)
    return mapa


def _carregar_clusters(repo_root: Path, nome: str = "clusters") -> "list[dict] | None":
    """build_public.py roda com stdlib pura — tenta parquet (venv de análise
    disponível), cai para o JSON irmão que analise/clustering.py também
    escreve. Mesma estratégia de build_indices. `nome` seleciona a variante
    (`clusters` = ANPPOM, `clusters_hdbscan` = §4.2.5 item 3)."""
    parquet = repo_root / "derivados" / f"{nome}.parquet"
    json_f = repo_root / "derivados" / f"{nome}.json"
    if parquet.exists():
        try:
            import pandas as pd
            return pd.read_parquet(parquet).to_dict(orient="records")
        except ImportError:
            pass
    if json_f.exists():
        with open(json_f, encoding="utf-8") as f:
            return json.load(f)
    return None


def _dados_base_projetos(con) -> dict:
    """Lookups por `id_projeto` real compartilhados por toda variante do
    atlas (ANPPOM, HDBSCAN…) — programa, ano mais recente reportado,
    contagem de produções, título. Extraído de `build_atlas` pra não
    duplicar a mesma SQL em cada método de clusterização."""
    programa_do_projeto = {
        r["id_projeto"]: r["sigla"]
        for r in con.execute("""
            SELECT DISTINCT pa.id_projeto, i.sigla
            FROM projeto_ano pa
            JOIN programas g ON g.id_programa = pa.id_programa
            JOIN instituicoes i ON i.id_ies = g.id_ies
            WHERE pa.id_programa IS NOT NULL
        """)
    }

    # Ano mais recente em que o projeto foi reportado — a base não tem
    # `inicio`/`fim` preenchidos (§Fatos que não são óbvios), então não há
    # "ano de início" para usar aqui.
    ano_do_projeto: dict = {}
    for r in con.execute("SELECT id_projeto, aba FROM projeto_ano"):
        try:
            ano = int(r["aba"])
        except (TypeError, ValueError):
            continue
        atual = ano_do_projeto.get(r["id_projeto"])
        if atual is None or ano > atual:
            ano_do_projeto[r["id_projeto"]] = ano

    producoes_do_projeto = {
        r["id_projeto"]: r["n"]
        for r in con.execute(
            "SELECT id_projeto, COUNT(*) n FROM producoes WHERE id_projeto IS NOT NULL GROUP BY id_projeto"
        )
    }
    nome_do_projeto = {
        r["id_projeto"]: r["nome"] for r in con.execute("SELECT id_projeto, nome FROM projetos")
    }

    return {
        "programa": programa_do_projeto,
        "ano": ano_do_projeto,
        "producoes": producoes_do_projeto,
        "nome": nome_do_projeto,
    }


def build_atlas(con, repo_root: Path, limiar_titulo: int = LIMIAR_TITULO_PUBLICO) -> "dict | None":
    linhas = _carregar_clusters(repo_root)
    if linhas is None:
        return None

    ids_reais = [r["id_projeto"] for r in linhas]
    id_map = _carregar_id_map_projetos(repo_root, ids_reais)

    base = _dados_base_projetos(con)
    programa_do_projeto = base["programa"]
    ano_do_projeto = base["ano"]
    producoes_do_projeto = base["producoes"]
    nome_do_projeto = base["nome"]

    tamanho_cluster: dict = {}
    tema_por_cluster: dict = {}
    subareas_por_cluster: dict[int, list[str]] = {}
    subarea_do_projeto: dict[str, str] = {}

    subareas_json = repo_root / "analise" / "subareas_nivel2.json"
    subareas_map_fallback = {}
    if subareas_json.exists():
        with open(subareas_json, encoding="utf-8") as f:
            subareas_map_fallback = json.load(f)

    for r in linhas:
        c = int(r["cluster"])
        id_proj = str(r["id_projeto"])
        # Prioriza a classificação semântica (leitura de título+resumo, via
        # subareas_nivel2.json) sobre o fallback estatístico antigo gravado em
        # clusters.json (bigramas de unigrama bruto, cacofônicos — "Performance
        # e Graduação", "Composição e Composicional"; ver §4.2.5 item 2).
        sub = subareas_map_fallback.get(id_proj) or r.get("subarea") or ""
        tamanho_cluster[c] = tamanho_cluster.get(c, 0) + 1
        tema_por_cluster.setdefault(c, r.get("tema"))
        if sub:
            subarea_do_projeto[id_proj] = sub
            subareas_por_cluster.setdefault(c, [])
            if sub not in subareas_por_cluster[c]:
                subareas_por_cluster[c].append(sub)

    pontos = []
    for r in linhas:
        id_projeto = r["id_projeto"]
        cluster = int(r["cluster"])
        titulo_publico = tamanho_cluster.get(cluster, 0) >= limiar_titulo
        pontos.append({
            "id": id_map[id_projeto],
            "sigla": programa_do_projeto.get(id_projeto),
            "ano": ano_do_projeto.get(id_projeto),
            "cluster": cluster,
            "subarea": subarea_do_projeto.get(id_projeto),
            "x": round(float(r["x"]), 4),
            "y": round(float(r["y"]), 4),
            "x3d": round(float(r["x3d"]), 4),
            "y3d": round(float(r["y3d"]), 4),
            "z3d": round(float(r["z3d"]), 4),
            "n_producoes": producoes_do_projeto.get(id_projeto, 0),
            "nome": nome_do_projeto.get(id_projeto) if titulo_publico else None,
        })

    clusters = []
    for c, n in sorted(tamanho_cluster.items()):
        subs = subareas_por_cluster.get(c, [])
        clusters.append({
            "cluster": int(c),
            "tema": tema_por_cluster.get(c),
            "n_projetos": int(n),
            "subareas": subs,
            "titulo_publico": n >= limiar_titulo,
        })

    return {
        "limiar_titulo_publico": limiar_titulo,
        "aviso_rotulo": (
            "Tema = subárea de nível 1 (as 8 da ANPPOM mais Musicoterapia). "
            "Subáreas = 2º nível de organização temática, agrupando projetos por afinidade semântica real de títulos e resumos."
        ),
        "clusters": clusters,
        "projetos": pontos,
    }


def _build_atlas_nao_taxonomico(
    con, repo_root: Path, nome_clusters: str, aviso_rotulo: str,
    id_ruido: "int | None" = None, rotulo_ruido: str = "Ruído (sem cluster)",
    limiar_titulo: int = LIMIAR_TITULO_PUBLICO,
) -> "dict | None":
    """Corpo compartilhado pelas variantes do atlas que NÃO vêm da taxonomia
    ANPPOM (§4.2.5 item 3: HDBSCAN, LDA/tópicos — mesmo formato de
    `build_atlas`, o front reaproveita o componente inteiro trocando só a
    fonte). `tema` vem das palavras-chave (TF-IDF ou top-termos do tópico)
    do cluster — não há nome humano, é descoberta, não classificação por
    categoria oficial. Nenhuma tem subárea de 2º nível
    (`subareas_nivel2.json` foi construído sobre os clusters ANPPOM);
    `subareas` aqui carrega as próprias palavras-chave, só pra leitura na
    tabela — o front não usa como filtro por projeto.

    `id_ruido`: o valor de `cluster` que significa "não agrupou com nada"
    (HDBSCAN usa -1; LDA não tem — todo documento cai num tópico por
    construção, então passa `None`). Mantido e rotulado, nunca escondido:
    projeto que não agrupa com nada é achado, não defeito.
    """
    linhas = _carregar_clusters(repo_root, nome=nome_clusters)
    if linhas is None:
        return None

    ids_reais = [r["id_projeto"] for r in linhas]
    id_map = _carregar_id_map_projetos(repo_root, ids_reais)

    base = _dados_base_projetos(con)
    programa_do_projeto = base["programa"]
    ano_do_projeto = base["ano"]
    producoes_do_projeto = base["producoes"]
    nome_do_projeto = base["nome"]

    # As palavras-chave (TF-IDF) vêm do corpus livre dos resumos — mesmo
    # risco de nome de pessoa real embutido no texto que `producoes.nome`
    # tinha (achado rodando `analise.pii_test` a 1ª vez sobre esses
    # arquivos: "john rink" — musicólogo real, citado num resumo, virou
    # termo distintivo de um cluster). Termo que casa com nome real é
    # descartado aqui, não só filtrado na exibição — não pode nem chegar a
    # `derivados/*.json` publicável.
    from analise.pii_test import carregar_reais, compilar_regex_nomes

    db_path = Path(con.execute("PRAGMA database_list").fetchone()[2])
    _, _, nomes_reais = carregar_reais(db_path)
    rx_nomes = compilar_regex_nomes(nomes_reais)

    def sem_nome_real(termo: str) -> bool:
        return not (rx_nomes and rx_nomes.search(termo))

    tamanho_cluster: dict = {}
    palavras_por_cluster: dict = {}
    for r in linhas:
        c = int(r["cluster"])
        tamanho_cluster[c] = tamanho_cluster.get(c, 0) + 1
        if c not in palavras_por_cluster:
            termos_brutos = (r.get("palavras_chave") or "").split(",")
            termos_limpos = [t.strip() for t in termos_brutos if t.strip() and sem_nome_real(t)]
            palavras_por_cluster[c] = ", ".join(termos_limpos)

    def tema_do_cluster(c: int) -> str:
        if id_ruido is not None and c == id_ruido:
            return rotulo_ruido
        termos = [t.strip() for t in palavras_por_cluster.get(c, "").split(",") if t.strip()]
        return " · ".join(t.capitalize() for t in termos[:3]) or f"Cluster {c}"

    pontos = []
    for r in linhas:
        id_projeto = r["id_projeto"]
        cluster = int(r["cluster"])
        titulo_publico = tamanho_cluster.get(cluster, 0) >= limiar_titulo
        pontos.append({
            "id": id_map[id_projeto],
            "sigla": programa_do_projeto.get(id_projeto),
            "ano": ano_do_projeto.get(id_projeto),
            "cluster": cluster,
            "subarea": None,
            "x": round(float(r["x"]), 4),
            "y": round(float(r["y"]), 4),
            "x3d": round(float(r["x3d"]), 4),
            "y3d": round(float(r["y3d"]), 4),
            "z3d": round(float(r["z3d"]), 4),
            "n_producoes": producoes_do_projeto.get(id_projeto, 0),
            "nome": nome_do_projeto.get(id_projeto) if titulo_publico else None,
        })

    clusters = []
    for c, n in sorted(tamanho_cluster.items()):
        e_ruido = id_ruido is not None and c == id_ruido
        termos = [t.strip() for t in palavras_por_cluster.get(c, "").split(",") if t.strip()]
        clusters.append({
            "cluster": int(c),
            "tema": tema_do_cluster(c),
            "n_projetos": int(n),
            "subareas": [] if e_ruido else termos,
            "titulo_publico": n >= limiar_titulo,
        })

    return {
        "limiar_titulo_publico": limiar_titulo,
        "aviso_rotulo": aviso_rotulo,
        "clusters": clusters,
        "projetos": pontos,
    }


def build_atlas_hdbscan(con, repo_root: Path, limiar_titulo: int = LIMIAR_TITULO_PUBLICO) -> "dict | None":
    """HDBSCAN não supervisionado sobre embedding denso — ver
    `clustering.executar_hdbscan` e `_build_atlas_nao_taxonomico`."""
    return _build_atlas_nao_taxonomico(
        con, repo_root, nome_clusters="clusters_hdbscan", id_ruido=-1, limiar_titulo=limiar_titulo,
        aviso_rotulo=(
            "HDBSCAN não supervisionado sobre o espaço de embeddings de alta dimensão — "
            "descoberta de tema, não classificação pela taxonomia oficial da ANPPOM. "
            "\"Tema\" vem das palavras-chave (TF-IDF) mais distintivas do cluster, não de "
            "leitura humana. \"Ruído (sem cluster)\" é resultado legítimo do método (HDBSCAN "
            "não força todo ponto a um grupo) — projeto que não agrupa com nada é achado, "
            "não defeito, e por isso aparece aqui em vez de ser escondido."
        ),
    )


def build_atlas_topicos(con, repo_root: Path, limiar_titulo: int = LIMIAR_TITULO_PUBLICO) -> "dict | None":
    """Modelagem de tópicos (LDA) sobre bag-of-words — ver
    `clustering.executar_topicos` e `_build_atlas_nao_taxonomico`. Sem
    ruído: LDA dá uma distribuição de probabilidade pra todo documento, o
    "cluster" aqui é só o tópico de maior probabilidade (argmax)."""
    return _build_atlas_nao_taxonomico(
        con, repo_root, nome_clusters="clusters_topicos", id_ruido=None, limiar_titulo=limiar_titulo,
        aviso_rotulo=(
            "LDA (Latent Dirichlet Allocation) sobre contagem de palavras (bag-of-words) — "
            "modelagem de tópicos transversais, não classificação pela taxonomia oficial da "
            "ANPPOM nem clusterização por embedding denso (é o 3º método, estruturalmente "
            "diferente dos outros dois: vem de co-ocorrência de palavra, não de posição "
            "semântica). \"Tema\" vem dos termos mais associados ao tópico. Cada projeto tem "
            "uma distribuição de probabilidade sobre todos os tópicos — aqui é mostrado só o "
            "de maior probabilidade; por isso não há \"ruído\": todo projeto sempre tem um "
            "tópico dominante, por construção do método."
        ),
    )


def build_atlas_coautoria(con, repo_root: Path, limiar_titulo: int = LIMIAR_TITULO_PUBLICO) -> "dict | None":
    """Rede de colaboração (Louvain sobre pessoa compartilhada) — ver
    `clustering.executar_coautoria` e `_build_atlas_nao_taxonomico`. O mais
    diferente dos quatro métodos: não olha o texto do projeto pra formar o
    cluster (só pra rotular depois com TF-IDF) — olha quem é membro de qual
    projeto. Posição (x, y) também não vem de redução de embedding, vem do
    próprio layout de força do grafo de colaboração (`spring_layout`):
    proximidade aqui significa "perto na rede", não "conteúdo parecido".
    "Ruído" (`cluster == -1`) é "sem colaboração REGISTRADA" — projeto sem
    nenhuma pessoa em comum com outro do corpus, não um julgamento sobre a
    colaboração real do grupo (a base só capta o que a Plataforma lista
    como vínculo formal)."""
    return _build_atlas_nao_taxonomico(
        con, repo_root, nome_clusters="clusters_coautoria", id_ruido=-1,
        rotulo_ruido="Sem colaboração registrada", limiar_titulo=limiar_titulo,
        aviso_rotulo=(
            "Rede de colaboração — comunidades de Louvain sobre projetos que compartilham "
            "PESSOA (docente, discente ou participante externo em comum), não sobre texto. É o "
            "4º método, o mais diferente dos outros três: ANPPOM/HDBSCAN vêm de embedding "
            "denso, LDA de bag-of-words — os três olham a descrição do projeto; este olha quem "
            "trabalha com quem. \"Tema\" (palavra-chave TF-IDF) é calculado DEPOIS, só pra dar "
            "uma pista de conteúdo — nunca entra na formação do cluster. A posição (x, y) "
            "também não vem de redução de embedding: vem do layout de força do próprio grafo "
            "de colaboração — proximidade aqui é \"perto na rede\", não \"conteúdo parecido\". "
            "\"Sem colaboração registrada\" é projeto sem nenhuma pessoa em comum com outro do "
            "corpus — a base só capta vínculo formal listado na Plataforma, não colaboração "
            "informal."
        ),
    )


def _mapa_projetos(repo_root: Path):
    linhas = _carregar_clusters(repo_root)
    if linhas is None:
        return None
    ids_reais = sorted({str(r["id_projeto"]) for r in linhas})
    return _carregar_id_map_projetos(repo_root, ids_reais)


def build_producoes_projeto(con, repo_root: Path) -> "dict | None":
    """Produções vinculadas a cada projeto do atlas, para expandir no `/atlas`.

    Transparência total (decisão do usuário, 2026-09-18): título, link **e os
    nomes dos autores** de toda produção saem, sem redação. Os dados vêm da
    Plataforma Sucupira, que os publica; o site só os organiza. Até aqui a lista
    tinha duas restrições — título e link omitidos quando o título continha nome
    de pessoa da base (158 casos), e nenhum autor — e as duas foram retiradas.

    Chaveado pelo id substituto do atlas (nunca `id_projeto` real), e sem
    `id_pessoa`: o nome aparece, o identificador da Plataforma não é necessário.
    """
    id_map = _mapa_projetos(repo_root)
    if id_map is None:
        return None

    autores: dict[str, list] = {}
    for r in con.execute("""
        SELECT a.id_producao, p.nome_canonico nome, a.tipo_vinculo vinculo
        FROM autoria a
        JOIN pessoas p ON p.id_pessoa = a.id_pessoa
        JOIN producoes pr ON pr.id_producao = a.id_producao
        WHERE pr.id_projeto IS NOT NULL
        ORDER BY a.id_producao, a.ordem
    """):
        autores.setdefault(r["id_producao"], []).append(
            {"nome": r["nome"], "vinculo": r["vinculo"]}
        )

    resultado: dict[str, list] = {}
    for r in con.execute("""
        SELECT id_producao, id_projeto, nome, tipo, subtipo, ano_base, link
        FROM producoes
        WHERE id_projeto IS NOT NULL AND link IS NOT NULL AND TRIM(link) != ''
        ORDER BY ano_base DESC, nome
    """):
        id_sub = id_map.get(str(r["id_projeto"]))
        if id_sub is None:
            continue
        resultado.setdefault(id_sub, []).append({
            # id da Plataforma: já é público (está no link) e é a chave do detalhe
            "id_producao": r["id_producao"],
            "nome": r["nome"],
            "tipo": r["tipo"],
            "subtipo": r["subtipo"],
            "ano": r["ano_base"],
            "link": r["link"],
            "classe": classe_da_rubrica(r["tipo"], r["subtipo"]),
            "autores": autores.get(r["id_producao"], []),
        })
    return resultado


def build_membros_projeto(con, repo_root: Path) -> "dict | None":
    """Quem está em cada projeto (nome, papel, se é o responsável), por id substituto.

    Transparência total (decisão do usuário, 2026-09-18): nomes de pessoas
    aparecem. Arquivo à parte e carregado sob demanda, como `producoes_projeto`,
    para não pesar no carregamento do atlas. Sem `id_pessoa`.
    """
    id_map = _mapa_projetos(repo_root)
    if id_map is None:
        return None

    resultado: dict[str, list] = {}
    for r in con.execute("""
        SELECT m.id_projeto, p.nome_canonico nome, m.papel, m.principal
        FROM projeto_membro m
        JOIN pessoas p ON p.id_pessoa = m.id_pessoa
        ORDER BY m.id_projeto, m.principal DESC, m.papel, p.nome_canonico
    """):
        id_sub = id_map.get(str(r["id_projeto"]))
        if id_sub is None:
            continue
        resultado.setdefault(id_sub, []).append({
            "nome": r["nome"],
            "papel": r["papel"],
            "principal": bool(r["principal"]),
        })
    return resultado


def build_producoes_sem_projeto(con) -> dict:
    """As produções que não apontam para nenhum projeto (PLANO §4.4.4), uma a uma.

    Transparência total (decisão do usuário, 2026-09-18): "qualquer produção pode
    aparecer". Até aqui só as ligadas a projeto saíam (`producoes_projeto.json`), e
    as 4.293 sem vínculo não apareciam em lugar nenhum. Sem `id_producao`, sem
    `id_pessoa`: título, link, autoria (nome + vínculo), tipo, ano, programa.

    `resumo` é a conta por programa sobre **todos os anos da base** (2020–2024),
    não o quadriênio: é o universo de onde as produções listadas saem.
    """
    autores: dict[str, list] = {}
    for r in con.execute("""
        SELECT a.id_producao, p.nome_canonico nome, a.tipo_vinculo vinculo
        FROM autoria a
        JOIN pessoas p ON p.id_pessoa = a.id_pessoa
        JOIN producoes pr ON pr.id_producao = a.id_producao
        WHERE pr.id_projeto IS NULL
        ORDER BY a.id_producao, a.ordem
    """):
        autores.setdefault(r["id_producao"], []).append(
            {"nome": r["nome"], "vinculo": r["vinculo"]}
        )

    producoes = []
    for r in con.execute("""
        SELECT pr.id_producao, i.sigla, pr.nome, pr.tipo, pr.subtipo, pr.ano_base, pr.link
        FROM producoes pr
        JOIN programas g ON g.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = g.id_ies
        WHERE pr.id_projeto IS NULL
        ORDER BY pr.ano_base DESC, i.sigla, pr.nome
    """):
        producoes.append({
            "id_producao": r["id_producao"],
            "sigla": r["sigla"],
            "nome": r["nome"],
            "tipo": r["tipo"],
            "subtipo": r["subtipo"],
            "ano": r["ano_base"],
            "link": r["link"],
            "classe": classe_da_rubrica(r["tipo"], r["subtipo"]),
            "autores": autores.get(r["id_producao"], []),
        })

    resumo = [
        {"sigla": r["sigla"], "total": r["total"], "sem_projeto": r["sem_projeto"]}
        for r in con.execute("""
            SELECT i.sigla,
                   COUNT(*) total,
                   SUM(CASE WHEN pr.id_projeto IS NULL THEN 1 ELSE 0 END) sem_projeto
            FROM producoes pr
            JOIN programas g ON g.id_programa = pr.id_programa
            JOIN instituicoes i ON i.id_ies = g.id_ies
            GROUP BY i.sigla
            ORDER BY i.sigla
        """)
    ]
    assert sum(x["sem_projeto"] for x in resumo) == len(producoes), \
        "o resumo por programa tem de bater com a lista"
    ini, fim = con.execute("SELECT MIN(ano_base), MAX(ano_base) FROM producoes").fetchone()
    return {"periodo": [ini, fim], "resumo": resumo, "producoes": producoes}


def _resumo(texto: str, limite: int = 260) -> str:
    """Primeiras ~260 letras da descrição, cortadas em palavra, sem o cabeçalho "RESUMO"."""
    t = re.sub(r"\s+", " ", texto or "").strip()
    t = re.sub(r"^(RESUMO|Resumo)\s*[:\-–]?\s*", "", t)
    if len(t) <= limite:
        return t
    corte = t.rfind(" ", 0, limite)
    return t[: corte if corte > limite * 0.6 else limite].rstrip(" ,;:.") + "…"


def build_ficha_projeto(con, repo_root: Path) -> "dict | None":
    """Ficha curta de cada projeto, para o popup do Atlas e o topo do painel.

    Transparência total (decisão do usuário, 2026-09-18): resumo, datas, situação,
    responsável, nº de membros e **fomento** (agência, esfera, desde quando) — o par
    projeto↔agência que até aqui não saía. Por id substituto. Carregado em segundo
    plano quando o Atlas abre (~400 KB), porque o popup precisa dele ao passar o mouse.
    """
    id_map = _mapa_projetos(repo_root)
    if id_map is None:
        return None

    ficha: dict[str, dict] = {}
    for r in con.execute("SELECT id_projeto, descricao, inicio, fim, situacao FROM projetos"):
        id_sub = id_map.get(str(r["id_projeto"]))
        if id_sub is None:
            continue
        ficha[id_sub] = {
            "resumo": _resumo(r["descricao"]),
            "inicio": (r["inicio"] or "")[:10] or None,
            "fim": (r["fim"] or "")[:10] or None,
            "situacao": r["situacao"],
            "responsaveis": [],
            "n_membros": 0,
            "fomento": [],
        }

    for r in con.execute("""
        SELECT m.id_projeto, p.nome_canonico nome, m.principal
        FROM projeto_membro m JOIN pessoas p ON p.id_pessoa = m.id_pessoa
        ORDER BY m.id_projeto, m.principal DESC, p.nome_canonico
    """):
        f = ficha.get(id_map.get(str(r["id_projeto"])))
        if f is None:
            continue
        f["n_membros"] += 1
        if r["principal"]:
            f["responsaveis"].append(r["nome"])

    for r in con.execute("SELECT id_projeto, agencia, inicio FROM projeto_financiador ORDER BY id_projeto, inicio"):
        f = ficha.get(id_map.get(str(r["id_projeto"])))
        if f is None:
            continue
        sigla, esfera = identificar_agencia(r["agencia"])
        f["fomento"].append({
            "agencia": sigla,
            "esfera": esfera,
            "desde": (r["inicio"] or "")[:4] or None,
        })
    return ficha


def build_detalhes_producao(con) -> dict:
    """Todos os campos preenchidos do detalhe de cada produção, um fragmento por programa.

    Transparência total (decisão do usuário, 2026-09-18): o que a Plataforma mostra na
    página de cada produção (DOI, ISSN, evento, local, descrição, impacto, observações…)
    sai inteiro. Campo vazio ("" ou "-") não sai. Fragmentado por programa porque o
    conjunto todo tem ~11 MB de texto: o site carrega só o fragmento do programa da
    produção que o usuário abre.

    Formato por fragmento — nomes de campo numa lista e cada produção como pares
    [índice, valor], para o nome do campo não se repetir 400 mil vezes:
        {"itens": ["Idioma", ...], "producoes": {"<id_producao>": [[0, "PORTUGUES"], ...]}}
    """
    por_sigla: dict[str, dict] = {}
    for r in con.execute("""
        SELECT i.sigla, pr.id_producao, d.item, d.valor
        FROM producao_detalhe d
        JOIN producoes pr ON pr.id_producao = d.id_producao
        JOIN programas g ON g.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = g.id_ies
        WHERE d.valor IS NOT NULL AND TRIM(d.valor) NOT IN ('', '-')
        ORDER BY i.sigla, pr.id_producao, d.ordem
    """):
        sigla = SIGLA_EXIBICAO.get(r["sigla"], r["sigla"])
        frag = por_sigla.setdefault(sigla, {"itens": [], "_idx": {}, "producoes": {}})
        idx = frag["_idx"].setdefault(r["item"], len(frag["itens"]))
        if idx == len(frag["itens"]):
            frag["itens"].append(r["item"])
        frag["producoes"].setdefault(r["id_producao"], []).append([idx, r["valor"].strip()])
    for frag in por_sigla.values():
        del frag["_idx"]
    return por_sigla


def build_descricoes_projeto(con, repo_root: Path) -> "dict | None":
    """Descrição de cada projeto, por id substituto.

    Transparência total (decisão do usuário, 2026-09-18): o texto que o programa
    registrou na Plataforma sai inteiro, sem trecho, sem resumo. Até então a
    `descricao` era usada só para classificar e agrupar, nunca publicada. Arquivo à
    parte e sob demanda (~1,6 MB de texto), como `membros_projeto`.
    """
    id_map = _mapa_projetos(repo_root)
    if id_map is None:
        return None

    resultado: dict[str, str] = {}
    for r in con.execute("""
        SELECT id_projeto, descricao FROM projetos
        WHERE descricao IS NOT NULL AND TRIM(descricao) != ''
    """):
        id_sub = id_map.get(str(r["id_projeto"]))
        if id_sub is not None:
            resultado[id_sub] = r["descricao"].strip()
    return resultado


# ---------------------------------------------------------------------------
# Mapa de produções (PLANO_MAPA_PRODUCOES.md §2.4): um arquivo **em colunas** com
# a posição de cada produção (por método), mais um índice compacto para busca e
# ficha. Títulos e autores NÃO vão no arquivo de posições — moram no índice,
# carregado sob demanda, para o mapa não pagar por 21,5 mil títulos no mount.
#
# Posições vêm de `derivados/posicoes_producoes.{parquet,json}`
# (`analise/posicoes_producoes.py`, venv de análise); build_public roda com
# stdlib e lê o JSON irmão, como faz com os clusters.
# ---------------------------------------------------------------------------

def _carregar_posicoes(repo_root: Path) -> "list[dict] | None":
    parquet = repo_root / "derivados" / "posicoes_producoes.parquet"
    json_f = repo_root / "derivados" / "posicoes_producoes.json"
    if parquet.exists():
        try:
            import pandas as pd
            return pd.read_parquet(parquet).to_dict(orient="records")
        except ImportError:
            pass
    if json_f.exists():
        with open(json_f, encoding="utf-8") as f:
            return json.load(f)
    return None


# Classe → índice nas colunas (a ordem de analise/nucleo.CLASSES).
CLASSE_IDX = {c: i for i, c in enumerate(CLASSES)}


def _pid_producao(l) -> "str | None":
    """id_projeto real de uma linha de produção, ou None para produção sem
    projeto. O derivado pode trazer `None` (sem projeto) ou, se veio de um JSON
    antigo, `NaN`/`nan` como string — nenhum dos dois é projeto. Guardado aqui
    para o mapa não inventar um vínculo "nan"."""
    v = l.get("id_projeto")
    if v is None:
        return None
    s = str(v).strip()
    return None if s in ("", "nan", "None", "NaN") else s


def _indices(dicionarios: "list[dict]", chave: str, ordenar: bool = False) -> dict:
    """valores únicos de uma coluna -> índice; `ordenar` para uma ordem estável."""
    valores = [d[chave] for d in dicionarios if d.get(chave) is not None]
    unicos = sorted(set(valores)) if ordenar else list(dict.fromkeys(valores))
    return {v: i for i, v in enumerate(unicos)}


# Vínculo da pessoa com o programa em cada autoria (`autoria.tipo_vinculo`), para o filtro
# "vínculo" dos dois mapas. A ordem é a de exibição e define o bit de cada categoria nas
# máscaras (`vinc`): bit j ligado = a produção tem ao menos um autor com `VINCULOS[j]`.
# O vínculo é da relação (pessoa × produção), não da pessoa: a mesma pessoa pode ser
# Docente num programa e Participante externo noutro.
VINCULOS = ["Docente", "Discente", "Egresso", "Pós-doc", "Participante externo", "Sem vínculo"]
_BIT_VINCULO = {v: 1 << j for j, v in enumerate(VINCULOS)}


def _mascaras_vinculo(con) -> "dict[str, int]":
    """id_producao -> máscara de vínculos dos autores (OU dos bits). Vínculo fora de
    `VINCULOS` faria o filtro esconder produção sem aviso: falha alto em vez de calar."""
    mascara: dict[str, int] = {}
    for r in con.execute("SELECT DISTINCT id_producao, tipo_vinculo FROM autoria"):
        v = r["tipo_vinculo"]
        if v not in _BIT_VINCULO:
            raise ValueError(
                f"tipo_vinculo desconhecido em autoria: {v!r} — acrescente a VINCULOS (build_public.py) "
                "e ao filtro de vínculo antes de publicar"
            )
        mascara[str(r["id_producao"])] = mascara.get(str(r["id_producao"]), 0) | _BIT_VINCULO[v]
    return mascara


def build_vinculo_projetos(con, repo_root: Path) -> "dict | None":
    """Máscaras de vínculo das produções de cada projeto, chaveadas pelo id substituto:
    por projeto, a lista das máscaras **distintas** (uma por combinação de vínculos que
    alguma produção dele tem). É o que o filtro do Mapa de projetos precisa para os três
    modos — OU, E ("Docente E Discente" numa mesma produção) e SÓ — sem carregar as 17 mil
    produções; a união por projeto não bastaria para o E (um docente numa produção e um
    discente noutra não é produção conjunta). Sem `id_projeto` real."""
    mascaras = _mascaras_vinculo(con)
    por_projeto_real: dict[str, set] = {}
    for r in con.execute("SELECT id_producao, id_projeto FROM producoes WHERE id_projeto IS NOT NULL"):
        m = mascaras.get(str(r["id_producao"]), 0)
        if m:
            por_projeto_real.setdefault(str(r["id_projeto"]), set()).add(m)
    if not por_projeto_real:
        return None
    id_map = _carregar_id_map_projetos(repo_root, sorted(por_projeto_real))
    return {
        "vinculos": VINCULOS,
        "por_projeto": {id_map[pid]: sorted(ms) for pid, ms in por_projeto_real.items() if pid in id_map},
    }


def _mascaras_ponte(con, siglas: "list[str]") -> "dict[str, int]":
    """id_producao -> máscara dos OUTROS programas com pessoas em comum, no quadriênio.

    É a **mesma regra da aresta do cartograma** de "Quem trabalha com quem"
    (`build_rede_obras_por_tipo`): produção do quadriênio com 2 ou mais autorias em que algum
    autor também aparece (em qualquer ano) em outro programa. O bit j liga quando esse outro
    programa é `siglas[j]`. Produção sem essa ligação fica de fora (máscara ausente = 0). Como a
    produção pertence a um único programa, o par (A, B) filtra "produção de A com autor que também
    está em B" ou vice-versa — que é o que a espessura da ligação A–B conta."""
    bit = {s: 1 << j for j, s in enumerate(siglas)}
    sigla_de = {
        r["id_programa"]: r["sigla"]
        for r in con.execute(
            "SELECT p.id_programa, i.sigla FROM programas p JOIN instituicoes i ON i.id_ies = p.id_ies"
        )
    }
    programas_da_pessoa: dict[str, set] = {}
    for r in con.execute("""
        SELECT CAST(a.id_pessoa AS TEXT) AS pessoa, pr.id_programa AS prog
        FROM autoria a JOIN producoes pr ON pr.id_producao = a.id_producao
        WHERE a.id_pessoa IS NOT NULL
    """):
        programas_da_pessoa.setdefault(r["pessoa"], set()).add(r["prog"])

    autores: dict[str, tuple] = {}
    for r in con.execute("""
        SELECT pr.id_producao, pr.id_programa, CAST(a.id_pessoa AS TEXT) AS pessoa
        FROM producoes pr JOIN autoria a ON a.id_producao = pr.id_producao
        WHERE pr.ano_base IN (?,?,?,?)
    """, ANOS_QUADRIENIO):
        prog, pessoas = autores.setdefault(str(r["id_producao"]), (r["id_programa"], []))
        pessoas.append(r["pessoa"])

    mascaras: dict[str, int] = {}
    for id_producao, (prog, pessoas) in autores.items():
        if len(pessoas) < 2:
            continue
        outros: set = set()
        for pes in pessoas:
            if pes:
                outros |= programas_da_pessoa.get(pes, set()) - {prog}
        m = 0
        for o in outros:
            m |= bit.get(sigla_de[o], 0)
        if m:
            mascaras[id_producao] = m
    return mascaras


def build_ponte_projetos(con, repo_root: Path, siglas: "list[str]") -> "dict | None":
    """Por projeto (id substituto), a máscara de "outros programas" — união das máscaras das
    produções dele (ver `_mascaras_ponte`). O programa do projeto é o `sigla` que o atlas já traz,
    então o par (A, B) filtra projeto de A com alguma produção ligada a B, ou o inverso."""
    mascaras = _mascaras_ponte(con, siglas)
    por_projeto_real: dict[str, int] = {}
    for r in con.execute("SELECT id_producao, id_projeto FROM producoes WHERE id_projeto IS NOT NULL"):
        m = mascaras.get(str(r["id_producao"]), 0)
        if m:
            pid = str(r["id_projeto"])
            por_projeto_real[pid] = por_projeto_real.get(pid, 0) | m
    if not por_projeto_real:
        return None
    id_map = _carregar_id_map_projetos(repo_root, sorted(por_projeto_real))
    return {
        "siglas": siglas,
        "por_projeto": {id_map[pid]: m for pid, m in por_projeto_real.items() if pid in id_map},
    }


def build_producoes_mapa(con, repo_root: Path) -> "dict | None":
    """Posições das 21,5 mil produções, em colunas, para o `/mapa-de-producoes`.

    Uma produção por linha, em duas organizações: `x`/`y` (+ `x3d`/`y3d`/`z3d`)
    por semelhança de texto, e `aut_x`/`aut_y` por rede de autoria. As colunas de
    índice (`sigla`, `tipo`, `subtipo`, `classe`, `projeto`) apontam para os
    vocabulários no fim do arquivo. `projeto` é um índice em `projetos` (ids
    substitutos) ou -1 para produção sem projeto. Título e autor NÃO vêm aqui
    (ficam no índice).
    """
    linhas = _carregar_posicoes(repo_root)
    if linhas is None:
        return None

    # ids reais de projeto que aparecem, para o id substituto (compartilhado com o atlas).
    ids_projeto_reais = sorted({_pid_producao(l) for l in linhas if _pid_producao(l)})
    id_map = _carregar_id_map_projetos(repo_root, ids_projeto_reais)

    idx_sigla = _indices(linhas, "sigla", ordenar=True)
    idx_tipo = _indices(linhas, "tipo")
    idx_subtipo = _indices(linhas, "subtipo")
    projetos_unicos = list(dict.fromkeys(
        id_map[_pid_producao(l)] for l in linhas if _pid_producao(l)
    ))
    idx_projeto = {p: i for i, p in enumerate(projetos_unicos)}

    def _r(v, nd=4):
        try:
            return round(float(v), nd)
        except (TypeError, ValueError):
            return None

    ids, x, y, x3d, y3d, z3d = [], [], [], [], [], []
    aut_x, aut_y = [], []
    sigla, tipo, subtipo, classe, ano, projeto, cluster = [], [], [], [], [], [], []
    vinc, ponte = [], []
    mascaras = _mascaras_vinculo(con)
    siglas_mapa = [sg for sg, _ in sorted(idx_sigla.items(), key=lambda kv: kv[1])]
    mascaras_ponte = _mascaras_ponte(con, siglas_mapa)

    for l in linhas:
        ids.append(l["id_producao"])
        x.append(_r(l.get("x")))
        y.append(_r(l.get("y")))
        x3d.append(_r(l.get("x3d")))
        y3d.append(_r(l.get("y3d")))
        z3d.append(_r(l.get("z3d")))
        aut_x.append(_r(l.get("aut_x")))
        aut_y.append(_r(l.get("aut_y")))
        sigla.append(idx_sigla.get(l.get("sigla"), -1))
        tipo.append(idx_tipo.get(l.get("tipo"), -1))
        subtipo.append(idx_subtipo.get(l.get("subtipo"), -1))
        classe.append(CLASSE_IDX.get(l.get("classe"), 3))
        ano.append(l.get("ano"))
        pid = _pid_producao(l)
        projeto.append(idx_projeto.get(id_map.get(pid), -1) if pid else -1)
        cluster.append(int(l.get("cluster", -1)))
        vinc.append(mascaras.get(str(l["id_producao"]), 0))
        ponte.append(mascaras_ponte.get(str(l["id_producao"]), 0))

    return {
        "n": len(ids),
        "periodo": [min(a for a in ano if a is not None), max(a for a in ano if a is not None)],
        "metodos": ["texto", "autoria"],
        "ids": ids,
        "x": x, "y": y, "x3d": x3d, "y3d": y3d, "z3d": z3d,
        "aut_x": aut_x, "aut_y": aut_y,
        "sigla": sigla, "tipo": tipo, "subtipo": subtipo, "classe": classe,
        "ano": ano, "projeto": projeto, "cluster": cluster,
        "vinc": vinc, "vinculos": VINCULOS,
        "ponte": ponte,
        "siglas": [s for s, _ in sorted(idx_sigla.items(), key=lambda kv: kv[1])],
        "tipos": [t for t, _ in sorted(idx_tipo.items(), key=lambda kv: kv[1])],
        "subtipos": [s for s, _ in sorted(idx_subtipo.items(), key=lambda kv: kv[1])],
        "classes": list(CLASSES),
        "projetos": projetos_unicos,
    }


# No Mapa de produções, a aderência de cada produção é herdada do projeto a que
# ela pertence. Para a área PRINCIPAL do projeto dominar, as demais áreas são
# amortecidas por este fator: sem isso, áreas de vocabulário largo (Composição e
# Sonologia é a pior) aparecem como "relacionadas" em quase toda produção. O peso
# do próprio projeto é justamente isto: 1.0 = herda o perfil cru; 0.0 = só a área
# principal. Decisão explícita, ainda não calibrada com o autor.
FATOR_AREAS_RELACIONADAS = 0.5


def build_aderencia_producoes(repo_root: Path) -> "dict | None":
    """Aderência de cada produção a cada subárea da ANPPOM, **herdada do projeto**
    a que a produção pertence (o modelo calibrado de `analise/aderencia.py`,
    validado às cegas pelo autor). A área principal do projeto domina
    (`FATOR_AREAS_RELACIONADAS` amortece as demais); produção sem projeto fica com
    zero. Assim o Mapa de produções usa a MESMA escala e calibração do Mapa de
    projetos, com o "peso do próprio projeto" pedido pelo autor. Os cortes
    (`alcances`) vêm da validação de projetos e são reusados no controle de
    alcance do filtro."""
    aderencia_projetos_path = repo_root / "derivados" / "aderencia.json"
    if not aderencia_projetos_path.exists():
        return None
    with open(aderencia_projetos_path, encoding="utf-8") as f:
        ap = json.load(f)

    linhas = _carregar_posicoes(repo_root)
    if linhas is None:
        return None

    areas = ap["areas"]
    k = len(areas)
    grau_por_projeto = {str(pid): g for pid, g in zip(ap["ids"], ap["grau"])}

    n = len(linhas)
    a = [0] * (n * k)
    for i, l in enumerate(linhas):
        pid = _pid_producao(l)
        if pid is None:
            continue
        g = grau_por_projeto.get(pid)
        if g is None:
            continue
        principal = max(range(k), key=lambda j: g[j])
        for j in range(k):
            v = g[j] if j == principal else g[j] * FATOR_AREAS_RELACIONADAS
            a[i * k + j] = int(round(100 * max(0.0, min(5.0, v)) / 5))

    return {
        "versao": 1,
        "areas": areas,
        "n": n,
        "a": a,
        "alcances": ap["alcances"],
        "aviso": (
            f"Aderência herdada do projeto a que a produção pertence, no mesmo modelo calibrado do "
            f"Mapa de projetos ({ap['n_julgamentos']} projetos julgados às cegas pelo autor); a área "
            f"principal do projeto domina, e as demais entram com peso {FATOR_AREAS_RELACIONADAS}. Não é "
            f"probabilidade. Produção sem projeto tem aderência zero."
        ),
    }


def build_producoes_indice(con, repo_root: Path) -> "dict | None":
    """Índice compacto (título, autores, link) das produções, para busca e ficha.

    Carregado sob demanda — não no mount do mapa. Mesma ordem de `build_producoes_mapa`
    (por `id_producao`) para as duas pontas fecharem pelo id. Autores como nomes
    (públicos, sem `id_pessoa`); `projeto` como id substituto (ou null) para a
    ligação cruzada com o Mapa de projetos.
    """
    if _carregar_posicoes(repo_root) is None:
        return None

    autores: dict[str, list] = {}
    for r in con.execute("""
        SELECT a.id_producao, p.nome_canonico nome
        FROM autoria a JOIN pessoas p ON p.id_pessoa = a.id_pessoa
        ORDER BY a.id_producao, a.ordem
    """):
        autores.setdefault(r["id_producao"], []).append(r["nome"])

    id_map = _mapa_projetos(repo_root)
    idx_sigla: dict[str, int] = {}
    ids, titulo, link, autores_j, sigla, tipo, subtipo, classe, ano, projeto = (
        [], [], [], [], [], [], [], [], [], []
    )
    siglas: list[str] = []
    for r in con.execute("""
        SELECT pr.id_producao, pr.nome, pr.link, pr.tipo, pr.subtipo, pr.ano_base,
               pr.id_projeto, i.sigla
        FROM producoes pr
        JOIN programas g ON g.id_programa = pr.id_programa
        JOIN instituicoes i ON i.id_ies = g.id_ies
        ORDER BY pr.id_producao
    """):
        if r["sigla"] not in idx_sigla:
            idx_sigla[r["sigla"]] = len(siglas)
            siglas.append(r["sigla"])
        ids.append(r["id_producao"])
        titulo.append(r["nome"])
        link.append(r["link"])
        autores_j.append("; ".join(autores.get(r["id_producao"], [])))
        sigla.append(idx_sigla[r["sigla"]])
        tipo.append(r["tipo"])
        subtipo.append(r["subtipo"])
        classe.append(classe_da_rubrica(r["tipo"], r["subtipo"]))
        ano.append(r["ano_base"])
        pid = r["id_projeto"]
        projeto.append(id_map.get(str(pid)) if pid and id_map else None)

    return {
        "ids": ids,
        "titulo": titulo,
        "link": link,
        "autores": autores_j,
        "sigla": sigla,
        "tipo": tipo,
        "subtipo": subtipo,
        "classe": classe,
        "ano": ano,
        "projeto": projeto,
        "siglas": siglas,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

# A sigla da IES na base vem com o campus junto num caso só. No site ela é
# rótulo de eixo, de bloco de cartograma e de célula de tabela — e "UFPB-JOÃO
# PESSOA" não cabe em nenhum deles. A troca é feita **na saída**, não na base:
# `instituicoes.sigla` continua sendo o que a CAPES publica.
SIGLA_EXIBICAO = {"UFPB-JOÃO PESSOA": "UFPB"}


def _renomear(valor):
    """Aplica SIGLA_EXIBICAO recursivamente — em valores e em chaves de mapa."""
    if isinstance(valor, str):
        return SIGLA_EXIBICAO.get(valor, valor)
    if isinstance(valor, list):
        return [_renomear(v) for v in valor]
    if isinstance(valor, dict):
        return {_renomear(k): _renomear(v) for k, v in valor.items()}
    return valor


def build_aderencia(repo_root: Path) -> "dict | None":
    """Matriz de aderência projeto × subárea de nível 1 (PLANO §4.2.6), para a visão por pesos.

    Vem de `derivados/aderencia.json` (`python3 -m analise.aderencia --gerar`): grau previsto na
    escala do autor (0..5) por (projeto, área), publicado como inteiro 0..100. **Não é
    probabilidade** — é o rótulo do LLM combinado com a similaridade textual às facetas de cada
    área, calibrado nos julgamentos do autor; o aviso segue no próprio arquivo. Usa os ids
    substitutos do Atlas, nunca `id_projeto`.
    """
    from analise.aderencia import percentual

    path = repo_root / "derivados" / "aderencia.json"
    if not path.exists():
        return None
    with open(path, encoding="utf-8") as f:
        s = json.load(f)
    id_map = _carregar_id_map_projetos(repo_root, list(s["ids"]))
    return {
        "versao": s["versao"],
        "n_julgamentos": s["n_julgamentos"],
        "areas": s["areas"],
        # o que a interface pode afirmar sobre a qualidade — sempre com o nº de casos que sustenta
        "validacao": {
            "casos": s["n_julgamentos"],
            "principal": round(s["validacao"]["híbrido calibrado"]["topo"] / s["validacao"]["híbrido calibrado"]["casos"], 2),
            "relevante_irrelevante": round(s["validacao"]["híbrido calibrado"]["pares"], 2),
        },
        # corte → nº de pares e precisão (previsões de fora da amostra); vem de `aderencia.py`
        "alcances": s.get("alcances", []),
        "aviso": (
            "Aderência = rótulo do LLM combinado com a similaridade textual entre o resumo do projeto e "
            f"descrições de cada área, calibrado em {s['n_julgamentos']} julgamentos do autor. "
            "Não é probabilidade: 0–100 na escala de graus do autor (I a A)."
        ),
        "projetos": [{"id": id_map[pid], "a": [percentual(g) for g in linha]} for pid, linha in zip(s["ids"], s["grau"])],
    }


def write_json(out_dir: Path, name: str, data):
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / f"{name}.json"
    with open(path, "w", encoding="utf-8") as f:
        # allow_nan=False: NaN/Infinity não são JSON válido. Falhar aqui, alto, é
        # melhor do que publicar um arquivo que o navegador não consegue ler.
        json.dump(_renomear(data), f, ensure_ascii=False, separators=(",", ":"),
                  allow_nan=False)
    size_kb = path.stat().st_size / 1024
    print(f"  {name}.json  ({size_kb:.1f} KB)")


def main():
    parser = argparse.ArgumentParser(description="Generate public data bundle")
    parser.add_argument("--db", default=str(DEFAULT_DB))
    parser.add_argument("--out", default=str(DEFAULT_OUT))
    args = parser.parse_args()

    db = Path(args.db)
    out = Path(args.out)

    if not db.exists():
        raise FileNotFoundError(f"Database not found: {db}. Run montar_base.py first.")

    print(f"Building public data bundle from {db} …")
    con = _con(db)

    write_json(out, "programas", build_programas(con))
    write_json(out, "producao_por_ano", build_producao_por_ano(con))
    write_json(out, "totais_nacionais", build_totais_nacionais(con))
    write_json(out, "rede_programas", build_rede_programas(con))
    write_json(out, "perfil_programas", build_perfil_programas(con))
    write_json(out, "rede_regioes", build_rede_regioes(con))
    write_json(out, "rede_ufs", build_rede_ufs(con))
    write_json(out, "coautoria_docente_discente", build_coautoria_docente_discente(con))
    write_json(out, "rede_obras_por_tipo", build_rede_obras_por_tipo(con))
    write_json(out, "comparabilidade", build_comparabilidade(con))
    write_json(out, "cobertura", build_cobertura(con, REPO_ROOT))
    write_json(out, "concentracao", build_concentracao(con))
    write_json(out, "projetos", build_projetos(con))
    write_json(out, "distribuicao_notas", build_distribuicao_notas(con))
    write_json(out, "internacionalizacao", build_internacionalizacao(con))
    write_json(out, "endogenia", build_endogenia(con))

    # Indices (if available)
    indices = build_indices(REPO_ROOT)
    if indices is not None:
        # Strip any raw ids before publishing
        safe = []
        for row in indices:
            clean = {k: v for k, v in row.items() if k not in ("id_programa",)}
            safe.append(clean)
        write_json(out, "indices", safe)
    else:
        print("  indices.json skipped (run analise/indices.py first)")

    atlas = build_atlas(con, REPO_ROOT)
    if atlas is not None:
        write_json(out, "atlas", atlas)
    else:
        print("  atlas.json skipped (run analise/clustering.py first)")

    atlas_hdbscan = build_atlas_hdbscan(con, REPO_ROOT)
    if atlas_hdbscan is not None:
        write_json(out, "atlas_hdbscan", atlas_hdbscan)
    else:
        print("  atlas_hdbscan.json skipped (run analise/clustering.py --hdbscan first)")

    atlas_topicos = build_atlas_topicos(con, REPO_ROOT)
    if atlas_topicos is not None:
        write_json(out, "atlas_topicos", atlas_topicos)
    else:
        print("  atlas_topicos.json skipped (run analise/clustering.py --topicos first)")

    atlas_coautoria = build_atlas_coautoria(con, REPO_ROOT)
    if atlas_coautoria is not None:
        write_json(out, "atlas_coautoria", atlas_coautoria)
    else:
        print("  atlas_coautoria.json skipped (run analise/clustering.py --coautoria first)")

    aderencia = build_aderencia(REPO_ROOT)
    if aderencia is not None:
        write_json(out, "aderencia", aderencia)
    else:
        print("  aderencia.json skipped (run python3 -m analise.aderencia --gerar first)")

    producoes_projeto = build_producoes_projeto(con, REPO_ROOT)
    if producoes_projeto is not None:
        write_json(out, "producoes_projeto", producoes_projeto)
    membros_projeto = build_membros_projeto(con, REPO_ROOT)
    if membros_projeto is not None:
        write_json(out, "membros_projeto", membros_projeto)

    write_json(out, "producoes_sem_projeto", build_producoes_sem_projeto(con))

    producoes_mapa = build_producoes_mapa(con, REPO_ROOT)
    if producoes_mapa is not None:
        write_json(out, "producoes_mapa", producoes_mapa)
    else:
        print("  producoes_mapa.json skipped (run python3 -m analise.posicoes_producoes first)")

    vinculo_projetos = build_vinculo_projetos(con, REPO_ROOT)
    if vinculo_projetos is not None:
        write_json(out, "vinculo_projetos", vinculo_projetos)

    ponte_projetos = build_ponte_projetos(
        con, REPO_ROOT, sorted({r["sigla"] for r in con.execute("SELECT sigla FROM instituicoes")})
    )
    if ponte_projetos is not None:
        write_json(out, "ponte_projetos", ponte_projetos)

    aderencia_producoes = build_aderencia_producoes(REPO_ROOT)
    if aderencia_producoes is not None:
        write_json(out, "aderencia_producoes", aderencia_producoes)
    else:
        print("  aderencia_producoes.json skipped (run python3 -m analise.posicoes_producoes first)")

    producoes_indice = build_producoes_indice(con, REPO_ROOT)
    if producoes_indice is not None:
        write_json(out, "producoes_indice", producoes_indice)
    else:
        print("  producoes_indice.json skipped (run python3 -m analise.posicoes_producoes first)")

    ciclo_projetos = build_ciclo_vida_projetos(con, REPO_ROOT)
    if ciclo_projetos is not None:
        write_json(out, "ciclo_vida_projetos", ciclo_projetos)

    # Cor, contorno e código de letras de cada um dos 27 subtipos (regra única em
    # analise/esquema_producao.py); o `oklch` é só do autoteste, o front não o usa.
    esq = esquema_producao.esquema()
    for s in esq["subtipos"]:
        s.pop("oklch", None)
    write_json(out, "esquema_producao", esq)

    ficha = build_ficha_projeto(con, REPO_ROOT)
    if ficha is not None:
        write_json(out, "ficha_projeto", ficha)

    for sigla, frag in sorted(build_detalhes_producao(con).items()):
        assert sigla.isascii() and sigla.replace("_", "").isalnum(), f"sigla imprópria para nome de arquivo: {sigla}"
        write_json(out, f"detalhe_producao_{sigla}", frag)

    descricoes_projeto = build_descricoes_projeto(con, REPO_ROOT)
    if descricoes_projeto is not None:
        write_json(out, "descricao_projeto", descricoes_projeto)
    else:
        print("  producoes_projeto.json skipped (run analise/clustering.py first)")

    con.close()
    print("Done. Run the PII test before deploying: python3 -m analise.pii_test")


if __name__ == "__main__":
    main()
