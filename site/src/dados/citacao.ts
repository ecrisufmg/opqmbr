/**
 * Autoria e citação do site — **uma fonte só** para a página "Sobre", o rodapé e as fórmulas de
 * citação. Os metadados de `index.html` (`citation_*`, JSON-LD) e o `CITATION.cff` da raiz repetem
 * estes valores à mão (não dá para importar TS num HTML estático): ao mudar algo aqui, mude lá.
 *
 * A URL é a pública de hoje; o DOI (depósito no Zenodo, `doi` abaixo) é o identificador permanente a citar.
 * Ver `docs/PLANO.md` §4.2.7 e `docs/ZENODO.md`.
 */
export const CITACAO = {
  titulo: "Observatório da Pesquisa em Música no Brasil",
  subtitulo: "20 programas de pós-graduação, 2021–2024",
  autor: { nome: "José Henrique", sobrenome: "Padovani" },
  ano: 2026,
  /** 1–12: setembro, mês da publicação. */
  mes: 9,
  url: "https://ecris.cc/opqmbr/",
  fonteDados: {
    nome: "Plataforma Sucupira (CAPES)",
    url: "https://sucupira.capes.gov.br",
    /** ABNT, autor institucional. */
    abnt:
      "BRASIL. Ministério da Educação. Coordenação de Aperfeiçoamento de Pessoal de Nível Superior. Plataforma Sucupira. Disponível em: https://sucupira.capes.gov.br.",
  },
  coletaDados: "agosto de 2026",
  /** Versão do site (0.4.1 desde 2026-09-20). Mudar junto com o `CITATION.cff`, o
   * JSON-LD de `index.html` e o `CHANGELOG.md` — `python3 conferir_versao.py` confere. Enquanto a
   * versão for 0.x o site está em desenvolvimento; cada publicação em produção deve ter uma tag
   * `v<versao>` no `main` (ver `docs/DEPLOY.md`, "Versões e tags"). */
  versao: { numero: "0.4.2", data: "2026-09-20" },
  /** DOIs do depósito no Zenodo (2026-09-20). O do **conceito** resolve sempre para a versão mais recente e é o
   * que se cita para "o trabalho"; o da **versão** aponta para os arquivos exatos da 0.3 (o código, o site
   * compilado e os dados públicos), e serve para reproduzir. Cada versão futura depositada ganha o seu. */
  doi: {
    conceito: "10.5281/zenodo.22858795",
    versaoArquivada: { numero: "0.3", doi: "10.5281/zenodo.22858796" },
  },
  licenca: {
    nome: "CC BY 4.0",
    spdx: "CC-BY-4.0",
    url: "https://creativecommons.org/licenses/by/4.0/deed.pt-br",
  },
  /** Ferramentas de IA usadas como apoio à codificação — declaração do autor (2026-09-19). Os nomes
   * e versões são os que o autor informou; o texto que os cerca diz que a revisão e a decisão são dele. */
  ferramentasIA: ["DeepSeek 4.0", "Claude Sonnet 5 (Anthropic)"],
} as const;

const MES_ABNT = ["jan.", "fev.", "mar.", "abr.", "maio", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
const MES_EXTENSO = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/** "set. 2026" — a data da publicação, no formato ABNT abreviado. */
export const publicadoAbnt = `${MES_ABNT[CITACAO.mes - 1]} ${CITACAO.ano}`;
/** "19 de setembro de 2026" a partir de "2026-09-19". */
export function dataIsoExtenso(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MES_EXTENSO[m - 1]} de ${a}`;
}

/** "20 set. 2026" a partir de "2026-09-20" — a data curta das tags do cabeçalho. */
export function dataIsoAbnt(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} ${MES_ABNT[m - 1]} ${a}`;
}

/** "0.1, 19 de setembro de 2026". */
export const versaoExtenso = `${CITACAO.versao.numero}, ${dataIsoExtenso(CITACAO.versao.data)}`;

/** "setembro de 2026". */
export const publicadoExtenso = `${MES_EXTENSO[CITACAO.mes - 1]} de ${CITACAO.ano}`;

/** "19 set. 2026" — a data de acesso, sempre a de hoje (quem cita é quem acessou). */
export function dataAcesso(hoje: Date = new Date()): string {
  return `${hoje.getDate()} ${MES_ABNT[hoje.getMonth()]} ${hoje.getFullYear()}`;
}

const { titulo, subtitulo, autor, url } = CITACAO;

/** "https://doi.org/10.5281/…" a partir do DOI. */
export const doiUrl = (doi: string) => `https://doi.org/${doi}`;

/** ABNT NBR 6023:2018, documento online sem local de publicação. O subtítulo fica de fora, como no título do
 * depósito do Zenodo. */
export function citacaoAbnt(hoje: Date = new Date()): string {
  return `${autor.sobrenome.toUpperCase()}, ${autor.nome}. ${titulo}. Versão ${CITACAO.versao.numero}. [S. l.], ${publicadoAbnt}. DOI: ${CITACAO.doi.conceito}. Disponível em: ${url}. Acesso em: ${dataAcesso(hoje)}.`;
}

/** APA 7ª edição, site. */
export function citacaoApa(): string {
  const iniciais = autor.nome.split(" ").map((n) => `${n[0]}.`).join(" ");
  return `${autor.sobrenome}, ${iniciais} (${CITACAO.ano}, ${MES_EXTENSO[CITACAO.mes - 1]}). ${titulo}: ${subtitulo} (Versão ${CITACAO.versao.numero}) [Site]. ${doiUrl(CITACAO.doi.conceito)}`;
}

/** BibTeX (`@misc`), com a data de acesso e a fonte dos dados na nota. */
export function citacaoBibtex(hoje: Date = new Date()): string {
  return [
    `@misc{padovani${CITACAO.ano}opqmbr,`,
    `  author = {${autor.sobrenome}, ${autor.nome}},`,
    `  title = {${titulo}: ${subtitulo}},`,
    `  year = {${CITACAO.ano}},`,
    `  version = {${CITACAO.versao.numero}},`,
    `  doi = {${CITACAO.doi.conceito}},`,
    `  month = sep,`,
    `  url = {${url}},`,
    `  note = {Dados: ${CITACAO.fonteDados.nome}, coletados em ${CITACAO.coletaDados}. Acesso em: ${dataAcesso(hoje)}}`,
    `}`,
  ].join("\n");
}
