import type { DetalheProducaoPrograma } from "./tipos";

/**
 * Os campos do detalhe de uma produção que servem de "resumo" no popup — em ordem de
 * prioridade, pelo nome do campo sem o prefixo `(PAC)`/`(PTT)` da Plataforma. Cada subtipo
 * preenche campos diferentes (artigo tem periódico, anais têm evento, música tem a
 * descrição da obra…), então a lista cobre todos e o popup pega os primeiros que existirem.
 */
const PRIORIDADE = [
  "Descrição da Produção",
  "Finalidade",
  "ISSN / Título do periódico",
  "Título dos Anais",
  "Título da Obra",
  "Nome do evento",
  "Evento",
  "Local",
  "Cidade do evento",
  "Cidade",
  "Instituição promotora",
  "Instituição Promotora/ Editora/ Gravadora",
  "Nome da editora",
  "Categoria",
  "Natureza",
  "Observação",
].map((s) => s.toLowerCase());

export interface Destaque {
  rotulo: string;
  valor: string;
}

function semPrefixo(item: string): string {
  return item.replace(/^\((PAC|PTT)\)\s*/, "");
}

function cortar(v: string, max: number): string {
  const t = v.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export interface LinkProducao {
  rotulo: string;
  url: string;
}

/** Os endereços que a própria produção informa: `URL` (e as variantes de cada formulário) e o
 * `URL do DOI`. Só o que é http(s) de fato; repetidos saem uma vez. */
export function linksDaProducao(frag: DetalheProducaoPrograma | null | undefined, idProducao: string): LinkProducao[] {
  const campos = frag?.producoes[idProducao];
  if (!frag || !campos) return [];
  const saida: LinkProducao[] = [];
  for (const [i, v] of campos) {
    const item = frag.itens[i];
    const rotulo = /doi/i.test(item) ? "DOI" : /^(\((PAC|PTT)\)\s*)?URL$/i.test(item) ? "Endereço informado" : null;
    const url = v.trim();
    if (rotulo && /^https?:\/\/\S+$/i.test(url) && !saida.some((l) => l.url === url)) saida.push({ rotulo, url });
  }
  return saida;
}

/** Até `max` campos-chave da produção, com o valor cortado em `corte` letras. */
export function destaquesDaProducao(
  frag: DetalheProducaoPrograma | null | undefined,
  idProducao: string,
  max = 3,
  corte = 150,
): Destaque[] {
  const campos = frag?.producoes[idProducao];
  if (!frag || !campos) return [];
  const porRotulo = new Map<string, Destaque>();
  for (const [i, v] of campos) {
    const rotulo = semPrefixo(frag.itens[i]);
    const chave = rotulo.toLowerCase();
    if (!porRotulo.has(chave)) porRotulo.set(chave, { rotulo, valor: cortar(v, corte) });
  }
  const saida: Destaque[] = [];
  for (const chave of PRIORIDADE) {
    const d = porRotulo.get(chave);
    if (d) saida.push(d);
    if (saida.length === max) break;
  }
  return saida;
}
