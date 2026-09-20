import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { select } from "d3-selection";
import { zoom as d3zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior, type ZoomTransform } from "d3-zoom";
import "d3-transition";
import type { ProducoesMapa } from "../../dados/tipos";
import { useTamanho, useToqueGrosso } from "../useMidia";

/**
 * O canvas do Mapa de produções: um **canvas 2D** (não SVG — 21,5 mil marcas
 * não cabem em elementos SVG), com `d3-zoom` para roda/pinça/pan e um índice
 * espacial (grade uniforme) para acerto de clique/hover/touch.
 *
 * O desenho é agrupado por cor: todos os pontos de uma mesma instituição viram
 * um único `Path2D` preenchido de uma vez (≈20 fill por quadro, não 21,5 mil) —
 * é o que segura os 60 fps. Em zoom baixo cada marca é um ponto de 1,7 px; em
 * zoom alto a marca cresce, ganha a borda do tipo e, quando há poucos pontos em
 * tela, o ícone do subtipo.
 */
export interface MapaCanvasHandle {
  /** Enquadra a produção (zoom até o ponto ficar legível). */
  focarProducao: (i: number) => void;
  /** Volta ao enquadramento inicial (tudo à vista). */
  reenquadrar: () => void;
  /** Um degrau de zoom (botões ⊕/⊖). */
  zoomPor: (fator: number) => void;
}

interface Props {
  mapa: ProducoesMapa;
  visiveis: number[];
  xDe: (i: number) => number | null;
  yDe: (i: number) => number | null;
  /** Cor da instituição de cada linha (pré-computada). */
  corDe: (i: number) => string;
  /** Borda do tipo de cada linha. */
  bordaDe: (i: number) => string;
  /** Traçado do ícone do subtipo (ou null). */
  iconeDe: (i: number) => string | null;
  /** A produção pertence ao projeto em foco (`?projeto=`)? */
  realceDe: (i: number) => boolean;
  focandoProjeto: boolean;
  /** Modo "por aderência": 0–1 do quanto a marca pertence às subáreas marcadas
   * (null = fora do modo). Acende/esmaece as marcas no lugar do foco de projeto. */
  intensidadeDe?: (i: number) => number | null;
  aderenciaAtiva?: boolean;
  /** Corte do alcance (0–1): marca com aderência abaixo disso esmaece. */
  limiarAderencia?: number;
  selecionadoId: string | null;
  /** Linha a enquadrar na abertura (deep link `?producao=`). Aplicada uma vez,
   * depois que o canvas mede o próprio tamanho: focar antes deixaria o zoom
   * calculado para a geometria provisória e a marca fora da tela. */
  focoInicial?: number | null;
  onSelecionar: (id: string | null) => void;
  onToqueFundo: () => void;
  /** Linha sob o ponteiro (ou null), em coordenadas da janela, para o tooltip
   * rico renderizado pela rota (não aqui: o canvas não conhece título/autor). */
  onHover: (i: number | null, clientX: number, clientY: number) => void;
  /** O ponteiro saiu do canvas — a rota decide se fecha o tooltip já ou dá um
   * respiro para o ponteiro alcançar o link dentro dele. */
  onSair: () => void;
}

const MARCA_PEQUENA = 1.7;
const MARCA_MEDIA = 2.4;
const MARCA_GRANDE = 3.4;
const ZOOM_BORDA = 2.0;
const ZOOM_ICONE = 6.0;
const MAX_ICONES = 400;
const RAIO_ALVO_FINO = 8;
const RAIO_ALVO_TOQUE = 22;
const CELULA_INDICE = 28;
/** No modo "por aderência", marca com aderência abaixo disso esmaece. */
const LIMIAR_ADERENCIA = 0.15;

interface IndiceLinha {
  sx: number;
  sy: number;
  i: number;
}

interface Estado {
  mapa: ProducoesMapa;
  visiveis: number[];
  corDe: (i: number) => string;
  bordaDe: (i: number) => string;
  iconeDe: (i: number) => string | null;
  realceDe: (i: number) => boolean;
  focandoProjeto: boolean;
  intensidadeDe?: (i: number) => number | null;
  aderenciaAtiva?: boolean;
  limiarAderencia?: number;
  selecionadoId: string | null;
  linhaDe: Map<string, number>;
  ax: Float32Array;
  ay: Float32Array;
  k0: number;
  ox: number;
  oy: number;
  W: number;
  H: number;
}

const MapaCanvas = forwardRef<MapaCanvasHandle, Props>(function MapaCanvas(props, ref) {
  const toque = useToqueGrosso();
  const [caixaRef, tamanho] = useTamanho<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomRef = useRef<ZoomBehavior<HTMLCanvasElement, unknown> | null>(null);
  const viewRef = useRef({ k: 1, x: 0, y: 0 });
  const indiceRef = useRef<Map<string, IndiceLinha[]>>(new Map());
  const inicioRef = useRef<{ x: number; y: number } | null>(null);
  const focoFeitoRef = useRef(false);

  const W = Math.max(320, tamanho.largura || 960);
  const H = Math.max(240, tamanho.altura || 680);

  // Coordenadas do método ativo + enquadramento base (o "zoom 1"), recalculado
  // só quando muda o método ou o tamanho — não a cada filtro.
  const geo = useMemo(() => {
    const n = props.mapa.n;
    const ax = new Float32Array(n);
    const ay = new Float32Array(n);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < n; i++) {
      const x = props.xDe(i);
      const y = props.yDe(i);
      if (x === null || y === null) {
        ax[i] = 0;
        ay[i] = 0;
        continue;
      }
      ax[i] = x;
      ay[i] = y;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const margem = 24;
    const largura = (maxX - minX) || 1;
    const altura = (maxY - minY) || 1;
    const k0 = Math.min(Math.max(1, W - margem * 2) / largura, Math.max(1, H - margem * 2) / altura);
    const ox = (W - largura * k0) / 2 - minX * k0;
    const oy = (H - altura * k0) / 2 - minY * k0;
    return { ax, ay, k0, ox, oy };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mapa, W, H, props.xDe, props.yDe]);

  // id da produção → linha, para achar a marca selecionada sem varrer 21 mil ids.
  const linhaDe = useMemo(() => {
    const m = new Map<string, number>();
    props.mapa.ids.forEach((id, i) => m.set(id, i));
    return m;
  }, [props.mapa]);

  // O estado que o `redraw` lê é o do último render — guardado num ref, para o
  // handler do d3-zoom (que fica registrado uma vez) nunca enxergar closure velha.
  const estadoRef = useRef<Estado | null>(null);
  estadoRef.current = {
    mapa: props.mapa,
    visiveis: props.visiveis,
    corDe: props.corDe,
    bordaDe: props.bordaDe,
    iconeDe: props.iconeDe,
    realceDe: props.realceDe,
    focandoProjeto: props.focandoProjeto,
    intensidadeDe: props.intensidadeDe,
    aderenciaAtiva: props.aderenciaAtiva,
    limiarAderencia: props.limiarAderencia,
    selecionadoId: props.selecionadoId,
    linhaDe,
    ax: geo.ax,
    ay: geo.ay,
    k0: geo.k0,
    ox: geo.ox,
    oy: geo.oy,
    W,
    H,
  };

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const e = estadoRef.current;
    if (!canvas || !e) return;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(e.W * dpr) || canvas.height !== Math.round(e.H * dpr)) {
      canvas.width = Math.round(e.W * dpr);
      canvas.height = Math.round(e.H * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, e.W, e.H);

    const { ax, ay, k0, ox, oy, W: w, H: h } = e;
    const { k, x, y } = viewRef.current;

    const r = k < ZOOM_BORDA ? MARCA_PEQUENA : k < ZOOM_ICONE ? MARCA_MEDIA : MARCA_GRANDE;
    const comBorda = k >= ZOOM_BORDA;
    const comIcone = k >= ZOOM_ICONE;
    const focando = e.focandoProjeto;
    const comAderencia = !!e.aderenciaAtiva && !!e.intensidadeDe;
    const limiar = e.limiarAderencia ?? LIMIAR_ADERENCIA;
    // "Aceso" decide se o ponto entra no grupo cheio ou no esmaecido. No modo
    // por aderência, acende quem passa do corte; com foco de projeto, quem é do
    // projeto; sem nada disso, tudo aceso.
    const aceso = (i: number): boolean => {
      if (comAderencia) return (e.intensidadeDe!(i) ?? 0) >= limiar;
      if (focando) return e.realceDe(i);
      return true;
    };

    const porCor = new Map<string, Path2D>();
    const porCorFoco = new Map<string, Path2D>();
    const porBorda = new Map<string, Path2D>();
    const indice: Map<string, IndiceLinha[]> = new Map();
    let naTela = 0;
    const pontosParaIcone: Array<{ i: number; sx: number; sy: number }> = [];

    for (const i of e.visiveis) {
      const sx = ax[i] * k0 + ox;
      const sy = ay[i] * k0 + oy;
      const px = sx * k + x;
      const py = sy * k + y;
      if (px < -8 || px > w + 8 || py < -8 || py > h + 8) continue;
      naTela++;

      const chave = `${Math.floor(px / CELULA_INDICE)},${Math.floor(py / CELULA_INDICE)}`;
      let lista = indice.get(chave);
      if (!lista) {
        lista = [];
        indice.set(chave, lista);
      }
      lista.push({ sx: px, sy: py, i });

      const acesa = aceso(i);
      const destino = acesa ? porCorFoco : porCor;
      const cor = e.corDe(i);
      let p = destino.get(cor);
      if (!p) {
        p = new Path2D();
        destino.set(cor, p);
      }
      p.moveTo(px + r, py);
      p.arc(px, py, r, 0, Math.PI * 2);

      if (comBorda && acesa) {
        const borda = e.bordaDe(i);
        let b = porBorda.get(borda);
        if (!b) {
          b = new Path2D();
          porBorda.set(borda, b);
        }
        b.moveTo(px + r + 1, py);
        b.arc(px, py, r + 1, 0, Math.PI * 2);
      }

      if (comIcone && acesa) pontosParaIcone.push({ i, sx: px, sy: py });
    }
    indiceRef.current = indice;

    // Fundo: com aderência ou foco de projeto, as demais esmaecem; o grupo que
    // importa acende.
    ctx.globalAlpha = focando || comAderencia ? 0.14 : 0.9;
    for (const [cor, p] of porCor) {
      ctx.fillStyle = cor;
      ctx.fill(p);
    }
    ctx.globalAlpha = 1;
    for (const [cor, p] of porCorFoco) {
      ctx.fillStyle = cor;
      ctx.fill(p);
    }

    if (comBorda) {
      ctx.lineWidth = 1;
      for (const [borda, b] of porBorda) {
        ctx.strokeStyle = borda;
        ctx.stroke(b);
      }
    }

    if (comIcone && naTela < MAX_ICONES) {
      for (const { i, sx, sy } of pontosParaIcone) {
        const d = e.iconeDe(i);
        if (!d) continue;
        const tam = r * 1.9;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.scale(tam / 24, tam / 24);
        ctx.translate(-12, -12);
        const path = new Path2D(d);
        ctx.lineWidth = 1.2 / (tam / 24);
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.stroke(path);
        ctx.fillStyle = "#ffffff";
        ctx.fill(path);
        ctx.restore();
      }
    }

    // A produção selecionada (ficha aberta, ou chegada de outro mapa): por cima
    // de tudo, mesmo esmaecida ou fora dos filtros, com halo duplo — branco e
    // escuro — para contrastar com qualquer cor de instituição e com o fundo.
    const sel = e.selecionadoId !== null ? e.linhaDe.get(e.selecionadoId) : undefined;
    if (sel !== undefined) {
      const px = (ax[sel] * k0 + ox) * k + x;
      const py = (ay[sel] * k0 + oy) * k + y;
      if (px > -20 && px < w + 20 && py > -20 && py < h + 20) {
        const raio = Math.max(r + 2.5, 6);
        const aro = raio + 10;
        // Disco de foco: escurece de leve o entorno para a marca se destacar.
        ctx.beginPath();
        ctx.arc(px, py, aro, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(17,24,39,0.12)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, aro, 0, Math.PI * 2);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, aro, 0, Math.PI * 2);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#111827";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, raio, 0, Math.PI * 2);
        ctx.fillStyle = e.corDe(sel);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }
    }
  }, []);

  // d3-zoom registra uma vez por método/tamanho; o handler chama o `redraw`
  // estável, que lê o estado do último render.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const zoom = d3zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([1, 60])
      .on("zoom", (ev: D3ZoomEvent<HTMLCanvasElement, unknown>) => {
        viewRef.current = { k: ev.transform.k, x: ev.transform.x, y: ev.transform.y };
        redraw();
      });
    select(canvas).call(zoom);
    zoomRef.current = zoom;
    return () => {
      select(canvas).on(".zoom", null);
      zoomRef.current = null;
    };
  }, [geo, redraw]);

  // Trocar método/tamanho reinicia o enquadramento; trocar filtro só redesenha.
  useEffect(() => {
    viewRef.current = { k: 1, x: 0, y: 0 };
    // O d3-zoom guarda a própria transformação no elemento: se ela ficasse para
    // trás, o próximo gesto pularia para a vista antiga.
    const canvas = canvasRef.current;
    const z = zoomRef.current;
    if (canvas && z) select(canvas).call(z.transform, zoomIdentity);
    else redraw();
  }, [geo, redraw]);

  // Foco inicial (deep link): uma vez, com o tamanho já medido e o `geo` final.
  useEffect(() => {
    const i = props.focoInicial;
    const canvas = canvasRef.current;
    const z = zoomRef.current;
    if (i === null || i === undefined || focoFeitoRef.current || !canvas || !z || !tamanho.largura) return;
    focoFeitoRef.current = true;
    const k = 10;
    const sx = geo.ax[i] * geo.k0 + geo.ox;
    const sy = geo.ay[i] * geo.k0 + geo.oy;
    select(canvas).call(z.transform, zoomIdentity.translate(W / 2 - k * sx, H / 2 - k * sy).scale(k));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, props.focoInicial, tamanho.largura, tamanho.altura]);
  // Tudo o que muda o que se vê sem mudar `visiveis` precisa estar aqui: o corte
  // do slider (`limiarAderencia`), as subáreas marcadas (`intensidadeDe`), o
  // carregamento tardio da aderência (`aderenciaAtiva`) e o projeto em foco
  // (`realceDe`). Sem isso o estado novo entra no `estadoRef`, mas ninguém
  // manda desenhar. As demais funções (`corDe`, `bordaDe`…) são recriadas a cada
  // render da rota e ficam de fora, senão o hover redesenharia 21 mil marcas.
  useEffect(() => {
    redraw();
  }, [
    props.visiveis,
    props.focandoProjeto,
    props.realceDe,
    props.intensidadeDe,
    props.aderenciaAtiva,
    props.limiarAderencia,
    props.selecionadoId,
    redraw,
  ]);

  /** Acha a linha mais próxima do ponto, dentro do raio, via o índice espacial. */
  function acharPerto(px: number, py: number, raio: number): number | null {
    const cx = Math.floor(px / CELULA_INDICE);
    const cy = Math.floor(py / CELULA_INDICE);
    let melhor = -1;
    let melhorD = raio;
    for (let gx = cx - 1; gx <= cx + 1; gx++) {
      for (let gy = cy - 1; gy <= cy + 1; gy++) {
        const lista = indiceRef.current.get(`${gx},${gy}`);
        if (!lista) continue;
        for (const p of lista) {
          const d = Math.hypot(p.sx - px, p.sy - py);
          if (d < melhorD) {
            melhorD = d;
            melhor = p.i;
          }
        }
      }
    }
    return melhor >= 0 ? melhor : null;
  }

  function aoClicar(ev: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = ev.clientX - rect.left;
    const py = ev.clientY - rect.top;
    const alvo = acharPerto(px, py, toque ? RAIO_ALVO_TOQUE : RAIO_ALVO_FINO);
    if (alvo === null) {
      if (toque) props.onToqueFundo();
      else if (props.selecionadoId) props.onSelecionar(null);
      return;
    }
    const id = props.mapa.ids[alvo];
    props.onSelecionar(id === props.selecionadoId ? null : id);
  }

  function aoMover(ev: React.MouseEvent<HTMLCanvasElement>) {
    if (toque) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = ev.clientX - rect.left;
    const py = ev.clientY - rect.top;
    const alvo = acharPerto(px, py, RAIO_ALVO_FINO);
    props.onHover(alvo, ev.clientX, ev.clientY);
  }

  function aplicarZoom(alvo: ZoomTransform, ms: number) {
    const canvas = canvasRef.current;
    const z = zoomRef.current;
    if (!canvas || !z) return;
    if (document.hidden) select(canvas).call(z.transform, alvo);
    else select(canvas).transition().duration(ms).call(z.transform, alvo);
  }

  useImperativeHandle(
    ref,
    () => ({
      focarProducao(i: number) {
        const e = estadoRef.current;
        if (!e) return;
        const k = 10;
        const sx = e.ax[i] * e.k0 + e.ox;
        const sy = e.ay[i] * e.k0 + e.oy;
        aplicarZoom(zoomIdentity.translate(e.W / 2 - k * sx, e.H / 2 - k * sy).scale(k), 500);
      },
      reenquadrar() {
        aplicarZoom(zoomIdentity, 400);
      },
      zoomPor(fator: number) {
        const canvas = canvasRef.current;
        const z = zoomRef.current;
        if (!canvas || !z) return;
        select(canvas).transition().duration(220).call(z.scaleBy, fator);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className="atlas-canvas" ref={caixaRef}>
      <canvas
        ref={canvasRef}
        style={{ width: W, height: H, touchAction: "none", display: "block", cursor: "grab" }}
        onPointerDown={(ev) => {
          inicioRef.current = { x: ev.clientX, y: ev.clientY };
        }}
        onPointerMove={aoMover}
        onPointerLeave={props.onSair}
        onClick={(ev) => {
          const inicio = inicioRef.current;
          inicioRef.current = null;
          if (inicio && Math.hypot(ev.clientX - inicio.x, ev.clientY - inicio.y) > 10) return;
          aoClicar(ev);
        }}
      />
    </div>
  );
});

export default MapaCanvas;
