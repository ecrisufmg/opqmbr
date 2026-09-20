import type { CSSProperties } from "react";

/**
 * Cores das categorias de ciclo de vida (`analise/ciclo_vida.py`), compartilhadas
 * entre a barra de composição e o Gantt — a cor segue a categoria, nunca o ranking.
 *
 * Regular (a maioria) fica cinza para que as classes que pedem leitura apareçam; as
 * outras seis usam a paleta categórica do site, em ordem fixa (validada com
 * `validate_palette.js`: pior par adjacente ΔE 9,1).
 */

export const SUFIXO_PARCIAL = "_parcial";

export const COR_CLASSE: Record<string, string> = {
  orfao: "var(--serie-1)",
  silencioso: "var(--serie-2)",
  fantasma: "var(--serie-3)",
  zumbi: "var(--serie-4)",
  one_shot: "var(--serie-5)",
  prolifico: "var(--serie-6)",
  regular: "var(--serie-outros)",
};

/** A versão "janela parcial" usa o mesmo matiz, listrado: é a mesma classe, com a
 * ressalva de que a base não permite julgar. */
export function estiloCategoria(chave: string): CSSProperties {
  const parcial = chave.endsWith(SUFIXO_PARCIAL);
  const cor = COR_CLASSE[parcial ? chave.slice(0, -SUFIXO_PARCIAL.length) : chave] ?? "var(--serie-outros)";
  return parcial
    ? { background: `repeating-linear-gradient(135deg, ${cor} 0 3px, var(--color-surface) 3px 6px)` }
    : { background: cor };
}
