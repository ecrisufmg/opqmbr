"""
Ciclo de vida dos projetos: a classificação versionada (PLANO §4.4.1).

Por que existe: "projeto com produção" contra "projeto órfão" é um binário que
esconde a forma do dado. Um projeto pode estar vazio porque acabou de ser
registrado, porque foi abandonado, porque só existe como hospedeiro de um
produto, ou porque a produção dele foi lançada sem o vínculo. Cada caso pede uma
leitura diferente, então o módulo separa em classes — e **esta é a única regra**:
o front recebe a classe pronta e não a reimplementa (mesmo contrato do
`nucleo.py`).

"Obra" aqui é produção **ou** tese/dissertação vinculada ao projeto
(`producoes.id_projeto` + `teses.id_projeto`). Contar só produção classificaria
como "silencioso" um projeto que orientou defesas.

As classes são **mutuamente exclusivas** e a ordem abaixo é a precedência: vale a
primeira que casar.

  orfao       nenhuma obra e nenhum membro           registro administrativo vazio
                                                     (hoje vazia: os 5 projetos sem produção
                                                     e sem membro têm tese vinculada, e
                                                     caem em fantasma)
  silencioso  nenhuma obra, com membros              subnotificação, ou não vingou
  fantasma    obras, nenhum membro                   atalho de preenchimento; quebra
                                                     a atribuição de quem produziu
  zumbi       em andamento e a última obra tem       registro obsoleto
              mais de 2 anos (contados de ANO_REF)
  one_shot    exatamente uma obra                    talvez criado para hospedar um produto
  prolifico   obras por ano observado acima do p90   os motores reais
  regular     o resto                                (não está no PLANO: sem ele, o
                                                     grosso dos projetos ficaria sem classe)

**Censura pela janela.** As produções da base cobrem só 2020–2024. Um projeto que
terminou em 2018 não tem obra na janela sem que isso diga nada sobre ele, e um que
começou em 2024 ainda não teve tempo de produzir. Por isso cada projeto leva também
`janela`, separada da classe, para a tela dizer "silencioso (recente)" em vez de
acusar quem começou ontem:

  completa         o projeto esteve ativo em algum ano anterior a RECENTE_A_PARTIR
  recente          começou em RECENTE_A_PARTIR ou depois (≤ 2 anos observados)
  encerrado_antes  terminou antes de 2020 — a janela não o enxerga

**`fim` só existe em projeto encerrado** (projeto ativo tem `fim` nulo). Por isso
"zumbi" não pode nascer de "`fim` no passado", como o PLANO §4.4 dizia antes de a
base ter as datas: ele nasce de `situacao` ativa + produção antiga.

Uso:
    python3 -m analise.ciclo_vida              # regras, autoteste
    python3 -m analise.ciclo_vida --conferir   # + distribuição contra sucupira.db

Stdlib pura, como o resto do caminho de reprodução da base.
"""

# ---------------------------------------------------------------------------
# Parâmetros da regra (todos aqui, nenhum escondido na função)
# ---------------------------------------------------------------------------

import math

ANO_REF = 2024          # último ano com produção na base
JANELA_INICIO = 2020    # primeiro ano com produção na base
ATIVO = "EM ANDAMENTO"  # valor de projetos.situacao
ZUMBI_LACUNA_ANOS = 2   # "última obra há > 2 anos"
RECENTE_A_PARTIR = 2023
PERCENTIL_PROLIFICO = 0.90

ORFAO = "orfao"
SILENCIOSO = "silencioso"
FANTASMA = "fantasma"
ZUMBI = "zumbi"
ONE_SHOT = "one_shot"
PROLIFICO = "prolifico"
REGULAR = "regular"

CLASSES = (ORFAO, SILENCIOSO, FANTASMA, ZUMBI, ONE_SHOT, PROLIFICO, REGULAR)

# Rótulos de EXIBIÇÃO: descritivos e sem carga (pedido do autor, 2026-09-20: "zumbi", "fantasma" e "órfão"
# soavam mal). As CHAVES internas (orfao, silencioso, fantasma, zumbi…) não mudam: são contrato com o
# front e com o JSON, e renomeá-las quebraria dados já publicados.
ROTULO_CLASSE = {
    ORFAO: "Sem produção e sem membros",
    SILENCIOSO: "Sem produção",
    FANTASMA: "Sem membros",
    ZUMBI: "Sem produção recente",
    ONE_SHOT: "Uma única produção",
    PROLIFICO: "Alta produção",
    REGULAR: "Demais projetos",
}

DESCRICAO_CLASSE = {
    ORFAO: "Sem produção e sem membros: o registro do projeto está vazio.",
    SILENCIOSO: "Tem membros, mas nenhuma produção vinculada: pode ser subnotificação ou um projeto que não avançou.",
    FANTASMA: "Tem produções vinculadas, mas nenhum membro cadastrado: o vínculo entre a produção e as pessoas se perde.",
    ZUMBI: "Em andamento, mas a última produção tem mais de 2 anos: o registro pode estar desatualizado.",
    ONE_SHOT: "Exatamente uma produção vinculada: pode ter sido criado para abrigar um produto específico.",
    PROLIFICO: "Acima do percentil 90 de produções por ano observado.",
    REGULAR: "Projetos com produções e membros que não se enquadram nas classes acima.",
}

COMPLETA = "completa"
RECENTE = "recente"
ENCERRADO_ANTES = "encerrado_antes"

JANELAS = (COMPLETA, RECENTE, ENCERRADO_ANTES)

# ---------------------------------------------------------------------------
# Categoria de exibição = classe + janela, onde a janela muda a leitura
# ---------------------------------------------------------------------------
# "Sem obra" é ausência de evidência, e ausência só vale contra quem teve tempo de
# produzir dentro da janela. Sem esta separação, o programa cujos projetos são quase
# todos novos aparece como "100% silencioso" — uma acusação que os dados não sustentam
# (a UEPA tem 14 silenciosos, 13 deles começaram em 2023 ou depois). Só as classes
# definidas por AUSÊNCIA de obra se dividem; as demais têm obra, então já provam
# atividade, seja qual for a janela.

CLASSES_DE_AUSENCIA = (ORFAO, SILENCIOSO)
PARCIAL = "_parcial"


def categoria(classe_, janela_) -> str:
    """A classe, ou a classe + `_parcial` quando é de ausência e a janela é parcial."""
    if classe_ in CLASSES_DE_AUSENCIA and janela_ != COMPLETA:
        return classe_ + PARCIAL
    return classe_


# Ordem de empilhamento nas telas: a parcial fica colada à sua classe.
CATEGORIAS = tuple(
    c2 for c in CLASSES for c2 in ((c, c + PARCIAL) if c in CLASSES_DE_AUSENCIA else (c,))
)

ROTULO_CATEGORIA = {
    **ROTULO_CLASSE,
    **{c + PARCIAL: f"{ROTULO_CLASSE[c]} (janela parcial)" for c in CLASSES_DE_AUSENCIA},
}

DESCRICAO_CATEGORIA = {
    **DESCRICAO_CLASSE,
    **{
        c + PARCIAL: "Sem produção, mas o projeto começou em 2023 ou depois, ou terminou antes de "
                     "2020: a base não permite julgar."
        for c in CLASSES_DE_AUSENCIA
    },
}


# ---------------------------------------------------------------------------
# A regra
# ---------------------------------------------------------------------------

def _ano(data):
    """'2005-01-01T00:00:00' -> 2005; vazio ou ilegível -> None."""
    texto = str(data or "").strip()
    return int(texto[:4]) if texto[:4].isdigit() else None


def janela(inicio, fim) -> str:
    """Quanto da vida do projeto a base de produções consegue enxergar."""
    ano_fim = _ano(fim)
    if ano_fim is not None and ano_fim < JANELA_INICIO:
        return ENCERRADO_ANTES
    ano_ini = _ano(inicio)
    if ano_ini is not None and ano_ini >= RECENTE_A_PARTIR:
        return RECENTE
    return COMPLETA


def anos_observados(inicio) -> int:
    """Anos de 2020–ANO_REF desde o início do projeto (sem data: a janela toda).

    **Não usa `fim`**, de propósito: as obras são contadas até ANO_REF, e a
    produção sai *depois* do fim do projeto (43 projetos encerrados antes de 2020
    têm uma obra só na janela — dividir por "anos ativos", que dariam 1, os faria
    passar por os mais produtivos da base).
    """
    return ANO_REF - max(_ano(inicio) or JANELA_INICIO, JANELA_INICIO) + 1


def obras_por_ano(n_obras, inicio) -> float:
    return n_obras / anos_observados(inicio)


def limiar_prolifico(taxas) -> float:
    """Valor acima do qual (estritamente) um projeto é 'prolífico'.

    Percentil por posto (o menor valor com ≥ 90% dos projetos abaixo ou iguais),
    sobre os projetos que **têm** obra — os sem obra não são "lentos", estão fora
    da conta. O "estritamente acima" é o que faz de 10 projetos exatamente 1
    prolífico; com empate na fronteira, sobra menos que 10%, nunca mais. Sai dos
    dados, não de uma constante: muda com a base, e por isso é devolvido junto.
    """
    ordenadas = sorted(taxas)
    if not ordenadas:
        return float("inf")
    posto = max(1, math.ceil(PERCENTIL_PROLIFICO * len(ordenadas)))
    return ordenadas[posto - 1]


def classe(n_obras, n_membros, situacao, ultimo_ano, taxa, limiar) -> str:
    """A precedência da tabela do docstring, na ordem em que está escrita."""
    if n_obras == 0:
        return ORFAO if n_membros == 0 else SILENCIOSO
    if n_membros == 0:
        return FANTASMA
    if situacao == ATIVO and ultimo_ano is not None \
            and ANO_REF - ultimo_ano > ZUMBI_LACUNA_ANOS:
        return ZUMBI
    if n_obras == 1:
        return ONE_SHOT
    if taxa > limiar:
        return PROLIFICO
    return REGULAR


def classificar(projetos):
    """`projetos`: lista de dicts com id_projeto, situacao, inicio, fim,
    n_obras, n_membros, ultimo_ano.

    Devolve (por_id, limiar): `por_id[id] = {"classe", "janela", "obras_por_ano"}`.
    """
    taxas = {
        p["id_projeto"]: obras_por_ano(p["n_obras"], p["inicio"])
        for p in projetos
    }
    limiar = limiar_prolifico([taxas[p["id_projeto"]] for p in projetos if p["n_obras"] > 0])
    saida = {}
    for p in projetos:
        pid = p["id_projeto"]
        saida[pid] = {
            "classe": classe(p["n_obras"], p["n_membros"], p["situacao"],
                             p["ultimo_ano"], taxas[pid], limiar),
            "janela": janela(p["inicio"], p["fim"]),
            "obras_por_ano": round(taxas[pid], 3),
        }
    return saida, limiar


def curva_primeira_obra(projetos) -> dict:
    """Tempo até a primeira obra: curva acumulada, com censura à direita.

    `projetos`: itens `{"inicio": ..., "primeiro_ano": ano da primeira obra ou None}`.

    Só entram projetos que **começaram dentro da janela** (a partir de
    JANELA_INICIO): para os mais antigos, a primeira obra que a base enxerga não é a
    primeira que existiu, e o "tempo até" seria um número sem sentido.

    Quem ainda não produziu **não é zero, é censurado**: só se sabe que não produziu
    até ANO_REF. Por isso a curva é a de Kaplan-Meier em anos discretos — a fração
    "produziu em até k anos" só considera, em cada k, quem já foi observado por k anos.
    Dividir os que produziram pelo total subestimaria a curva justamente para os projetos
    recentes.

    `lag = ano da 1ª obra − ano de início` (nunca é negativo nos dados de hoje; se um dia
    for, entra como 0 e é contado em `n_lag_negativo`, porque "obra antes do projeto" é
    sinal de cadastro feito depois do trabalho).
    """
    obs = []
    n_neg = 0
    for p in projetos:
        ini = _ano(p["inicio"])
        if ini is None or ini < JANELA_INICIO:
            continue
        primeiro = p["primeiro_ano"]
        if primeiro is None:
            lag = None
        else:
            lag = primeiro - ini
            if lag < 0:
                n_neg += 1
                lag = 0
        obs.append((ANO_REF - ini, lag))  # (anos observáveis, lag ou None)

    curva = []
    sobrevive = 1.0
    for k in range(ANO_REF - JANELA_INICIO + 1):
        em_risco = sum(1 for anos, lag in obs if anos >= k and (lag is None or lag >= k))
        eventos = sum(1 for _, lag in obs if lag == k)
        if em_risco == 0:
            break
        sobrevive *= 1 - eventos / em_risco
        curva.append({"k": k, "acumulada": round(1 - sobrevive, 4),
                      "em_risco": em_risco, "eventos": eventos})
    return {
        "n": len(obs),
        "n_com_obra": sum(1 for _, lag in obs if lag is not None),
        "n_lag_negativo": n_neg,
        "curva": curva,
    }


def carregar_con(con):
    """Uma linha por projeto, com os agregados que a regra precisa.

    Aceita qualquer conexão (o build_public já tem uma aberta)."""
    import sqlite3
    cur = con.cursor()
    cur.row_factory = sqlite3.Row
    linhas = cur.execute("""
        WITH obras AS (
          SELECT id_projeto, ano_base FROM producoes WHERE id_projeto IS NOT NULL
          UNION ALL
          SELECT id_projeto, ano_base FROM teses     WHERE id_projeto IS NOT NULL
        ),
        o AS (SELECT id_projeto, COUNT(*) n, MAX(ano_base) ult, MIN(ano_base) prim FROM obras GROUP BY id_projeto),
        m AS (SELECT id_projeto, COUNT(*) n FROM projeto_membro GROUP BY id_projeto)
        SELECT j.id_projeto, j.situacao, j.inicio, j.fim,
               COALESCE(o.n, 0) n_obras, COALESCE(m.n, 0) n_membros, o.ult ultimo_ano,
               o.prim primeiro_ano
        FROM projetos j
        LEFT JOIN o ON o.id_projeto = j.id_projeto
        LEFT JOIN m ON m.id_projeto = j.id_projeto
        ORDER BY j.id_projeto
    """).fetchall()
    return [dict(r) for r in linhas]


def carregar(db_path):
    import sqlite3
    con = sqlite3.connect(db_path)
    try:
        return carregar_con(con)
    finally:
        con.close()


# ---------------------------------------------------------------------------
# Autoteste e conferência
# ---------------------------------------------------------------------------

def _autoteste():
    L = 1.0  # limiar de teste: taxa > 1 é "prolífico"

    def c(n_obras, n_membros=3, situacao="CONCLUÍDO", ult=2024, taxa=0.5):
        return classe(n_obras, n_membros, situacao, ult, taxa, L)

    # precedência, uma a uma
    assert c(0, 0) == ORFAO
    assert c(0, 4) == SILENCIOSO
    assert c(5, 0) == FANTASMA
    assert c(5, 0, ATIVO, ult=2020) == FANTASMA, "sem membro vence zumbi"
    assert c(5, 3, ATIVO, ult=2020) == ZUMBI
    assert c(1, 3, ATIVO, ult=2020) == ZUMBI, "zumbi vence one_shot"
    assert c(1) == ONE_SHOT
    assert c(1, taxa=9) == ONE_SHOT, "one_shot vence prolífico"
    assert c(8, taxa=1.01) == PROLIFICO
    assert c(8, taxa=1.0) == REGULAR, "o limiar é estrito"

    # fronteira do zumbi: 2024 - 2021 = 3 > 2 (zumbi); 2024 - 2022 = 2 (não)
    assert c(3, 3, ATIVO, ult=2021) == ZUMBI
    assert c(3, 3, ATIVO, ult=2022) == REGULAR
    # projeto concluído com obra antiga não é zumbi: `fim`/`situacao` já o encerram
    assert c(3, 3, "CONCLUÍDO", ult=2020) == REGULAR

    # janela
    assert janela("2015-01-01T00:00:00", None) == COMPLETA
    assert janela("2023-05-01T00:00:00", None) == RECENTE
    assert janela("2022-12-31T00:00:00", None) == COMPLETA
    assert janela("2010-01-01T00:00:00", "2018-06-01T00:00:00") == ENCERRADO_ANTES
    assert janela("2010-01-01T00:00:00", "2020-01-01T00:00:00") == COMPLETA
    assert janela(None, None) == COMPLETA, "sem data não acusa ninguém de recente"

    # anos observados: da data de início até ANO_REF, recortados na janela
    assert anos_observados("2001-01-01T00:00:00") == 5
    assert anos_observados("2022-01-01T00:00:00") == 3
    assert anos_observados("2024-11-15T00:00:00") == 1
    assert anos_observados(None) == 5
    assert obras_por_ano(10, "2010-01-01T00:00:00") == 2.0

    # limiar: sobre quem tem obra, posto mais próximo do percentil
    assert limiar_prolifico(range(1, 11)) == 9
    assert limiar_prolifico(range(1, 101)) == 90
    assert limiar_prolifico([7]) == 7 and limiar_prolifico([]) == float("inf")

    # ponta a ponta: 10 projetos com obra viram exatamente 1 prolífico
    base = [dict(id_projeto=str(i), situacao="CONCLUÍDO", inicio="2020-01-01T00:00:00",
                 fim="2024-12-31T00:00:00", n_obras=n, n_membros=2, ultimo_ano=2024)
            for i, n in enumerate((2, 3, 4, 5, 6, 7, 8, 9, 10, 40), 1)]
    por_id, lim = classificar(base)
    # taxas = n/5 (todos ativos 5 anos): 0.4 … 2.0, 8.0 → p90 = 2.0
    assert lim == 10 / 5
    assert [k for k, v in por_id.items() if v["classe"] == PROLIFICO] == ["10"]
    assert sum(v["classe"] == REGULAR for v in por_id.values()) == 9  # os de 2 a 10 obras

    # curva de primeira obra (Kaplan-Meier em anos discretos)
    def item(ini, primeiro):
        return {"inicio": f"{ini}-03-01T00:00:00", "primeiro_ano": primeiro}

    # 4 projetos de 2020: 2 produzem no ano 0, 1 no ano 2, 1 nunca (censurado em 4 anos)
    r = curva_primeira_obra([item(2020, 2020), item(2020, 2020), item(2020, 2022), item(2020, None)])
    assert (r["n"], r["n_com_obra"]) == (4, 3)
    ac = [c["acumulada"] for c in r["curva"]]
    # k=0: 4 em risco, 2 eventos -> 0.5 ; k=1: 2 em risco, 0 -> 0.5 ; k=2: 2 em risco, 1 -> 0.75
    # k=3: 1 em risco, 0 -> 0.75 ; k=4: 1 em risco, 0 -> 0.75
    assert ac == [0.5, 0.5, 0.75, 0.75, 0.75], ac
    # censura: um projeto de 2024 que não produziu só é observado por 0 anos, então em k=0
    # conta como "em risco sem evento" e some depois — não puxa a curva para baixo nos
    # anos seguintes. Como ninguém mais está em risco em k=1, a curva termina em k=0.
    r = curva_primeira_obra([item(2020, 2020), item(2024, None)])
    assert [c["em_risco"] for c in r["curva"]] == [2], r
    assert r["curva"][0]["acumulada"] == 0.5
    # projeto anterior à janela não entra; lag negativo é contado e vira 0
    r = curva_primeira_obra([item(2015, 2020), item(2021, 2020)])
    assert r["n"] == 1 and r["n_lag_negativo"] == 1
    assert curva_primeira_obra([])["curva"] == []

    # categoria de exibição: só as classes de ausência se dividem pela janela
    assert categoria(SILENCIOSO, COMPLETA) == SILENCIOSO
    assert categoria(SILENCIOSO, RECENTE) == "silencioso_parcial"
    assert categoria(SILENCIOSO, ENCERRADO_ANTES) == "silencioso_parcial"
    assert categoria(ORFAO, RECENTE) == "orfao_parcial"
    assert categoria(FANTASMA, RECENTE) == FANTASMA, "quem tem obra já provou atividade"
    assert categoria(PROLIFICO, ENCERRADO_ANTES) == PROLIFICO
    assert CATEGORIAS.index("silencioso_parcial") == CATEGORIAS.index(SILENCIOSO) + 1
    assert len(CATEGORIAS) == len(CLASSES) + len(CLASSES_DE_AUSENCIA)
    assert set(ROTULO_CATEGORIA) == set(DESCRICAO_CATEGORIA) == set(CATEGORIAS)

    assert set(ROTULO_CLASSE) == set(DESCRICAO_CLASSE) == set(CLASSES)
    print(f"autoteste: ok ({len(CLASSES)} classes, {len(JANELAS)} janelas)")


def _conferir(db_path):
    from collections import Counter

    projetos = carregar(db_path)
    if not projetos:
        raise SystemExit("erro: nenhum projeto na base")

    # Colunas que só o detalhe preenche: vazias aqui significam extração quebrada
    # (aconteceu — ver docs/DATABASE_GUIDE.md), não "projetos sem data".
    sem_data = sum(1 for p in projetos if _ano(p["inicio"]) is None)
    sem_situacao = sum(1 for p in projetos if not p["situacao"])
    if sem_data or sem_situacao:
        raise SystemExit(f"erro: {sem_data} projetos sem `inicio`, {sem_situacao} sem "
                         "`situacao` — rode montar_base.py de novo")
    desconhecidas = {p["situacao"] for p in projetos} - {ATIVO, "CONCLUÍDO", "DESATIVADO"}
    if desconhecidas:
        print(f"AVISO: `situacao` nova na Plataforma, tratada como não-ativa: {desconhecidas}")

    por_id, limiar = classificar(projetos)
    n = len(projetos)
    cont = Counter(v["classe"] for v in por_id.values())
    assert sum(cont.values()) == n, "todo projeto tem exatamente uma classe"
    assert set(cont) <= set(CLASSES)

    print(f"\n{n} projetos · prolífico: > {limiar:.3f} obras/ano observado "
          f"(percentil {int(PERCENTIL_PROLIFICO * 100)} entre os que têm obra)\n")
    print(f"{'classe':<12}{'n':>6}{'%':>7}   completa recente encerrado_antes")
    for cl in CLASSES:
        por_j = Counter(v["janela"] for v in por_id.values() if v["classe"] == cl)
        print(f"{cl:<12}{cont[cl]:>6}{100 * cont[cl] / n:>6.1f}%   "
              f"{por_j[COMPLETA]:>8}{por_j[RECENTE]:>8}{por_j[ENCERRADO_ANTES]:>16}")
    for cl in CLASSES:
        if not cont[cl]:
            print(f"\nClasse vazia: {cl}. Não é erro nem 'esses projetos não existem' — "
                  "é consequência da regra (ver docstring).")
    print("\nLeitura: 'silencioso' e 'órfão' com janela 'recente' ou 'encerrado_antes' "
          "não são falha de preenchimento — a base não os enxerga por inteiro.")


def main():
    import argparse
    import os

    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--conferir", action="store_true", help="confere contra sucupira.db")
    parser.add_argument("--db", default="sucupira.db")
    args = parser.parse_args()

    _autoteste()
    if args.conferir:
        if not os.path.exists(args.db):
            raise SystemExit(f"erro: {args.db} não existe")
        _conferir(args.db)


if __name__ == "__main__":
    main()
