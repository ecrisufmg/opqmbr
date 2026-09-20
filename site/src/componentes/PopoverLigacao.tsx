import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { textoPonte } from "../dados/ponte";

/** Uma ligação entre dois programas escolhida na tela (clique numa aresta ou num fluxo). */
export interface LigacaoSel {
  a: string;
  b: string;
  /** O que a espessura conta ("26 produções…", "4 pessoas em comum"). */
  resumo: string;
  /** Nota extra (por exemplo, que o recorte por tipo não vai para o mapa). */
  aviso?: string;
  /** Posição do clique, em coordenadas da janela. */
  x: number;
  y: number;
}

const LARGURA = 340;
const ALTURA = 210;

/**
 * O popover de uma ligação em "Quem trabalha com quem": diz o que a ligação mede e leva a busca
 * para os dois mapas já recortada pelos dois programas (`?ponte=A,B`, ver `dados/ponte.ts`).
 * Fecha com Esc, com clique fora ou no ✕.
 */
export default function PopoverLigacao({ ligacao, onFechar }: { ligacao: LigacaoSel; onFechar: () => void }) {
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aoTeclar = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onFechar();
    };
    const aoApertar = (ev: PointerEvent) => {
      if (caixa.current && !caixa.current.contains(ev.target as Node)) onFechar();
    };
    window.addEventListener("keydown", aoTeclar);
    window.addEventListener("pointerdown", aoApertar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      window.removeEventListener("pointerdown", aoApertar);
    };
  }, [onFechar]);

  useEffect(() => {
    caixa.current?.focus({ preventScroll: true });
  }, [ligacao]);

  const esquerda = Math.max(8, Math.min(ligacao.x + 12, window.innerWidth - LARGURA - 8));
  const abaixo = ligacao.y + 12 + ALTURA <= window.innerHeight;
  const topo = abaixo ? ligacao.y + 12 : Math.max(8, ligacao.y - 12 - ALTURA);
  const ponte = encodeURIComponent(textoPonte([ligacao.a, ligacao.b].sort() as [string, string])).replace("%2C", ",");

  return (
    <div
      ref={caixa}
      className="popover-ligacao"
      role="dialog"
      aria-label={`Ligação entre ${ligacao.a} e ${ligacao.b}`}
      tabIndex={-1}
      style={{ left: esquerda, top: topo, width: LARGURA }}
    >
      <div className="popover-ligacao-cab">
        <strong>
          {ligacao.a} × {ligacao.b}
        </strong>
        <button type="button" className="painel-fechar" onClick={onFechar} aria-label="Fechar">
          ✕
        </button>
      </div>
      <div className="atlas-tooltip-nota">{ligacao.resumo}</div>
      <div className="popover-ligacao-acoes">
        <Link className="chip" to={`/mapa-de-producoes?ponte=${ponte}`}>
          Ver as produções no Mapa de produções →
        </Link>
        <Link className="chip" to={`/mapa-de-projetos?ponte=${ponte}`}>
          Ver os projetos no Mapa de projetos →
        </Link>
      </div>
      <div className="atlas-tooltip-nota">
        Recorta o mapa às produções do quadriênio em coautoria com pessoas que atuam nos dois programas.
        {ligacao.aviso ? ` ${ligacao.aviso}` : ""}
      </div>
    </div>
  );
}
