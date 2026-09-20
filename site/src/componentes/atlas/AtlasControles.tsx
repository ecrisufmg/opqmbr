import { useMemo, useRef, useState } from "react";
import type { AtlasProjeto, FichasPorProjeto } from "../../dados/tipos";
import { corInstituicao } from "../../dados/cores";
import { IconeBusca, IconeFiltro, IconeMetodo } from "../Icones";
import { useFechaFora } from "../useMidia";
import { ROTULO_METODO, SELO_METODO, type Metodo } from "./useAtlas";

/** Sem acento e sem caixa: "Música" acha "musica", "INSTRUMENTO" acha "instrumento". */
function normalizar(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const MAX_RESULTADOS = 6;

/** Nome curto do método — o que o botão da barra mostra. É o **sinal visível**
 * de qual clusterização está em uso (§2.2 do plano: a ressalva muda de lugar,
 * mas o mapa não deixa de dizer com que método foi feito). */
export const NOME_METODO: Record<Metodo, string> = {
  anppom: "ANPPOM",
  hdbscan: "HDBSCAN",
  topicos: "Tópicos",
  coautoria: "Coautoria",
};

const SEM_REVISAO =
  "Método sem revisão humana e sem a taxonomia da ANPPOM: os grupos são descobertos pelo próprio dado. O aviso completo está em \"Sobre este mapa\".";

const EXPLICACAO_METODO: Record<Metodo, string> = {
  anppom:
    "Subárea ANPPOM por leitura do título e do resumo (zero-shot por embedding), sem conferência humana projeto a projeto — casos de fronteira podem estar na subárea vizinha.",
  hdbscan: SEM_REVISAO,
  topicos: SEM_REVISAO,
  coautoria: SEM_REVISAO,
};

/**
 * Os quatro métodos de clusterização, um por linha, cada um com o seu **selo**
 * (a ressalva curta que antes era um parágrafo acima do mapa) e, embaixo, a
 * explicação do método ativo. Vive separado porque o mesmo conteúdo abre num
 * popover no desktop e numa folha no celular.
 */
export function ListaMetodos({
  metodo,
  carregando,
  onMetodo,
}: {
  metodo: Metodo;
  carregando: boolean;
  onMetodo: (m: Metodo) => void;
}) {
  return (
    <div className="atlas-metodo-conteudo">
      <div className="atlas-metodo-lista" role="radiogroup" aria-label="Método de clusterização">
        {(Object.keys(ROTULO_METODO) as Metodo[]).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={metodo === m}
            className={`atlas-metodo-opcao${metodo === m ? " ativo" : ""}`}
            onClick={() => onMetodo(m)}
          >
            <span className="atlas-metodo-nome">{ROTULO_METODO[m]}</span>
            <span className="atlas-metodo-selo">{SELO_METODO[m]}</span>
          </button>
        ))}
      </div>
      {carregando && <p className="atlas-tooltip-nota">carregando…</p>}
      <p className="atlas-metodo-explica">{EXPLICACAO_METODO[metodo]}</p>
    </div>
  );
}

/**
 * A barra flutuante do canto superior direito: **busca**, **Filtros** e
 * **Método**. Em repouso fica translúcida (o mapa é o protagonista); com o
 * mouse, o foco ou um painel aberto, opaca.
 *
 * Filtros e Método abrem, no desktop, um painel logo abaixo da barra
 * (`comPopover`); no celular os mesmos botões abrem a folha inferior — quem
 * decide é a rota, que passa `aberto` e `onAlternar` de cada caso.
 */
export default function AtlasControles({
  projetos,
  fichas,
  metodo,
  qtdFiltros,
  aberto,
  comPopover,
  filtros,
  metodos,
  onEscolher,
  onAlternar,
  onFecharPopover,
}: {
  projetos: AtlasProjeto[];
  fichas: FichasPorProjeto | null;
  metodo: Metodo;
  /** Filtros ativos (instituição + grupo + subárea de 2º nível). */
  qtdFiltros: number;
  /** Qual dos dois está aberto (popover no desktop, folha no celular). */
  aberto: "filtros" | "metodo" | null;
  /** Desktop: o painel abre aqui, sob a barra. Celular: a folha é da rota. */
  comPopover: boolean;
  /** Conteúdo do popover de filtros (desktop). */
  filtros: React.ReactNode;
  /** Conteúdo do popover do método (desktop). */
  metodos: React.ReactNode;
  onEscolher: (p: AtlasProjeto) => void;
  onAlternar: (nome: "filtros" | "metodo") => void;
  onFecharPopover: () => void;
}) {
  const [busca, setBusca] = useState("");
  const caixa = useRef<HTMLDivElement>(null);
  useFechaFora(caixa, comPopover && aberto !== null, onFecharPopover);

  const resultados = useMemo(() => {
    const q = normalizar(busca.trim());
    if (q.length < 2) return [];
    const achados: AtlasProjeto[] = [];
    for (const p of projetos) {
      const alvo = [p.nome ?? "", p.sigla, ...(fichas?.[p.id]?.responsaveis ?? [])].map(normalizar);
      if (alvo.some((t) => t.includes(q))) achados.push(p);
      if (achados.length >= MAX_RESULTADOS) break;
    }
    return achados;
  }, [busca, projetos, fichas]);

  return (
    <div className="atlas-topo" ref={caixa}>
      <div className={`atlas-topo-barra atlas-flutua${aberto ? " aberto" : ""}`}>
        <div className="atlas-busca">
          <span className="atlas-busca-icone" aria-hidden="true">
            <IconeBusca tamanho={16} />
          </span>
          <input
            type="search"
            className="campo-busca"
            value={busca}
            onChange={(ev) => setBusca(ev.target.value)}
            placeholder="Buscar projeto, pessoa ou instituição"
            aria-label="Buscar projeto, pessoa ou instituição no mapa"
          />
          {busca && (
            <button type="button" className="atlas-busca-limpar" onClick={() => setBusca("")} aria-label="Limpar a busca">
              ✕
            </button>
          )}
          {resultados.length > 0 && (
            <ul className="atlas-busca-lista">
              {resultados.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onEscolher(p);
                      setBusca("");
                    }}
                  >
                    <span className="legenda-marca" style={{ background: corInstituicao(p.sigla) }} />
                    <span className="atlas-busca-titulo">{p.nome ?? "(sem título)"}</span>
                    <span className="atlas-busca-meta">
                      {p.sigla}
                      {p.ano ? ` · ${p.ano}` : ""}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {busca.trim().length >= 2 && resultados.length === 0 && (
            <p className="atlas-busca-vazio">Nada encontrado por título, instituição ou responsável.</p>
          )}
          {busca.trim().length > 0 && busca.trim().length < 2 && (
            <p className="atlas-busca-vazio">Digite ao menos duas letras.</p>
          )}
        </div>

        <button
          type="button"
          className={`atlas-topo-botao${qtdFiltros > 0 ? " com-filtro" : ""}${aberto === "filtros" ? " ativo" : ""}`}
          aria-expanded={aberto === "filtros"}
          aria-haspopup="dialog"
          aria-label={qtdFiltros > 0 ? `Filtros (${qtdFiltros} ativos)` : "Filtros"}
          onClick={() => onAlternar("filtros")}
        >
          <IconeFiltro />
          <span className="atlas-topo-rotulo">Filtros</span>
          {qtdFiltros > 0 && <span className="atlas-topo-contador">{qtdFiltros}</span>}
        </button>

        <button
          type="button"
          className={`atlas-topo-botao${aberto === "metodo" ? " ativo" : ""}`}
          aria-expanded={aberto === "metodo"}
          aria-haspopup="dialog"
          aria-label={`Método de clusterização: ${ROTULO_METODO[metodo]}`}
          onClick={() => onAlternar("metodo")}
        >
          <IconeMetodo />
          <span className="atlas-topo-rotulo">{NOME_METODO[metodo]}</span>
        </button>
      </div>

      {comPopover && aberto === "filtros" && (
        <div className="flutuante-painel" role="dialog" aria-label="Filtrar pontos do mapa">
          {filtros}
        </div>
      )}
      {comPopover && aberto === "metodo" && (
        <div className="flutuante-painel" role="dialog" aria-label="Método de clusterização">
          <header className="flutuante-cab">
            <strong>Método de clusterização</strong>
            <button type="button" className="painel-fechar" onClick={onFecharPopover} aria-label="Fechar">
              ✕
            </button>
          </header>
          {metodos}
        </div>
      )}
    </div>
  );
}
