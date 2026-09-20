import icoSucupira from "../assets/s_sucupira.svg";

/**
 * Ícones dos cartões do Atlas. `IconeSucupira` é o logotipo da Plataforma (`s_sucupira.svg`);
 * os demais são desenhos próprios em traço simples, no mesmo peso (não são de nenhum banco de
 * ícones — se o usuário preferir os do Flaticon, basta trocar os componentes por <img>).
 */

const TRACO = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Um ponto (o projeto) com três satélites em órbita: as produções do projeto. */
export function IconeProducoes({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="6.2" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      <circle cx="9" cy="9" r="2.4" fill="currentColor" />
      <circle cx="9" cy="2.8" r="1.5" fill="currentColor" />
      <circle cx="14.4" cy="12.1" r="1.5" fill="currentColor" />
      <circle cx="3.6" cy="12.1" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** Nuvem de pontos soltos: o Mapa de produções, onde cada marca é uma produção. */
export function IconeMapaProducoes({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <circle cx="4" cy="5" r="1.4" fill="currentColor" />
      <circle cx="8.6" cy="3.6" r="1.1" fill="currentColor" />
      <circle cx="13.6" cy="5.6" r="1.6" fill="currentColor" />
      <circle cx="6.6" cy="8.8" r="1.6" fill="currentColor" />
      <circle cx="11.4" cy="9.6" r="1.1" fill="currentColor" />
      <circle cx="3.8" cy="13" r="1.1" fill="currentColor" />
      <circle cx="8.8" cy="14" r="1.4" fill="currentColor" />
      <circle cx="14.2" cy="13.4" r="1.2" fill="currentColor" />
    </svg>
  );
}

/** Lista com marcadores: o detalhe completo da produção. */
export function IconeLista({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <circle cx="3" cy="4.5" r="1.1" fill="currentColor" />
      <circle cx="3" cy="9" r="1.1" fill="currentColor" />
      <circle cx="3" cy="13.5" r="1.1" fill="currentColor" />
      <path d="M6.6 4.5h9M6.6 9h9M6.6 13.5h6" {...TRACO} />
    </svg>
  );
}

/** Globo: o endereço (URL) informado da produção. */
export function IconeGlobo({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="6.6" {...TRACO} />
      <ellipse cx="9" cy="9" rx="2.9" ry="6.6" {...TRACO} />
      <path d="M2.6 9h12.8M3.7 5.6h10.6M3.7 12.4h10.6" {...TRACO} />
    </svg>
  );
}

/** Logotipo da Plataforma Sucupira, para o link da página oficial da produção. */
export function IconeSucupira({ tamanho = 20 }: { tamanho?: number }) {
  return <img src={icoSucupira} alt="" height={tamanho} style={{ display: "block", height: tamanho, width: "auto" }} />;
}

/* ---- Ícones dos controles flutuantes do Atlas (mesmo traço dos de cima) ---- */

/** Funil: filtros. */
export function IconeFiltro({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M2.5 3.5h13l-5 6v4.5l-3 1.5V9.5z" {...TRACO} />
    </svg>
  );
}

/** Três nós ligados: o método de clusterização. */
export function IconeMetodo({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M9 5.2 4.6 12.4M9 5.2l4.4 7.2M5.6 13.4h6.8" {...TRACO} />
      <circle cx="9" cy="4.4" r="2" fill="currentColor" />
      <circle cx="4.2" cy="13.4" r="2" fill="currentColor" />
      <circle cx="13.8" cy="13.4" r="2" fill="currentColor" />
    </svg>
  );
}

/** Pilha de camadas: posição dos pontos e dimensão. */
export function IconeCamadas({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M9 2.5 15.5 6 9 9.5 2.5 6z" {...TRACO} />
      <path d="m2.5 9.2 6.5 3.5 6.5-3.5M2.5 12.4 9 15.9l6.5-3.5" {...TRACO} />
    </svg>
  );
}

/** Círculo com anel: a chave do mapa (legenda). */
export function IconeLegenda({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <circle cx="5.2" cy="5.2" r="2.6" fill="currentColor" />
      <circle cx="5.2" cy="5.2" r="3.9" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <path d="M10.6 5.2h5M3 13.2h2.6M8 13.2h7.5" {...TRACO} />
    </svg>
  );
}

/** Quatro cantos: reenquadrar tudo. */
export function IconeReenquadrar({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M2.5 6.5v-4h4M11.5 2.5h4v4M15.5 11.5v4h-4M6.5 15.5h-4v-4" {...TRACO} />
    </svg>
  );
}

/** Tabela: as tabelas de referência abaixo do mapa. */
export function IconeTabela({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <rect x="2.5" y="3.5" width="13" height="11" rx="1.2" {...TRACO} />
      <path d="M2.5 7.5h13M7 7.5v7" {...TRACO} />
    </svg>
  );
}

/** "i" em círculo: sobre este mapa. */
export function IconeSobre({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="6.6" {...TRACO} />
      <path d="M9 8.2v4" {...TRACO} />
      <circle cx="9" cy="5.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

/** Mais e menos do zoom. */
export function IconeMais({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M9 3.5v11M3.5 9h11" {...TRACO} />
    </svg>
  );
}

export function IconeMenos({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M3.5 9h11" {...TRACO} />
    </svg>
  );
}

/** Lupa: a caixa de busca. */
export function IconeBusca({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <circle cx="7.8" cy="7.8" r="4.6" {...TRACO} />
      <path d="m11.4 11.4 4 4" {...TRACO} />
    </svg>
  );
}
