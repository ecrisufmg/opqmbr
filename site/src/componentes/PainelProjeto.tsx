import type { AtlasProjeto, MembroProjeto, ProducaoProjeto } from "../dados/tipos";
import ProducaoItem from "./ProducaoItem";
import type { Esquema } from "./corProducao";
import MarcaProducao from "./MarcaProducao";
import { combinaFiltro, type FiltroLegenda } from "./LegendaProducoes";

/**
 * A ficha do projeto aberto no Atlas: descrição, membros e **todas as
 * produções**, cada uma abrindo o seu detalhe. É o corpo do painel/folha (a
 * moldura e o cabeçalho são do `Painel`, em `atlas/AtlasFicha.tsx`).
 *
 * Transparência total (decisão do usuário, 2026-09-18): nomes de membros e de autores,
 * a descrição inteira, o fomento e o detalhe de cada produção aparecem. Os dados são
 * os que a Plataforma Sucupira já publica.
 */
export default function PainelProjeto({
  projeto,
  producoes,
  membros,
  descricao,
  carregando,
  producaoSel,
  onProducao,
  esquema,
  filtro,
  totalGeral,
}: {
  projeto: AtlasProjeto;
  producoes: ProducaoProjeto[] | null;
  membros: MembroProjeto[] | null;
  descricao: string | null;
  carregando: boolean;
  producaoSel: string | null;
  onProducao: (id: string | null) => void;
  /** Como desenhar as produções (forma, cor, tom) — o mesmo do mapa. */
  esquema: Esquema;
  /** Grupo isolado na legenda do mapa: o resto esmaece também aqui. */
  filtro: FiltroLegenda | null;
  /** Total de produções do projeto, quando `producoes` é só uma parte (só o núcleo). */
  totalGeral?: number;
}) {
  return (
    <div className="atlas-painel-conteudo">
      {descricao && (
        <div className="atlas-painel-descricao">
          <strong>Descrição</strong>
          <p>{descricao}</p>
        </div>
      )}

      {membros && membros.length > 0 && (
        <div className="atlas-painel-membros">
          <strong>Membros ({membros.length})</strong>
          <ul className="atlas-painel-lista">
            {membros.map((m, i) => (
              <li key={i}>
                {m.nome}
                <span className="atlas-tooltip-nota">
                  {" "}
                  — {m.papel ?? "papel não informado"}
                  {m.principal ? " · responsável" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="atlas-painel-producoes">
        <strong>
          Produções
          {producoes
            ? totalGeral !== undefined && totalGeral !== producoes.length
              ? ` (${producoes.length} de ${totalGeral})`
              : ` (${producoes.length})`
            : ""}
        </strong>
        {carregando && <p className="chart-nota">Carregando produções…</p>}

        {!carregando && producoes && producoes.length === 0 && (
          <p className="chart-nota">Nenhuma produção vinculada a este projeto nesta base.</p>
        )}

        {!carregando && producoes && producoes.length > 0 && (
          <ul className="atlas-painel-lista">
            {producoes.map((pr) => (
              <ProducaoItem
                key={pr.id_producao}
                p={pr}
                sigla={projeto.sigla}
                marca={<MarcaProducao marca={esquema.marca(pr)} sigla={projeto.sigla} />}
                apagado={!combinaFiltro(esquema, pr, filtro)}
                aberta={producaoSel === pr.id_producao}
                destaque={producaoSel === pr.id_producao}
                onAlternar={() => onProducao(producaoSel === pr.id_producao ? null : pr.id_producao)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
