import type { AtlasProjeto, FichaProjeto } from "../dados/tipos";
import CartaoFlutuante, { type AncoraCartao } from "./CartaoFlutuante";
import { LinhasProjeto, metaProjeto } from "./FichaProjeto";
import { IconeProducoes } from "./Icones";

export type { AncoraCartao };

/**
 * Cartão do projeto fixado com um clique: o popup do hover que **fica** — arrastável, com
 * rolagem para ler a descrição inteira. O **ícone de produções fica no alto**, acima do título:
 * clicar nele abre as produções no mapa e na lista (e o cartão do projeto sai de cena, com as
 * informações passando para o cartão de cada produção).
 *
 * Até a descrição completa chegar (`descricao_projeto.json`, ~1,6 MB, buscado no clique),
 * mostra o resumo da ficha.
 */
export default function CartaoProjeto({
  projeto,
  tema,
  ficha,
  descricao,
  ancora,
  onProducoes,
  onFechar,
  larguraArea,
}: {
  projeto: AtlasProjeto;
  tema: string;
  ficha: FichaProjeto | null;
  descricao: string | null;
  ancora: AncoraCartao;
  onProducoes: () => void;
  onFechar: () => void;
  larguraArea: number;
}) {
  return (
    <CartaoFlutuante
      ancora={ancora}
      larguraArea={larguraArea}
      ariaLabel={`Projeto: ${projeto.nome ?? ""}`}
      titulo={<strong>{projeto.nome ?? "(sem título)"}</strong>}
      onFechar={onFechar}
      acoes={
        <button
          type="button"
          className="atlas-icone-acao destaque"
          onClick={onProducoes}
          title={`Ver as ${projeto.n_producoes} produções deste projeto no mapa e na lista`}
          aria-label={`Ver as ${projeto.n_producoes} produções deste projeto`}
        >
          <IconeProducoes />
          <span className="atlas-icone-n">{projeto.n_producoes}</span>
        </button>
      }
    >
      <div className="atlas-tooltip-nota">{metaProjeto(projeto, ficha)}</div>

      <div className="atlas-cartao-corpo" tabIndex={0} aria-label="Descrição do projeto">
        {descricao ?? ficha?.resumo ?? "Carregando…"}
        {!descricao && ficha?.resumo && <span className="atlas-tooltip-nota"> (carregando a descrição completa…)</span>}
      </div>

      <LinhasProjeto projeto={projeto} tema={tema} ficha={ficha} />
    </CartaoFlutuante>
  );
}
