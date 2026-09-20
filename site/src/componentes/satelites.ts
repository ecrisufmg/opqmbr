/**
 * Produções de um projeto como "satélites" ao redor do ponto dele no canvas do Atlas.
 *
 * **Agrupadas por subtipo**: cada subtipo forma um *cacho* compacto (empacotamento em espiral
 * de girassol, o mais denso que se consegue com círculos iguais), e os cachos ficam
 * distribuídos numa circunferência em volta do projeto, sem se tocar, na ordem tipo → subtipo
 * (os de um mesmo tipo ficam vizinhos, e a faixa de cor acompanha). Assim todos os artigos
 * estão juntos, a música junta, as apresentações juntas — e cada cacho leva um rótulo.
 *
 * Unidades de SVG antes do zoom: o canvas é ampliado ao abrir o projeto. Até MAX_SATELITES
 * cabem; passando disso, cada subtipo mantém uma fatia proporcional (os mais recentes) e o
 * resto fica só na lista.
 */

import { FATOR_ANEL } from "./corProducao";

/** Raio do círculo da marca (miolo + borda do tipo). Precisa ser folgado: o ícone dentro tem de
 * ser legível. O anel institucional vai por fora (ver `FATOR_ANEL`). */
export const RAIO_MARCA = 3.6;
/** Raio total, anel incluído: é ele que dita o espaçamento entre marcas. */
export const RAIO_TOTAL = RAIO_MARCA * FATOR_ANEL;
export const MAX_SATELITES = 150;

const ESPACO = 2 * RAIO_TOTAL + 0.6; // distância entre marcas vizinhas de um cacho
const C = ESPACO / 1.75; // r_j = C·√(j+½): o vizinho mais próximo fica a ~ESPACO
const ANGULO_OURO = 2.399963229728653;
const FOLGA_ENTRE_CACHOS = 2;
const FOLGA_DO_PROJETO = 2.2; // distância entre a borda do nó do projeto e a dos cachos

export interface Satelite {
  /** Posição na lista de produções do projeto (a que se passou para o cálculo). */
  i: number;
  x: number;
  y: number;
}

/** Rótulo do cacho no mapa (duas linhas: nome, contagem): o nome é cortado neste tamanho e o
 * nome inteiro fica na legenda. */
export const MAX_LETRAS_ROTULO = 22;

export interface RotuloCacho {
  grupo: string;
  /** Quantas produções o subtipo tem no projeto. */
  n: number;
  /** Quantas o canvas desenha (menos que `n` quando o total passa de MAX_SATELITES). */
  mostradas: number;
  x: number;
  y: number;
  ancora: "start" | "middle" | "end";
}

export interface Constelacao {
  satelites: Satelite[];
  rotulos: RotuloCacho[];
  /** Meia-largura e meia-altura do que se estende a partir do projeto, rótulos incluídos —
   * para escolher o zoom que cabe nas duas direções (rótulo lateral é largo). */
  extX: number;
  extY: number;
  /** Produções que não couberam no canvas. */
  omitidas: number;
}

/** Quantas de cada grupo entram, se o total passar de MAX_SATELITES: fatia proporcional,
 * no mínimo 1 por grupo — nenhum subtipo some do mapa. */
function cotas(contagens: Map<string, number>, total: number): Map<string, number> {
  if (total <= MAX_SATELITES) return new Map(contagens);
  const q = new Map<string, number>();
  for (const [g, n] of contagens) q.set(g, Math.max(1, Math.floor((n * MAX_SATELITES) / total)));
  let soma = [...q.values()].reduce((s, v) => s + v, 0);
  while (soma > MAX_SATELITES) {
    // tira do maior cacho, um a um, até caber
    const maior = [...q.entries()].sort((a, b) => b[1] - a[1])[0];
    q.set(maior[0], maior[1] - 1);
    soma -= 1;
  }
  return q;
}

/**
 * `grupos[i]` é o grupo (subtipo) da produção i; `ordem` dá a posição de cada grupo em volta
 * do projeto (tipo → subtipo). Devolve onde cada produção mantida vai, os rótulos dos cachos
 * e o raio total.
 */
export function posicionarConstelacao(
  grupos: string[],
  ordem: (grupo: string) => number,
  cx: number,
  cy: number,
  raioProjeto: number,
): Constelacao {
  const indices = new Map<string, number[]>();
  grupos.forEach((g, i) => {
    const l = indices.get(g);
    if (l) l.push(i);
    else indices.set(g, [i]);
  });
  const quota = cotas(new Map([...indices].map(([g, l]) => [g, l.length])), grupos.length);

  const lista = [...indices.keys()].sort((a, b) => ordem(a) - ordem(b) || a.localeCompare(b));
  const cachos = lista.map((g) => {
    const mantidas = (indices.get(g) ?? []).slice(0, quota.get(g) ?? 0);
    return { g, mantidas, rb: C * Math.sqrt(mantidas.length + 0.5) + RAIO_TOTAL + 0.6 };
  });
  const omitidas = grupos.length - cachos.reduce((s, c) => s + c.mantidas.length, 0);
  if (cachos.length === 0) return { satelites: [], rotulos: [], extX: raioProjeto, extY: raioProjeto, omitidas: 0 };

  // Raio da circunferência de centros: o menor em que todos os cachos, lado a lado, fecham a
  // volta (busca binária no ângulo total exigido).
  const k = cachos.length;
  const passo = (a: number, b: number, R: number) =>
    2 * Math.asin(Math.min(1, (cachos[a].rb + cachos[b].rb + FOLGA_ENTRE_CACHOS) / (2 * R)));
  const exigido = (R: number) => {
    let s = 0;
    for (let i = 0; i < k; i++) s += passo(i, (i + 1) % k, R);
    return s;
  };
  const rbMax = Math.max(...cachos.map((c) => c.rb));
  let lo = raioProjeto + FOLGA_DO_PROJETO + rbMax;
  let Rc = lo;
  if (k > 1 && exigido(lo) > 2 * Math.PI) {
    let hi = lo * 4;
    while (exigido(hi) > 2 * Math.PI) hi *= 2;
    for (let it = 0; it < 40; it++) {
      const meio = (lo + hi) / 2;
      if (exigido(meio) > 2 * Math.PI) lo = meio;
      else hi = meio;
    }
    Rc = hi;
  }

  // Espalha a folga que sobrou entre todos os cachos (a soma dos passos vira a volta inteira).
  const escala = k > 1 ? (2 * Math.PI) / exigido(Rc) : 1;
  const angulos: number[] = [];
  let theta = -Math.PI / 2; // o primeiro cacho fica no topo
  cachos.forEach((_, idx) => {
    angulos.push(theta);
    if (k > 1) theta += passo(idx, (idx + 1) % k, Rc) * escala;
  });

  // Encaixe: os cachos entram do maior para o menor, e cada um procura, perto do ângulo que a
  // ordem tipo → subtipo lhe deu, a posição mais próxima do nó em que não toca no nó nem nos já
  // colocados. Vale mais chegar perto do que respeitar o ângulo à risca (o custo do desvio é
  // proporcional ao arco), mas o desvio é limitado: cachos do mesmo tipo continuam vizinhos.
  // Antes, uma só circunferência deixava um vazio de ~80 unidades em volta do nó.
  const dist: number[] = cachos.map(() => NaN);
  const angulo: number[] = cachos.map((_, i) => angulos[i]);
  const colocados: number[] = [];
  const ordemPuxada = cachos.map((_, i) => i).sort((a, b) => cachos[b].rb - cachos[a].rb);
  const DESVIO_MAX = (50 * Math.PI) / 180;
  const PASSO_ANG = (2.5 * Math.PI) / 180;
  const PESO_ARCO = 0.35;
  for (const i of ordemPuxada) {
    const dMinI = raioProjeto + FOLGA_DO_PROJETO + cachos[i].rb;
    let melhor = { custo: Infinity, d: Rc, a: angulos[i] };
    for (let desvio = -DESVIO_MAX; desvio <= DESVIO_MAX + 1e-9; desvio += PASSO_ANG) {
      const a = angulos[i] + desvio;
      const ux = Math.cos(a);
      const uy = Math.sin(a);
      const proibidos: Array<[number, number]> = [];
      for (const j of colocados) {
        const pjx = dist[j] * Math.cos(angulo[j]);
        const pjy = dist[j] * Math.sin(angulo[j]);
        const sRaio = cachos[i].rb + cachos[j].rb + FOLGA_ENTRE_CACHOS;
        const b = ux * pjx + uy * pjy;
        const disc = b * b - (pjx * pjx + pjy * pjy) + sRaio * sRaio;
        if (disc > 0) proibidos.push([b - Math.sqrt(disc), b + Math.sqrt(disc)]);
      }
      proibidos.sort((p, q) => p[0] - q[0]);
      let d = dMinI;
      for (const [lo, hi] of proibidos) if (d > lo && d < hi) d = hi;
      const custo = d + PESO_ARCO * d * Math.abs(desvio);
      if (custo < melhor.custo) melhor = { custo, d, a };
    }
    dist[i] = melhor.d;
    angulo[i] = melhor.a;
    colocados.push(i);
  }

  const satelites: Satelite[] = [];
  const rotulos: RotuloCacho[] = [];
  let extX = raioProjeto;
  let extY = raioProjeto;
  cachos.forEach((c, idx) => {
    const theta = angulo[idx];
    const gx = cx + dist[idx] * Math.cos(theta);
    const gy = cy + dist[idx] * Math.sin(theta);
    c.mantidas.forEach((iOriginal, j) => {
      const r = C * Math.sqrt(j + 0.5);
      const a = j * ANGULO_OURO + theta;
      satelites.push({ i: iOriginal, x: gx + r * Math.cos(a), y: gy + r * Math.sin(a) });
    });
    const dx = Math.cos(theta);
    const dy = Math.sin(theta);
    const alcance = dist[idx] + c.rb + 1.5;
    rotulos.push({
      grupo: c.g,
      n: indices.get(c.g)?.length ?? 0,
      mostradas: c.mantidas.length,
      x: cx + alcance * dx,
      y: cy + alcance * dy,
      ancora: dx > 0.35 ? "start" : dx < -0.35 ? "end" : "middle",
    });
    // Extensão do cacho e do seu rótulo, em duas linhas (nome; "n de n"): ~1,95 unidades por caractere.
    const larg = Math.max(Math.min(c.g.split("||")[1]?.length ?? 12, MAX_LETRAS_ROTULO), 8) * 1.95;
    const lx = Math.abs(alcance * dx);
    const ly = Math.abs(alcance * dy);
    const alcanceRotulo = dx > 0.35 || dx < -0.35 ? lx + larg : lx + larg / 2;
    extX = Math.max(extX, Math.abs(gx - cx) + c.rb, alcanceRotulo);
    extY = Math.max(extY, Math.abs(gy - cy) + c.rb, ly + 6);
  });
  return { satelites, rotulos, extX, extY, omitidas };
}

/** Estimativa do raio antes de as produções chegarem (o zoom do clique não espera): supõe
 * quatro cachos de tamanho parecido. Assim que a lista carrega, o zoom é refeito com o real. */
export function estimarRaio(n: number, raioProjeto: number): { x: number; y: number } {
  const grupos = Array.from({ length: Math.max(1, n) }, (_, i) => `g||${"x".repeat(14)}${i % 4}`);
  const c = posicionarConstelacao(grupos, (g) => g.length, 0, 0, raioProjeto);
  return { x: c.extX, y: c.extY };
}
