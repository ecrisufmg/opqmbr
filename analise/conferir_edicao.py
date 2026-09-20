"""
Confere que o `dist/` da **edição pública** não carrega nada da edição completa — e que o único script de
terceiro que ele carrega é o do Umami do autor, com os atributos que a política de privacidade promete.

O site tem duas edições (docs/DEPLOY.md, "Edição pública e edição completa"). A pública sai sem as abas
"O campo em números" e "Conceito CAPES" e sem as notas da CAPES em qualquer arquivo de dados. Essa separação é feita
na compilação (`site/vite.config.ts`, `site/src/dados/edicao.ts`); este script confere o resultado, e por isso
roda antes de toda publicação (`publicar_site_github.sh` e o workflow do GitHub Actions).

**Estatísticas de uso** (docs/PLANO_UMAMI_PROTECAO.md). O site é autocontido de propósito, e sem cabeçalho de
CSP (o GitHub Pages não os deixa configurar) esta conferência é o que faz esse desenho valer:

  * nenhum `<script src>` de outro servidor além do Umami do autor (`HOSTS_UMAMI`);
  * se a tag do Umami estiver presente: exatamente **uma**, com `data-website-id` (UUID) e os atributos que a
    página Sobre promete (`data-domains`, `data-do-not-track`, `data-exclude-search`), e sem `data-performance`
    (Web Vitals não estão na política);
  * a edição completa (`dist-completa/`, se existir ao lado do `dist/`) **nunca** carrega rastreador.

O host permitido está escrito aqui **e** em `site/.env.production`, de propósito: um conferidor que lesse o
mesmo arquivo que confere não pegaria uma troca errada.

Uso:
    python3 -m analise.conferir_edicao [site/dist]
    python3 -m analise.conferir_edicao --autoteste

Stdlib pura. Sai com código 1 se achar qualquer resíduo.
"""

import json
import re
import sys
import tempfile
from pathlib import Path
from urllib.parse import urlparse

ARQUIVOS_PROIBIDOS = ["indices.json", "distribuicao_notas.json", "totais_nacionais.json"]
CHAVES_PROIBIDAS = ("nota_2025", "nota_anterior", "nota_final", "variacao_nota", "\"variacao\"")
# Textos que só existem no código das abas reservadas: se aparecerem no pacote, o código entrou.
MARCAS_NO_PACOTE = ["Conceito CAPES", "Matriz de transição", "Perfil dos índices, lado a lado", "O campo em números"]

# Único servidor de terceiro que o site público pode chamar por <script src>.
HOSTS_UMAMI = {"stats.ecris.cc"}
# O que a política de privacidade da página Sobre promete: só em ecris.cc, respeita o DNT, sem query string.
ATRIBUTOS_UMAMI = {"data-domains": "ecris.cc", "data-do-not-track": "true", "data-exclude-search": "true"}
ATRIBUTOS_UMAMI_PROIBIDOS = ("data-performance",)
UUID = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", re.I)

TAG_SCRIPT = re.compile(r"<script\b([^>]*)>", re.I)
ATRIBUTO = re.compile(r"""([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?""")


def _atributos(bruto: str) -> dict:
    saida = {}
    for m in ATRIBUTO.finditer(bruto):
        valor = next((g for g in m.groups()[1:] if g is not None), "")
        saida[m.group(1).lower()] = valor
    return saida


def _host(src: str) -> str:
    return urlparse("https:" + src if src.startswith("//") else src).netloc.lower()


def conferir_html(html: str, nome: str, permitir_rastreador: bool = True) -> list:
    """Problemas de scripts de terceiros e da tag do Umami em um HTML. Função pura (o autoteste a usa)."""
    problemas = []
    umami = 0
    for m in TAG_SCRIPT.finditer(html):
        a = _atributos(m.group(1))
        src = a.get("src", "")
        if not src.lower().startswith(("http://", "https://", "//")):
            continue  # script do próprio site (ou inline)
        host = _host(src)
        if host not in HOSTS_UMAMI:
            problemas.append(f"{nome}: <script src> de terceiro ({host}); o site público é autocontido")
            continue
        umami += 1
        if not permitir_rastreador:
            problemas.append(f"{nome}: a edição completa não pode carregar o rastreador ({host})")
            continue
        if not UUID.match(a.get("data-website-id", "")):
            problemas.append(f"{nome}: tag do Umami sem data-website-id válido (UUID)")
        for atributo, esperado in ATRIBUTOS_UMAMI.items():
            if a.get(atributo) != esperado:
                problemas.append(f"{nome}: tag do Umami com {atributo}={a.get(atributo)!r}; a política promete {esperado!r}")
        for atributo in ATRIBUTOS_UMAMI_PROIBIDOS:
            if atributo in a:
                problemas.append(f"{nome}: tag do Umami com {atributo}, que a política de privacidade não cobre")
    if umami > 1:
        problemas.append(f"{nome}: {umami} tags do Umami (deveria haver uma)")
    return problemas


def _tem_rastreador(html: str) -> bool:
    return any(_host(_atributos(m.group(1)).get("src", "x")) in HOSTS_UMAMI for m in TAG_SCRIPT.finditer(html)
               if _atributos(m.group(1)).get("src", "").lower().startswith(("http://", "https://", "//")))


def conferir(dist: Path) -> list:
    problemas = []
    if not (dist / "index.html").exists():
        return [f"{dist}/index.html não existe (rode `npm run build` em site/)"]
    if not (dist / "404.html").exists():
        problemas.append("404.html ausente: links diretos para rotas do site dariam erro no GitHub Pages")

    for pagina in ("index.html", "404.html"):
        if (dist / pagina).exists():
            problemas += conferir_html((dist / pagina).read_text(encoding="utf-8"), pagina)

    completa = dist.parent / "dist-completa" / "index.html"
    if completa.exists():
        problemas += conferir_html(completa.read_text(encoding="utf-8"), "dist-completa/index.html", permitir_rastreador=False)

    dados = dist / "data"
    for nome in ARQUIVOS_PROIBIDOS:
        if (dados / nome).exists():
            problemas.append(f"data/{nome} não deveria estar na edição pública")

    for arquivo in sorted(dados.glob("*.json")) if dados.exists() else []:
        texto = arquivo.read_text(encoding="utf-8")
        for chave in CHAVES_PROIBIDAS:
            if chave in texto:
                problemas.append(f"data/{arquivo.name} contém {chave} (notas da CAPES)")

    for js in sorted((dist / "assets").glob("*.js")) if (dist / "assets").exists() else []:
        texto = js.read_text(encoding="utf-8", errors="ignore")
        for marca in MARCAS_NO_PACOTE:
            if marca in texto:
                problemas.append(f"assets/{js.name} contém \"{marca}\": código de aba reservada no pacote público")
    return problemas


def autoteste() -> int:
    """Exercita `conferir_html` e a checagem da edição completa com HTML sintético."""
    uuid = "e3123236-7e60-4bfc-b90c-9d1e99645e45"
    bom = (f'<head><script type="application/ld+json">{{}}</script><script type="module" src="/assets/i.js"></script>'
           f'<script defer src="https://stats.ecris.cc/script.js" data-website-id="{uuid}" data-domains="ecris.cc" '
           f'data-do-not-track="true" data-exclude-search="true"></script></head>')
    sem_tag = '<head><script type="module" src="/assets/i.js"></script></head>'

    def com(trocar: str, por: str) -> str:
        assert trocar in bom, trocar
        return bom.replace(trocar, por)

    casos = [
        # (descrição, html, permitir_rastreador, deve_falhar)
        ("sem rastreador é válido", sem_tag, True, False),
        ("tag correta é válida", bom, True, False),
        ("sem data-do-not-track", com(' data-do-not-track="true"', ""), True, True),
        ("sem data-exclude-search", com(' data-exclude-search="true"', ""), True, True),
        ("data-domains diferente", com('data-domains="ecris.cc"', 'data-domains="outro.org"'), True, True),
        ("sem data-website-id", com(f' data-website-id="{uuid}"', ""), True, True),
        ("data-website-id não é UUID", com(uuid, "abc"), True, True),
        ("data-performance ligado", com("></script></head>", ' data-performance="true"></script></head>'), True, True),
        ("duas tags do Umami", bom.replace("</head>", bom[bom.index('<script defer'):]), True, True),
        ("script de outro servidor", sem_tag.replace("</head>", '<script src="https://cdn.exemplo.org/x.js"></script></head>'), True, True),
        ("script protocol-relative de terceiro", sem_tag.replace("</head>", '<script src="//cdn.exemplo.org/x.js"></script></head>'), True, True),
        ("host parecido com o do Umami", com("stats.ecris.cc", "stats.ecris.cc.evil.example"), True, True),
        ("edição completa sem rastreador", sem_tag, False, False),
        ("edição completa com rastreador", bom, False, True),
    ]
    falhas = 0
    for descricao, html, permitir, deve_falhar in casos:
        falhou = bool(conferir_html(html, "t.html", permitir))
        ok = falhou == deve_falhar
        falhas += not ok
        print(f"  {'ok  ' if ok else 'FALHA'} {descricao}")

    # Integração: `conferir` olha o `dist-completa/` ao lado do `dist/`.
    with tempfile.TemporaryDirectory() as tmp:
        raiz = Path(tmp)
        for pasta, html in (("dist", bom), ("dist-completa", bom)):
            (raiz / pasta).mkdir()
            (raiz / pasta / "index.html").write_text(html, encoding="utf-8")
        (raiz / "dist" / "404.html").write_text(bom, encoding="utf-8")
        problemas = conferir(raiz / "dist")
        ok = any("dist-completa" in p for p in problemas)
        falhas += not ok
        print(f"  {'ok  ' if ok else 'FALHA'} conferir() acusa rastreador em dist-completa/")
        (raiz / "dist-completa" / "index.html").write_text(sem_tag, encoding="utf-8")
        ok = conferir(raiz / "dist") == []
        falhas += not ok
        print(f"  {'ok  ' if ok else 'FALHA'} conferir() passa com a completa limpa")

    print("autoteste:", "FALHOU" if falhas else "OK")
    return 1 if falhas else 0


def main() -> int:
    if "--autoteste" in sys.argv[1:]:
        return autoteste()
    dist = Path(sys.argv[1] if len(sys.argv) > 1 else "site/dist")
    problemas = conferir(dist)
    if problemas:
        print(f"ERRO: {dist} não é uma edição pública limpa:")
        for p in problemas:
            print(f"  - {p}")
        return 1
    rastreador = _tem_rastreador((dist / "index.html").read_text(encoding="utf-8"))
    print(f"OK: {dist} é uma edição pública limpa (sem abas reservadas e sem notas da CAPES; "
          f"{'com o rastreador do Umami, conforme a política' if rastreador else 'sem rastreador'}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
