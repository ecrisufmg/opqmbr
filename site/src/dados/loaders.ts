import type { Aderencia,
  Programa,
  ProducaoAnual,
  TotalNacional,
  RedeProgramas,
  DistribuicaoNotas,
  Internacionalizacao,
  ProgramaIndices,
  PerfilPrograma,
  RedeRegioes,
  CoautoriaDocDisc,
  RedeObrasPorTipo,
  Comparabilidade,
  Cobertura,
  Concentracao,
  Projetos,
  EndogeniaPrograma,
  Atlas,
  ProducoesPorProjeto,
  MembrosPorProjeto,
  DescricoesPorProjeto,
  ProducoesSemProjeto,
  CicloVidaProjetosDados,
  FichasPorProjeto,
  DetalheProducaoPrograma,
  EsquemaProducaoDados,
  ProducoesMapa,
  ProducoesIndice,
  AderenciaProducoes,
  VinculoProjetos,
  PonteProjetos,
} from "./tipos";

const BASE = import.meta.env.BASE_URL + "data/";

async function load<T>(name: string): Promise<T> {
  const res = await fetch(`${BASE}${name}.json`);
  if (!res.ok) throw new Error(`Failed to load ${name}.json: ${res.status}`);
  return res.json() as Promise<T>;
}

export const loadProgramas = () => load<Programa[]>("programas");
export const loadProducaoAnual = () => load<ProducaoAnual[]>("producao_por_ano");
export const loadTotaisNacionais = () => load<TotalNacional[]>("totais_nacionais");
export const loadRedeProgramas = () => load<RedeProgramas>("rede_programas");
export const loadDistribuicaoNotas = () => load<DistribuicaoNotas>("distribuicao_notas");
export const loadInternacionalizacao = () => load<Internacionalizacao>("internacionalizacao");
export const loadIndices = () => load<ProgramaIndices[]>("indices");
export const loadPerfilProgramas = () => load<PerfilPrograma[]>("perfil_programas");
export const loadRedeRegioes = () => load<RedeRegioes[]>("rede_regioes");
/** Mesma forma de RedeRegioes, um nível abaixo. */
export const loadRedeUfs = () => load<RedeRegioes[]>("rede_ufs");
export const loadCoautoriaDocDisc = () =>
  load<CoautoriaDocDisc[]>("coautoria_docente_discente");
export const loadRedeObrasPorTipo = () => load<RedeObrasPorTipo>("rede_obras_por_tipo");
export const loadComparabilidade = () => load<Comparabilidade>("comparabilidade");
export const loadCobertura = () => load<Cobertura>("cobertura");
export const loadConcentracao = () => load<Concentracao>("concentracao");
export const loadProjetos = () => load<Projetos>("projetos");
export const loadEndogenia = () => load<EndogeniaPrograma[]>("endogenia");
export const loadAtlas = () => load<Atlas>("atlas");
/** Variante HDBSCAN não supervisionada (§4.2.5 item 3) — carregar só quando o
 * usuário trocar o método de clusterização, nunca no mount do Atlas. */
export const loadAtlasHdbscan = () => load<Atlas>("atlas_hdbscan");
export const loadAtlasTopicos = () => load<Atlas>("atlas_topicos");
export const loadAtlasCoautoria = () => load<Atlas>("atlas_coautoria");
/** ~700KB gzipado — carregar só quando o usuário expandir o 1º projeto, nunca no mount do Atlas. */
export const loadProducoesProjeto = () => load<ProducoesPorProjeto>("producoes_projeto");
export const loadMembrosProjeto = () => load<MembrosPorProjeto>("membros_projeto");
export const loadProducoesSemProjeto = () => load<ProducoesSemProjeto>("producoes_sem_projeto");
export const loadCicloVidaProjetos = () => load<CicloVidaProjetosDados>("ciclo_vida_projetos");
export const loadEsquemaProducao = () => load<EsquemaProducaoDados>("esquema_producao");
export const loadFichaProjeto = () => load<FichasPorProjeto>("ficha_projeto");
/** ~50 KB: a matriz de aderência por área (modo "por aderência" do Atlas e perfil na ficha). */
export const loadAderencia = () => load<Aderencia>("aderencia");

const detalhesCarregados = new Map<string, Promise<DetalheProducaoPrograma>>();
/** Detalhe integral das produções de um programa; um arquivo por programa, com cache. */
export function loadDetalheProducao(sigla: string): Promise<DetalheProducaoPrograma> {
  let p = detalhesCarregados.get(sigla);
  if (!p) {
    p = load<DetalheProducaoPrograma>(`detalhe_producao_${sigla}`);
    p.catch(() => detalhesCarregados.delete(sigla)); // falha não fica em cache
    detalhesCarregados.set(sigla, p);
  }
  return p;
}
export const loadDescricoesProjeto = () => load<DescricoesPorProjeto>("descricao_projeto");
/** Mapa de produções: posições em colunas (não traz título/autor). */
export const loadProducoesMapa = () => load<ProducoesMapa>("producoes_mapa");
/** Mapa de produções: índice título/autor/link, carregado sob demanda. */
export const loadProducoesIndice = () => load<ProducoesIndice>("producoes_indice");
/** Aderência de cada produção às subáreas (modo "por aderência" do filtro). */
export const loadAderenciaProducoes = () => load<AderenciaProducoes>("aderencia_producoes");
export const loadPonteProjetos = () => load<PonteProjetos>("ponte_projetos");
export const loadVinculoProjetos = () => load<VinculoProjetos>("vinculo_projetos");
