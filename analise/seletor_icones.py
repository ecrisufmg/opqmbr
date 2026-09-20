"""
Escolha do ícone de cada subtipo de produção — a ferramenta e a tabela de candidatos.

Cada produção no Atlas é um **círculo** com a **borda** na cor do tipo, o **fill** na cor da
família do subtipo e, dentro, um **ícone plano monocromático** que diz qual é o subtipo. Os
ícones vêm dos *Material Design Icons* (Pictogrammers, Apache-2.0): ~7,4 mil ícones num mesmo
estilo e numa mesma grade 24×24, cada um um único traçado — o que garante o "mesmo estilo".

Este módulo faz duas coisas:

1. **`--gerar`**: monta uma **página web local** (`derivados/seletor_icones.html`, fora do git)
   em que se escolhe o ícone de cada um dos 27 subtipos. Cada subtipo vem com candidatos
   pré-selecionados (o primeiro é a seleção prévia) e uma **busca em toda a biblioteca**. A
   página mostra a marca final (borda + fill + ícone) e um painel com as 27 marcas juntas. A
   escolha se **exporta em JSON**.
2. **`--aplicar escolha.json`**: lê esse JSON e grava `analise/icones_producao.json` — a escolha
   versionada, com o traçado de cada ícone escolhido (é o que o build usa; a biblioteca
   inteira não entra no repositório).

Uso (a biblioteca é baixada com `npm pack @mdi/svg` e descompactada em qualquer pasta):
    python3 -m analise.seletor_icones --padrao   --mdi <pasta>/package     # seleção prévia
    python3 -m analise.seletor_icones --gerar    --mdi <pasta>/package     # abre o seletor
    python3 -m analise.seletor_icones --servir                             # http://127.0.0.1:8765
    python3 -m analise.seletor_icones --aplicar escolha.json --mdi <pasta>/package

Stdlib pura.
"""

import argparse
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ARQUIVO = RAIZ / "analise" / "icones_producao.json"
SAIDA_HTML = RAIZ / "derivados" / "seletor_icones.html"
FONTE = "Material Design Icons 7.4.47 (Pictogrammers), licença Apache-2.0"

# Candidatos por subtipo, na ordem de preferência: o **primeiro é a seleção prévia**. Chave =
# "TIPO||SUBTIPO", como a Plataforma publica.
CANDIDATOS = {
    # --- BIBLIOGRÁFICA ------------------------------------------------------
    "BIBLIOGRÁFICA||TRABALHO EM ANAIS": ["file-document-multiple", "text-box-multiple", "bookshelf", "archive", "file-document-outline", "book-open-page-variant"],
    "BIBLIOGRÁFICA||ARTIGO EM PERIÓDICO": ["file-document", "text-box", "script-text", "notebook", "book-open-variant", "file-certificate"],
    "BIBLIOGRÁFICA||ARTIGO EM JORNAL OU REVISTA": ["newspaper", "newspaper-variant", "newspaper-variant-outline", "card-text", "book-open-blank-variant", "postage-stamp"],
    "BIBLIOGRÁFICA||LIVRO": ["book", "book-open-variant", "book-open-page-variant", "book-multiple", "bookmark", "library"],
    "BIBLIOGRÁFICA||TRADUÇÃO": ["translate", "earth", "comment-text-multiple", "swap-horizontal", "alphabetical-variant", "format-text-variant"],
    "BIBLIOGRÁFICA||PARTITURA MUSICAL": ["music-clef-treble", "music-note-eighth", "file-music", "music-note-sixteenth", "piano", "format-list-numbered"],
    "BIBLIOGRÁFICA||OUTRO": ["dots-horizontal", "shape", "help-circle", "asterisk", "tag", "cube-outline"],
    "BIBLIOGRÁFICA||OUTRO (BIBLIOGRÁFICA)": ["file-question", "dots-vertical", "text-box-outline", "bookmark-outline", "paperclip", "note-text"],
    # --- ARTÍSTICO-CULTURAL -------------------------------------------------
    "ARTÍSTICO-CULTURAL||MÚSICA": ["music-note", "music", "guitar-acoustic", "piano", "microphone-variant", "headphones"],
    "ARTÍSTICO-CULTURAL||OUTRA PRODUÇÃO CULTURAL": ["star-four-points", "palette", "film", "camera", "drama-masks", "shape-plus"],
    "ARTÍSTICO-CULTURAL||ARTES CÊNICAS": ["drama-masks", "theater", "human-greeting-variant", "dance-ballroom", "account-group", "spotlight-beam"],
    "ARTÍSTICO-CULTURAL||ARTES VISUAIS": ["palette", "image", "brush", "image-frame", "eye", "draw"],
    # --- TÉCNICA -----------------------------------------------------------
    "TÉCNICA||APRESENTAÇÃO DE TRABALHO": ["presentation", "presentation-play", "account-voice", "podium", "monitor-speaker", "file-presentation-box"],
    "TÉCNICA||CURSO DE CURTA DURAÇÃO": ["school", "human-male-board", "certificate", "notebook-edit", "school-outline", "book-education-outline"],
    "TÉCNICA||PROGRAMA DE RÁDIO OU TV": ["radio", "television", "radio-tower", "microphone", "podcast", "video"],
    "TÉCNICA||ORGANIZAÇÃO DE EVENTO": ["calendar-star", "calendar-check", "ticket", "account-group", "flag-checkered", "party-popper"],
    "TÉCNICA||SERVIÇOS TÉCNICOS": ["wrench", "tools", "cog", "hammer-wrench", "toolbox", "cogs"],
    "TÉCNICA||EDITORIA": ["pencil", "file-edit", "book-edit", "format-quote-close", "typewriter", "notebook-edit-outline"],
    "TÉCNICA||RELATÓRIO DE PESQUISA": ["file-chart", "chart-line", "clipboard-text", "flask", "microscope", "file-search"],
    "TÉCNICA||MANUTENÇÃO DE OBRA ARTÍSTICA": ["hammer", "toolbox-outline", "broom", "restore", "brush-variant", "wrench-cog"],
    "TÉCNICA||DESENVOLVIMENTO DE MATERIAL DIDÁTICO E INSTRUCIONAL": ["book-education", "clipboard-list", "notebook", "lightbulb-on", "bookshelf", "school"],
    "TÉCNICA||DESENVOLVIMENTO DE APLICATIVO": ["cellphone", "application", "cellphone-cog", "code-tags", "apps", "monitor"],
    "TÉCNICA||DESENVOLVIMENTO DE TÉCNICA": ["lightbulb", "cog-outline", "flask-outline", "puzzle", "brain", "tune"],
    "TÉCNICA||DESENVOLVIMENTO DE PRODUTO": ["package-variant", "cube", "cube-outline", "archive", "factory", "tag"],
    "TÉCNICA||PATENTE": ["shield-check", "certificate", "license", "lock", "shield-star", "stamper"],
    "TÉCNICA||OUTRO": ["dots-horizontal-circle", "shape-outline", "help-circle-outline", "asterisk-circle-outline", "tag-outline", "cube"],
    "TÉCNICA||OUTRO (TÉCNICA)": ["dots-vertical-circle", "help-rhombus", "star-circle-outline", "tag-multiple", "paperclip", "note-text-outline"],
}


def _biblioteca(mdi: Path):
    """{nome: traçado} de todos os ícones + os tags/apelidos de cada um (para a busca)."""
    svgs = mdi / "svg"
    if not svgs.is_dir():
        raise SystemExit(f"erro: {svgs} não existe — aponte --mdi para a pasta `package` do @mdi/svg")
    caminhos = {}
    for f in svgs.glob("*.svg"):
        m = re.search(r'<path d="([^"]+)"', f.read_text(encoding="utf-8"))
        if m:
            caminhos[f.stem] = m.group(1).strip()
    meta = {}
    mj = mdi / "meta.json"
    if mj.exists():
        for x in json.loads(mj.read_text(encoding="utf-8")):
            meta[x["name"]] = " ".join([x["name"].replace("-", " ")] + x.get("aliases", []) + x.get("tags", [])).lower()
    return caminhos, meta


def _validar_candidatos(caminhos):
    faltam = [(k, n) for k, v in CANDIDATOS.items() for n in v if n not in caminhos]
    if faltam:
        raise SystemExit(f"erro: candidatos que não existem na biblioteca: {faltam}")


def _tabela_subtipos():
    """Os 27 subtipos, na ordem da legenda (a de `esquema_producao.SUBTIPOS`)."""
    from analise.esquema_producao import SUBTIPOS

    return [(t, s) for t, s, *_ in SUBTIPOS]


def escolha_atual():
    """A escolha versionada ({chave: nome}), ou None se ainda não existe."""
    if not ARQUIVO.exists():
        return None
    return json.loads(ARQUIVO.read_text(encoding="utf-8"))["escolha"]


def gravar(escolha, caminhos):
    chaves = {f"{t}||{s}" for t, s in _tabela_subtipos()}
    if set(escolha) != chaves:
        raise SystemExit(
            f"erro: a escolha precisa cobrir exatamente os {len(chaves)} subtipos. "
            f"Faltam {sorted(chaves - set(escolha))}; sobram {sorted(set(escolha) - chaves)}"
        )
    inexistentes = sorted({n for n in escolha.values() if n not in caminhos})
    if inexistentes:
        raise SystemExit(f"erro: ícones que não existem na biblioteca: {inexistentes}")
    ordenada = {f"{t}||{s}": escolha[f"{t}||{s}"] for t, s in _tabela_subtipos()}
    dados = {
        "fonte": FONTE,
        "escolha": ordenada,
        "icones": {n: caminhos[n] for n in sorted(set(ordenada.values()))},
    }
    ARQUIVO.write_text(json.dumps(dados, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"gravado {ARQUIVO.relative_to(RAIZ)}: {len(ordenada)} subtipos, {len(dados['icones'])} ícones distintos")


def padrao(mdi: Path):
    caminhos, _ = _biblioteca(mdi)
    _validar_candidatos(caminhos)
    gravar({k: v[0] for k, v in CANDIDATOS.items()}, caminhos)


def aplicar(arquivo: Path, mdi: Path):
    caminhos, _ = _biblioteca(mdi)
    bruto = json.loads(arquivo.read_text(encoding="utf-8"))
    gravar(bruto.get("escolha", bruto), caminhos)


# ---------------------------------------------------------------------------
# A página do seletor
# ---------------------------------------------------------------------------

def gerar(mdi: Path, db: Path | None):
    from analise import esquema_producao

    caminhos, meta = _biblioteca(mdi)
    _validar_candidatos(caminhos)
    atual = escolha_atual() or {k: v[0] for k, v in CANDIDATOS.items()}

    # cores (a paleta do esquema, sem depender dos ícones) e contagens/exemplos da base
    cores = esquema_producao.paleta()
    contagem, exemplo = {}, {}
    if db and db.exists():
        import sqlite3

        con = sqlite3.connect(db)
        for t, s, n in con.execute("SELECT tipo, subtipo, COUNT(*) FROM producoes GROUP BY tipo, subtipo"):
            contagem[f"{(t or '').upper()}||{(s or '').upper()}"] = n
        for t, s, nome in con.execute(
            "SELECT tipo, subtipo, nome FROM producoes WHERE nome IS NOT NULL AND length(nome) BETWEEN 25 AND 90 "
            "GROUP BY tipo, subtipo"
        ):
            exemplo[f"{(t or '').upper()}||{(s or '').upper()}"] = nome
        con.close()

    subtipos = []
    for t, s in _tabela_subtipos():
        k = f"{t}||{s}"
        subtipos.append({
            "chave": k, "tipo": t, "subtipo": s,
            "n": contagem.get(k), "exemplo": exemplo.get(k),
            "fill": cores["subtipos"][k]["cor"], "texto": cores["subtipos"][k]["texto"],
            "familia": cores["subtipos"][k]["familia"],
            "candidatos": CANDIDATOS[k], "atual": atual[k],
        })
    # ícones que a página precisa: todos, para a busca livre (o traçado é curto)
    biblioteca = {n: [caminhos[n], meta.get(n, n)] for n in sorted(caminhos)}
    dados = {
        "tipos": {t["chave"]: {"rotulo": t["rotulo"], "borda": t["borda"]} for t in cores["tipos"]},
        "subtipos": subtipos,
        "biblioteca": biblioteca,
        "padrao": {k: v[0] for k, v in CANDIDATOS.items()},
        "fonte": FONTE,
    }
    SAIDA_HTML.parent.mkdir(parents=True, exist_ok=True)
    SAIDA_HTML.write_text(_HTML.replace("__DADOS__", json.dumps(dados, ensure_ascii=False, separators=(",", ":"))), encoding="utf-8")
    print(f"gerado {SAIDA_HTML.relative_to(RAIZ)} ({SAIDA_HTML.stat().st_size / 1e6:.1f} MB, {len(caminhos)} ícones na busca)")
    return SAIDA_HTML


_HTML = r"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Seletor de ícones — subtipos de produção</title>
<style>
:root{--bg:#fafaf8;--sf:#fff;--bd:#e2e0db;--tx:#1a1a1a;--mu:#6b6860;--ac:#2d5a9e;--acl:#eef3fb}
*{box-sizing:border-box}body{margin:0;font:14px/1.45 system-ui,sans-serif;background:var(--bg);color:var(--tx)}
header{position:sticky;top:0;z-index:5;background:var(--sf);border-bottom:1px solid var(--bd);padding:.6rem 1rem;display:flex;gap:.6rem;align-items:center;flex-wrap:wrap}
header h1{font-size:1rem;margin:0 auto 0 0}button{font:inherit;padding:.35rem .7rem;border:1px solid var(--bd);border-radius:6px;background:var(--sf);cursor:pointer}
button.pri{background:var(--ac);color:#fff;border-color:var(--ac)}button:hover{border-color:var(--ac)}
main{max-width:1200px;margin:0 auto;padding:1rem}.aviso{background:var(--acl);border:1px solid var(--bd);border-radius:8px;padding:.6rem .8rem;margin-bottom:1rem}
h2{font-size:.95rem;margin:1.4rem 0 .5rem;padding-bottom:.25rem;border-bottom:3px solid}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:8px;padding:.7rem;margin-bottom:.7rem;display:grid;grid-template-columns:96px 1fr;gap:.8rem}
.prev{display:flex;flex-direction:column;align-items:center;gap:.3rem;font-size:.7rem;color:var(--mu);text-align:center}
.nome{font-weight:700}.meta{color:var(--mu);font-size:.78rem}.cand{display:flex;flex-wrap:wrap;gap:.4rem;margin:.4rem 0}
.op{border:2px solid transparent;border-radius:8px;padding:2px;background:none;line-height:0}.op.sel{border-color:var(--ac);background:var(--acl)}
.op small{display:block;font-size:.6rem;line-height:1.1;color:var(--mu);max-width:64px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:1px}
input[type=search]{font:inherit;padding:.3rem .5rem;border:1px solid var(--bd);border-radius:6px;width:16rem}
.res{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.4rem;max-height:9.5rem;overflow:auto}
#todas{display:flex;flex-wrap:wrap;gap:.5rem;background:var(--sf);border:1px solid var(--bd);border-radius:8px;padding:.7rem}
.mini{display:flex;flex-direction:column;align-items:center;width:78px;font-size:.62rem;text-align:center;color:var(--mu);line-height:1.1}
</style></head><body>
<header><h1>Ícone de cada subtipo de produção</h1>
<button id="padrao">Restaurar a seleção prévia</button>
<button id="copiar">Copiar JSON</button><button id="baixar">Baixar escolha_icones.json</button><button class="pri" id="salvar" title="Só funciona quando a página é aberta por `python3 -m analise.seletor_icones --servir`">Salvar no projeto</button><span id="aviso" class="meta"></span></header>
<main>
<div class="aviso"><b>Como usar.</b> Cada linha é um subtipo; o círculo à esquerda mostra como ele ficará no mapa (<b>borda</b> = tipo, <b>fundo</b> = família do subtipo, <b>ícone</b> = o que você escolhe). Clique num candidato para escolher, ou use a <b>busca</b> (em inglês: <i>music, book, wrench…</i>) para qualquer dos __N__ ícones. Sua escolha fica salva neste navegador. Quando terminar, <b>baixe o JSON</b> (ou copie) e me passe.<br>
<span class="meta">Ícones: __FONTE__. Todos são planos, monocromáticos e de uma mesma grade 24×24.</span></div>
<div id="lista"></div>
<h2 style="border-color:var(--mu)">As 27 marcas juntas (para ver se o conjunto se distingue)</h2><div id="todas"></div>
</main>
<script>
const D=__DADOS__;
const K="seletor_icones_v1";
let escolha=Object.assign({},Object.fromEntries(D.subtipos.map(s=>[s.chave,s.atual])));
try{const g=JSON.parse(localStorage.getItem(K)||"null");if(g)for(const k in g)if(k in escolha&&D.biblioteca[g[k]])escolha[k]=g[k]}catch(e){}
const salvar=()=>{try{localStorage.setItem(K,JSON.stringify(escolha))}catch(e){}};
const NS="http://www.w3.org/2000/svg";
function marca(s,nome,tam){const b=D.tipos[s.tipo].borda,p=D.biblioteca[nome][0];
 return `<svg width="${tam}" height="${tam}" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20.5" fill="${s.fill}" stroke="${b}" stroke-width="5"/><g transform="translate(24 24) scale(1.05) translate(-12 -12)"><path d="${p}" fill="${s.texto}"/></g></svg>`}
function glifo(nome,tam,cor){return `<svg width="${tam}" height="${tam}" viewBox="0 0 24 24"><path d="${D.biblioteca[nome][0]}" fill="${cor||'currentColor'}"/></svg>`}
function op(s,nome){return `<button class="op${escolha[s.chave]===nome?' sel':''}" data-k="${s.chave}" data-n="${nome}" title="${nome}">${marca(s,nome,52)}<small>${nome}</small></button>`}
function desenhar(){
 let h="",tipo=null;
 for(const s of D.subtipos){
  if(s.tipo!==tipo){tipo=s.tipo;h+=`<h2 style="border-color:${D.tipos[tipo].borda};color:${D.tipos[tipo].borda}">${D.tipos[tipo].rotulo}</h2>`}
  const cands=[...new Set([...s.candidatos,escolha[s.chave]])];
  h+=`<div class="card" id="c-${CSS.escape(s.chave)}"><div class="prev">${marca(s,escolha[s.chave],72)}<span>${escolha[s.chave]}</span></div>
  <div><div class="nome">${s.subtipo.toLowerCase()}</div><div class="meta">${s.n?s.n.toLocaleString('pt-BR')+' produções':''}${s.exemplo?' · ex.: “'+s.exemplo+'”':''}</div>
  <div class="cand">${cands.map(n=>op(s,n)).join("")}</div>
  <input type="search" placeholder="buscar outro ícone (ex.: music, book, wrench)" data-k="${s.chave}"><div class="res"></div></div></div>`}
 document.getElementById("lista").innerHTML=h;
 document.getElementById("todas").innerHTML=D.subtipos.map(s=>`<div class="mini">${marca(s,escolha[s.chave],44)}${s.subtipo.toLowerCase()}</div>`).join("");
}
function escolher(k,n){escolha[k]=n;salvar();const y=scrollY;desenhar();scrollTo(0,y)}
document.addEventListener("click",e=>{const b=e.target.closest(".op");if(b)escolher(b.dataset.k,b.dataset.n)});
document.addEventListener("input",e=>{const i=e.target.closest("input[type=search]");if(!i)return;const q=i.value.trim().toLowerCase(),s=D.subtipos.find(x=>x.chave===i.dataset.k),r=i.parentElement.querySelector(".res");
 if(q.length<2){r.innerHTML="";return}const ach=[];for(const n in D.biblioteca){if(D.biblioteca[n][1].includes(q)){ach.push(n);if(ach.length>=80)break}}
 r.innerHTML=ach.map(n=>op(s,n)).join("")||"<span class='meta'>nada encontrado</span>"});
const json=()=>JSON.stringify({escolha},null,1);
document.getElementById("baixar").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([json()],{type:"application/json"}));a.download="escolha_icones.json";a.click()};
document.getElementById("copiar").onclick=async()=>{try{await navigator.clipboard.writeText(json());alert("JSON copiado. Cole na conversa.")}catch(e){prompt("Copie:",json())}};
document.getElementById("salvar").onclick=async()=>{const av=document.getElementById("aviso");try{const r=await fetch("/salvar",{method:"POST",headers:{"Content-Type":"application/json"},body:json()});if(!r.ok)throw new Error(r.status);av.textContent="✓ salvo em derivados/escolha_icones.json — avise que terminou";}catch(e){av.textContent="Não deu para salvar direto (página aberta como arquivo?). Use “Baixar” ou “Copiar JSON”."}};
document.getElementById("padrao").onclick=()=>{escolha=Object.assign({},D.padrao);salvar();desenhar()};
desenhar();
</script></body></html>
""".replace("__N__", "7.447").replace("__FONTE__", FONTE)


def servir(porta: int):
    """Serve `derivados/` em 127.0.0.1 e recebe a escolha em POST /salvar (só localhost)."""
    from http.server import BaseHTTPRequestHandler, HTTPServer

    pasta = SAIDA_HTML.parent
    destino = pasta / "escolha_icones.json"

    class H(BaseHTTPRequestHandler):
        def _enviar(self, codigo, corpo=b"", tipo="text/plain; charset=utf-8"):
            self.send_response(codigo)
            self.send_header("Content-Type", tipo)
            self.send_header("Content-Length", str(len(corpo)))
            self.end_headers()
            self.wfile.write(corpo)

        def do_GET(self):
            if self.path.split("?")[0] in ("/", "/seletor_icones.html"):
                self._enviar(200, SAIDA_HTML.read_bytes(), "text/html; charset=utf-8")
            else:
                self._enviar(404, b"nao encontrado")

        def do_POST(self):
            if self.path != "/salvar":
                return self._enviar(404, b"nao encontrado")
            n = int(self.headers.get("Content-Length", "0"))
            try:
                dados = json.loads(self.rfile.read(n))
                assert isinstance(dados.get("escolha"), dict)
            except Exception:
                return self._enviar(400, b"json invalido")
            destino.write_text(json.dumps(dados, ensure_ascii=False, indent=1), encoding="utf-8")
            print(f"escolha salva em {destino.relative_to(RAIZ)}", flush=True)
            self._enviar(200, b"ok")

        def log_message(self, *a):  # silencioso
            pass

    if not SAIDA_HTML.exists():
        raise SystemExit("erro: rode --gerar antes")
    print(f"seletor em http://127.0.0.1:{porta}/  (Ctrl+C para parar) — salva em {destino.relative_to(RAIZ)}", flush=True)
    HTTPServer(("127.0.0.1", porta), H).serve_forever()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--mdi", type=Path, default=None, help="pasta `package` do @mdi/svg descompactado (não precisa em --servir)")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--padrao", action="store_true", help="grava a seleção prévia (o 1º candidato de cada subtipo)")
    g.add_argument("--gerar", action="store_true", help="gera o seletor web")
    g.add_argument("--aplicar", type=Path, help="grava a escolha exportada pelo seletor")
    g.add_argument("--servir", action="store_true", help="serve o seletor em localhost e recebe o botão 'Salvar no projeto'")
    ap.add_argument("--db", type=Path, default=RAIZ / "sucupira.db", help="para contagens e exemplos no seletor")
    a = ap.parse_args()
    if a.mdi is None and not a.servir:
        ap.error("--mdi é obrigatório (exceto em --servir)")
    if a.padrao:
        padrao(a.mdi)
    elif a.gerar:
        gerar(a.mdi, a.db)
    elif a.servir:
        servir(8765)
    else:
        aplicar(a.aplicar, a.mdi)


if __name__ == "__main__":
    main()
