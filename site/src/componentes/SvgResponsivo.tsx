import type { ReactNode } from "react";

/**
 * SVG que acompanha a largura do contêiner: `viewBox` (o desenho é feito numa
 * grade própria, independente de pixels) + `width: 100%` + `preserveAspectRatio`.
 *
 * É o oposto do que o canvas do Atlas faz de propósito: lá o `d3-zoom` calcula
 * o transform em pixels de tela do elemento, então o SVG tem `width`/`height`
 * medidos. Aqui o desenho é estático e pode escalar.
 *
 * Ponto de atenção: `preserveAspectRatio` do tipo `meet` encolhe o desenho
 * inteiro, **texto incluído** — num contêiner estreito o rótulo de 12 unidades
 * pode render menos de 11 px na tela. Por isso `fonteMinima`: converta o
 * tamanho de fonte desejado em px para as unidades do `viewBox`, supondo a
 * largura mínima em que o desenho vai ser exibido.
 */
export default function SvgResponsivo({
  viewBox,
  preserveAspectRatio = "xMidYMid meet",
  larguraMinima,
  rotulo,
  className,
  children,
}: {
  /** `"0 0 320 120"`, por exemplo. */
  viewBox: string;
  preserveAspectRatio?: string;
  /** Largura em px que o desenho pode ter no pior caso (celular estreito). */
  larguraMinima: number;
  /** `aria-label` do desenho; sem ele o SVG fica `aria-hidden`. */
  rotulo?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      style={{ display: "block", width: "100%", height: "auto" }}
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      focusable="false"
      data-largura-minima={larguraMinima}
    >
      {children}
    </svg>
  );
}

/** Tamanho de fonte (em unidades do `viewBox`) que garante pelo menos
 * `minimoPx` na tela quando o SVG é exibido a `larguraMinima` px. */
export function fonteMinima(larguraViewBox: number, larguraMinima: number, minimoPx = 11): number {
  if (larguraMinima <= 0) return minimoPx;
  return (minimoPx * larguraViewBox) / larguraMinima;
}
