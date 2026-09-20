import { corInstituicao } from "../../dados/cores";
import type { Aderencia, AtlasCluster } from "../../dados/tipos";
import FiltroVinculo from "../FiltroVinculo";
import SeletorModoInstituicao from "../ModoInstituicao";
import type { ModoInstituicao } from "../../dados/ponte";
import type { ModoVinculo } from "../../dados/vinculos";
import AlcanceAderencia from "./AtlasAderencia";
import { ROTULO_GRUPO, type Metodo, type ModoPeso } from "./useAtlas";

/**
 * Filtros do mapa, em múltipla escolha: instituição, grupo do método
 * (subárea/cluster/tópico/comunidade) e, no método ANPPOM, a subárea de 2º
 * nível. Dentro de um filtro os itens somam (OU: UFMG ou UFBA), entre filtros
 * diferentes multiplicam (E: UFMG E Educação Musical).
 *
 * Lateral de propósito (pedido do usuário, 2026-08-08): a versão anterior — 1ª
 * como parede de chips, depois como selects de escolha única — não deixava
 * marcar mais de uma instituição/subárea ao mesmo tempo. Agora o conteúdo vive
 * no `Painel`: painel lateral no desktop, folha no celular.
 */
export default function AtlasFiltros({
  metodo,
  instituicoes,
  clustersOrdenados,
  temasAtivos,
  siglasSel,
  modoInstituicao,
  onModoInstituicao,
  temasSel,
  subareas2Sel,
  vinculos,
  vinculosSel,
  modoVinculo,
  onModoVinculo,
  contagensVinculo,
  onVinculo,
  algumFiltroAtivo,
  modoPeso,
  pesoDisponivel,
  onModoPeso,
  aderencia,
  alcance,
  onAlcance,
  contagem,
  total,
  onSigla,
  onTema,
  onSubarea2,
  onLimpar,
}: {
  metodo: Metodo;
  instituicoes: Array<{ sigla: string; n: number }>;
  clustersOrdenados: AtlasCluster[];
  temasAtivos: AtlasCluster[];
  siglasSel: Set<string>;
  modoInstituicao: ModoInstituicao;
  onModoInstituicao: (m: ModoInstituicao) => void;
  temasSel: Set<number>;
  subareas2Sel: Set<string>;
  /** Vocabulário de vínculos (null até o arquivo chegar), os marcados e quantos projetos têm cada um. */
  vinculos: readonly string[] | null;
  vinculosSel: Set<string>;
  modoVinculo: ModoVinculo;
  onModoVinculo: (m: ModoVinculo) => void;
  contagensVinculo: readonly number[] | null;
  onVinculo: (v: string) => void;
  algumFiltroAtivo: boolean;
  /** Como as subáreas marcadas pintam o mapa: por pertencimento (discretas) ou por aderência. */
  modoPeso: ModoPeso;
  /** A matriz de aderência já chegou (só o método ANPPOM a tem). */
  pesoDisponivel: boolean;
  onModoPeso: (v: ModoPeso) => void;
  /** Matriz de aderência e o passo do controle de alcance (só usados no modo por aderência). */
  aderencia: Aderencia | null;
  alcance: number;
  onAlcance: (i: number) => void;
  /** Projetos que passam nos filtros, e o total, para o resumo do alcance. */
  contagem: number;
  total: number;
  onSigla: (sigla: string) => void;
  onTema: (cluster: number) => void;
  onSubarea2: (subarea: string) => void;
  onLimpar: () => void;
}) {
  return (
    <div className="atlas-filtros">
      {algumFiltroAtivo && (
        <div className="atlas-filtros-contagem">
          <button type="button" className="chip" onClick={onLimpar}>
            Limpar filtros
          </button>
        </div>
      )}

      <details open className="atlas-sidebar-secao">
        <summary>
          Instituição{siglasSel.size > 0 ? ` (${siglasSel.size})` : ""}
        </summary>
        <SeletorModoInstituicao
          modo={modoInstituicao}
          onModo={onModoInstituicao}
          qtdMarcadas={siglasSel.size}
          unidade="projetos"
        />
        <div className="atlas-checkbox-lista">
          {instituicoes.map(({ sigla, n }) => (
            <label key={sigla} className="atlas-checkbox">
              <input type="checkbox" checked={siglasSel.has(sigla)} onChange={() => onSigla(sigla)} />
              <span className="legenda-marca" style={{ background: corInstituicao(sigla) }} />
              {sigla} ({n})
            </label>
          ))}
        </div>
      </details>

      {vinculos && (
        <FiltroVinculo
          vinculos={vinculos}
          sel={vinculosSel}
          contagens={contagensVinculo}
          unidade="projetos"
          modo={modoVinculo}
          onModo={onModoVinculo}
          onAlternar={onVinculo}
        />
      )}

      <details open className="atlas-sidebar-secao">
        <summary>
          {ROTULO_GRUPO[metodo]}
          {temasSel.size > 0 ? ` (${temasSel.size})` : ""}
        </summary>
        {metodo === "anppom" && (
          <div className="atlas-filtros-peso">
            <div className="segmented" role="group" aria-label="Como as subáreas marcadas pintam o mapa">
              <button
                type="button"
                className={modoPeso === "discreto" ? "ativo" : ""}
                aria-pressed={modoPeso === "discreto"}
                onClick={() => onModoPeso("discreto")}
              >
                Discretas
              </button>
              <button
                type="button"
                className={modoPeso === "aderencia" ? "ativo" : ""}
                aria-pressed={modoPeso === "aderencia"}
                disabled={!pesoDisponivel}
                onClick={() => onModoPeso("aderencia")}
              >
                Por aderência
              </button>
            </div>
            <span className="chart-nota" style={{ margin: 0 }}>
              {modoPeso === "aderencia" && pesoDisponivel
                ? temasSel.size > 0
                  ? "Os pontos acendem conforme o quanto o texto do projeto pertence às subáreas marcadas."
                  : "Marque uma ou mais subáreas: os pontos acendem conforme o quanto o texto do projeto pertence a elas."
                : "Discretas: o projeto está ou não na subárea. Por aderência: o quanto ele pertence."}
            </span>
            {modoPeso === "aderencia" && pesoDisponivel && aderencia && temasSel.size > 0 && (
              <AlcanceAderencia
                nomes={clustersOrdenados.filter((c) => temasSel.has(c.cluster)).map((c) => c.tema)}
                aderencia={aderencia}
                alcance={alcance}
                onAlcance={onAlcance}
                contagem={contagem}
                total={total}
              />
            )}
          </div>
        )}
        <div className="atlas-checkbox-lista">
          {clustersOrdenados.map((c) => (
            <label key={c.cluster} className="atlas-checkbox">
              <input type="checkbox" checked={temasSel.has(c.cluster)} onChange={() => onTema(c.cluster)} />
              {c.tema} ({c.n_projetos})
            </label>
          ))}
        </div>
      </details>

      {metodo === "anppom" && (
        <details className="atlas-sidebar-secao">
          <summary>
            Subárea — 2º nível{subareas2Sel.size > 0 ? ` (${subareas2Sel.size})` : ""}
          </summary>
          {temasAtivos.length === 0 ? (
            <p className="chart-nota" style={{ margin: "0.5rem 0" }}>
              Marque uma subárea de 1º nível pra ver as de 2º nível.
            </p>
          ) : (
            temasAtivos.map((c) => (
              <div key={c.cluster} className="atlas-sidebar-subgrupo">
                <div className="atlas-sidebar-subgrupo-titulo">{c.tema}</div>
                <div className="atlas-checkbox-lista">
                  {c.subareas.map((s) => (
                    <label key={s} className="atlas-checkbox">
                      <input type="checkbox" checked={subareas2Sel.has(s)} onChange={() => onSubarea2(s)} />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
            ))
          )}
        </details>
      )}
    </div>
  );
}
