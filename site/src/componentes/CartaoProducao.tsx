import { Link } from "react-router-dom";
import type { AtlasProjeto, FichaProjeto, ProducaoProjeto } from "../dados/tipos";
import type { Destaque, LinkProducao } from "../dados/destaques";
import CartaoFlutuante, { type AncoraCartao } from "./CartaoFlutuante";
import FichaProducao from "./FichaProducao";
import { IconeGlobo, IconeLista, IconeMapaProducoes, IconeSucupira } from "./Icones";

/**
 * Cartão de **segundo nível**: a produção clicada no mapa. Arrastável no
 * desktop (onde o arrasto é sempre "destacar o cartão", §6.4), com ✕ para
 * fechar (que devolve o mapa só com as bolinhas).
 *
 * O corpo é o mesmo `FichaProducao` que o painel/folha do celular usa — o que
 * muda aqui é a moldura (cartão que se arrasta) e as ações no alto: a página da
 * produção na **Plataforma Sucupira**, o **detalhe completo** (abre na lista do
 * painel — escolha, não efeito do clique) e o endereço (globo), se houver.
 */
export default function CartaoProducao({
  pr,
  marca,
  destaques,
  links,
  projeto,
  tema,
  ficha,
  descricao,
  ancora,
  larguraArea,
  detalheAberto,
  onDetalhe,
  onFechar,
}: {
  pr: ProducaoProjeto;
  marca: React.ReactNode;
  destaques: Destaque[];
  /** Endereços que a produção informa (URL, DOI). */
  links: LinkProducao[];
  projeto: AtlasProjeto;
  tema: string;
  ficha: FichaProjeto | null;
  descricao: string | null;
  ancora: AncoraCartao;
  larguraArea: number;
  /** O detalhe completo desta produção já está aberto na lista. */
  detalheAberto: boolean;
  onDetalhe: () => void;
  onFechar: () => void;
}) {
  return (
    <CartaoFlutuante
      ancora={ancora}
      larguraArea={larguraArea}
      ariaLabel={`Produção: ${pr.nome ?? ""}`}
      titulo={
        <strong>
          {marca}
          {pr.nome ?? "sem título registrado"}
        </strong>
      }
      onFechar={onFechar}
      acoes={
        <>
          {pr.link && (
            <a
              className="atlas-icone-acao"
              href={pr.link}
              target="_blank"
              rel="noreferrer"
              title="Abrir a página desta produção na Plataforma Sucupira"
              aria-label="Abrir na Plataforma Sucupira"
            >
              <IconeSucupira />
            </a>
          )}
          <button
            type="button"
            className={`atlas-icone-acao${detalheAberto ? " ativo" : ""}`}
            onClick={onDetalhe}
            aria-pressed={detalheAberto}
            title={detalheAberto ? "Detalhe completo aberto no painel (clique para fechar)" : "Ver o detalhe completo, no painel"}
            aria-label="Detalhe completo da produção"
          >
            <IconeLista />
          </button>
          {links.map((l) => (
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
            to={`/mapa-de-producoes?producao=${pr.id_producao}`}
            title="Ver esta produção no Mapa de produções"
            aria-label="Ver esta produção no Mapa de produções"
          >
            <IconeMapaProducoes />
          </Link>
        </>
      }
    >
      <FichaProducao
        pr={pr}
        destaques={destaques}
        projeto={projeto}
        tema={tema}
        ficha={ficha}
        descricao={descricao}
      />
    </CartaoFlutuante>
  );
}
