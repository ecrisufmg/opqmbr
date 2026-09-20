import type { AtlasProjeto, FichaProjeto, ProducaoProjeto } from "../dados/tipos";
import type { Destaque } from "../dados/destaques";
import { agenciasDistintas, periodo, situacaoRotulo } from "./FichaProjeto";
import { ROTULO_CLASSE_PRODUCAO } from "../dados/formato";

const LARGURA = 420; // ≈ max-width do popup (26rem), para decidir de que lado abrir
const ALTURA = 230;

/** Posiciona um popup `fixed` junto do cursor, virando para o outro lado quando
 * passaria da borda da janela. */
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
 * Popup ao passar o mouse sobre um projeto: o essencial numa olhada — título, situação e
 * período, resumo, quem é o responsável, quem financia, tema. O resumo e o resto vêm de
 * `ficha_projeto.json`, carregado em segundo plano; até chegar, o popup mostra o que o
 * ponto já sabe.
 */
export function TooltipProjeto({
  x,
  y,
  p,
  tema,
  ficha,
}: {
  x: number;
  y: number;
  p: AtlasProjeto;
  tema: string;
  ficha: FichaProjeto | null;
}) {
  const per = ficha ? periodo(ficha) : null;
  const sit = ficha ? situacaoRotulo(ficha.situacao) : null;
  const meta = [p.sigla, sit, per, `${p.n_producoes} produções`, ficha ? `${ficha.n_membros} membros` : null]
    .filter(Boolean)
    .join(" · ");
  const agencias = ficha ? agenciasDistintas(ficha) : [];

  return (
    <div className="atlas-tooltip atlas-tooltip-ficha" style={posicao(x, y)}>
      <strong>{p.nome ?? "(sem título)"}</strong>
      <div className="atlas-tooltip-nota">{meta}</div>
      {ficha?.resumo && <div className="atlas-tooltip-resumo">{ficha.resumo}</div>}
      {ficha && (ficha.responsaveis.length > 0 || agencias.length > 0) && (
        <div className="atlas-tooltip-nota">
          {ficha.responsaveis.length > 0 && <>Responsável: {ficha.responsaveis.join("; ")}</>}
          {ficha.responsaveis.length > 0 && agencias.length > 0 && " · "}
          {agencias.length > 0 && <>Fomento: {agencias.join(", ")}</>}
        </div>
      )}
      <div className="atlas-tooltip-nota">
        {tema}
        {p.subarea ? ` · ${p.subarea}` : ""}
      </div>
      <div className="atlas-tooltip-dica">clique para fixar e ler a descrição completa</div>
    </div>
  );
}

/** Popup ao passar o mouse sobre uma produção (satélite) no canvas: o resumo — título,
 * tipo, autoria e os campos-chave do detalhe. Clicar fixa o cartão da produção. */
export function TooltipProducao({
  x,
  y,
  pr,
  marca,
  destaques,
  projetoNome,
  responsaveis,
}: {
  x: number;
  y: number;
  pr: ProducaoProjeto;
  marca: React.ReactNode;
  destaques: Destaque[];
  /** O projeto a que a produção pertence — o cartão do projeto não fica visível com as produções abertas. */
  projetoNome: string | null;
  responsaveis: string[];
}) {
  const autores = pr.autores.map((a) => a.nome);
  return (
    <div className="atlas-tooltip atlas-tooltip-ficha" style={posicao(x, y)}>
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
      {projetoNome && (
        <div className="atlas-tooltip-projeto">
          <span className="atlas-tooltip-nota">Projeto: </span>
          {projetoNome}
          {responsaveis.length > 0 && (
            <span className="atlas-tooltip-nota"> · Responsável: {responsaveis.join("; ")}</span>
          )}
        </div>
      )}
      <div className="atlas-tooltip-dica">clique para fixar este cartão</div>
    </div>
  );
}
