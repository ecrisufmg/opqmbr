import type { Aderencia, AtlasProjeto, DetalheProducaoPrograma, FichasPorProjeto, DescricoesPorProjeto, MembrosPorProjeto, ProducaoProjeto } from "../../dados/tipos";
import { Link } from "react-router-dom";
import { destaquesDaProducao, linksDaProducao } from "../../dados/destaques";
import type { Esquema } from "../corProducao";
import type { FiltroLegenda } from "../LegendaProducoes";
import FichaProducao from "../FichaProducao";
import Painel from "../Painel";
import PainelProjeto from "../PainelProjeto";
import { IconeGlobo, IconeLista, IconeMapaProducoes, IconeSucupira } from "../Icones";
import { metaProjeto } from "../FichaProjeto";
import { PerfilAderencia } from "./AtlasAderencia";

/**
 * O painel da ficha — duas paradas na mesma tela, como "lugar → detalhe" do
 * Google Maps (§3.1):
 *
 *  1. **projeto** — ficha, descrição, membros e a lista de produções;
 *  2. **produção** — a produção clicada no mapa (ou na lista), com "‹ Produções"
 *     para voltar ao nível anterior e o ✕ para voltar ao mapa.
 *
 * No desktop é um painel lateral; no celular, a folha inferior com as três
 * alturas (`Painel` faz os dois). Tirar o ✕ devolve o mapa.
 */
export default function AtlasFicha({
  aberto,
  projeto,
  tema,
  ficha,
  detalhes,
  descricao,
  membros,
  producoes,
  producoesAbertas,
  carregando,
  producaoSel,
  esquema,
  filtro,
  apenasNucleo,
  onApenasNucleo,
  onSelecionarProducao,
  onFechar,
  aderencia,
  limiarAlcance,
}: {
  aberto: boolean;
  projeto: AtlasProjeto | null;
  tema: string;
  ficha: FichasPorProjeto | null;
  detalhes: Record<string, DetalheProducaoPrograma>;
  descricao: DescricoesPorProjeto | null;
  membros: MembrosPorProjeto | null;
  producoes: ProducaoProjeto[] | null;
  producoesAbertas: ProducaoProjeto[] | null;
  carregando: boolean;
  producaoSel: string | null;
  esquema: Esquema;
  filtro: FiltroLegenda | null;
  apenasNucleo: boolean;
  onApenasNucleo: (v: boolean) => void;
  onSelecionarProducao: (id: string | null) => void;
  onFechar: () => void;
  /** Matriz de aderência (PLANO §4.2.6), para o perfil do projeto; `null` enquanto não chega. */
  aderencia: Aderencia | null;
  /** Corte do alcance atual: realça no perfil as áreas que o alcançam. */
  limiarAlcance: number;
}) {
  if (!aberto || !projeto) return null;

  const producao = producaoSel && producoes
    ? producoes.find((p) => p.id_producao === producaoSel) ?? null
    : null;
  const fichaProjeto = ficha?.[projeto.id] ?? null;
  const detalhe = detalhes[projeto.sigla];

  const cabecalhoProjeto = (
    <>
      <strong>{projeto.nome ?? "(sem título)"}</strong>
      <div className="atlas-tooltip-nota">{metaProjeto(projeto, fichaProjeto)}</div>
      <div className="atlas-tooltip-nota">
        {tema}
        {projeto.subarea ? ` · ${projeto.subarea}` : ""}
      </div>
    </>
  );

  return (
    <Painel
      aberto
      ariaLabel={`Projeto: ${projeto.nome ?? ""}`}
      titulo={producao ? <strong>{producao.nome ?? "sem título registrado"}</strong> : cabecalhoProjeto}
      onFechar={onFechar}
      onVoltar={producao ? () => onSelecionarProducao(null) : undefined}
      rotuloVoltar="Produções"
      acoes={
        producao ? (
          <>
            {producao.link && (
              <a
                className="atlas-icone-acao"
                href={producao.link}
                target="_blank"
                rel="noreferrer"
                title="Abrir a página desta produção na Plataforma Sucupira"
                aria-label="Abrir na Plataforma Sucupira"
              >
                <IconeSucupira />
              </a>
            )}
            {linksDaProducao(detalhe, producao.id_producao).map((l) => (
              <a
                key={l.url}
                className="atlas-icone-acao"
                href={l.url}
                target="_blank"
                rel="noreferrer"
                title={`${l.rotulo}: ${l.url}`}
                aria-label={`${l.rotulo} (abre em outra aba)`}
              >
                <IconeGlobo />
              </a>
            ))}
            <Link
              className="atlas-icone-acao"
              to={`/mapa-de-producoes?producao=${producao.id_producao}`}
              title="Ver esta produção no Mapa de produções"
              aria-label="Ver esta produção no Mapa de produções"
            >
              <IconeMapaProducoes />
            </Link>
            <button
              type="button"
              className="atlas-icone-acao"
              onClick={() => onSelecionarProducao(null)}
              title="Voltar ao projeto, com a produção destacada na lista"
              aria-label="Voltar ao projeto"
            >
              <IconeLista />
            </button>
          </>
        ) : producoesAbertas ? (
          <div className="atlas-foco-modo" role="group" aria-label="Quais produções mostrar">
            <button
              type="button"
              className={`chip${!apenasNucleo ? " ativo" : ""}`}
              aria-pressed={!apenasNucleo}
              onClick={() => onApenasNucleo(false)}
            >
              Todas ({producoesAbertas.length})
            </button>
            <button
              type="button"
              className={`chip${apenasNucleo ? " ativo" : ""}`}
              aria-pressed={apenasNucleo}
              onClick={() => onApenasNucleo(true)}
            >
              Só núcleo ({producoesAbertas.filter((p) => p.classe === "nucleo").length})
            </button>
          </div>
        ) : undefined
      }
    >
      {producao ? (
        <FichaProducao
          pr={producao}
          destaques={destaquesDaProducao(detalhe, producao.id_producao, 6, 300)}
          projeto={projeto}
          tema={tema}
          ficha={fichaProjeto}
          descricao={descricao?.[projeto.id] ?? null}
        />
      ) : (
        <>
        {aderencia && (
          <PerfilAderencia
            aderencia={aderencia}
            a={aderencia.projetos.find((x) => x.id === projeto.id)?.a ?? []}
            limiar={limiarAlcance}
          />
        )}
        <PainelProjeto
          projeto={projeto}
          producoes={producoes}
          membros={membros?.[projeto.id] ?? null}
          descricao={descricao?.[projeto.id] ?? null}
          carregando={carregando}
          producaoSel={producaoSel}
          onProducao={onSelecionarProducao}
          esquema={esquema}
          filtro={filtro}
          totalGeral={producoesAbertas?.length}
        />
        <Link className="chip mapa-prod-link" to={`/mapa-de-producoes?projeto=${projeto.id}`}>
          Ver as produções no Mapa de produções →
        </Link>
        </>
      )}
    </Painel>
  );
}
