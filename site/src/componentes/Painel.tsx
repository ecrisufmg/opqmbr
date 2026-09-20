import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTelaEstreita } from "./useMidia";

/** As três alturas de encaixe da folha (celular): espia, meia, cheia. */
export type AlturaFolha = "espia" | "meia" | "cheia";

/** Fração da altura da janela de cada encaixe — a mesma coisa que o CSS usa,
 * em `dvh`; aqui em números para o arrasto saber onde encaixar. */
const FRACAO: Record<AlturaFolha, number> = { espia: 0.2, meia: 0.5, cheia: 0.92 };
const ALTURAS: AlturaFolha[] = ["espia", "meia", "cheia"];

/**
 * Um componente, duas formas (princípio §2.3 do `PLANO_ATLAS_MOBILE.md`):
 *
 *  - **tela larga (≥ 900 px)** — painel lateral, ancorado à esquerda do mapa,
 *    com rolagem própria: é o "lugar" do Google Maps (ficha do projeto, lista
 *    de produções, filtros, "sobre este mapa");
 *  - **tela estreita (< 900 px)** — folha inferior com **três alturas** de
 *    encaixe (espia ~20%, meia ~50%, cheia ~92%). A alça é o único elemento
 *    arrastável da folha (`touch-action: none` só nela), para não brigar com
 *    o `d3-zoom` do canvas. A folha nunca cobre mais que a metade enquanto a
 *    altura é "meia" — o mapa continua visível.
 *
 * Acessibilidade: `Esc` fecha; `aria-modal` e foco preso **só quando a folha
 * cobre o mapa** (altura cheia); fora isso ela é só mais um pedaço da tela.
 * O botão "voltar" do sistema fecha porque o estado de aberto mora na URL
 * (`?projeto=`, `?producao=`) — ver `atlas/useAtlas.ts`; o histórico do
 * navegador desfaz a abertura em vez de sair do site.
 */
export default function Painel({
  aberto,
  ariaLabel,
  titulo,
  acoes,
  onFechar,
  children,
  alturaInicial = "espia",
  onVoltar,
  rotuloVoltar = "Voltar",
}: {
  aberto: boolean;
  ariaLabel: string;
  /** Uma linha de contexto; é ela que fica visível com a folha na altura "espia". */
  titulo: React.ReactNode;
  /** Botões do cabeçalho, à esquerda do ✕. */
  acoes?: React.ReactNode;
  onFechar: () => void;
  children: React.ReactNode;
  /** Onde a folha abre no celular (o painel lateral ignora isto). */
  alturaInicial?: AlturaFolha;
  /** Ação do "‹ voltar" interno (produção → produções → mapa). */
  onVoltar?: () => void;
  rotuloVoltar?: string;
}) {
  const estreito = useTelaEstreita();
  const [altura, setAltura] = useState<AlturaFolha>(alturaInicial);
  const caixa = useRef<HTMLDivElement>(null);
  const arrasto = useRef<{ y0: number; altura0: number; moveu: boolean } | null>(null);

  const modal = estreito && altura === "cheia";

  // Reabrir sempre no encaixe pedido (o estado da altura não sobrevive ao
  // fechamento: abrir de novo em "cheia" esconderia o mapa sem o usuário pedir).
  useEffect(() => {
    if (aberto) setAltura(alturaInicial);
  }, [aberto, alturaInicial]);

  // `Esc` fecha.
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onFechar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto, onFechar]);

  // Foco: entra no painel quando modal, volta para quem abriu quando fecha.
  useLayoutEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement as HTMLElement | null;
    if (modal) caixa.current?.focus({ preventScroll: true });
    return () => {
      if (modal) anterior?.focus?.({ preventScroll: true });
    };
  }, [aberto, modal]);

  // Foco preso, só quando modal (a folha cobre o mapa).
  useEffect(() => {
    if (!modal) return;
    const aoTeclar = (ev: KeyboardEvent) => {
      if (ev.key !== "Tab") return;
      const alvo = caixa.current;
      if (!alvo) return;
      const focaveis = alvo.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focaveis.length === 0) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (ev.shiftKey && document.activeElement === primeiro) {
        ev.preventDefault();
        ultimo.focus();
      } else if (!ev.shiftKey && document.activeElement === ultimo) {
        ev.preventDefault();
        primeiro.focus();
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [modal]);

  if (!aberto) return null;

  const cabecalho = (
    <>
      {onVoltar && (
        <button type="button" className="painel-voltar" onClick={onVoltar}>
          <span aria-hidden="true">‹</span> {rotuloVoltar}
        </button>
      )}
      <div className="painel-titulo">{titulo}</div>
      <div className="painel-acoes">
        {acoes}
        <button type="button" className="painel-fechar" onClick={onFechar} aria-label="Fechar">
          ✕
        </button>
      </div>
    </>
  );

  if (!estreito) {
    return (
      <aside className="painel painel-lateral" role="dialog" aria-label={ariaLabel}>
        <header className="painel-cab">{cabecalho}</header>
        <div className="painel-corpo">{children}</div>
      </aside>
    );
  }

  return (
    <div
      ref={caixa}
      className={`painel painel-folha painel-${altura}`}
      role="dialog"
      aria-modal={modal || undefined}
      aria-label={ariaLabel}
      tabIndex={-1}
    >
      <div
        className="painel-alca"
        role="separator"
        aria-label="Altura da folha: arraste para subir ou descer"
        onPointerDown={(ev) => {
          ev.currentTarget.setPointerCapture(ev.pointerId);
          arrasto.current = { y0: ev.clientY, altura0: window.innerHeight * FRACAO[altura], moveu: false };
        }}
        onPointerMove={(ev) => {
          const a = arrasto.current;
          if (!a) return;
          const h = a.altura0 + (a.y0 - ev.clientY);
          if (Math.abs(ev.clientY - a.y0) > 4) a.moveu = true;
          if (!caixa.current) return;
          caixa.current.style.height = `${Math.max(0, Math.min(h, window.innerHeight * 0.96))}px`;
        }}
        onPointerUp={(ev) => {
          const a = arrasto.current;
          arrasto.current = null;
          if (caixa.current) caixa.current.style.height = "";
          if (!a) return;
          if (ev.currentTarget.hasPointerCapture?.(ev.pointerId)) {
            ev.currentTarget.releasePointerCapture(ev.pointerId);
          }
          const h = a.altura0 + (a.y0 - ev.clientY);
          // Sem arrasto de verdade: um toque na alça sobe um degrau (é o gesto
          // que o dedo espera para uma folha que abre só "espia").
          if (!a.moveu) {
            const i = ALTURAS.indexOf(altura);
            setAltura(ALTURAS[(i + 1) % ALTURAS.length]);
            return;
          }
          // Arrasto para baixo até o fim (abaixo do espia) fecha a folha.
          if (h < window.innerHeight * (FRACAO.espia - 0.08)) {
            onFechar();
            return;
          }
          const alvo = ALTURAS.reduce((melhor, atual) =>
            Math.abs(window.innerHeight * FRACAO[atual] - h) < Math.abs(window.innerHeight * FRACAO[melhor] - h)
              ? atual
              : melhor,
          );
          setAltura(alvo);
        }}
        onPointerCancel={() => {
          arrasto.current = null;
          if (caixa.current) caixa.current.style.height = "";
        }}
      />
      <header className="painel-cab">{cabecalho}</header>
      <div className="painel-corpo">{children}</div>
    </div>
  );
}
