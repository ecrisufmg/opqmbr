import { forceSimulation, forceX, forceY, forceCollide, type SimulationNodeDatum } from "d3-force";
import type { Programa } from "../../dados/tipos";

/**
 * Geometria do canvas do Atlas. Antes eram constantes de módulo (`W = 760`,
 * `H = 680`, `iw`/`ih` derivados) espalhadas pelo zoom, pelos satélites e pela
 * projeção geográfica; agora tudo sai de uma medida só — o tamanho do
 * contêiner, lido por `ResizeObserver` — e as funções que dependiam do
 * retângulo recebem a `Geom` como parâmetro, em vez de ler o módulo.
 *
 * `M` é a margem interna do retângulo útil. Em tela pequena ela continua a
 * mesma: é a folga que evita ponto encostado na borda, não uma proporção.
 */
export interface Margens {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Geom {
  W: number;
  H: number;
  /** Retângulo útil (descontadas as margens). */
  iw: number;
  ih: number;
  M: Margens;
  /** Fator de escala para telas menores (celular), evitando que 934 nós
   * colidam e compactem num quadrado maciço. No desktop é sempre 1. */
  fatorEscala: number;
}

export const MARGENS: Margens = { top: 24, right: 24, bottom: 36, left: 24 };
export const MARGENS_MOBILE: Margens = { top: 12, right: 12, bottom: 20, left: 12 };

export function geometria(W: number, H: number): Geom {
  const M = W <= 640 ? MARGENS_MOBILE : MARGENS;
  const iw = Math.max(1, W - M.left - M.right);
  const ih = Math.max(1, H - M.top - M.bottom);
  // Referência de conforto: ~600px de dimensão útil (típico do mapa no desktop).
  // Em telas estreitas (como celular, onde iw ≈ 340-360px), os nós e folgas de colisão
  // reduzem proporcionalmente para manter a densidade, a topologia e os vazios do UMAP.
  const fatorEscala = clamp(Math.min(iw, ih) / 600, 0.5, 1);
  return {
    W,
    H,
    iw,
    ih,
    M,
    fatorEscala,
  };
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function raio(nProducoes: number, fatorEscala: number = 1): number {
  const base = clamp(2.5 + Math.sqrt(nProducoes) * 1.1, 2.5, 9);
  return fatorEscala === 1 ? base : Math.max(1.3, base * fatorEscala);
}

/** Alvo de interação sempre do mesmo tamanho — o ponto visível encolhe com
 * poucas produções, mas são dados públicos (nenhuma supressão em jogo aqui,
 * ao contrário de contagem de pessoas); não há razão pra um projeto com uma
 * produção só ficar difícil demais de passar o mouse em cima. */
export const RAIO_ALVO = 7;

/** Alvo mínimo de toque, em pixels de tela (diâmetro 44 px, WCAG 2.5.8 com o
 * número que se usa em celular de verdade). Convertido para unidades do SVG
 * pelo zoom corrente: `raioAlvo/k`. */
export const RAIO_TOQUE_PX = 22;

/** `forceCollide` empurra pra abrir espaço, mas não sabe onde fica a borda
 * do gráfico — numa região densa (colisão de dezenas de pontos perto do
 * alvo) ele empurra pra fora do retângulo útil, e como o SVG tem
 * `width`/`height` fixos (não `viewBox`), o que passa da borda não aparece
 * cortado — some. Clampar `x`/`y` de cada nó a cada tick (não só a posição
 * relatada pro React) mantém a física consistente: a velocidade também para
 * de empurrar na direção que já bateu na parede. */
export function clamparNaBorda(n: { x?: number; y?: number; r: number }, g: Geom): void {
  if (n.x !== undefined) n.x = clamp(n.x, g.M.left + n.r, g.W - g.M.right - n.r);
  if (n.y !== undefined) n.y = clamp(n.y, g.M.top + n.r, g.H - g.M.bottom - n.r);
}

// Mesma projeção equirretangular de MapaLocalizador.tsx (K = cos da latitude
// de referência, pra não distorcer longitude perto do equador vs. no Sul).
const LAT_REF = (-15 * Math.PI) / 180;
const K_PROJECAO = Math.cos(LAT_REF);

/** Projeta (lon,lat) -> pixel, ajustado ao retângulo útil do gráfico —
 * mesma lógica de MapaLocalizador.tsx, reimplementada aqui porque aqui o
 * "mapa" é o layout inteiro do atlas, não um desenho da malha de UFs. */
export function projetarGeografia(pontos: Array<{ lon: number; lat: number }>, g: Geom) {
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const { lon, lat } of pontos) {
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }
  const larguraGraus = (maxLon - minLon) * K_PROJECAO || 1;
  const alturaGraus = maxLat - minLat || 1;
  const k = Math.min(g.iw / larguraGraus, g.ih / alturaGraus);
  const offX = (g.iw - larguraGraus * k) / 2;
  const offY = (g.ih - alturaGraus * k) / 2;
  return {
    x: (lon: number) => g.M.left + offX + (lon - minLon) * K_PROJECAO * k,
    y: (lat: number) => g.M.top + offY + (maxLat - lat) * k,
  };
}

/**
 * Centro "desamontoado" de um grupo geográfico qualquer (instituição, UF ou
 * região — §4.2.5 item 6, topologia encadeada): parte da posição geográfica
 * real (centroide do grupo) mas roda uma simulação de força SÓ entre os
 * grupos — poucos nós (20 instituições, 15 UFs com programa, 5 regiões), não
 * 934 — com `forceCollide` do tamanho aproximado da nuvem de cada um. Sem
 * isso, grupos próximos (USP/UNICAMP/UNESP, todas em SP; ou os estados do
 * Sudeste entre si) desenhariam uma nuvem só, ilegível. O resultado continua
 * reconhecível como "mapa do Brasil" (a simulação só afasta o necessário)
 * mas cada grupo vira seu próprio blob.
 */
export function calcularCentrosGeograficos(
  grupos: Array<{ chave: string; n: number; lat: number; lon: number }>,
  g: Geom,
): Map<string, { x: number; y: number }> {
  const proj = projetarGeografia(grupos.map((x) => ({ lon: x.lon, lat: x.lat })), g);

  type NoGrupo = SimulationNodeDatum & { chave: string; alvoX: number; alvoY: number; r: number };
  const nos: NoGrupo[] = grupos.map((x) => {
    const alvoX = proj.x(x.lon);
    const alvoY = proj.y(x.lat);
    return { chave: x.chave, alvoX, alvoY, r: (Math.sqrt(x.n) * 3.4 + 10) * g.fatorEscala, x: alvoX, y: alvoY };
  });

  const sim = forceSimulation(nos)
    .force("x", forceX<NoGrupo>((d) => d.alvoX).strength(0.35))
    .force("y", forceY<NoGrupo>((d) => d.alvoY).strength(0.35))
    .force("collide", forceCollide<NoGrupo>((d) => d.r))
    .stop();
  for (let i = 0; i < 300; i++) sim.tick();

  return new Map(nos.map((n) => [n.chave, { x: n.x ?? n.alvoX, y: n.y ?? n.alvoY }]));
}

/** Agrupa instituições (com coordenada) por `uf` ou `regiao`, calculando o
 * centroide (média simples de lat/lon dos programas do grupo) e a contagem
 * de projetos (soma das instituições do grupo) — insumo de
 * `calcularCentrosGeograficos` pros níveis UF e Região. */
export function agruparPorGeografia(
  programas: Programa[],
  instituicoes: Array<{ sigla: string; n: number }>,
  nivel: "uf" | "regiao",
): Array<{ chave: string; n: number; lat: number; lon: number }> {
  const porSigla = new Map(programas.filter((p) => p.lat !== null && p.lon !== null).map((p) => [p.sigla, p]));
  const acumulado = new Map<string, { n: number; somaLat: number; somaLon: number; contagem: number }>();
  for (const i of instituicoes) {
    const p = porSigla.get(i.sigla);
    if (!p) continue;
    const chave = nivel === "uf" ? p.uf : p.regiao;
    const atual = acumulado.get(chave) ?? { n: 0, somaLat: 0, somaLon: 0, contagem: 0 };
    atual.n += i.n;
    atual.somaLat += p.lat as number;
    atual.somaLon += p.lon as number;
    atual.contagem += 1;
    acumulado.set(chave, atual);
  }

  return [...acumulado.entries()].map(([chave, a]) => ({
    chave, n: a.n, lat: a.somaLat / a.contagem, lon: a.somaLon / a.contagem,
  }));
}
