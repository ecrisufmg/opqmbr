import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import { IconeSobre } from "./Icones";
import { useFechaFora } from "./useMidia";

/**
 * Botão + balão de detalhes (PLANO_REDESENHO_ABAS.md). O texto longo fica atrás do botão; no celular o
 * balão vira uma folha no pé da tela. Fecha com Esc, com o ✕ e ao clicar fora.
 */
export function Balao({
  rotulo = "Como ler",
  titulo,
  alinhar = "direita",
  children,
}: {
  rotulo?: string;
  /** Nome acessível do balão (o título da seção ou do gráfico). */
  titulo: string;
  /** Lado em que o balão se ancora ao botão. */
  alinhar?: "direita" | "esquerda";
  children: ReactNode;
}) {
  const id = useId();
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const fechar = useCallback(() => setAberto(false), []);
  useFechaFora(caixa, aberto, fechar);

  return (
    <div className={`secao-info ${alinhar}`} ref={caixa}>
      <button
        type="button"
        className={`secao-info-botao${aberto ? " ativo" : ""}`}
        aria-expanded={aberto}
        aria-controls={`${id}-d`}
        onClick={() => setAberto((v) => !v)}
      >
        <IconeSobre tamanho={16} />
        <span>{rotulo}</span>
      </button>
      {aberto && (
        <div id={`${id}-d`} className="secao-balao" role="dialog" aria-label={`${titulo}: ${rotulo.toLowerCase()}`}>
          <button type="button" className="secao-balao-fechar" onClick={fechar} aria-label="Fechar">
            ✕
          </button>
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Uma nota que fica **junto de um gráfico**, colada abaixo dele: um botão discreto que abre o texto.
 * Use no lugar de um `<p className="chart-nota">` dentro de um componente de gráfico.
 */
export function Nota({
  titulo = "Nota",
  rotulo = "Nota",
  children,
}: {
  titulo?: string;
  rotulo?: string;
  children: ReactNode;
}) {
  return (
    <div className="nota-linha">
      <Balao rotulo={rotulo} titulo={titulo} alinhar="esquerda">
        {children}
      </Balao>
    </div>
  );
}

/**
 * Uma seção de página no padrão do site: o **gráfico é o protagonista**.
 *
 *  - `titulo`: o que a seção mostra (h2);
 *  - `leitura`: **uma frase** que diz como ler o gráfico (no máximo ~25 palavras);
 *  - `detalhes`: o texto longo (definições, método, ressalvas), atrás do botão "Como ler".
 *
 * Regra: **nenhum parágrafo fica solto entre gráficos**. O que for essencial cabe em `leitura`; o
 * resto é detalhe opcional, mas sempre acessível (teclado e toque).
 */
export default function Secao({
  titulo,
  leitura,
  detalhes,
  rotuloDetalhes = "Como ler",
  children,
}: {
  titulo: string;
  leitura?: ReactNode;
  detalhes?: ReactNode;
  rotuloDetalhes?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <section className="secao" aria-labelledby={`${id}-t`}>
      <header className="secao-cab">
        <h2 id={`${id}-t`}>{titulo}</h2>
        {detalhes && (
          <Balao rotulo={rotuloDetalhes} titulo={titulo}>
            {detalhes}
          </Balao>
        )}
      </header>
      {leitura && <p className="secao-leitura">{leitura}</p>}
      {children}
    </section>
  );
}
