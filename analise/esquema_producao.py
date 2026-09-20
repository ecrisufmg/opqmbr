"""
Esquema visual das produções: como cada um dos 27 subtipos é desenhado — a regra única, no
molde de `nucleo.py`; o front só lê o resultado (`esquema_producao.json`).

No Atlas, cada produção é um **círculo** em volta do seu projeto (agrupadas por subtipo). Três
camadas dizem três coisas:

* **Borda → tipo** (bibliográfica = azul, artístico-cultural = vermelho, técnica = verde), em
  tons moderados, para não gritar. O vermelho é mais escuro e o verde mais claro: vermelho e
  verde são o par que o daltonismo mais confunde, e a diferença de luminosidade o separa.
* **Fill (o miolo) → família do subtipo**: subtipos parecidos compartilham a cor e variam em
  **luminosidade** (o canal que o daltonismo não destrói). As famílias — artigos, livros,
  música, cenas e cultura, difusão, serviços, desenvolvimento, outros — usam os matizes de
  **Okabe-Ito**, a paleta de referência para quem tem daltonismo.
* **Ícone → o subtipo exato**: um ícone plano monocromático (Material Design Icons), escolhido
  em `analise/icones_producao.json` pelo `analise/seletor_icones.py`, **sempre branco** sobre o
  miolo. Isso obriga todo miolo a ser escuro o bastante para o branco contrastar (≥ 3:1): a
  luminosidade fica em L ≲ 0,66.

**Por que a cor sozinha não identifica o subtipo — e o que ela garante.** São 27. Com cores
todas distintas, a otimização sob simulação de daltonismo (protanopia, deuteranopia,
tritanopia) não passa de ΔE 2,5 no par mais próximo; com o ícone branco e a luminosidade
limitada a L ≲ 0,66, **a melhor distribuição achada por busca ainda deixa ~7% dos pares de
subtipos de famílias diferentes com ΔE < 4** (alguns miolos escuros de famílias diferentes se
parecem). Por isso o desenho é hierárquico e o **ícone é o identificador**; a cor agrupa. O que
o desenho de fato garante — e o autoteste confere — é: subtipos da **mesma família** se
distinguem pela luminosidade; as **cores-base** de cada família se distinguem entre si; e o
número de pares confundíveis não cresce. `distancias()` mede tudo isso, inclusive **todos os
pares**, não só as cores-base (a versão anterior só comparava as bases e por isso anunciava
uma garantia maior do que a real).

Uso:
    python3 -m analise.esquema_producao              # tabela, distâncias e autotestes
    python3 -m analise.esquema_producao --conferir   # + confere contra sucupira.db

Stdlib pura, como o resto do caminho de reprodução da base.
"""

import json
import math
from pathlib import Path

from analise.nucleo import CLASSE_POR_RUBRICA

RAIZ = Path(__file__).resolve().parent.parent
ARQUIVO_ICONES = RAIZ / "analise" / "icones_producao.json"

BIBLIOGRAFICA = "BIBLIOGRÁFICA"
ARTISTICO = "ARTÍSTICO-CULTURAL"
TECNICA = "TÉCNICA"

# ---------------------------------------------------------------------------
# Tipos e a cor da borda (OKLCH: L, C, matiz em graus). Moderadas de propósito.
# ---------------------------------------------------------------------------

TIPOS = (
    (BIBLIOGRAFICA, "Bibliográfica", (0.52, 0.125, 255.0)),  # azul
    (ARTISTICO, "Artístico-cultural", (0.46, 0.150, 27.0)),  # vermelho, mais escuro
    (TECNICA, "Técnica", (0.64, 0.125, 150.0)),  # verde, mais claro
)

# ---------------------------------------------------------------------------
# Famílias: matiz de Okabe-Ito (Okabe & Ito, 2008). "cinza" é a família dos "outros".
# ---------------------------------------------------------------------------

OKABE_ITO = {
    "azul": "#0072B2",
    "celeste": "#56B4E9",
    "vermelhao": "#D55E00",
    "purpura": "#CC79A7",
    "laranja": "#E69F00",
    "verde": "#009E73",
    "amarelo": "#F0E442",
}
CROMA_MAXIMO = 0.15  # o Okabe-Ito é vivo; para o miolo ficar "flat", limita-se o croma

# Faixa de luminosidade (OKLCH L) de cada família: os subtipos dela se espalham por essa faixa
# (o mais frequente na luminosidade "própria" do Okabe-Ito, os outros em torno). As faixas de
# famílias de matiz vizinho **não se sobrepõem** (azul escuro × celeste claro; laranja claro ×
# amarelo × verde): normalizar todas para a mesma luminosidade faria laranja e amarelo,
# que no original só se distinguem por ela, virarem a mesma cor (ΔE 0,25 — o autoteste pegou).
FAIXA_L = {
    # família: (mais escuro, mais claro, luminosidade do subtipo de referência). Achadas por
    # busca (6.000 sorteios) minimizando os pares de famílias diferentes com ΔE < 4, sujeita a:
    # ícone branco com contraste ≥ 3, subtipos da mesma família ≥ 8 e cores-base ≥ 6.
    "azul": (0.36, 0.66, 0.57),
    "celeste": (0.30, 0.51, 0.44),
    "vermelhao": (0.51, 0.51, 0.51),
    "purpura": (0.31, 0.59, 0.33),
    "laranja": (0.31, 0.58, 0.54),
    "verde": (0.30, 0.64, 0.61),
    "amarelo": (0.31, 0.66, 0.34),
    "cinza": (0.28, 0.64, 0.57),
}
# Deriva de matiz (graus por posição dentro da família): separa um pouco mais os subtipos de
# famílias vizinhas nos escuros, onde a luminosidade sozinha não basta.
DERIVA_MATIZ = {"azul": 14.0, "purpura": -14.0}

# ---------------------------------------------------------------------------
# Os subtipos, por família lógica e, dentro dela, por frequência. (tipo, subtipo, família)
# ---------------------------------------------------------------------------

SUBTIPOS = (
    # --- BIBLIOGRÁFICA -----------------------------------------------------
    (BIBLIOGRAFICA, "TRABALHO EM ANAIS", "azul"),  # artigos e textos curtos
    (BIBLIOGRAFICA, "ARTIGO EM PERIÓDICO", "azul"),
    (BIBLIOGRAFICA, "ARTIGO EM JORNAL OU REVISTA", "azul"),
    (BIBLIOGRAFICA, "LIVRO", "celeste"),  # livros, traduções e partituras
    (BIBLIOGRAFICA, "TRADUÇÃO", "celeste"),
    (BIBLIOGRAFICA, "PARTITURA MUSICAL", "celeste"),
    (BIBLIOGRAFICA, "OUTRO", "cinza"),
    (BIBLIOGRAFICA, "OUTRO (BIBLIOGRÁFICA)", "cinza"),
    # --- ARTÍSTICO-CULTURAL ------------------------------------------------
    (ARTISTICO, "MÚSICA", "vermelhao"),
    (ARTISTICO, "OUTRA PRODUÇÃO CULTURAL", "purpura"),  # cena, imagem e o resto da cultura
    (ARTISTICO, "ARTES CÊNICAS", "purpura"),
    (ARTISTICO, "ARTES VISUAIS", "purpura"),
    # --- TÉCNICA -----------------------------------------------------------
    (TECNICA, "APRESENTAÇÃO DE TRABALHO", "laranja"),  # difusão
    (TECNICA, "CURSO DE CURTA DURAÇÃO", "laranja"),
    (TECNICA, "PROGRAMA DE RÁDIO OU TV", "laranja"),
    (TECNICA, "SERVIÇOS TÉCNICOS", "verde"),  # serviços, eventos e pesquisa
    (TECNICA, "ORGANIZAÇÃO DE EVENTO", "verde"),
    (TECNICA, "EDITORIA", "verde"),
    (TECNICA, "RELATÓRIO DE PESQUISA", "verde"),
    (TECNICA, "MANUTENÇÃO DE OBRA ARTÍSTICA", "verde"),
    (TECNICA, "DESENVOLVIMENTO DE MATERIAL DIDÁTICO E INSTRUCIONAL", "amarelo"),  # desenvolvimento
    (TECNICA, "DESENVOLVIMENTO DE APLICATIVO", "amarelo"),
    (TECNICA, "DESENVOLVIMENTO DE TÉCNICA", "amarelo"),
    (TECNICA, "DESENVOLVIMENTO DE PRODUTO", "amarelo"),
    (TECNICA, "PATENTE", "amarelo"),
    (TECNICA, "OUTRO", "cinza"),
    (TECNICA, "OUTRO (TÉCNICA)", "cinza"),
)

# ---------------------------------------------------------------------------
# Cor: OKLCH ↔ sRGB, distância em OKLab (Ottosson, 2020) e simulação de daltonismo
# (Machado, Oliveira & Fernandes, 2009, severidade máxima, em sRGB linear)
# ---------------------------------------------------------------------------


def _oklab(L, C, h_graus):
    h = math.radians(h_graus)
    return L, C * math.cos(h), C * math.sin(h)


def _linear_srgb(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    return (
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    )


def _lab_de_linear(rgb):
    r, g, b = rgb
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = (max(x, 0.0) ** (1 / 3) for x in (l, m, s))
    return (
        0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    )


def _gama(x):
    return 12.92 * x if x <= 0.0031308 else 1.055 * (x ** (1 / 2.4)) - 0.055


def _inv_gama(x):
    return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4


def _no_gamut(rgb, folga=1e-4):
    return all(-folga <= c <= 1 + folga for c in rgb)


def _hex(rgb):
    return "#" + "".join(
        "%02x" % round(255 * min(1.0, max(0.0, _gama(min(1.0, max(0.0, c)))))) for c in rgb
    )


def _linear_de_hex(h):
    h = h.lstrip("#")
    return tuple(_inv_gama(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4))


def _croma_no_gamut(L, h, cmax):
    """O maior croma ≤ cmax que cabe no sRGB nesta luminosidade e matiz."""
    c = cmax
    while c > 0 and not _no_gamut(_linear_srgb(*_oklab(L, c, h))):
        c -= 0.005
    return max(0.0, round(c, 4))


def _luminancia(rgb):
    r, g, b = (min(1.0, max(0.0, c)) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def _contraste(l1, l2):
    a, b = max(l1, l2), min(l1, l2)
    return (a + 0.05) / (b + 0.05)


_MACHADO = {
    "protanopia": ((0.152286, 1.052583, -0.204868), (0.114503, 0.786281, 0.099216), (-0.003882, -0.048116, 1.051998)),
    "deuteranopia": ((0.367322, 0.860646, -0.227968), (0.280085, 0.672501, 0.047413), (-0.011820, 0.042940, 0.968881)),
    "tritanopia": ((1.255528, -0.076749, -0.178779), (-0.078411, 0.930809, 0.147602), (0.004733, 0.691367, 0.303900)),
}
VISTAS = ("normal",) + tuple(_MACHADO)


def _ver(rgb, vista):
    if vista == "normal":
        return rgb
    m = _MACHADO[vista]
    return tuple(min(1.0, max(0.0, sum(m[i][j] * rgb[j] for j in range(3)))) for i in range(3))


def delta_e(rgb1, rgb2, vista="normal"):
    """Distância entre duas cores (sRGB linear) como enxerga cada vista, em OKLab ×100."""
    a = _lab_de_linear(_ver(rgb1, vista))
    b = _lab_de_linear(_ver(rgb2, vista))
    return 100.0 * math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))


def delta_e_minimo(rgb1, rgb2):
    """O pior caso: a menor das quatro vistas (normal, protan, deutan, tritan)."""
    return min(delta_e(rgb1, rgb2, v) for v in VISTAS)


# ---------------------------------------------------------------------------
# A paleta (cores) e o esquema completo (cores + ícones)
# ---------------------------------------------------------------------------


def _matiz_da_familia(familia):
    """(matiz, croma) do Okabe-Ito da família; o cinza não tem matiz."""
    if familia == "cinza":
        return 0.0, 0.0
    _, a, b = _lab_de_linear(_linear_de_hex(OKABE_ITO[familia]))
    return math.degrees(math.atan2(b, a)) % 360.0, min(math.hypot(a, b), CROMA_MAXIMO)


def _luminosidade(familia, posicao, n):
    """Luminosidade do subtipo `posicao` (0 = o primeiro da tabela) numa família de `n`.

    Os `n` subtipos se espalham igualmente pela faixa da família. O primeiro da tabela (o mais
    frequente) fica com o nível mais próximo da luminosidade de referência — a "cor de
    referência" da família —, e os seguintes vão se afastando dela, do claro ao escuro."""
    lo, hi, referencia = FAIXA_L[familia]
    if n == 1:
        return referencia
    niveis = [lo + (hi - lo) * i / (n - 1) for i in range(n)]
    ordem = sorted(range(n), key=lambda i: (abs(niveis[i] - referencia), -niveis[i]))
    return niveis[ordem[posicao]]


def _cor_do_subtipo(familia, posicao, n):
    h, c = _matiz_da_familia(familia)
    h = (h + DERIVA_MATIZ.get(familia, 0.0) * posicao) % 360.0
    L = _luminosidade(familia, posicao, n)
    cr = 0.0 if familia == "cinza" else _croma_no_gamut(L, h, c)
    return _linear_srgb(*_oklab(L, cr, h))


def _rotulo(subtipo):
    t = subtipo.lower()
    return t[0].upper() + t[1:]


def _posicoes():
    """Posição de cada subtipo dentro da sua família (0 = o primeiro da tabela). As duas
    famílias "outros" (bibliográfica e técnica) contam juntas: 4 níveis de cinza."""
    contadores, saida = {}, {}
    for t, s, f in SUBTIPOS:
        posicao = contadores.get(f, 0)
        contadores[f] = posicao + 1
        saida[(t, s)] = posicao
    return saida


def _tamanhos():
    """Quantos subtipos tem cada família."""
    n = {}
    for _, _, f in SUBTIPOS:
        n[f] = n.get(f, 0) + 1
    return n


def paleta():
    """Só as cores (sem ícones): tipos com a borda e subtipos com o fill e a cor do ícone."""
    pos, tam = _posicoes(), _tamanhos()
    tipos = [
        {"chave": chave, "rotulo": rotulo, "borda": _hex(_linear_srgb(*_oklab(*oklch)))}
        for chave, rotulo, oklch in TIPOS
    ]
    subtipos = {}
    for t, s, f in SUBTIPOS:
        rgb = _cor_do_subtipo(f, pos[(t, s)], tam[f])
        lum = _luminancia(rgb)
        subtipos[f"{t}||{s}"] = {
            "tipo": t,
            "subtipo": s,
            "rotulo": _rotulo(s),
            "familia": f,
            "cor": _hex(rgb),
            # o ícone é SEMPRE branco (pedido do usuário); o autoteste garante o contraste
            "texto": "#ffffff",
        }
    return {"tipos": tipos, "subtipos": subtipos}


def _icones():
    if not ARQUIVO_ICONES.exists():
        raise SystemExit(
            f"erro: falta {ARQUIVO_ICONES.relative_to(RAIZ)} — rode "
            "`python3 -m analise.seletor_icones --padrao --mdi <pasta do @mdi/svg>`"
        )
    return json.loads(ARQUIVO_ICONES.read_text(encoding="utf-8"))


def esquema():
    """O que vai para `esquema_producao.json`: tipos (borda) e subtipos (fill, cor do ícone,
    ícone: nome e traçado numa grade 24×24). Tudo derivado das tabelas e da escolha de ícones."""
    p = paleta()
    ic = _icones()
    subtipos = []
    for t, s, _ in SUBTIPOS:
        k = f"{t}||{s}"
        nome = ic["escolha"][k]
        item = dict(p["subtipos"][k])
        item.update({"icone": nome, "icone_path": ic["icones"][nome]})
        subtipos.append(item)
    return {"tipos": p["tipos"], "subtipos": subtipos, "fonte_icones": ic.get("fonte", "")}


# ---------------------------------------------------------------------------
# Distâncias garantidas (o que o desenho realmente entrega, medido nas quatro vistas)
# ---------------------------------------------------------------------------


def distancias():
    """O que o desenho entrega, medido no pior caso das quatro vistas (normal, protan, deutan,
    tritan): (1) subtipos da MESMA família; (2) as cores-base das famílias entre si; (3) as três
    bordas; (4) **todos os pares de subtipos de famílias diferentes** — quantos ficam
    confundíveis (ΔE < 4) e quais são os piores."""
    pos, tam = _posicoes(), _tamanhos()
    cores = {(t, s): _cor_do_subtipo(f, pos[(t, s)], tam[f]) for t, s, f in SUBTIPOS}
    fam = {(t, s): f for t, s, f in SUBTIPOS}
    itens = list(cores.items())

    mesma, cruzados = [], []
    for i, (ka, ca) in enumerate(itens):
        for kb, cb in itens[i + 1:]:
            d = delta_e_minimo(ca, cb)
            (mesma if fam[ka] == fam[kb] else cruzados).append((d, ka, kb))
    pior_mesma = min(mesma, key=lambda x: x[0])
    cruzados.sort(key=lambda x: x[0])

    bases = {f: _cor_do_subtipo(f, 0, tam[f]) for f in list(OKABE_ITO) + ["cinza"]}
    bi = list(bases.items())
    entre = [(a, b) for i, a in enumerate(bi) for b in bi[i + 1:]]
    pior_entre = min(((delta_e_minimo(a[1], b[1]), a[0], b[0]) for a, b in entre), key=lambda x: x[0])

    bordas = [(c, _linear_srgb(*_oklab(*o))) for c, _, o in TIPOS]
    entre_b = [(a, b) for i, a in enumerate(bordas) for b in bordas[i + 1:]]
    pior_borda = min(((delta_e_minimo(a[1], b[1]), a[0], b[0]) for a, b in entre_b), key=lambda x: x[0])
    return {
        "mesma_familia": pior_mesma,
        "entre_familias": pior_entre,  # só as cores-base
        "entre_bordas": pior_borda,
        "pares_cruzados": len(cruzados),
        "confundiveis": sum(1 for d, *_ in cruzados if d < LIMIAR_CONFUNDIVEL),
        # os do mesmo tipo têm a mesma borda: só o miolo e o ícone os distinguem
        "confundiveis_mesmo_tipo": sum(
            1 for d, ka, kb in cruzados if d < LIMIAR_CONFUNDIVEL and ka[0] == kb[0]
        ),
        "piores_cruzados": cruzados[:6],
        "bordas_por_vista": {v: min(delta_e(a[1], b[1], v) for a, b in entre_b) for v in VISTAS},
        "bases_por_vista": {v: min(delta_e(a[1], b[1], v) for a, b in entre) for v in VISTAS},
    }


# ---------------------------------------------------------------------------
# Autoteste e conferência
# ---------------------------------------------------------------------------

# Pisos (ΔE OKLab ×100, no pior caso das 4 vistas), ajustados ao que o desenho entrega hoje,
# com folga, para o autoteste falhar se alguém estragar a paleta. Os valores de hoje saem no
# relatório do próprio autoteste.
PISO_MESMA_FAMILIA = 8.0
PISO_ENTRE_FAMILIAS = 6.0  # cores-base
PISO_ENTRE_BORDAS = 5.0
CONTRASTE_ICONE = 3.0  # ícone branco sobre o miolo
LIMIAR_CONFUNDIVEL = 4.0  # ΔE abaixo do qual dois miolos de famílias diferentes se confundem
MAX_CONFUNDIVEIS = 25  # hoje 21 de 313 pares: o autoteste falha se o número crescer
MAX_CONFUNDIVEIS_MESMO_TIPO = 10  # hoje 9


def _autoteste():
    ab = {(t, s) for t, s, _ in SUBTIPOS}
    assert len(ab) == len(SUBTIPOS), "subtipo repetido na tabela"
    assert ab == set(CLASSE_POR_RUBRICA), (
        "esquema_producao.SUBTIPOS e nucleo.CLASSE_POR_RUBRICA divergem: "
        f"só no esquema {sorted(ab - set(CLASSE_POR_RUBRICA))}, "
        f"só no núcleo {sorted(set(CLASSE_POR_RUBRICA) - ab)}"
    )
    assert {f for _, _, f in SUBTIPOS} <= set(OKABE_ITO) | {"cinza"}
    assert set(FAIXA_L) == set(OKABE_ITO) | {"cinza"}, "toda família precisa de uma faixa de luminosidade"

    p = paleta()
    for k, s in p["subtipos"].items():
        rgb = _linear_de_hex(s["cor"])
        assert s["texto"] == "#ffffff", "o ícone é sempre branco"
        assert _contraste(_luminancia(rgb), 1.0) >= CONTRASTE_ICONE, ("ícone branco ilegível sobre o miolo", k)
    cores = [s["cor"] for s in p["subtipos"].values()]
    assert len(set(cores)) == len(cores), "dois subtipos com o mesmo miolo"

    d = distancias()
    assert d["mesma_familia"][0] >= PISO_MESMA_FAMILIA, f"subtipos da mesma família muito próximos: {d['mesma_familia']}"
    assert d["entre_familias"][0] >= PISO_ENTRE_FAMILIAS, f"famílias muito próximas: {d['entre_familias']}"
    assert d["entre_bordas"][0] >= PISO_ENTRE_BORDAS, f"bordas muito próximas: {d['entre_bordas']}"
    assert d["confundiveis_mesmo_tipo"] <= MAX_CONFUNDIVEIS_MESMO_TIPO, (
        f"{d['confundiveis_mesmo_tipo']} pares confundíveis dentro do mesmo tipo (máx {MAX_CONFUNDIVEIS_MESMO_TIPO})"
    )
    assert d["confundiveis"] <= MAX_CONFUNDIVEIS, (
        f"{d['confundiveis']} pares de famílias diferentes confundíveis (máx {MAX_CONFUNDIVEIS}): {d['piores_cruzados']}"
    )
    assert [s["cor"] for s in paleta()["subtipos"].values()] == cores, "não determinístico"

    if ARQUIVO_ICONES.exists():
        ic = _icones()
        chaves = {f"{t}||{s}" for t, s, _ in SUBTIPOS}
        assert set(ic["escolha"]) == chaves, "icones_producao.json não cobre exatamente os subtipos"
        assert all(n in ic["icones"] for n in ic["escolha"].values()), "ícone escolhido sem traçado"
        assert all(v.startswith("M") for v in ic["icones"].values()), "traçado de ícone inválido"
    print(
        f"autoteste: ok ({len(SUBTIPOS)} subtipos; ΔE mínimo no pior caso de daltonismo: "
        f"{d['mesma_familia'][0]:.1f} na mesma família, {d['entre_familias'][0]:.1f} entre as cores-base, "
        f"{d['entre_bordas'][0]:.1f} entre bordas; {d['confundiveis']} de {d['pares_cruzados']} pares de "
        f"famílias diferentes com ΔE < {LIMIAR_CONFUNDIVEL:.0f}, {d['confundiveis_mesmo_tipo']} deles do mesmo tipo)"
    )


def _conferir(db_path):
    import sqlite3

    con = sqlite3.connect(db_path)
    na_base = {
        ((t or "").strip().upper(), (s or "").strip().upper())
        for t, s in con.execute("SELECT DISTINCT tipo, subtipo FROM producoes")
    }
    con.close()
    novos = sorted(na_base - {(t, s) for t, s, _ in SUBTIPOS})
    if novos:
        raise SystemExit(
            "erro: subtipo novo na Plataforma, sem família/ícone em esquema_producao.SUBTIPOS "
            f"(o site o mostra em cinza, sem ícone): {novos}"
        )
    print(f"conferência: ok — os {len(na_base)} subtipos da base têm cor e ícone")


def _tabela():
    p = paleta()
    ic = _icones() if ARQUIVO_ICONES.exists() else {"escolha": {}}
    print("\nBordas por tipo: " + ", ".join(f"{t['rotulo']} {t['borda']}" for t in p["tipos"]))
    print(f"\n{'subtipo':<55}{'família':<11}{'miolo':<9}{'ícone':<9}{'ícone (MDI)':<28}")
    for t, s, f in SUBTIPOS:
        k = f"{t}||{s}"
        e = p["subtipos"][k]
        print(f"{s:<55}{f:<11}{e['cor']:<9}{e['texto']:<9}{ic['escolha'].get(k, '—'):<28}")
    d = distancias()
    print("\nDistâncias (ΔE OKLab ×100) por vista — normal, protanopia, deuteranopia, tritanopia:")
    for chave, rot in (("bases_por_vista", "cores-base    "), ("bordas_por_vista", "entre bordas  ")):
        print(f"  {rot}: " + "  ".join(f"{v[:5]} {x:5.1f}" for v, x in d[chave].items()))
    m = d["mesma_familia"]
    print(f"  pior par na mesma família: {m[1][1]} × {m[2][1]} = {m[0]:.1f}")
    print(f"  pares de famílias diferentes: {d['confundiveis']} de {d['pares_cruzados']} com ΔE < {LIMIAR_CONFUNDIVEL:.0f}; os piores:")
    for dd, a, b in d["piores_cruzados"]:
        print(f"    {dd:4.1f}  {a[1]} × {b[1]}")


def main():
    import argparse
    import os

    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--conferir", action="store_true", help="confere contra sucupira.db")
    parser.add_argument("--db", default="sucupira.db")
    args = parser.parse_args()

    _autoteste()
    _tabela()
    if args.conferir:
        if not os.path.exists(args.db):
            raise SystemExit(f"erro: {args.db} não existe")
        _conferir(args.db)


if __name__ == "__main__":
    main()
