import { corInstituicao } from "../dados/cores";
import { ANEL_LARGURA, ANEL_VAO, FATOR_ANEL, type Marca } from "./corProducao";

/**
 * A marca de uma produção como elemento SVG: um **círculo** com a **borda** na cor do tipo, o
 * **miolo** na cor da família do subtipo e, por cima, o **ícone** do subtipo (plano,
 * monocromático, num traçado 24×24 dos Material Design Icons). Serve ao canvas do Atlas (os
 * satélites) e às marcas em HTML. O ícone não recebe eventos: quem reage ao mouse é o círculo.
 *
 * Com `anel` (a cor da instituição), uma **segunda borda** envolve o círculo, separada dele por
 * um vão: o raio `r` continua sendo o do círculo, e o anel fica por fora (total `r·FATOR_ANEL`).
 * O anel não recebe eventos.
 */
export function MarcaSvg({
  marca,
  cx = 0,
  cy = 0,
  r,
  realce = false,
  anel,
  ...eventos
}: {
  marca: Marca;
  cx?: number;
  cy?: number;
  r: number;
  realce?: boolean;
  /** Cor da instituição; sem ela não há anel. */
  anel?: string;
} & React.SVGProps<SVGElement>) {
  // A borda fica por dentro do raio: o círculo continua de raio `r` incluindo a borda.
  const esp = r * 0.22;
  const tamIcone = r * 1.62; // diâmetro do ícone dentro do miolo
  const escala = tamIcone / 24;
  const larguraAnel = r * ANEL_LARGURA;
  return (
    <>
      {anel && (
        <circle
          cx={cx}
          cy={cy}
          r={r * (1 + ANEL_VAO) + larguraAnel / 2}
          style={{ fill: "none", stroke: anel, strokeWidth: larguraAnel, pointerEvents: "none" }}
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={r - esp / 2}
        style={{
          fill: marca.fill,
          stroke: realce ? "var(--color-text)" : marca.borda,
          strokeWidth: realce ? esp * 1.5 : esp,
          cursor: eventos.onClick ? "pointer" : undefined,
        }}
        {...(eventos as object)}
      />
      <path
        d={marca.icone}
        transform={`translate(${cx} ${cy}) scale(${escala}) translate(-12 -12)`}
        style={{ fill: marca.corIcone, pointerEvents: "none" }}
      />
    </>
  );
}

/** Marca em HTML (legenda, lista, tooltips): a mesma do mapa. Com `sigla`, leva o anel da
 * instituição — a legenda de subtipos não passa, pois ali a instituição não faz sentido. */
export default function MarcaProducao({
  marca,
  sigla,
  tamanho = 22,
}: {
  marca: Marca;
  sigla?: string;
  tamanho?: number;
}) {
  const ext = (sigla ? FATOR_ANEL : 1) + 0.1; // + folga para o traço do realce
  return (
    <svg
      className="marca-producao"
      width={sigla ? tamanho * (ext / 1.1) : tamanho}
      height={sigla ? tamanho * (ext / 1.1) : tamanho}
      viewBox={`${-ext} ${-ext} ${2 * ext} ${2 * ext}`}
      aria-hidden="true"
      focusable="false"
    >
      <MarcaSvg marca={marca} r={1} anel={sigla ? corInstituicao(sigla) : undefined} />
    </svg>
  );
}
