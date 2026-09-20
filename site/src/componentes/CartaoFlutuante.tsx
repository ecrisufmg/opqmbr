import { useLayoutEffect, useRef, useState } from "react";

/** Onde o cartão aparece no início: junto do ponto clicado, ou no canto do canvas. */
export type AncoraCartao = { x: number; y: number } | "canto";

export const LARGURA_CARTAO = 384; // 24rem

/** O último cartão tocado fica por cima dos outros. */
let zTopo = 20;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Cartão flutuante sobre o canvas do Atlas: uma **alça** (o cabeçalho) para arrastar e um
 * **✕** no canto direito para fechar. Serve aos dois níveis — o do projeto e o da
 * produção —, que podem estar abertos juntos e ser arrumados como o usuário quiser.
 *
 * Posicionado em `absolute` dentro do contêiner do canvas (`position: relative`), então
 * rola com a página; o arrasto é limitado a esse contêiner.
 */
export default function CartaoFlutuante({
  ancora,
  larguraArea,
  titulo,
  acoes,
  ariaLabel,
  onFechar,
  children,
}: {
  ancora: AncoraCartao;
  larguraArea: number;
  titulo: React.ReactNode;
  /** Ícones de ação, na barra do alto — acima do título, à esquerda do ✕. */
  acoes?: React.ReactNode;
  ariaLabel: string;
  onFechar: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const arrasto = useRef<{ dx: number; dy: number } | null>(null);
  const [z, setZ] = useState(() => ++zTopo);
  const [pos, setPos] = useState<{ left: number; top: number }>(() => {
    if (ancora === "canto") return { left: Math.max(4, larguraArea - LARGURA_CARTAO - 8), top: 8 };
    const cabeADireita = ancora.x + 16 + LARGURA_CARTAO <= larguraArea;
    return {
      left: cabeADireita ? ancora.x + 16 : Math.max(4, ancora.x - 16 - LARGURA_CARTAO),
      top: Math.max(4, ancora.y - 24),
    };
  });

  // Depois de medido, mantém o cartão inteiro dentro do contêiner (o corpo pode ser alto).
  useLayoutEffect(() => {
    const el = ref.current;
    const pai = el?.offsetParent as HTMLElement | null;
    if (!el || !pai) return;
    setPos((p) => ({
      left: clamp(p.left, 0, Math.max(0, pai.scrollWidth - el.offsetWidth)),
      top: clamp(p.top, 0, Math.max(0, pai.clientHeight - el.offsetHeight)),
    }));
  }, []);

  function aoPressionar(ev: React.PointerEvent<HTMLDivElement>) {
    if ((ev.target as HTMLElement).closest("button, a")) return;
    const el = ref.current;
    if (!el) return;
    ev.currentTarget.setPointerCapture(ev.pointerId);
    const r = el.getBoundingClientRect();
    arrasto.current = { dx: ev.clientX - r.left, dy: ev.clientY - r.top };
  }

  function aoMover(ev: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    const pai = el?.offsetParent as HTMLElement | null;
    if (!arrasto.current || !el || !pai) return;
    const pr = pai.getBoundingClientRect();
    setPos({
      left: clamp(ev.clientX - pr.left + pai.scrollLeft - arrasto.current.dx, 0, Math.max(0, pai.scrollWidth - el.offsetWidth)),
      top: clamp(ev.clientY - pr.top - arrasto.current.dy, 0, Math.max(0, pai.clientHeight - el.offsetHeight)),
    });
  }

  function aoSoltar(ev: React.PointerEvent<HTMLDivElement>) {
    arrasto.current = null;
    if (ev.currentTarget.hasPointerCapture?.(ev.pointerId)) ev.currentTarget.releasePointerCapture(ev.pointerId);
  }

  return (
    <div
      ref={ref}
      className="atlas-cartao"
      style={{ left: pos.left, top: pos.top, zIndex: z }}
      role="dialog"
      aria-label={ariaLabel}
      onPointerDown={() => setZ(++zTopo)}
    >
      <div
        className="atlas-cartao-cab"
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        title="Arraste para mover"
      >
        <div className="atlas-cartao-barra">
          <span className="atlas-cartao-alca" aria-hidden="true">
            ⠿
          </span>
          <div className="atlas-cartao-acoes">{acoes}</div>
          <button type="button" className="atlas-cartao-fechar" onClick={onFechar} aria-label="Fechar">
            ✕
          </button>
        </div>
        <div className="atlas-cartao-titulo">{titulo}</div>
      </div>
      {children}
    </div>
  );
}
