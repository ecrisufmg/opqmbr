import { useEffect, useRef, useState } from "react";
import { useToqueGrosso } from "./useMidia";

/**
 * Explicação que existe no **toque** também — ao contrário de `title={…}`, que
 * em tela sensível ao toque nunca abre. Um "?" ao lado do controle: no desktop
 * abre por hover e por foco (teclado); no toque, por toque, e toque fora fecha.
 *
 * Substitui `title` só onde a explicação carrega informação que não está em
 * outro lugar; onde o texto é decorativo, o certo é apagá-lo, não virar "?".
 */
export default function DicaToque({
  dica,
  rotulo = "Mais informações",
}: {
  dica: string;
  /** Nome acessível do botão ("O que é núcleo comparável?"). */
  rotulo?: string;
}) {
  const toque = useToqueGrosso();
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLSpanElement>(null);

  // Toque/clique fora fecha (só faz diferença no toque; no desktop quem fecha
  // é o mouseleave/blur).
  useEffect(() => {
    if (!aberto) return;
    const fora = (ev: PointerEvent) => {
      if (!caixa.current?.contains(ev.target as Node)) setAberto(false);
    };
    document.addEventListener("pointerdown", fora);
    return () => document.removeEventListener("pointerdown", fora);
  }, [aberto]);

  return (
    <span className="dica-toque" ref={caixa}>
      <button
        type="button"
        className="dica-toque-botao"
        aria-expanded={aberto}
        aria-label={rotulo}
        onMouseEnter={toque ? undefined : () => setAberto(true)}
        onMouseLeave={toque ? undefined : () => setAberto(false)}
        onFocus={toque ? undefined : () => setAberto(true)}
        onBlur={toque ? undefined : () => setAberto(false)}
        onClick={() => {
          if (toque) setAberto((v) => !v);
        }}
      >
        ?
      </button>
      {aberto && (
        <span role="tooltip" className="dica-toque-balao">
          {dica}
        </span>
      )}
    </span>
  );
}
