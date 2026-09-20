import { Link } from "react-router-dom";
import type { ProducaoProjeto } from "../../dados/tipos";
import type { Destaque } from "../../dados/destaques";
import { ROTULO_CLASSE_PRODUCAO } from "../../dados/formato";

const LARGURA = 420;
const ALTURA = 250;

/** Posiciona o popup `fixed` junto do cursor, virando para o outro lado quando
 * passaria da borda da janela (mesma conta do `TooltipProducao` do Mapa de
 * projetos). */
function posicao(x: number, y: number): React.CSSProperties {
  const viraX = x + 14 + LARGURA > window.innerWidth;
  const viraY = y + 14 + ALTURA > window.innerHeight;
  return {
    left: viraX ? x - 14 : x + 14,
    top: viraY ? y - 14 : y + 14,
    transform: `translate(${viraX ? "-100%" : "0"}, ${viraY ? "-100%" : "0"})`,
  };
}

/**
 * O tooltip do Mapa de produções: o mesmo conteúdo do `TooltipProducao` do
 * Mapa de projetos (ícone do tipo, título, autoria, campos-chave do detalhe),
 * mais o **link ao projeto** no Mapa de projetos quando a produção pertence a
 * um. A diferença de interação: aqui o clique abre a ficha (não "fixa cartão"),
 * então a dica diz isso.
 *
 * O `pointer-events: auto` (classe `mapa-prod-tooltip`) é para o link ser
 * clicável; os `onEnter`/`onLeave` mantêm o tooltip aberto enquanto o ponteiro
 * atravessa o vão até o link.
 */
export default function MapaTooltip({
  x,
  y,
  pr,
  marca,
  destaques,
  projetoNome,
  projetoSub,
  onEnter,
  onLeave,
}: {
  x: number;
  y: number;
  pr: ProducaoProjeto;
  marca: React.ReactNode;
  destaques: Destaque[];
  projetoNome: string | null;
  projetoSub: string | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const autores = pr.autores.map((a) => a.nome);
  return (
    <div
      className="atlas-tooltip atlas-tooltip-ficha mapa-prod-tooltip"
      style={posicao(x, y)}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <strong>
        {marca}
        {pr.nome ?? "sem título registrado"}
      </strong>
      <div className="atlas-tooltip-nota">
        {ROTULO_CLASSE_PRODUCAO[pr.classe] ?? pr.classe} · {pr.tipo} · {pr.subtipo}
        {pr.ano ? ` · ${pr.ano}` : ""}
      </div>
      {autores.length > 0 && (
        <div className="atlas-tooltip-nota">
          Autoria: {autores.slice(0, 4).join("; ")}
          {autores.length > 4 ? ` e mais ${autores.length - 4}` : ""}
        </div>
      )}
      {destaques.map((d) => (
        <div key={d.rotulo} className="atlas-tooltip-resumo">
          <span className="atlas-tooltip-nota">{d.rotulo}: </span>
          {d.valor}
        </div>
      ))}
      {projetoSub && projetoNome && (
        <div className="atlas-tooltip-projeto">
          <span className="atlas-tooltip-nota">Projeto: </span>
          <Link to={`/mapa-de-projetos?projeto=${projetoSub}`}>{projetoNome}</Link>
        </div>
      )}
      <div className="atlas-tooltip-dica">clique para abrir a ficha</div>
    </div>
  );
}
