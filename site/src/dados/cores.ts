import coresInstituicoes from "./cores_instituicoes.json";

/**
 * Cor por instituição, extraída do logo de cada uma
 * (`analise/cores_instituicoes.py`) — não uma paleta arbitrária. Gerado,
 * versionado (mesma exceção de `logos/*.webp`, docs/PLANO.md §3.4); rodar
 * de novo só quando um logo mudar.
 *
 * Reusa em qualquer gráfico que precise de "cor por instituição" — hoje só
 * o atlas de projetos, mas a função é genérica de propósito.
 */
const TABELA: Record<string, { hex: string; fallback?: boolean }> = coresInstituicoes;

const COR_DESCONHECIDA = "var(--color-text-muted)";

export function corInstituicao(sigla: string): string {
  return TABELA[sigla]?.hex ?? COR_DESCONHECIDA;
}

/** Mistura `cor` com `outra` (`k` = 0 → só `cor`; 1 → só `outra`), ambas `#rrggbb`. Para "esmaecer"
 * um ponto preservando o matiz da instituição. Cor que não for `#rrggbb` volta como veio. */
export function misturarHex(cor: string, outra: string, k: number): string {
  const ler = (h: string) => (/^#[0-9a-f]{6}$/i.test(h) ? [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) : null);
  const a = ler(cor);
  const b = ler(outra);
  if (!a || !b) return cor;
  const t = Math.max(0, Math.min(1, k));
  return `#${a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join("")}`;
}
