import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { select } from "d3-selection";
import { zoom as d3zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior, type ZoomTransform } from "d3-zoom";
import { drag as d3drag } from "d3-drag";
import { forceSimulation, forceX, forceY, forceCollide, type Simulation, type SimulationNodeDatum } from "d3-force";
import "d3-transition";
import type {
  Atlas,
  AtlasProjeto,
  DetalheProducaoPrograma,
  FichasPorProjeto,
  DescricoesPorProjeto,
  Programa,
  ProducaoProjeto,
} from "../../dados/tipos";
import { corInstituicao, misturarHex } from "../../dados/cores";
import { destaquesDaProducao, linksDaProducao } from "../../dados/destaques";
import type { Esquema } from "../corProducao";
import { combinaFiltro, type FiltroLegenda } from "../LegendaProducoes";
import MarcaProducao, { MarcaSvg } from "../MarcaProducao";
import { TooltipProjeto, TooltipProducao } from "../TooltipProjeto";
import CartaoProjeto, { type AncoraCartao } from "../CartaoProjeto";
import CartaoProducao from "../CartaoProducao";
import { RAIO_MARCA, MAX_LETRAS_ROTULO, posicionarConstelacao, estimarRaio } from "../satelites";
import { useTamanho, useToqueGrosso } from "../useMidia";
import Atlas3D from "../../rotas/Atlas3D";
import {
  RAIO_ALVO,
  RAIO_TOQUE_PX,
  agruparPorGeografia,
  calcularCentrosGeograficos,
  clamp,
  clamparNaBorda,
  geometria,
  raio,
} from "./geometria";
import type { AgruparLocalidade, Dimensao, OrganizarPor } from "./useAtlas";

const COR_FUNDO = "var(--color-border)";
/** Cinza para o qual a cor da instituição esmaece no modo por aderência (hex: precisa ser misturável). */
const COR_ESMAECIDA = "#b9b7ae";

interface NoPonto extends SimulationNodeDatum {
  id: string;
  sigla: string;
  r: number;
  temaX: number;
  temaY: number;
  alvoX: number;
  alvoY: number;
}

export interface AtlasCanvasHandle {
  /** Enquadra o projeto (com a estimativa de raio, se a lista real não chegou). */
  focarProjeto: (p: AtlasProjeto) => void;
  /** Volta ao enquadramento inicial (tudo à vista) e reaquece a física. */
  reenquadrar: () => void;
  /** Um degrau de zoom (botões ⊕/⊖). */
  zoomPor: (fator: number) => void;
}

interface Props {
  dados: Atlas;
  programas: Programa[] | null;
  organizarPor: OrganizarPor;
  dimensao: Dimensao;
  agruparLocalidade: AgruparLocalidade;
  destacadoDe: (p: AtlasProjeto) => boolean;
  /** Modo "por aderência": 0–1 do quão vivo pintar o ponto que passou no corte (`null` = pintura normal). */
  intensidadeDe?: (p: AtlasProjeto) => number | null;
  algumFiltroAtivo: boolean;
  projetoAberto: AtlasProjeto | null;
  producoesVisiveis: ProducaoProjeto[] | null;
  producaoSel: string | null;
  filtroProd: FiltroLegenda | null;
  esquema: Esquema;
  fichas: FichasPorProjeto | null;
  descricoes: DescricoesPorProjeto | null;
  detalhes: Record<string, DetalheProducaoPrograma>;
  temaPorCluster: Map<number, string>;
  onSelecionarProjeto: (p: AtlasProjeto) => void;
  /** Toque/clique num projeto já aberto (ou no mesmo): fecha em vez de abrir. */
  onAlternarProjeto: (p: AtlasProjeto) => void;
  onSelecionarProducao: (id: string | null) => void;
  /** Toque no fundo do mapa: fecha a folha aberta (celular). */
  onToqueFundo: () => void;
}

/**
 * O canvas do Atlas: um SVG em tela cheia, medido pelo contêiner
 * (`ResizeObserver`) em vez das constantes `W = 760 × H = 680` de antes — as
 * constantes estavam espalhadas pelo zoom, pelos satélites e pela projeção
 * geográfica, e agora saem todas de `geometria(medida)`.
 *
 * Cuida de: simulação de força dos 934 pontos (posições no espaço temático ou
 * geográfico), `d3-zoom` (roda, arrasto e pinça de uma vez), `d3-drag` dos
 * pontos (só com ponteiro fino — no toque o arrasto é do mapa), satélites das
 * produções do projeto aberto, tooltips de hover, cartões arrastáveis do
 * desktop e o 3D.
 */
const AtlasCanvas = forwardRef<AtlasCanvasHandle, Props>(function AtlasCanvas(
  {
    dados,
    programas,
    organizarPor,
    dimensao,
    agruparLocalidade,
    destacadoDe,
    intensidadeDe,
    algumFiltroAtivo,
    projetoAberto,
    producoesVisiveis,
    producaoSel,
    filtroProd,
    esquema,
    fichas,
    descricoes,
    detalhes,
    temaPorCluster,
    onSelecionarProjeto,
    onAlternarProjeto,
    onSelecionarProducao,
    onToqueFundo,
  },
  ref,
) {
  const toque = useToqueGrosso();
  const [caixaRef, tamanho] = useTamanho<HTMLDivElement>();
  // Enquanto o contêiner não foi medido, cai no tamanho antigo — é só o 1º
  // quadro; o efeito de medida roda antes de qualquer interação.
  const W = Math.max(320, tamanho.largura || 760);
  const H = Math.max(240, tamanho.altura || 680);
  const g = useMemo(() => geometria(W, H), [W, H]);

  const [posicoes, setPosicoes] = useState<Map<string, { x: number; y: number }> | null>(null);
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity);
  const [hover, setHover] = useState<{ p: AtlasProjeto; x: number; y: number } | null>(null);
  const [hoverProd, setHoverProd] = useState<{ pr: ProducaoProjeto; x: number; y: number } | null>(null);
  /** Projeto com o cartão fixado (clique no ponto), antes de abrir as produções. */
  const [fixado, setFixado] = useState<{ p: AtlasProjeto; ancora: AncoraCartao } | null>(null);
  /** Cartão de segundo nível: a produção clicada no mapa (o de primeiro nível é `fixado`). */
  const [cartaoProducao, setCartaoProducao] = useState<{ pr: ProducaoProjeto; ancora: AncoraCartao } | null>(null);

  const areaRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const arrastouRef = useRef(false);
  const zoomAutoRef = useRef(false);
  const toqueInicioRef = useRef<{ x: number; y: number } | null>(null);

  const simRef = useRef<Simulation<NoPonto, undefined> | null>(null);
  const nosPorId = useRef<Map<string, NoPonto>>(new Map());

  // d3-zoom substitui o viewBox mexido à mão: cuida de roda do mouse,
  // arrastar (quando não começa em cima de um ponto — d3-drag captura o
  // pointerdown do ponto antes) e pinça no touch, tudo de uma vez. O
  // `translateExtent` acompanha o tamanho medido, não uma constante.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const zoom = d3zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 14])
      .translateExtent([[0, 0], [g.W, g.H]])
      // O filtro padrão do d3-zoom, mais uma exceção: duplo clique **num ponto**
      // abre as produções do projeto (ver `onClick` do ponto), não dá zoom. No
      // fundo do mapa o duplo clique continua aproximando.
      .filter((ev: Event) => {
        const e = ev as MouseEvent;
        if (e.type === "dblclick" && (e.target as Element | null)?.closest?.("[data-alvo-projeto]")) return false;
        return (!e.ctrlKey || e.type === "wheel") && !e.button;
      })
      .on("zoom", (ev: D3ZoomEvent<SVGSVGElement, unknown>) => setTransform(ev.transform));
    select(svg).call(zoom);
    zoomRef.current = zoom;
    return () => {
      select(svg).on(".zoom", null);
      zoomRef.current = null;
    };
    // O `<svg>` só existe depois que os dados chegam E `posicoes` fica pronto (é o que
    // tira o canvas do "Carregando…"); depender só de `dados` rodaria o efeito uma vez
    // com a ref ainda nula e nunca mais ligaria o listener.
  }, [dados, posicoes !== null, g]);

  // Constrói a simulação UMA vez por (conjunto de dados, tamanho medido) — não a
  // cada troca de filtro ou destaque, que não mexe em posição. `forceX`/`forceY`
  // lêem `alvoX`/`alvoY` de cada nó, que o efeito de "organizar por" muda depois
  // sem recriar a simulação (dá pra reaquecer e animar a transição).
  //
  // Posição vira `state` do React (um `Map` novo por tick), não atributo de
  // DOM escrito à mão: a 1ª versão escrevia `cx`/`cy` direto via refs, sem
  // passar por props do React — mais rápido em teoria, mas todo re-render
  // por outro motivo (troca de destaque, hover) não tocava `cx`/`cy` E os
  // eventos de mouse do "alvo" paravam de disparar de forma confiável (o
  // bug do hover quebrado).
  useEffect(() => {
    const xs = dados.projetos.map((p) => p.x);
    const ys = dados.projetos.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const k = Math.min(g.iw / (maxX - minX || 1), g.ih / (maxY - minY || 1));
    const offX = (g.iw - (maxX - minX) * k) / 2;
    const offY = (g.ih - (maxY - minY) * k) / 2;
    const temaX = (v: number) => g.M.left + offX + (v - minX) * k;
    const temaY = (v: number) => g.M.top + offY + (maxY - v) * k;

    const nos: NoPonto[] = dados.projetos.map((p) => {
      const tx = temaX(p.x);
      const ty = temaY(p.y);
      return { id: p.id, sigla: p.sigla, r: raio(p.n_producoes, g.fatorEscala), temaX: tx, temaY: ty, alvoX: tx, alvoY: ty, x: tx, y: ty };
    });
    nosPorId.current = new Map(nos.map((n) => [n.id, n]));
    setPosicoes(new Map(nos.map((n) => [n.id, { x: n.x!, y: n.y! }])));

    const sim = forceSimulation(nos)
      .force("x", forceX<NoPonto>((d) => d.alvoX).strength(0.2))
      .force("y", forceY<NoPonto>((d) => d.alvoY).strength(0.2))
      .force("collide", forceCollide<NoPonto>((d) => d.r + Math.max(0.3, 0.8 * g.fatorEscala)))
      .alpha(0.9)
      .on("tick", () => {
        for (const n of sim.nodes()) clamparNaBorda(n, g);
        setPosicoes(new Map(sim.nodes().map((n) => [n.id, { x: n.x ?? n.alvoX, y: n.y ?? n.alvoY }])));
      });
    simRef.current = sim;

    return () => {
      sim.stop();
      simRef.current = null;
    };
  }, [dados, g]);

  // Trocar "organizar por" não recria a simulação — só o alvo de cada nó
  // muda. Mas mutar `alvoX`/`alvoY` sozinho não bastava: `forceX`/`forceY`
  // capturam o array de alvos UMA VEZ, na hora que `initialize()` roda (ao
  // anexar o force com `.force("x", …)`) — não reavaliam o accessor
  // `(d) => d.alvoX` a cada tick. Resultado do bug original: o `forceX`
  // continuava com o alvo antigo internamente, então o "teleporte" de
  // `x`/`y` durava só o 1º tick — no seguinte, o force (mirando no alvo
  // velho) puxava tudo de volta pro lugar de antes. Corrigido reanexando
  // `forceX`/`forceY` (instâncias novas) toda vez que o alvo muda — isso
  // força o d3 a reinicializar o array interno com os `alvoX`/`alvoY`
  // atuais. Força 0.2 é fraca de propósito (deixa a colisão dominar o
  // assentamento fino e não estoura quando alguém arrasta um ponto); por
  // isso o `x`/`y` também é teleportado pro alvo — só a força fraca não
  // venceria a distância antes do alpha decair.
  useEffect(() => {
    if (!posicoes || !simRef.current) return;
    if (organizarPor === "tema") {
      for (const n of nosPorId.current.values()) {
        n.alvoX = n.temaX;
        n.alvoY = n.temaY;
        n.x = n.temaX;
        n.y = n.temaY;
      }
    } else {
      if (!programas) return;
      const programaPorSigla = new Map(programas.map((p) => [p.sigla, p]));

      // Contagem por instituição no conjunto ATIVO (o mesmo dos pontos).
      const instituicoes = new Map<string, number>();
      for (const p of dados.projetos) instituicoes.set(p.sigla, (instituicoes.get(p.sigla) ?? 0) + 1);
      const listaInstituicoes = [...instituicoes.entries()].map(([sigla, n]) => ({ sigla, n }));

      const grupos = agruparLocalidade === "instituicao"
        ? listaInstituicoes.flatMap((i) => {
            const p = programaPorSigla.get(i.sigla);
            return p && p.lat !== null && p.lon !== null
              ? [{ chave: i.sigla, n: i.n, lat: p.lat, lon: p.lon }]
              : [];
          })
        : agruparPorGeografia(programas, listaInstituicoes, agruparLocalidade);
      const centros = calcularCentrosGeograficos(grupos, g);

      // Instituição usa a sigla direto; UF/Região sobem um nível via o
      // programa da sigla — 3 níveis encadeados (§4.2.5 item 6), mesmo
      // desamontoado por força em todos, só muda a chave de agrupamento.
      function chaveDoNo(n: NoPonto): string {
        if (agruparLocalidade === "instituicao") return n.sigla;
        const p = programaPorSigla.get(n.sigla);
        if (!p) return "";
        return agruparLocalidade === "uf" ? p.uf : p.regiao;
      }

      for (const n of nosPorId.current.values()) {
        const c = centros.get(chaveDoNo(n));
        // Clampeado aqui, não só no tick: o centro "desamontoado" de um
        // grupo pequeno pode cair perto da borda, e sem isso o forceX mira
        // num alvo fora do retângulo útil o tempo todo.
        const alvoX = clamp(c?.x ?? g.W / 2, g.M.left + n.r, g.W - g.M.right - n.r);
        const alvoY = clamp(c?.y ?? g.H / 2, g.M.top + n.r, g.H - g.M.bottom - n.r);
        n.alvoX = alvoX;
        n.alvoY = alvoY;
        n.x = alvoX;
        n.y = alvoY;
      }
    }
    simRef.current
      .force("x", forceX<NoPonto>((d) => d.alvoX).strength(0.2))
      .force("y", forceY<NoPonto>((d) => d.alvoY).strength(0.2))
      .alpha(1)
      .restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizarPor, agruparLocalidade, posicoes !== null, programas, g]);

  // Produções do projeto aberto, como satélites em anéis ao redor do ponto (só 2D).
  const constelacao = useMemo(() => {
    if (!projetoAberto || !producoesVisiveis || !posicoes) return null;
    const pos = posicoes.get(projetoAberto.id);
    if (!pos) return null;
    // Agrupadas por subtipo: um cacho por subtipo em volta do projeto (tipo → subtipo).
    return posicionarConstelacao(
      producoesVisiveis.map((pr) => esquema.chaves(pr).subtipo),
      esquema.ordemSubtipo,
      pos.x,
      pos.y,
      raio(projetoAberto.n_producoes, g.fatorEscala),
    );
  }, [projetoAberto, producoesVisiveis, posicoes, esquema, g.fatorEscala]);

  /** Aplica uma transformação de zoom animada — ou direta, se a aba está oculta: o
   * navegador pausa `requestAnimationFrame` (e com ele o d3-transition) numa aba em
   * segundo plano, e a animação nunca terminaria. */
  function aplicarZoom(svg: SVGSVGElement, z: ZoomBehavior<SVGSVGElement, unknown>, alvo: ZoomTransform, ms: number) {
    if (document.hidden) select(svg).call(z.transform, alvo);
    else select(svg).transition().duration(ms).call(z.transform, alvo);
  }

  /** Amplia o canvas até o projeto ficar no centro e o anel de produções legível.
   * Só no 2D: no 3D as produções ficam na lista do painel. */
  function focarProjeto(p: AtlasProjeto, ext?: { x: number; y: number }) {
    const svg = svgRef.current;
    const z = zoomRef.current;
    const pos = posicoes?.get(p.id);
    if (!svg || !z || !pos) return;
    const alcance = ext ?? estimarRaio(producoesVisiveis?.length ?? p.n_producoes, raio(p.n_producoes, g.fatorEscala));
    // Cabe nas duas direções: o projeto fica no centro, então a meia-largura e a meia-altura
    // do canvas (menos uma margem) têm de conter a extensão em x e em y.
    const k = clamp(Math.min((g.W / 2 - 14) / alcance.x, (g.H / 2 - 14) / alcance.y), 1.6, 8);
    zoomAutoRef.current = true;
    aplicarZoom(svg, z, zoomIdentity.translate(g.W / 2 - k * pos.x, g.H / 2 - k * pos.y).scale(k), 650);
  }

  function voltarAoZoomInicial() {
    const svg = svgRef.current;
    const z = zoomRef.current;
    if (!svg || !z || !zoomAutoRef.current) return;
    zoomAutoRef.current = false;
    aplicarZoom(svg, z, zoomIdentity, 450);
  }

  useImperativeHandle(
    ref,
    () => ({
      focarProjeto,
      reenquadrar() {
        // "Reenquadrar tudo": devolve os pontos aos seus alvos (a física já
        // tinha assentado) e volta ao enquadramento inicial.
        for (const n of nosPorId.current.values()) {
          n.x = n.alvoX;
          n.y = n.alvoY;
        }
        simRef.current?.alpha(0.9).restart();
        const svg = svgRef.current;
        const z = zoomRef.current;
        if (svg && z) {
          zoomAutoRef.current = false;
          aplicarZoom(svg, z, zoomIdentity, 450);
        }
      },
      zoomPor(fator: number) {
        const svg = svgRef.current;
        const z = zoomRef.current;
        if (!svg || !z) return;
        select(svg).transition().duration(220).call(z.scaleBy, fator);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posicoes, g, producoesVisiveis],
  );

  // Refaz o zoom quando o raio real da constelação chega (a lista de produções carrega
  // depois do clique) ou muda (o interruptor do núcleo).
  const extRealX = constelacao?.extX;
  const extRealY = constelacao?.extY;
  useEffect(() => {
    if (projetoAberto && extRealX !== undefined && extRealY !== undefined && zoomAutoRef.current) {
      focarProjeto(projetoAberto, { x: extRealX, y: extRealY });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetoAberto?.id, extRealX, extRealY]);

  // Abrir um projeto enquadra; fechar volta ao enquadramento inicial. É o mesmo
  // gesto que o link direto `?projeto=` dispara, sem código à parte.
  useEffect(() => {
    if (projetoAberto) focarProjeto(projetoAberto);
    else voltarAoZoomInicial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetoAberto?.id]);

  /** Clique no ponto: **fixa o cartão** do projeto (o popup que fica, com rolagem para ler a
   * descrição inteira); o ícone do cartão é que abre as produções. Clicar de novo no mesmo
   * ponto solta o cartão — e, se as produções estão abertas, fecha tudo. `cx`/`cy` são as
   * coordenadas do clique na janela (no 3D não há: o cartão vai para o canto). */
  function clicarProjeto(p: AtlasProjeto, cx?: number, cy?: number) {
    if (projetoAberto?.id === p.id) {
      onAlternarProjeto(p); // já está aberto: fecha
      return;
    }
    if (fixado?.p.id === p.id) {
      setFixado(null);
      return;
    }
    const area = areaRef.current?.getBoundingClientRect();
    setFixado({
      p,
      ancora: area && cx !== undefined && cy !== undefined ? { x: cx - area.left, y: cy - area.top } : "canto",
    });
    setHover(null);
  }

  /** Clique numa bolinha: fixa o cartão da produção (segundo nível). Abrir o detalhe
   * completo é uma escolha feita no cartão, não o efeito do clique. */
  function fixarProducao(pr: ProducaoProjeto, cx: number, cy: number) {
    if (cartaoProducao?.pr.id_producao === pr.id_producao) {
      setCartaoProducao(null);
      return;
    }
    const area = areaRef.current?.getBoundingClientRect();
    setCartaoProducao({ pr, ancora: area ? { x: cx - area.left, y: cy - area.top } : "canto" });
    setHoverProd(null);
  }

  /** d3-drag no alvo de interação de cada ponto. Fixa o nó na posição do
   * ponteiro (`fx`/`fy`) e reaquece a simulação (`alphaTarget`) durante o
   * arrasto — como num force-directed graph de verdade, os vizinhos que
   * colidem com o nó arrastado são empurrados pelo `forceCollide` em tempo
   * real, não só o próprio ponto se move. Solta no fim do arrasto: o nó
   * volta a obedecer `forceX`/`forceY` e reequilibra com o resto. */
  function refArrastavel(node: SVGCircleElement | null, id: string) {
    if (!node || toque) return; // no toque, arrastar o mapa é o gesto (folha substitui o cartão)
    select(node).call(
      d3drag<SVGCircleElement, unknown>()
        .on("start", (ev) => {
          ev.sourceEvent.stopPropagation(); // não deixa o d3-zoom também "ver" esse gesto
          arrastouRef.current = false;
          simRef.current?.alphaTarget(0.35).restart();
          const n = nosPorId.current.get(id);
          if (n) {
            n.fx = n.x;
            n.fy = n.y;
          }
        })
        .on("drag", (ev) => {
          arrastouRef.current = true;
          const n = nosPorId.current.get(id);
          if (n) {
            n.fx = clamp(ev.x, g.M.left + n.r, g.W - g.M.right - n.r);
            n.fy = clamp(ev.y, g.M.top + n.r, g.H - g.M.bottom - n.r);
          }
        })
        .on("end", () => {
          simRef.current?.alphaTarget(0);
          const n = nosPorId.current.get(id);
          if (n) {
            n.fx = null;
            n.fy = null;
          }
        }),
    );
  }

  /**
   * Toque no canvas (só com ponteiro grosso): acha o alvo mais próximo dentro
   * do alvo mínimo de 44 px de tela e age nele — é o "agrupar o toque no
   * cacho quando a marca for menor que o alvo" do plano: com o mapa
   * afastado, as marcas ficam menores que o dedo e o toque tem de cair no
   * mais perto, não exigir pontaria. Sem alvo perto, toque no fundo fecha a
   * folha.
   */
  function aoClicarCanvas(ev: React.MouseEvent<SVGSVGElement>) {
    const inicio = toqueInicioRef.current;
    toqueInicioRef.current = null;
    if (toque) {
      // Pan/pinça que terminou em cima do canvas não é toque de seleção.
      if (inicio && Math.hypot(ev.clientX - inicio.x, ev.clientY - inicio.y) > 10) return;
      const svg = svgRef.current;
      if (!svg || !posicoes) return;
      const r = svg.getBoundingClientRect();
      const [ux, uy] = transform.invert([ev.clientX - r.left, ev.clientY - r.top]);
      const limiar = RAIO_TOQUE_PX / transform.k;
      let melhor: { d: number; tipo: "projeto" | "producao"; id: string } | null = null;
      if (constelacao && producoesVisiveis) {
        for (const s of constelacao.satelites) {
          const pr = producoesVisiveis[s.i];
          if (!pr) continue;
          const d = Math.hypot(s.x - ux, s.y - uy);
          if (d <= limiar && (melhor === null || d < melhor.d)) melhor = { d, tipo: "producao", id: pr.id_producao };
        }
      }
      for (const p of dados.projetos) {
        const pos = posicoes.get(p.id);
        if (!pos) continue;
        const d = Math.hypot(pos.x - ux, pos.y - uy);
        if (d <= limiar && (melhor === null || d < melhor.d)) melhor = { d, tipo: "projeto", id: p.id };
      }
      const escolhido = melhor;
      if (escolhido === null) {
        onToqueFundo();
      } else if (escolhido.tipo === "producao") {
        onSelecionarProducao(escolhido.id);
      } else {
        const p = dados.projetos.find((x) => x.id === escolhido.id);
        if (p) onAlternarProjeto(p);
      }
      return;
    }
    // Desktop: clique no fundo (não num ponto) solta o cartão fixado, se as produções não
    // estão abertas — aí só o "Fechar" ou o ponto de novo fecham.
    if (ev.target === ev.currentTarget && fixado && !projetoAberto) setFixado(null);
  }

  if (posicoes === null) {
    return (
      <div className="atlas-canvas" ref={caixaRef}>
        <div className="loading">Carregando o mapa…</div>
      </div>
    );
  }

  const area = (
    <div ref={areaRef} className="atlas-area">
      {dimensao === "3d" ? (
        <Atlas3D
          projetos={dados.projetos}
          destacadoDe={destacadoDe}
          algumFiltroAtivo={algumFiltroAtivo}
          projetoAbertoId={projetoAberto?.id ?? null}
          largura={W}
          altura={H}
          onSelecionar={(p, cliques) => (toque ? onAlternarProjeto(p) : cliques >= 2 ? onSelecionarProjeto(p) : clicarProjeto(p))}
          onHover={(p, x, y) => setHover({ p, x, y })}
          onHoverFim={() => setHover(null)}
        />
      ) : (
        <svg
          ref={svgRef}
          width={W}
          height={H}
          role="img"
          aria-label="Atlas de projetos, posição por semelhança temática ou por localidade, cor por instituição"
          style={{ touchAction: "none", display: "block", userSelect: "none" }}
          onPointerDown={(ev) => {
            if (toque) toqueInicioRef.current = { x: ev.clientX, y: ev.clientY };
          }}
          onClick={aoClicarCanvas}
        >
          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
            {dados.projetos.map((p) => {
              const apagado = algumFiltroAtivo && !destacadoDe(p);
              // Por aderência: o matiz continua sendo a instituição; o quanto o texto pertence ao
              // grupo vira saturação e opacidade (aderência baixa → mais cinza e mais discreto).
              const t = apagado ? null : (intensidadeDe?.(p) ?? null);
              const fill = apagado
                ? COR_FUNDO
                : t !== null
                  ? misturarHex(corInstituicao(p.sigla), COR_ESMAECIDA, 0.75 * (1 - t))
                  : corInstituicao(p.sigla);
              const pos = posicoes.get(p.id);
              if (!pos) return null;
              const aberto = projetoAberto?.id === p.id;
              return (
                <g key={p.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={raio(p.n_producoes, g.fatorEscala)}
                    fill={fill}
                    opacity={apagado ? 0.15 : projetoAberto && !aberto ? 0.3 : t !== null ? 0.4 + 0.5 * t : 0.85}
                    stroke={aberto ? "var(--color-text)" : "none"}
                    strokeWidth={aberto ? 2 : 0}
                  />
                  {!apagado && !toque && (
                    <circle
                      ref={(node) => refArrastavel(node, p.id)}
                      cx={pos.x}
                      cy={pos.y}
                      r={RAIO_ALVO}
                      fill="transparent"
                      onMouseEnter={(ev) => setHover({ p, x: ev.clientX, y: ev.clientY })}
                      onMouseMove={(ev) => setHover({ p, x: ev.clientX, y: ev.clientY })}
                      onMouseLeave={() => setHover(null)}
                      data-alvo-projeto=""
                      onClick={(ev) => {
                        if (arrastouRef.current) {
                          arrastouRef.current = false;
                          return;
                        }
                        // 2º clique de um duplo clique (`detail` conta os cliques
                        // seguidos): equivale a clicar no projeto e depois em
                        // "Produções" — sem esperar um tempo para distinguir do
                        // clique simples, que continua respondendo na hora.
                        if (ev.detail >= 2) {
                          onSelecionarProjeto(p);
                          return;
                        }
                        clicarProjeto(p, ev.clientX, ev.clientY);
                      }}
                      style={{ cursor: "grab" }}
                    />
                  )}
                  {/* Com o dedo não há alvo por ponto: quem resolve é o toque no
                      canvas, que acha a marca mais próxima dentro de 44 px de tela
                      e agrupa o toque no cacho. */}
                </g>
              );
            })}
            {/* Produções do projeto aberto: um satélite por produção, em anéis ao redor
                do ponto. Cor = classe; passe o mouse para o resumo, clique para o detalhe. */}
            {constelacao &&
              producoesVisiveis &&
              constelacao.rotulos.map((r) => {
                const info = esquema.rotuloSubtipo(r.grupo);
                return (
                  <text
                    key={`rot-${r.grupo}`}
                    x={r.x}
                    y={r.y}
                    textAnchor={r.ancora}
                    dominantBaseline="central"
                    style={{
                      fontSize: 3.4,
                      fontWeight: 700,
                      fill: info.cor,
                      stroke: "var(--color-surface)",
                      strokeWidth: 1.1,
                      paintOrder: "stroke",
                      pointerEvents: "none",
                    }}
                  >
                    <tspan x={r.x} dy="-0.6em">
                      {info.rotulo.length > MAX_LETRAS_ROTULO
                        ? `${info.rotulo.slice(0, MAX_LETRAS_ROTULO - 1).trimEnd()}…`
                        : info.rotulo}
                    </tspan>
                    <tspan x={r.x} dy="1.2em">
                      {r.mostradas < r.n ? `${r.mostradas} de ${r.n}` : r.n}
                    </tspan>
                  </text>
                );
              })}
            {constelacao &&
              producoesVisiveis &&
              constelacao.satelites.map((s) => {
                const pr = producoesVisiveis[s.i];
                const sel = producaoSel === pr.id_producao || cartaoProducao?.pr.id_producao === pr.id_producao;
                const apagado = !combinaFiltro(esquema, pr, filtroProd);
                return (
                  <g key={pr.id_producao} opacity={apagado ? 0.16 : 1}>
                    <MarcaSvg
                      marca={esquema.marca(pr)}
                      cx={s.x}
                      cy={s.y}
                      r={sel ? RAIO_MARCA * 1.35 : RAIO_MARCA}
                      anel={projetoAberto ? corInstituicao(projetoAberto.sigla) : undefined}
                      realce={sel}
                      onMouseEnter={toque ? undefined : (ev) => setHoverProd({ pr, x: ev.clientX, y: ev.clientY })}
                      onMouseMove={toque ? undefined : (ev) => setHoverProd({ pr, x: ev.clientX, y: ev.clientY })}
                      onMouseLeave={toque ? undefined : () => setHoverProd(null)}
                      onClick={toque ? undefined : (ev) => fixarProducao(pr, ev.clientX, ev.clientY)}
                    />
                  </g>
                );
              })}
          </g>
        </svg>
      )}
      {hover && hover.p.id !== fixado?.p.id && !toque && (
        <TooltipProjeto
          x={hover.x}
          y={hover.y}
          p={hover.p}
          tema={temaPorCluster.get(hover.p.cluster) ?? "—"}
          ficha={fichas?.[hover.p.id] ?? null}
        />
      )}
      {hoverProd && hoverProd.pr.id_producao !== cartaoProducao?.pr.id_producao && !toque && (
        <TooltipProducao
          x={hoverProd.x}
          y={hoverProd.y}
          pr={hoverProd.pr}
          marca={<MarcaProducao marca={esquema.marca(hoverProd.pr)} sigla={projetoAberto?.sigla} />}
          destaques={destaquesDaProducao(detalhes[projetoAberto?.sigla ?? ""], hoverProd.pr.id_producao)}
          projetoNome={projetoAberto?.nome ?? null}
          responsaveis={projetoAberto ? (fichas?.[projetoAberto.id]?.responsaveis ?? []) : []}
        />
      )}
      {cartaoProducao && projetoAberto && (
        <CartaoProducao
          key={cartaoProducao.pr.id_producao}
          pr={cartaoProducao.pr}
          marca={<MarcaProducao marca={esquema.marca(cartaoProducao.pr)} sigla={projetoAberto.sigla} />}
          destaques={destaquesDaProducao(detalhes[projetoAberto.sigla], cartaoProducao.pr.id_producao, 4, 260)}
          links={linksDaProducao(detalhes[projetoAberto.sigla], cartaoProducao.pr.id_producao)}
          projeto={projetoAberto}
          tema={temaPorCluster.get(projetoAberto.cluster) ?? "—"}
          ficha={fichas?.[projetoAberto.id] ?? null}
          descricao={descricoes?.[projetoAberto.id] ?? null}
          ancora={cartaoProducao.ancora}
          larguraArea={areaRef.current?.clientWidth ?? W}
          detalheAberto={producaoSel === cartaoProducao.pr.id_producao}
          onDetalhe={() =>
            onSelecionarProducao(producaoSel === cartaoProducao.pr.id_producao ? null : cartaoProducao.pr.id_producao)
          }
          onFechar={() => setCartaoProducao(null)}
        />
      )}
      {fixado && !projetoAberto && (
        <CartaoProjeto
          projeto={fixado.p}
          tema={temaPorCluster.get(fixado.p.cluster) ?? "—"}
          ficha={fichas?.[fixado.p.id] ?? null}
          descricao={descricoes?.[fixado.p.id] ?? null}
          ancora={fixado.ancora}
          onProducoes={() => onSelecionarProjeto(fixado.p)}
          onFechar={() => setFixado(null)}
          larguraArea={areaRef.current?.clientWidth ?? W}
        />
      )}
    </div>
  );

  return (
    <div className="atlas-canvas" ref={caixaRef}>
      {area}
    </div>
  );
});

export default AtlasCanvas;
