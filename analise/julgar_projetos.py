"""
Interface local para o autor **julgar projetos** no navegador (PLANO §4.2.6).

Cada projeto aparece sem o palpite de ninguém — título, instituição, ano e o resumo completo —
e o autor dá, a cada uma das 9 subáreas de nível 1, um grau A–E ou I:

    A muito alto · B alto · C intermediário · D baixo · E muito baixo · I sem relevância

Só **depois** de gravar é que a página revela o rótulo do LLM e o perfil do modelo (retorno para
calibrar o olhar sem ancorar o julgamento — a rodada 1 mostrava tudo ao lado e o resultado saiu
enviesado). Cada julgamento é gravado na hora em `analise/gabarito_glosas.json` (com backup da
sessão em `derivados/backup/`), e alimenta `analise.aderencia`.

Amostragem (o que se mostra a seguir):
  * `aleatorio` — **estratificado pelo rótulo do LLM** (o estrato menos julgado vem primeiro).
    É o modo que permite estimar o desempenho na população: as amostras "de fronteira" são
    viesadas pela dificuldade;
  * `fronteira` — onde o modelo é mais ambíguo ou discorda do rótulo;
  * `area` — projetos ligados a uma área escolhida.
Cerca de 10% das vezes reaparece, **sem aviso**, um caso já julgado (reteste): a concordância
do autor consigo mesmo é o teto realista de qualquer modelo.

Nada sai da máquina: o servidor escuta só em 127.0.0.1 e não publica nada. Stdlib pura.

Uso:
    python3 -m analise.julgar_projetos --servir            # http://127.0.0.1:8766
    python3 -m analise.julgar_projetos --servir --abrir    # e abre o navegador
    python3 -m analise.julgar_projetos --autoteste
"""

import argparse
import json
import os
import random
import shutil
import sqlite3
import threading
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

REPO_ROOT = Path(__file__).parent.parent
DB = REPO_ROOT / "sucupira.db"
GABARITO = REPO_ROOT / "analise" / "gabarito_glosas.json"
GLOSAS = REPO_ROOT / "analise" / "glosas.json"
CLASSIFICACAO = REPO_ROOT / "analise" / "classificacao_projetos.json"
ADERENCIA = REPO_ROOT / "derivados" / "aderencia.json"
BACKUPS = REPO_ROOT / "derivados" / "backup"

RODADA = 3
GRAUS = {"A": 5, "B": 4, "C": 3, "D": 2, "E": 1, "I": 0}
LETRAS = ["I", "E", "D", "C", "B", "A"]
PROB_RETESTE = 0.10
MIN_PARA_RETESTE = 10
PORTA_PADRAO = 8766


# ---------------------------------------------------------------- funções puras

def kendall_tau(a, b):
    """Tau-b de Kendall entre duas listas (sem scipy; o servidor é stdlib)."""
    n = len(a)
    conc = disc = ta = tb = 0
    for i in range(n):
        for j in range(i + 1, n):
            da, db = a[i] - a[j], b[i] - b[j]
            if da == 0 and db == 0:
                continue
            if da == 0:
                ta += 1
            elif db == 0:
                tb += 1
            elif (da > 0) == (db > 0):
                conc += 1
            else:
                disc += 1
    den = ((conc + disc + ta) * (conc + disc + tb)) ** 0.5
    return (conc - disc) / den if den else 0.0


def principais(graus):
    """Índices das áreas de maior grau (empates contam todos)."""
    m = max(graus)
    return [k for k, g in enumerate(graus) if g == m] if m > 0 else []


def letra_de_grau(g):
    return LETRAS[max(0, min(5, int(g + 0.5)))]


# ---------------------------------------------------------------- estado

class Estado:
    def __init__(self):
        self.trava = threading.Lock()
        self.areas = [a["nome"] for a in json.loads(GLOSAS.read_text(encoding="utf-8"))["areas"]]
        self.rotulo = json.loads(CLASSIFICACAO.read_text(encoding="utf-8"))
        self.projetos = self._carregar_projetos()
        self.modelo = self._carregar_modelo()
        self.pulados = set()
        self.desfazer = None  # (id, estado anterior do caso) do último gravado
        self.retestes_pendentes = {}  # id -> True: casos servidos como reteste nesta sessão
        BACKUPS.mkdir(parents=True, exist_ok=True)
        if GABARITO.exists():
            shutil.copy(GABARITO, BACKUPS / f"gabarito_{datetime.now():%Y%m%d_%H%M%S}.json")

    def _carregar_projetos(self):
        con = sqlite3.connect(DB)
        con.row_factory = sqlite3.Row
        prog = {r["id_projeto"]: r["sigla"] for r in con.execute("""
            SELECT DISTINCT pa.id_projeto, i.sigla FROM projeto_ano pa
            JOIN programas g ON g.id_programa = pa.id_programa
            JOIN instituicoes i ON i.id_ies = g.id_ies WHERE pa.id_programa IS NOT NULL""")}
        ano = {}
        for r in con.execute("SELECT id_projeto, aba FROM projeto_ano"):
            try:
                a = int(r["aba"])
            except (TypeError, ValueError):
                continue
            if a > ano.get(r["id_projeto"], 0):
                ano[r["id_projeto"]] = a
        projetos = {}
        for r in con.execute("SELECT id_projeto, nome, descricao FROM projetos WHERE descricao IS NOT NULL AND TRIM(descricao) != ''"):
            if r["id_projeto"] in self.rotulo:
                projetos[r["id_projeto"]] = {"id": r["id_projeto"], "titulo": r["nome"] or "(sem título)",
                                             "sigla": prog.get(r["id_projeto"]), "ano": ano.get(r["id_projeto"]),
                                             "descricao": r["descricao"].strip()}
        con.close()
        return projetos

    def _carregar_modelo(self):
        if not ADERENCIA.exists():
            return None
        s = json.loads(ADERENCIA.read_text(encoding="utf-8"))
        return {"grau": {pid: s["grau"][i] for i, pid in enumerate(s["ids"])}, "n": s["n_julgamentos"],
                "validacao": s.get("validacao", {})}

    # ---- gabarito
    def ler(self):
        return json.loads(GABARITO.read_text(encoding="utf-8"))

    def gravar(self, g):
        tmp = GABARITO.with_suffix(".tmp")
        tmp.write_text(json.dumps(g, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        os.replace(tmp, GABARITO)

    # ---- amostragem
    def _ambiguidade(self, pid):
        gr = self.modelo["grau"][pid]
        ordem = sorted(gr, reverse=True)
        topo = gr.index(ordem[0])
        # menor = mais interessante: margem curta entre o 1º e o 2º, e mais ainda se o modelo discorda do rótulo
        return (ordem[0] - ordem[1]) - (2.0 if topo != self.rotulo[pid] else 0.0)

    def proximo(self, modo, area):
        g = self.ler()["casos"]
        julgados = {p for p, c in g.items() if "graus" in c or "principal" in c or "alto" in c or "baixo" in c}
        # reteste sem aviso
        com_graus = [p for p, c in g.items() if "graus" in c and not c.get("reteste") and p in self.projetos]
        if len(com_graus) >= MIN_PARA_RETESTE and random.random() < PROB_RETESTE:
            pid = random.choice(com_graus)
            self.retestes_pendentes[pid] = True
            return self.projetos[pid]
        livres = [p for p in self.projetos if p not in julgados and p not in self.pulados]
        if not livres:
            return None
        pid = None
        if modo == "fronteira" and self.modelo:
            livres.sort(key=lambda p: (self._ambiguidade(p) if p in self.modelo["grau"] else 9))
            pid = random.choice(livres[: max(30, len(livres) // 10)])
        elif modo == "area" and area is not None:
            cand = [p for p in livres if self.rotulo[p] == area or (self.modelo and p in self.modelo["grau"]
                    and self.modelo["grau"][p].index(max(self.modelo["grau"][p])) == area)]
            pid = random.choice(cand or livres)
        else:  # aleatório estratificado pelo rótulo do LLM: o estrato menos julgado primeiro
            feitos = [0] * len(self.areas)
            for c in g.values():
                if c.get("modo") == "aleatorio" and "estrato" in c:
                    feitos[c["estrato"]] += 1
            estratos = sorted(range(len(self.areas)), key=lambda k: (feitos[k], random.random()))
            for k in estratos:
                cand = [p for p in livres if self.rotulo[p] == k]
                if cand:
                    pid = random.choice(cand)
                    break
        return self.projetos[pid or random.choice(livres)]

    # ---- gravação de um julgamento
    def julgar(self, pid, graus_letras, modo):
        if pid not in self.projetos:
            raise ValueError("projeto desconhecido")
        if set(graus_letras) != set(self.areas) or any(v not in GRAUS for v in graus_letras.values()):
            raise ValueError("graus inválidos")
        agora = datetime.now().isoformat(timespec="seconds")
        g = self.ler()
        caso = g["casos"].setdefault(pid, {})
        anterior = json.loads(json.dumps(caso))
        reteste = "graus" in caso
        if reteste:
            caso.setdefault("reteste", []).append({"graus": graus_letras, "julgado_em": agora})
        else:
            caso.update({"graus": graus_letras, "rodada": RODADA, "modo": modo, "julgado_em": agora,
                         "estrato": self.rotulo[pid]})
        self.gravar(g)
        self.desfazer = (pid, anterior)
        self.retestes_pendentes.pop(pid, None)
        return self._revelar(pid, graus_letras, caso if reteste else None)

    def _revelar(self, pid, graus_letras, caso_anterior):
        meus = [GRAUS[graus_letras[a]] for a in self.areas]
        pri = principais(meus)
        r = {"rotulo_llm": self.areas[self.rotulo[pid]], "concorda_llm": self.rotulo[pid] in pri,
             "principais": [self.areas[k] for k in pri], "modelo": None, "reteste": None}
        if self.modelo and pid in self.modelo["grau"]:
            gr = self.modelo["grau"][pid]
            r["modelo"] = [{"area": a, "letra": letra_de_grau(gr[k]), "grau": round(gr[k], 2)} for k, a in enumerate(self.areas)]
            r["concorda_modelo"] = gr.index(max(gr)) in pri
            r["tau_modelo"] = round(kendall_tau(meus, gr), 2)
        if caso_anterior:
            antes = [GRAUS[caso_anterior["graus"][a]] for a in self.areas]
            r["reteste"] = {"mesmo_principal": set(principais(antes)) & set(pri) != set(),
                            "tau": round(kendall_tau(meus, antes), 2),
                            "antes": {a: caso_anterior["graus"][a] for a in self.areas}}
        return r

    def desfazer_ultimo(self):
        if not self.desfazer:
            return None
        pid, anterior = self.desfazer
        g = self.ler()
        if anterior:
            g["casos"][pid] = anterior
        else:
            g["casos"].pop(pid, None)
        self.gravar(g)
        self.desfazer = None
        return pid

    # ---- andamento
    def andamento(self):
        g = self.ler()["casos"]
        com = {p: c for p, c in g.items() if "graus" in c and p in self.projetos}
        dist = {l: 0 for l in "ABCDEI"}
        por_modo, dentro = {}, {}
        for p, c in com.items():
            for v in c["graus"].values():
                dist[v] += 1
            modo = c.get("modo") or ("fronteira (rodada 2)" if c.get("rodada") is None else "?")
            por_modo[modo] = por_modo.get(modo, 0) + 1
            pri = principais([GRAUS[c["graus"][a]] for a in self.areas])
            d = dentro.setdefault(modo, {"n": 0, "llm": 0, "modelo": 0})
            d["n"] += 1
            d["llm"] += int(self.rotulo[p] in pri)
            if self.modelo and p in self.modelo["grau"]:
                gr = self.modelo["grau"][p]
                d["modelo"] += int(gr.index(max(gr)) in pri)
        rt = [(c["graus"], r["graus"]) for c in com.values() for r in c.get("reteste", [])]
        taus = [kendall_tau([GRAUS[a[x]] for x in self.areas], [GRAUS[b[x]] for x in self.areas]) for a, b in rt]
        mesmos = [int(bool(set(principais([GRAUS[a[x]] for x in self.areas])) & set(principais([GRAUS[b[x]] for x in self.areas]))))
                  for a, b in rt]
        return {"julgados": len(com), "com_gabarito_antigo": sum(1 for c in g.values() if "graus" not in c),
                "por_modo": por_modo, "letras": dist, "acerto_por_modo": dentro,
                "reteste": {"n": len(rt), "tau_medio": round(sum(taus) / len(taus), 2) if taus else None,
                            "mesmo_principal": round(sum(mesmos) / len(mesmos), 2) if mesmos else None},
                "livres": len([p for p in self.projetos if p not in g]), "modelo": bool(self.modelo)}


# ---------------------------------------------------------------- HTTP

PAGINA = r"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Julgar projetos</title>
<style>
:root{--bg:#f6f5f1;--sf:#fff;--bd:#dedbd3;--tx:#1b1b1b;--mu:#6b6860;--ac:#2d5a9e;--al:#eef3fb;--ok:#2f7d4f;--no:#b4432f;
--g5:#1f4a8c;--g4:#4a76b8;--g3:#86a5d2;--g2:#b9cbe6;--g1:#dde6f3}
@media(prefers-color-scheme:dark){:root{--bg:#161719;--sf:#1f2124;--bd:#33363b;--tx:#ecebe7;--mu:#a09d95;--ac:#7ea6e0;--al:#22303f;
--g5:#7ea6e0;--g4:#5f88c4;--g3:#48699b;--g2:#34496b;--g1:#2a374d}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.5 -apple-system,system-ui,Segoe UI,sans-serif}
header{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;gap:.6rem .9rem;align-items:center;padding:.6rem 1rem;background:var(--sf);border-bottom:1px solid var(--bd)}
header h1{font-size:1rem;margin:0 .4rem 0 0}header select,header button{font:inherit;font-size:.85rem;padding:.3rem .6rem;border:1px solid var(--bd);border-radius:6px;background:var(--sf);color:var(--tx);cursor:pointer}
.mu{color:var(--mu);font-size:.82rem}.sp{flex:1}
main{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:1rem;padding:1rem;max-width:1400px;margin:0 auto}
@media(max-width:900px){main{grid-template-columns:1fr}}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:10px;padding:1rem 1.1rem}
.caso h2{font-size:1.15rem;line-height:1.3;margin:0 0 .3rem}.meta{color:var(--mu);font-size:.85rem;margin-bottom:.7rem}
.desc{white-space:pre-wrap;max-height:calc(100vh - 12rem);overflow:auto;padding-right:.4rem}
.leg{display:flex;flex-wrap:wrap;gap:.35rem .9rem;margin:.1rem 0 .8rem;font-size:.78rem;color:var(--mu)}.leg b{color:var(--tx)}
.linha{display:grid;grid-template-columns:1.4rem minmax(0,1fr) auto;align-items:center;gap:.5rem;padding:.32rem .35rem;border-radius:8px;border:1px solid transparent}
.linha.foco{background:var(--al);border-color:var(--ac)}.num{color:var(--mu);font-size:.8rem;text-align:center}
.nome{font-size:.9rem}.bts{display:flex;gap:3px}
.bt{width:2rem;height:2rem;border:1px solid var(--bd);border-radius:6px;background:var(--sf);color:var(--tx);font-family:inherit;font-weight:600;font-size:.85rem;cursor:pointer;padding:0}
.bt.on[data-l=A]{background:var(--g5);color:#fff;border-color:var(--g5)}.bt.on[data-l=B]{background:var(--g4);color:#fff;border-color:var(--g4)}
.bt.on[data-l=C]{background:var(--g3);color:#fff;border-color:var(--g3)}.bt.on[data-l=D]{background:var(--g2);border-color:var(--g2)}
.bt.on[data-l=E]{background:var(--g1);border-color:var(--g1)}.bt.on[data-l=I]{background:var(--bd);color:var(--mu)}
.acoes{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.9rem;align-items:center}
.pri{background:var(--ac);color:#fff;border:0;border-radius:8px;padding:.55rem 1.1rem;font-family:inherit;font-weight:600;font-size:.95rem;cursor:pointer}
.sec{background:var(--sf);color:var(--tx);border:1px solid var(--bd);border-radius:8px;padding:.5rem .9rem;font:inherit;cursor:pointer}
.aviso{color:var(--no);font-size:.85rem;min-height:1.2rem}.rev h3{margin:.2rem 0 .5rem;font-size:1rem}
.cmp{display:grid;grid-template-columns:minmax(0,1fr) 3.2rem 3.2rem;gap:.15rem .5rem;font-size:.88rem;align-items:center}
.cmp .h{color:var(--mu);font-size:.75rem}.cmp .l{font-weight:700;text-align:center}.cmp .dest{font-weight:600}
.tag{display:inline-block;padding:.05rem .5rem;border-radius:999px;font-size:.78rem;font-weight:600}.sim{background:#dff1e6;color:var(--ok)}.nao{background:#f8e1dc;color:var(--no)}
dialog{border:1px solid var(--bd);border-radius:12px;background:var(--sf);color:var(--tx);max-width:34rem;width:92vw}dialog::backdrop{background:#0006}
table{border-collapse:collapse;width:100%;font-size:.86rem}td,th{padding:.25rem .4rem;border-bottom:1px solid var(--bd);text-align:left}
kbd{background:var(--al);border:1px solid var(--bd);border-radius:4px;padding:0 .3rem;font-size:.8rem}
</style></head><body>
<header><h1>Julgar projetos</h1>
<label class="mu">Amostra <select id="modo"><option value="aleatorio">aleatória (estratificada)</option><option value="fronteira">fronteira (modelo em dúvida)</option><option value="area">por área…</option></select></label>
<select id="area" hidden></select>
<span class="sp"></span><span id="cont" class="mu"></span>
<button id="bAnd">Andamento</button><button id="bDes" title="Desfaz o último julgamento gravado (Z)">Desfazer (Z)</button><button id="bAju">Atalhos (?)</button></header>
<main>
<section class="card caso" id="caso"><p class="mu">Carregando…</p></section>
<section class="card" id="painel"></section>
</main>
<dialog id="dlgAnd"><div id="andCorpo"></div><p style="text-align:right"><button class="sec" onclick="dlgAnd.close()">Fechar</button></p></dialog>
<dialog id="dlgAju"><h3 style="margin-top:0">Atalhos</h3>
<p><kbd>1</kbd>–<kbd>9</kbd> vai para a área · <kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> <kbd>D</kbd> <kbd>E</kbd> <kbd>I</kbd> dá o grau e desce · <kbd>↑</kbd> <kbd>↓</kbd> navega · <kbd>Backspace</kbd> volta a I</p>
<p><kbd>Enter</kbd> grava (e, depois da revelação, avança) · <kbd>P</kbd> pula · <kbd>Z</kbd> desfaz o último</p>
<p class="mu">Julgue o quanto o <b>projeto</b> pertence a cada área, pelo que o resumo descreve. Deixe em I o que não tem relevância.</p>
<p style="text-align:right"><button class="sec" onclick="dlgAju.close()">Fechar</button></p></dialog>
<script>
const AREAS=__AREAS__, L=['A','B','C','D','E','I'];
const ROT={A:'muito alto',B:'alto',C:'intermediário',D:'baixo',E:'muito baixo',I:'sem relevância'};
let caso=null,graus={},foco=0,revelado=false,sessao=0;
const $=id=>document.getElementById(id);
async function api(u,o){const r=await fetch(u,o);if(!r.ok)throw new Error(await r.text());return r.json()}
const esc=s=>String(s??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
async function proximo(){
  revelado=false;const modo=$('modo').value,area=$('area').value;
  caso=await api(`/api/proximo?modo=${modo}&area=${area}`);
  if(!caso||!caso.id){$('caso').innerHTML='<p>Não há mais projetos livres nesta amostra.</p>';$('painel').innerHTML='';return}
  graus={};AREAS.forEach(a=>graus[a]='I');foco=0;desenha();cont();
}
function desenha(){
  $('caso').innerHTML=`<h2>${esc(caso.titulo)}</h2><div class="meta">${esc(caso.sigla||'—')} · ${caso.ano||'—'} · id ${esc(caso.id)}</div><div class="desc">${esc(caso.descricao)}</div>`;
  const leg=L.map(l=>`<span><b>${l}</b> ${ROT[l]}</span>`).join('');
  $('painel').innerHTML=`<div class="leg">${leg}</div><div id="linhas"></div><div class="aviso" id="aviso"></div>
  <div class="acoes"><button class="pri" id="bSalvar">Gravar e ver o retorno (Enter)</button><button class="sec" id="bPular">Pular (P)</button></div>`;
  AREAS.forEach((a,i)=>{const d=document.createElement('div');d.className='linha';d.dataset.i=i;
    d.innerHTML=`<span class="num">${i+1}</span><span class="nome">${esc(a)}</span><span class="bts">${L.map(l=>`<button class="bt" data-l="${l}" data-i="${i}">${l}</button>`).join('')}</span>`;
    $('linhas').appendChild(d)});
  $('linhas').onclick=e=>{const b=e.target.closest('.bt');if(b){foco=+b.dataset.i;set(foco,b.dataset.l)}};
  $('bSalvar').onclick=salvar;$('bPular').onclick=pular;marca();
}
function marca(){document.querySelectorAll('.linha').forEach((r,i)=>{r.classList.toggle('foco',i===foco);
  r.querySelectorAll('.bt').forEach(b=>b.classList.toggle('on',graus[AREAS[i]]===b.dataset.l))})}
function set(i,l){graus[AREAS[i]]=l;if(i<AREAS.length-1)foco=i+1;marca();$('aviso').textContent=''}
async function salvar(){
  if(revelado)return proximo();
  if(!AREAS.some(a=>graus[a]!=='I')){$('aviso').textContent='Marque ao menos uma área — ou pule (P).';return}
  try{const r=await api('/api/julgar',{method:'POST',body:JSON.stringify({id:caso.id,graus,modo:$('modo').value})});
    revelado=true;sessao++;mostra(r);cont()}catch(e){$('aviso').textContent='Erro ao gravar: '+e.message}
}
function mostra(r){
  const linhas=AREAS.map((a,i)=>{const m=r.modelo?r.modelo[i]:null,dest=r.principais.includes(a)||a===r.rotulo_llm;
    return `<span class="${dest?'dest':''}">${esc(a)}${a===r.rotulo_llm?' <span class="mu">← rótulo do LLM</span>':''}</span><span class="l">${graus[a]}</span><span class="l" title="grau previsto ${m?m.grau:''}">${m?m.letra:'—'}</span>`}).join('');
  let extra='';
  if(r.reteste)extra=`<p class="mu">Você já tinha julgado este caso: mesmo principal <span class="tag ${r.reteste.mesmo_principal?'sim':'nao'}">${r.reteste.mesmo_principal?'sim':'não'}</span> · concordância de ordem (tau) ${r.reteste.tau}. Não é problema: mede a sua consistência.</p>`;
  $('painel').innerHTML=`<div class="rev"><h3>Gravado. Retorno</h3>
  <p>Rótulo do LLM: <b>${esc(r.rotulo_llm)}</b> <span class="tag ${r.concorda_llm?'sim':'nao'}">${r.concorda_llm?'concorda':'discorda'} do seu principal</span></p>
  ${r.modelo?`<p>Modelo (híbrido): principal <span class="tag ${r.concorda_modelo?'sim':'nao'}">${r.concorda_modelo?'concorda':'discorda'}</span> · ordem das áreas (tau) ${r.tau_modelo}</p>`:'<p class="mu">Sem modelo calibrado (rode analise.aderencia --gerar).</p>'}
  ${extra}<div class="cmp"><span class="h">área</span><span class="h l">você</span><span class="h l">modelo</span>${linhas}</div>
  <p class="mu" style="font-size:.78rem">Letras do modelo = grau previsto, arredondado; não é probabilidade. O modelo já viu alguns destes casos na calibração.</p>
  <div class="acoes"><button class="pri" id="bSalvar">Próximo (Enter)</button></div></div>`;
  $('bSalvar').onclick=proximo;
}
async function pular(){await api('/api/pular',{method:'POST',body:JSON.stringify({id:caso.id})});proximo()}
async function cont(){const a=await api('/api/andamento');$('cont').textContent=`${a.julgados} julgados · ${sessao} nesta sessão · ${a.livres} livres`}
$('bDes').onclick=async()=>{const r=await api('/api/desfazer',{method:'POST'});
  if(!r.ok)return;cont();
  if(caso&&r.id===caso.id){revelado=false;AREAS.forEach(a=>graus[a]='I');foco=0;desenha();$('aviso').textContent='Julgamento desfeito — julgue de novo, se quiser.'}
  else $('painel').insertAdjacentHTML('afterbegin','<p class="aviso">Julgamento anterior desfeito.</p>')};
$('bAju').onclick=()=>dlgAju.showModal();
$('bAnd').onclick=async()=>{const a=await api('/api/andamento');
  const md=Object.entries(a.acerto_por_modo).map(([m,d])=>`<tr><td>${m}</td><td>${d.n}</td><td>${d.llm} (${Math.round(100*d.llm/d.n)}%)</td><td>${a.modelo?`${d.modelo} (${Math.round(100*d.modelo/d.n)}%)`:'—'}</td></tr>`).join('');
  $('andCorpo').innerHTML=`<h3 style="margin-top:0">Andamento</h3><p><b>${a.julgados}</b> projetos julgados · ${a.livres} ainda livres.</p>
  <p class="mu">Letras dadas: ${Object.entries(a.letras).map(([l,n])=>l+' '+n).join(' · ')}</p>
  <table><tr><th>amostra</th><th>casos</th><th>rótulo LLM acerta o principal</th><th>modelo acerta</th></tr>${md}</table>
  <p class="mu">Só a amostra <b>aleatória</b> estima o desempenho nos projetos comuns; as de fronteira são propositalmente difíceis.</p>
  <p><b>Reteste</b> (você × você): ${a.reteste.n?`${a.reteste.n} casos · mesmo principal ${Math.round(100*a.reteste.mesmo_principal)}% · tau médio ${a.reteste.tau_medio}`:'ainda sem casos (aparecem sozinhos, sem aviso, a partir de 10 julgados)'}</p>`;dlgAnd.showModal()};
$('modo').onchange=()=>{$('area').hidden=$('modo').value!=='area';proximo()};$('area').onchange=proximo;
AREAS.forEach((a,i)=>$('area').add(new Option(a,i)));
document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]')||e.metaKey||e.ctrlKey||e.altKey)return;
  if(['SELECT','INPUT','TEXTAREA'].includes(e.target.tagName))return;
  const k=e.key;
  if(k==='Enter'){e.preventDefault();salvar();return}
  if(k==='z'||k==='Z'){$('bDes').click();return}
  if(revelado)return;
  if(/^[1-9]$/.test(k)){foco=+k-1;marca();return}
  if(k==='ArrowDown'){e.preventDefault();foco=Math.min(8,foco+1);marca();return}
  if(k==='ArrowUp'){e.preventDefault();foco=Math.max(0,foco-1);marca();return}
  if(k==='Backspace'){e.preventDefault();graus[AREAS[foco]]='I';marca();return}
  if(/^[a-eA-EiI]$/.test(k)){set(foco,k.toUpperCase());return}
  if(k==='p'||k==='P'){pular();return}
  if(k==='?')dlgAju.showModal();
});
proximo();
</script></body></html>"""


class Manipulador(BaseHTTPRequestHandler):
    estado: "Estado" = None

    def _json(self, obj, codigo=200):
        corpo = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(corpo)

    def log_message(self, *a):  # silêncio no terminal
        pass

    def do_GET(self):
        u = urlparse(self.path)
        e = self.estado
        try:
            if u.path == "/":
                corpo = PAGINA.replace("__AREAS__", json.dumps(e.areas, ensure_ascii=False)).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(corpo)))
                self.end_headers()
                self.wfile.write(corpo)
            elif u.path == "/api/proximo":
                q = parse_qs(u.query)
                modo = (q.get("modo") or ["aleatorio"])[0]
                area = q.get("area", [""])[0]
                with e.trava:
                    p = e.proximo(modo, int(area) if area.isdigit() else None)
                self._json(p or {})
            elif u.path == "/api/andamento":
                with e.trava:
                    self._json(e.andamento())
            else:
                self.send_error(404)
        except Exception as ex:  # a interface mostra o erro em vez de travar
            self._json({"erro": str(ex)}, 500)

    def do_POST(self):
        e = self.estado
        n = int(self.headers.get("Content-Length") or 0)
        try:
            corpo = json.loads(self.rfile.read(n) or b"{}")
            with e.trava:
                if self.path == "/api/julgar":
                    self._json(e.julgar(str(corpo["id"]), corpo["graus"], corpo.get("modo") or "aleatorio"))
                elif self.path == "/api/pular":
                    e.pulados.add(str(corpo["id"]))
                    self._json({"ok": True})
                elif self.path == "/api/desfazer":
                    pid = e.desfazer_ultimo()
                    self._json({"ok": pid is not None, "id": pid})
                else:
                    self.send_error(404)
        except Exception as ex:
            self._json({"erro": str(ex)}, 400)


def servir(porta, abrir=False):
    url = f"http://127.0.0.1:{porta}"
    try:
        srv = ThreadingHTTPServer(("127.0.0.1", porta), Manipulador)
    except OSError as erro:
        if erro.errno not in (48, 98, 10048):  # EADDRINUSE no macOS, Linux e Windows
            raise
        print(f"A porta {porta} já está em uso — o servidor provavelmente já está rodando.\n"
              f"Abra {url} no navegador. Para reiniciar: pkill -f 'analise.julgar_projetos --servir' e rode de novo\n"
              f"(ou use outra porta: --porta {porta + 1}).")
        if abrir:
            import webbrowser
            webbrowser.open(url)
        return
    Manipulador.estado = Estado()
    e = Manipulador.estado
    print(f"Julgar projetos em {url}  (Ctrl+C encerra) · {len(e.projetos)} projetos · modelo: "
          f"{'calibrado com ' + str(e.modelo['n']) + ' casos' if e.modelo else 'ausente (rode analise.aderencia --gerar)'}")
    if abrir:
        import webbrowser
        webbrowser.open(url)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\nEncerrado.")


def autoteste():
    assert abs(kendall_tau([1, 2, 3, 4], [1, 2, 3, 4]) - 1) < 1e-9
    assert abs(kendall_tau([1, 2, 3, 4], [4, 3, 2, 1]) + 1) < 1e-9
    assert kendall_tau([1, 1, 1], [1, 2, 3]) == 0.0
    assert principais([0, 5, 0, 5]) == [1, 3] and principais([0, 0]) == []
    assert [letra_de_grau(g) for g in (0, 0.5, 2.4, 4.6, 9)] == ["I", "E", "D", "A", "A"]
    print("autoteste OK")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--servir", action="store_true")
    ap.add_argument("--porta", type=int, default=PORTA_PADRAO)
    ap.add_argument("--abrir", action="store_true", help="abre o navegador")
    ap.add_argument("--autoteste", action="store_true")
    a = ap.parse_args()
    if a.autoteste:
        autoteste()
    elif a.servir:
        servir(a.porta, a.abrir)
    else:
        ap.print_help()
