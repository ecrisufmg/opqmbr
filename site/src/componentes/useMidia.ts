import { useEffect, useRef, useState } from "react";

/** Breakpoint do site, num só lugar: o mesmo 900 px que o CSS usa para virar
 * menu ☰ e folha inferior. Se um dia mudar, muda aqui E nas media queries. */
export const CONSULTA_ESTREITA = "(max-width: 900px)";

/** Uma media query como estado do React. Usada só onde o CSS não basta: o
 * layout reage por `@media`; o *comportamento* (alvo de toque, hover, foco
 * preso) reage aqui. */
export function useMediaQuery(consulta: string): boolean {
  const [casa, setCasa] = useState(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(consulta).matches
      : false,
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(consulta);
    const aoMudar = () => setCasa(mq.matches);
    aoMudar();
    mq.addEventListener("change", aoMudar);
    return () => mq.removeEventListener("change", aoMudar);
  }, [consulta]);

  return casa;
}

/** `(pointer: coarse)` — o ponteiro PRIMÁRIO é o dedo. Fonte única de "estou
 * no celular" para o JS: é o que decide alvo de toque grande, ausência de
 * hover e o gesto de arrastar. Não confundir com largura de tela: um tablet
 * largo tem ponteiro grosso e tela larga. */
export function useToqueGrosso(): boolean {
  return useMediaQuery("(pointer: coarse)");
}

/** Tela estreita (< 900 px) — a mesma conta do CSS. */
export function useTelaEstreita(): boolean {
  return useMediaQuery(CONSULTA_ESTREITA);
}

/** Tamanho medido de um elemento, por `ResizeObserver`. O canvas do Atlas
 * deixou de ter largura×altura fixas (760×680) e passa a medir o contêiner —
 * este hook é a única fonte dessa medida. */
export function useTamanho<T extends HTMLElement>(): [
  React.RefObject<T>,
  { largura: number; altura: number },
] {
  const ref = useRef<T>(null);
  const [tamanho, setTamanho] = useState({ largura: 0, altura: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => {
      const r = el.getBoundingClientRect();
      setTamanho((atual) => {
        const largura = Math.round(r.width);
        const altura = Math.round(r.height);
        return atual.largura === largura && atual.altura === altura ? atual : { largura, altura };
      });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, tamanho];
}

/** Um popover que fecha com `Esc` e com pointerdown fora dele — o mesmo gesto
 * de todo menu suspenso. `ref` marca a área "dentro" (o botão E o painel dele:
 * clicar no próprio botão alterna, não fecha e reabre). */
export function useFechaFora(
  ref: React.RefObject<HTMLElement>,
  ativo: boolean,
  aoFechar: () => void,
): void {
  useEffect(() => {
    if (!ativo) return;
    const fora = (ev: PointerEvent) => {
      if (!ref.current?.contains(ev.target as Node)) aoFechar();
    };
    const tecla = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") aoFechar();
    };
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", tecla);
    };
  }, [ref, ativo, aoFechar]);
}
