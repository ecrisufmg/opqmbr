import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadCicloVidaProjetos } from "../dados/loaders";
import type { CicloVidaCategoria, CicloVidaProjetosDados, ProjetoNoTempo } from "../dados/tipos";
import { estiloCategoria } from "./cicloCores";

/**
 * Gantt dos projetos de um programa (PLANO §4.4.2): cada projeto é uma barra do início
 * até o fim (ou até hoje, se em andamento), colorida pela categoria de ciclo de vida,
 * com uma marca em cada ano em que registrou obra.
 *
 * Por que funciona: o "zumbi" fica óbvio — barra longa, sem marca na segunda metade — e
 * o "silencioso" é uma barra sem nenhuma marca. A faixa cinza ao fundo é a **janela de
 * produções da base** (2020 em diante): antes dela não há marca possível, então barra
 * sem marca fora da faixa não quer dizer nada.
 *
 * Eixo comum de 2000 ao ano seguinte ao último com produção, para os programas serem
 * comparáveis; projeto mais antigo que o eixo tem a barra cortada, com uma seta.
 */

const EIXO_INI = 2000;

/** '2008-03-15' → 2008,2 (ano fracionário). */
function anoFrac(d: string | null): number | null {
  if (!d) return null;
  const [y, m, dia] = d.split("-").map(Number);
  if (!y) return null;
  return y + ((m || 1) - 1) / 12 + (((dia || 1) - 1) / 31) / 12;
}

type Ordem = "inicio" | "categoria" | "obras";

const ROTULO_ORDEM: Record<Ordem, string> = {
  inicio: "Início do projeto",
  categoria: "Categoria",
  obras: "Nº de produções",
};

function nObras(p: ProjetoNoTempo): number {
  return Object.values(p.obras).reduce((s, n) => s + n, 0);
}

export default function GanttProjetos({
  categorias,
  siglas,
}: {
  categorias: CicloVidaCategoria[];
  /** Programas em ordem de exibição (do mais ao menos projetos). */
  siglas: string[];
}) {
  const [dados, setDados] = useState<CicloVidaProjetosDados | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [sigla, setSigla] = useState(siglas[0] ?? "");
  const [ordem, setOrdem] = useState<Ordem>("inicio");
  const navegar = useNavigate();

  useEffect(() => {
    loadCicloVidaProjetos()
      .then(setDados)
      .catch((e: unknown) => setErro(String(e)));
  }, []);

  const linhas = useMemo(() => {
    if (!dados) return [];
    const ordemCat = new Map(categorias.map((c, i) => [c.chave, i]));
    const doPrograma = dados.projetos.filter((p) => p.sigla === sigla);
    return doPrograma.sort((a, b) => {
      if (ordem === "obras") return nObras(b) - nObras(a);
      if (ordem === "categoria")
        return (ordemCat.get(a.categoria) ?? 99) - (ordemCat.get(b.categoria) ?? 99) ||
          (a.inicio ?? "").localeCompare(b.inicio ?? "");
      return (a.inicio ?? "").localeCompare(b.inicio ?? "");
    });
  }, [dados, categorias, sigla, ordem]);

  if (erro) return <div className="error">Erro ao carregar dados: {erro}</div>;
  if (!dados) return <div className="loading">Carregando…</div>;

  const [janIni, anoRef] = dados.janela;
  const eixoFim = anoRef + 1;
  const span = eixoFim - EIXO_INI;
  const x = (a: number) => `${((Math.min(Math.max(a, EIXO_INI), eixoFim) - EIXO_INI) / span) * 100}%`;
  const rotulo = new Map(categorias.map((c) => [c.chave, c]));
  const presentes = categorias.filter((c) => linhas.some((p) => p.categoria === c.chave));
  const marcasAno: number[] = [];
  for (let a = EIXO_INI; a <= eixoFim; a += 5) marcasAno.push(a);

  return (
    <div className="gantt">
      <div className="chart-controles">
        <label>
          Programa{" "}
          <select value={sigla} onChange={(e) => setSigla(e.target.value)}>
            {siglas.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ordenar por{" "}
          <select value={ordem} onChange={(e) => setOrdem(e.target.value as Ordem)}>
            {(Object.keys(ROTULO_ORDEM) as Ordem[]).map((o) => (
              <option key={o} value={o}>
                {ROTULO_ORDEM[o]}
              </option>
            ))}
          </select>
        </label>
        <span className="chart-nota" style={{ margin: 0 }}>
          {linhas.length} projetos
        </span>
      </div>

      <div className="legenda" role="list">
        {presentes.map((c) => (
          <span key={c.chave} className="legenda-item" role="listitem" title={c.descricao}>
            <span className="legenda-marca" style={estiloCategoria(c.chave)} />
            {c.rotulo}
          </span>
        ))}
        <span className="legenda-item" role="listitem">
          <span className="gantt-marca-legenda" />
          ano com produção registrada
        </span>
      </div>

      <div className="gantt-eixo" aria-hidden="true">
        <span />
        <div className="gantt-trilho">
          {marcasAno.map((a) => (
            <span key={a} className="gantt-ano" style={{ left: x(a) }}>
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="gantt-linhas">
        {linhas.map((p) => {
          const ini = anoFrac(p.inicio);
          const fim = anoFrac(p.fim);
          const emAndamento = fim === null;
          const cortado = ini !== null && ini < EIXO_INI;
          const cat = rotulo.get(p.categoria);
          const anos = Object.keys(p.obras).sort();
          const dica = [
            p.titulo ?? "(sem título)",
            `${p.inicio ?? "?"} → ${p.fim ?? "em andamento"}${p.situacao ? ` · ${p.situacao}` : ""}`,
            cat ? `${cat.rotulo}${cat.descricao ? `: ${cat.descricao}` : ""}` : p.categoria,
            anos.length
              ? `${nObras(p)} produções: ${anos.map((a) => `${a} (${p.obras[a]})`).join(", ")}`
              : "nenhuma produção registrada",
          ].join("\n");

          return (
            <div
              key={p.id}
              className="gantt-linha clicavel"
              title={`${dica}\n\nClique para abrir o projeto no Mapa de projetos, com as produções.`}
              role="link"
              tabIndex={0}
              onClick={() => navegar(`/mapa-de-projetos?projeto=${p.id}`)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") navegar(`/mapa-de-projetos?projeto=${p.id}`);
              }}
            >
              <span className="gantt-rotulo">{p.titulo ?? "(sem título)"}</span>
              <div className="gantt-trilho">
                <span className="gantt-janela" style={{ left: x(janIni), right: 0 }} />
                {ini !== null && (
                  <span
                    className={`gantt-barra${emAndamento ? " aberta" : ""}`}
                    style={{
                      ...estiloCategoria(p.categoria),
                      left: x(ini),
                      width: `calc(${x(fim ?? eixoFim)} - ${x(ini)})`,
                    }}
                  >
                    {cortado && <span className="gantt-corte">◀</span>}
                  </span>
                )}
                {anos.map((a) => (
                  <span key={a} className="gantt-marca" style={{ left: x(Number(a) + 0.5) }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

/** Texto de apoio do Gantt, para o balão "Como ler" da página. `janela` = [primeiro, último ano com
 * produção na base]. */
export function NotasGantt({ janela }: { janela: [number, number] }) {
  const [ini, fim] = janela;
  return (
    <>
      <h3>Como ler as barras</h3>
      <p>
        Cada barra vai do início do projeto ao fim, ou até hoje se estiver em andamento (ponta
        esmaecida), na cor da sua classe de ciclo de vida. A seta ◀ indica início anterior a {EIXO_INI}. As
        marcas são os anos em que houve produção registrada. Passe o mouse para ver título, datas e
        produções por ano; clique para abrir o projeto no Mapa de projetos.
      </p>
      <h3>O que se enxerga</h3>
      <p>
        Um projeto "sem produção recente" aparece como barra longa sem marcas na segunda metade; um projeto
        "sem produção", como barra sem nenhuma marca.
      </p>
      <h3>Atenção à janela</h3>
      <p>
        A faixa cinza ao fundo é a janela de produções da base ({ini} a {fim}). Antes dela nenhuma
        produção pode aparecer; portanto, uma barra sem marcas <em>fora</em> da faixa nada diz sobre o
        projeto.
      </p>
    </>
  );
}
