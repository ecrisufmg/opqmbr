import { useRef } from "react";
import { corInstituicao } from "../../dados/cores";
import type { Esquema } from "../corProducao";
import type { CategoriaProducao } from "../corProducao";
import LegendaProducoes, { type FiltroLegenda } from "../LegendaProducoes";
import { IconeLegenda } from "../Icones";
import SvgResponsivo, { fonteMinima } from "../SvgResponsivo";
import { useFechaFora } from "../useMidia";

// A grade do desenho tem de comportar o rótulo mais comprido (`miolo = família
// do subtipo`, ~26 letras) ao tamanho de fonte de `fonteMinima`; com 300 o
// texto saía do `viewBox` e era cortado na borda.
const VB = 340;
const LARGURA_MIN = 300;

/**
 * A anatomia de uma marca de produção: a
 * **borda** é o tipo, o **miolo** agrupa o subtipo por família, o **ícone**
 * identifica o subtipo e o **anel** externo é a instituição do programa.
 *
 * Desenhada com `SvgResponsivo` (`viewBox` + `width: 100%`): a mesma chave
 * serve ao painel de 320 px no desktop e à folha de 360 px no celular, e
 * `fonteMinima` garante que nenhum rótulo caia abaixo de 11 px na tela.
 */
function ChaveMarca() {
  const f = fonteMinima(VB, LARGURA_MIN, 11);
  const cx = 44;
  const cy = 58;
  const r = 24;
  return (
    <SvgResponsivo viewBox={`0 0 ${VB} 116`} larguraMinima={LARGURA_MIN} rotulo="Anatomia da marca de produção">
      {/* anel externo = instituição */}
      <circle cx={cx} cy={cy} r={r * 1.25} fill="none" stroke="var(--color-accent)" strokeWidth={4} />
      {/* círculo (miolo + borda do tipo) */}
      <circle cx={cx} cy={cy} r={r} fill="var(--serie-4)" stroke="var(--color-accent)" strokeWidth={5} />
      {/* ícone do subtipo, aqui só o lugar dele */}
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central" fontSize={r * 0.9} fill="var(--color-text)">?</text>

      <g fontSize={f} fill="var(--color-text-muted)">
        <line x1={cx + 30} y1={cy - 20} x2={112} y2={12} stroke="var(--color-border)" strokeWidth={1} />
        <text x={116} y={16}>anel = instituição</text>
        <line x1={cx + 25} y1={cy - 8} x2={112} y2={40} stroke="var(--color-border)" strokeWidth={1} />
        <text x={116} y={44}>borda = tipo</text>
        <line x1={cx + 25} y1={cy + 6} x2={112} y2={68} stroke="var(--color-border)" strokeWidth={1} />
        <text x={116} y={72}>miolo = família do subtipo</text>
        <line x1={cx + 8} y1={cy + 26} x2={112} y2={96} stroke="var(--color-border)" strokeWidth={1} />
        <text x={116} y={100}>ícone = subtipo exato</text>
      </g>
    </SvgResponsivo>
  );
}

/** O miolo da legenda: a chave mínima (que continua dizendo o que cada canal
 * visual significa), a anatomia da marca, as cores de instituição e — com um
 * projeto aberto — o filtro por classe/tipo/subtipo (`LegendaProducoes`). É o
 * mesmo conteúdo no popover do desktop e na folha do celular. */
export function LegendaConteudo({
  siglas,
  producoes,
  esquema,
  filtro,
  onFiltro,
}: {
  siglas: string[];
  /** Produções visíveis do projeto aberto (`null` sem projeto). */
  producoes: CategoriaProducao[] | null;
  esquema: Esquema;
  filtro: FiltroLegenda | null;
  onFiltro: (f: FiltroLegenda | null) => void;
}) {
  return (
    <div className="atlas-legenda-corpo">
      <p className="atlas-legenda-minima">
        círculo = um projeto (tamanho = nº de produções) · <strong>cor = instituição</strong> ·
        anel da marca = instituição · borda = tipo
      </p>

      <ChaveMarca />

      <div className="legenda">
        {siglas.map((sigla) => (
          <span key={sigla} className="legenda-item">
            <span className="legenda-marca" style={{ background: corInstituicao(sigla) }} />
            {sigla}
          </span>
        ))}
      </div>

      {producoes && producoes.length > 0 && (
        <LegendaProducoes esquema={esquema} producoes={producoes} filtro={filtro} onFiltro={onFiltro} />
      )}
    </div>
  );
}

/**
 * A chave do mapa, como um botão flutuante no canto inferior esquerdo (§3.1):
 * recolhida, é só o ícone e a palavra "Legenda", translúcida; aberta, expande
 * para cima com o conteúdo completo. No celular o botão abre a folha inferior
 * (a rota decide, via `comPopover`).
 *
 * Um ponto sobre o botão avisa que há um filtro de produções ativo — sem ele,
 * o filtro feito na legenda ficaria invisível com a legenda fechada.
 */
export default function AtlasLegenda({
  aberta,
  comPopover,
  filtroAtivo,
  onAlternar,
  onFechar,
  conteudo,
}: {
  aberta: boolean;
  comPopover: boolean;
  filtroAtivo: boolean;
  onAlternar: () => void;
  onFechar: () => void;
  conteudo: React.ReactNode;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  useFechaFora(caixa, comPopover && aberta, onFechar);

  return (
    <div className="atlas-legenda" ref={caixa}>
      {comPopover && aberta && (
        <div className="flutuante-painel" role="dialog" aria-label="Chave do mapa">
          <header className="flutuante-cab">
            <strong>Chave do mapa</strong>
            <button type="button" className="painel-fechar" onClick={onFechar} aria-label="Fechar">
              ✕
            </button>
          </header>
          {conteudo}
        </div>
      )}
      <button
        type="button"
        className={`atlas-legenda-botao atlas-flutua${aberta ? " aberto ativo" : ""}`}
        aria-expanded={aberta}
        aria-haspopup="dialog"
        onClick={onAlternar}
      >
        <IconeLegenda />
        <span>Legenda</span>
        {filtroAtivo && <span className="atlas-legenda-ponto" role="img" aria-label="filtro de produções ativo" />}
      </button>
    </div>
  );
}
