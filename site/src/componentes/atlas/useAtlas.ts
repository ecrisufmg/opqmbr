import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadVinculoProjetos, loadPonteProjetos,
  loadAtlas,
  loadAtlasHdbscan,
  loadAtlasTopicos,
  loadAtlasCoautoria,
  loadProgramas,
  loadProducoesProjeto,
  loadMembrosProjeto,
  loadDescricoesProjeto,
  loadFichaProjeto,
  loadAderencia,
  loadDetalheProducao,
  loadEsquemaProducao,
} from "../../dados/loaders";
import type { PonteProjetos, VinculoProjetos,
  Atlas,
  AtlasProjeto,
  Programa,
  ProducoesPorProjeto,
  ProducaoProjeto,
  MembrosPorProjeto,
  DescricoesPorProjeto,
  FichasPorProjeto,
  DetalheProducaoPrograma,
  EsquemaProducaoDados,
  Aderencia,
} from "../../dados/tipos";
import { montarEsquema } from "../corProducao";
import type { FiltroLegenda } from "../LegendaProducoes";
import { lerPonte, passaInstituicoes, type ModoInstituicao } from "../../dados/ponte";
import { contarVinculos, mascaraDeVinculos, passaVinculo, type ModoVinculo } from "../../dados/vinculos";

export type Modo = "subarea" | "instituicao";
export type OrganizarPor = "tema" | "localidade";
export type Dimensao = "2d" | "3d";
/** §4.2.5 item 6 — topologia geográfica encadeada: 3 níveis de agrupamento
 * dentro do modo Localidade, do mais agregado ao mais fino. */
export type AgruparLocalidade = "regiao" | "uf" | "instituicao";
export type Metodo = "anppom" | "hdbscan" | "topicos" | "coautoria";
export type MetodoAlternativo = Exclude<Metodo, "anppom">;
/** Qual sobreposição está aberta: a ficha do projeto (também é a folha do
 * celular), os filtros ou o "sobre este mapa". Uma de cada vez — é o mesmo
 * canto da tela, e no celular é a mesma folha. */
export type PainelNome = "ficha" | "filtros" | "metodo" | "sobre" | "camadas" | "legenda";

// Rótulos por método de clusterização (§4.2.5 item 3) — cada método
// alternativo tem seu jeito de nomear "grupo" e de gerar palavra-chave;
// centralizado aqui em vez de `if`/ternário espalhado pela JSX.
export const ROTULO_GRUPO: Record<Metodo, string> = {
  anppom: "Subárea — 1º nível (ANPPOM)",
  hdbscan: "Cluster (HDBSCAN)",
  topicos: "Tópico (LDA)",
  coautoria: "Comunidade (rede)",
};
export const ROTULO_GRUPO_TABELA: Record<Metodo, string> = {
  anppom: "Subáreas",
  hdbscan: "Clusters (HDBSCAN)",
  topicos: "Tópicos (LDA)",
  coautoria: "Comunidades (rede de colaboração)",
};
export const ROTULO_COLUNA_GRUPO: Record<Metodo, string> = {
  anppom: "Área (ANPPOM)",
  hdbscan: "Cluster",
  topicos: "Tópico",
  coautoria: "Comunidade",
};
export const ROTULO_COLUNA_PALAVRAS: Record<Metodo, string> = {
  anppom: "Subáreas temáticas (2º nível)",
  hdbscan: "Palavras-chave (TF-IDF)",
  topicos: "Termos do tópico",
  coautoria: "Palavras-chave (TF-IDF, calculada depois)",
};

export const ROTULO_METODO: Record<Metodo, string> = {
  anppom: "ANPPOM (leitura)",
  hdbscan: "HDBSCAN (não supervisionado)",
  topicos: "Tópicos (LDA)",
  coautoria: "Coautoria (rede)",
};

/** Selo do método — o chip **curto** da caixa de controle (§3.3): a ressalva
 * metodológica deixa de ser um parágrafo acima do gráfico, mas continua
 * visível o tempo todo (o texto longo está no "Sobre este mapa"). */
export const SELO_METODO: Record<Metodo, string> = {
  anppom: "leitura, sem conferência humana projeto a projeto",
  hdbscan: "densidade, com ruído à mostra",
  topicos: "co-ocorrência de palavra (LDA)",
  coautoria: "pessoa compartilhada, não o texto",
};

// Carregadores dos métodos alternativos (§4.2.5 item 3) — mapa em vez de
// um `if` por método: um método novo vira só mais uma entrada aqui, não
// mexe no efeito de carregamento nem no estado.
const LOADERS_ALTERNATIVOS: Record<MetodoAlternativo, () => Promise<Atlas>> = {
  hdbscan: loadAtlasHdbscan,
  topicos: loadAtlasTopicos,
  coautoria: loadAtlasCoautoria,
};

function lerEnum<T extends string>(valor: string | null, validos: readonly T[], padrao: T): T {
  return valor !== null && (validos as readonly string[]).includes(valor) ? (valor as T) : padrao;
}

const METODOS = ["anppom", "hdbscan", "topicos", "coautoria"] as const;
const ORGANIZAR = ["tema", "localidade"] as const;
const DIMENSOES = ["2d", "3d"] as const;
const AGRUPAR = ["regiao", "uf", "instituicao"] as const;
const MODOS_PESO = ["aderencia", "discreto"] as const;
/** Como os grupos escolhidos colorem o mapa: **por aderência** (o quanto o texto do projeto pertence
 * ao grupo — PLANO §4.2.6; é o padrão) ou **discreto** (o projeto está ou não no grupo, como antes;
 * `?peso=discreto`). */
export type ModoPeso = (typeof MODOS_PESO)[number];
/** Corte inicial do controle de alcance (0–100), contínuo. */
const ALCANCE_INICIAL = 30;
const PAINEIS = ["filtros", "metodo", "sobre", "camadas", "legenda"] as const;

/**
 * Todo o estado do Atlas, num lugar só, com o que é de navegação morando na
 * **URL** (princípio §2.6): `?metodo=&camada=&dim=&agrupar=&projeto=&producao=`
 * e `?painel=filtros|metodo|camadas|legenda|sobre` (folhas do celular; o
 * "sobre" também no desktop, onde os demais são painéis suspensos de estado
 * local). É o que faz o botão "voltar" do celular fechar a folha em vez de sair do site — e o que o Gantt de `/projetos` usa para
 * mandar o visitante direto num projeto.
 *
 * Os filtros por múltipla escolha continuam em estado local de propósito: são
 * muitos conjuntos, mudam o tempo todo e não são "onde eu estou".
 */
export function useAtlas() {
  const [params, setParams] = useSearchParams();

  const metodo = lerEnum(params.get("metodo"), METODOS, "anppom");
  const organizarPor = lerEnum(params.get("camada"), ORGANIZAR, "tema");
  const dimensao = lerEnum(params.get("dim"), DIMENSOES, "2d");
  const agruparLocalidade = lerEnum(params.get("agrupar"), AGRUPAR, "instituicao");
  const modoPeso = lerEnum(params.get("peso"), MODOS_PESO, "aderencia");
  const painelUrl = lerEnum(params.get("painel"), PAINEIS, "filtros");
  const temPainelUrl = params.has("painel");
  const idProjetoUrl = params.get("projeto");
  // `?ponte=A,B` (link de "Quem trabalha com quem") só PRÉ-SELECIONA o filtro de instituição no
  // modo "Entre elas"; depois disso o filtro é o do painel e o parâmetro sai da URL.
  const ponteInicial = useMemo(() => lerPonte(params.get("ponte")), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [ponteProjetos, setPonteProjetos] = useState<PonteProjetos | null>(null);
  const idProducaoUrl = params.get("producao");

  const escrever = useCallback(
    (mudancas: Record<string, string | null>, substituir: boolean) => {
      setParams(
        (atual) => {
          const proximo = new URLSearchParams(atual);
          for (const [chave, valor] of Object.entries(mudancas)) {
            if (valor === null) proximo.delete(chave);
            else proximo.set(chave, valor);
          }
          return proximo;
        },
        { replace: substituir },
      );
    },
    [setParams],
  );

  const [atlasAnppom, setAtlasAnppom] = useState<Atlas | null>(null);
  const [atlasAlternativos, setAtlasAlternativos] = useState<Partial<Record<MetodoAlternativo, Atlas>>>({});
  const [carregandoAlternativo, setCarregandoAlternativo] = useState(false);
  const [programas, setProgramas] = useState<Programa[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [modo, setModo] = useState<Modo>("subarea");
  const [aderencia, setAderencia] = useState<Aderencia | null>(null);
  const [alcance, setAlcance] = useState(ALCANCE_INICIAL);
  const [temasSel, setTemasSel] = useState<Set<number>>(() => new Set());
  const [subareas2Sel, setSubareas2Sel] = useState<Set<string>>(() => new Set());
  const [siglasSel, setSiglasSel] = useState<Set<string>>(() => new Set(ponteInicial ?? []));
  // Como combinar as instituições marcadas: qualquer (OU) ou entre elas (ver `dados/ponte.ts`).
  const [modoInstituicao, setModoInstituicao] = useState<ModoInstituicao>(ponteInicial ? "entre" : "ou");
  // Vínculo dos autores (Docente, Discente…): o projeto entra se alguma produção dele tem
  // um autor com um dos vínculos marcados; e, com o projeto aberto, só essas produções ficam.
  const [vinculosSel, setVinculosSel] = useState<Set<string>>(() => new Set());
  const [modoVinculo, setModoVinculo] = useState<ModoVinculo>("ou");
  const [vinculoProjetos, setVinculoProjetos] = useState<VinculoProjetos | null>(null);

  const [producoesPorProjeto, setProducoesPorProjeto] = useState<ProducoesPorProjeto | null>(null);
  const [carregandoProducoes, setCarregandoProducoes] = useState(false);
  const [membrosPorProjeto, setMembrosPorProjeto] = useState<MembrosPorProjeto | null>(null);
  const [descricoesPorProjeto, setDescricoesPorProjeto] = useState<DescricoesPorProjeto | null>(null);
  const [fichas, setFichas] = useState<FichasPorProjeto | null>(null);
  const [cfgEsquema, setCfgEsquema] = useState<EsquemaProducaoDados | null>(null);
  const [detalhes, setDetalhes] = useState<Record<string, DetalheProducaoPrograma>>({});

  /** Só o núcleo comparável (padrão: todas). */
  const [apenasNucleo, setApenasNucleo] = useState(false);
  /** Grupo isolado na legenda (forma, cor ou tom): o resto esmaece no mapa e na lista. */
  const [filtroProd, setFiltroProd] = useState<FiltroLegenda | null>(null);

  const atlas = metodo === "anppom" ? atlasAnppom : (atlasAlternativos[metodo] ?? null);
  const dados = atlas ?? atlasAnppom;

  useEffect(() => {
    loadAtlas()
      .then(setAtlasAnppom)
      .catch((e: unknown) => setError(String(e)));
    loadVinculoProjetos()
      .then(setVinculoProjetos)
      .catch(() => {}); // sem o arquivo, o filtro de vínculo só não age nos projetos
    loadProgramas()
      .then(setProgramas)
      .catch(() => {}); // localidade é um extra — sem programas.json, "tema" continua funcionando
    // Ficha (resumo, responsável, fomento) para o popup do hover — ~400 KB, em segundo
    // plano: sem ela o popup mostra o que o ponto já sabe, e melhora quando chega.
    loadFichaProjeto()
      .then(setFichas)
      .catch(() => {});
    loadEsquemaProducao()
      .then(setCfgEsquema)
      .catch(() => {}); // sem ele as marcas saem em cinza com "?" — nada some
    loadAderencia()
      .then(setAderencia)
      .catch(() => {}); // sem a matriz o modo "por aderência" simplesmente não é oferecido
  }, []);

  // Métodos alternativos (§4.2.5 item 3) só são buscados quando o usuário
  // troca pela 1ª vez — o método padrão (ANPPOM) já carrega no mount acima;
  // não faz sentido pagar o fetch de todos sempre.
  useEffect(() => {
    if (metodo === "anppom" || atlasAlternativos[metodo] || carregandoAlternativo) return;
    setCarregandoAlternativo(true);
    LOADERS_ALTERNATIVOS[metodo]()
      .then((d) => setAtlasAlternativos((atual) => ({ ...atual, [metodo]: d })))
      .catch((e: unknown) => setError(String(e)))
      .finally(() => setCarregandoAlternativo(false));
  }, [metodo, atlasAlternativos, carregandoAlternativo]);

  // Material pesado que só é necessário quando alguém abre um projeto:
  // `producoes_projeto.json` (~6,7 MB), membros, descrições e o detalhe do programa.
  const carregarMaterialDoProjeto = useCallback(
    (p: AtlasProjeto) => {
      if (!detalhes[p.sigla]) {
        loadDetalheProducao(p.sigla)
          .then((f) => setDetalhes((d) => ({ ...d, [p.sigla]: f })))
          .catch(() => {});
      }
      if (!producoesPorProjeto && !carregandoProducoes) {
        setCarregandoProducoes(true);
        loadProducoesProjeto()
          .then(setProducoesPorProjeto)
          .catch(() => setProducoesPorProjeto({}))
          .finally(() => setCarregandoProducoes(false));
      }
      if (!membrosPorProjeto) {
        loadMembrosProjeto()
          .then(setMembrosPorProjeto)
          .catch(() => setMembrosPorProjeto({}));
      }
      if (!descricoesPorProjeto) {
        loadDescricoesProjeto()
          .then(setDescricoesPorProjeto)
          .catch(() => setDescricoesPorProjeto({}));
      }
    },
    [detalhes, producoesPorProjeto, carregandoProducoes, membrosPorProjeto, descricoesPorProjeto],
  );

  /** Abre um projeto: carrega o que falta e põe o id na URL (empurrando uma
   * entrada no histórico — é o que faz o "voltar" do celular fechar a folha). */
  const selecionarProjeto = useCallback(
    (p: AtlasProjeto) => {
      setFiltroProd(null);
      carregarMaterialDoProjeto(p);
      escrever({ projeto: p.id, producao: null, painel: null }, false);
    },
    [carregarMaterialDoProjeto, escrever],
  );

  const fecharProjeto = useCallback(() => {
    setFiltroProd(null);
    escrever({ projeto: null, producao: null, painel: null }, true);
  }, [escrever]);

  /** Seleciona uma produção (no canvas ou na lista): o painel passa ao
   * detalhe dela, com "voltar" para o projeto. */
  const selecionarProducao = useCallback(
    (id: string | null) => {
      escrever({ producao: id }, id === null);
    },
    [escrever],
  );

  const abrirPainel = useCallback(
    (nome: Exclude<PainelNome, "ficha">) => {
      escrever({ painel: nome, projeto: null, producao: null }, false);
    },
    [escrever],
  );
  const fecharPainel = useCallback(() => {
    escrever({ painel: null, projeto: null, producao: null }, true);
  }, [escrever]);

  const clustersOrdenados = useMemo(
    () => (dados ? [...dados.clusters].sort((a, b) => b.n_projetos - a.n_projetos) : []),
    [dados],
  );
  const temasAtivos = clustersOrdenados.filter((c) => temasSel.has(c.cluster));

  /** Combina os três filtros possíveis — instituição, tema, subárea de 2º
   * nível — cada um é um conjunto (múltipla escolha, pedido do usuário);
   * dentro de um filtro os itens somam (OU: UFMG ou UFBA), entre filtros
   * diferentes multiplicam (E: UFMG E Educação Musical). Filtro vazio = não
   * restringe nada. */
  const limiarAlcance = alcance;
  const aderenciaPorId = useMemo(
    () => (aderencia ? new Map(aderencia.projetos.map((p) => [p.id, p.a])) : null),
    [aderencia],
  );
  /** `cluster` do método ANPPOM → posição da área em `aderencia.areas` (por nome, não por posição). */
  const areaPorCluster = useMemo(
    () =>
      aderencia && atlasAnppom
        ? new Map(atlasAnppom.clusters.map((c) => [c.cluster, aderencia.areas.indexOf(c.tema ?? "")]))
        : null,
    [aderencia, atlasAnppom],
  );
  /** A matriz é das 9 subáreas ANPPOM: só faz sentido no método ANPPOM (os outros métodos ganham
   * o seu pertencimento suave numa etapa seguinte). */
  const pesoDisponivel = metodo === "anppom" && aderenciaPorId !== null && areaPorCluster !== null;
  const pesoAtivo = pesoDisponivel && modoPeso === "aderencia";

  /** Aderência (0–100) do projeto aos grupos marcados — o maior valor entre eles (OU) —, ou `null`
   * quando o modo não está ativo ou nenhum grupo foi marcado (aí não há o que medir). */
  const pesoDe = useCallback(
    (p: AtlasProjeto): number | null => {
      if (!pesoAtivo || temasSel.size === 0 || !aderenciaPorId || !areaPorCluster) return null;
      const a = aderenciaPorId.get(p.id);
      if (!a) return 0;
      let maior = 0;
      for (const c of temasSel) {
        const k = areaPorCluster.get(c);
        if (k !== undefined && k >= 0) maior = Math.max(maior, a[k]);
      }
      return maior;
    },
    [pesoAtivo, temasSel, aderenciaPorId, areaPorCluster],
  );

  // A máscara de "outros programas" só é preciso quando se combina instituições por colaboração.
  const precisaPonte = modoInstituicao !== "ou" && siglasSel.size >= 2;
  useEffect(() => {
    if (precisaPonte && !ponteProjetos) {
      loadPonteProjetos()
        .then(setPonteProjetos)
        .catch(() => {});
    }
  }, [precisaPonte, ponteProjetos]);

  useEffect(() => {
    if (params.has("ponte")) escrever({ ponte: null }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mascaraVinculos = useMemo(
    () => (vinculoProjetos ? mascaraDeVinculos(vinculosSel, vinculoProjetos.vinculos) : 0),
    [vinculoProjetos, vinculosSel],
  );
  /** Projetos com cada vínculo, no total, para os chips do filtro. */
  const contagensVinculo = useMemo(
    () =>
      vinculoProjetos
        ? contarVinculos(
            Object.values(vinculoProjetos.por_projeto).map((ms) => ms.reduce((u, m) => u | m, 0)),
            vinculoProjetos.vinculos,
          )
        : null,
    [vinculoProjetos],
  );

  const destacadoDe = useCallback(
    (p: AtlasProjeto): boolean => {
      if (!passaInstituicoes(p.sigla, ponteProjetos?.por_projeto[p.id] ?? 0, siglasSel, modoInstituicao, ponteProjetos?.siglas ?? null)) return false;
      if (temasSel.size > 0) {
        const w = pesoDe(p);
        // por aderência: entra quem alcança o corte; discreto: quem está no grupo
        if (w !== null ? w < limiarAlcance : !temasSel.has(p.cluster)) return false;
      }
      if (subareas2Sel.size > 0 && (!p.subarea || !subareas2Sel.has(p.subarea))) return false;
      // O projeto entra se ALGUMA produção dele passa (no E, a mesma produção reúne os vínculos).
      if (mascaraVinculos !== 0 && !(vinculoProjetos?.por_projeto[p.id] ?? []).some((m) => passaVinculo(m, mascaraVinculos, modoVinculo))) return false;
      return true;
    },
    [siglasSel, temasSel, subareas2Sel, pesoDe, limiarAlcance, mascaraVinculos, modoVinculo, vinculoProjetos, modoInstituicao, ponteProjetos],
  );

  /** 0–1: o quão "vivo" pintar um ponto que passou no corte (só no modo por aderência).
   * O gradiente é relativo ao corte: aderência igual ao corte = mínimo, 100 = cor cheia. */
  const intensidadeDe = useCallback(
    (p: AtlasProjeto): number | null => {
      const w = pesoDe(p);
      if (w === null || w < limiarAlcance) return null;
      const denom = 100 - limiarAlcance;
      return denom > 0 ? Math.max(0, Math.min(1, (w - limiarAlcance) / denom)) : 1;
    },
    [pesoDe, limiarAlcance],
  );

  const algumFiltroAtivo = siglasSel.size > 0 || temasSel.size > 0 || subareas2Sel.size > 0 || vinculosSel.size > 0;
  const contagemFiltrada = dados && algumFiltroAtivo ? dados.projetos.filter(destacadoDe).length : (dados?.projetos.length ?? 0);

  function alternar<T>(set: Set<T>, valor: T): Set<T> {
    const proximo = new Set(set);
    if (proximo.has(valor)) proximo.delete(valor);
    else proximo.add(valor);
    return proximo;
  }

  function alternarSigla(sigla: string) {
    setSiglasSel((atual) => alternar(atual, sigla));
  }

  /** Desmarcar um tema também tira as subáreas de 2º nível que só existiam
   * dentro dele — senão o filtro continua ativo (o ponto some do mapa) sem
   * checkbox visível pra explicar por quê, porque a seção de subárea de 2º
   * nível só lista as dos temas marcados. */
  function alternarTema(cluster: number) {
    setTemasSel((atual) => {
      const proximo = alternar(atual, cluster);
      if (atual.has(cluster) && !proximo.has(cluster)) {
        const c = clustersOrdenados.find((x) => x.cluster === cluster);
        if (c) {
          const removidas = new Set(c.subareas);
          setSubareas2Sel((sub) => {
            const restante = new Set([...sub].filter((s) => !removidas.has(s)));
            return restante.size === sub.size ? sub : restante;
          });
        }
      }
      return proximo;
    });
  }

  function alternarSubarea2(s: string) {
    setSubareas2Sel((atual) => alternar(atual, s));
  }

  function alternarVinculo(v: string) {
    setVinculosSel((atual) => alternar(atual, v));
  }

  function limparFiltros() {
    setVinculosSel(new Set());
    setModoVinculo("ou");
    setModoInstituicao("ou");
    setSiglasSel(new Set());
    setTemasSel(new Set());
    setSubareas2Sel(new Set());
  }

  /** Trocar de método reinicia tema/subárea de 2º nível — os `cluster` de
   * cada método não têm relação entre si (ids da ANPPOM são a taxonomia
   * oficial; ids do HDBSCAN não têm significado fora da própria rodada), e
   * a subárea de 2º nível nem existe no HDBSCAN. Instituição persiste — é o
   * único filtro com o mesmo significado nos dois métodos. Fecha o painel
   * da ficha: o ponto clicado pode nem existir na posição atual do novo
   * método. */
  function mudarMetodo(m: Metodo) {
    setTemasSel(new Set());
    setSubareas2Sel(new Set());
    setFiltroProd(null);
    escrever({ metodo: m === "anppom" ? null : m, projeto: null, producao: null }, true);
  }

  function mudarModoPeso(valor: ModoPeso) {
    escrever({ peso: valor === "aderencia" ? null : valor }, true);
  }

  function mudarOrganizarPor(valor: OrganizarPor) {
    escrever({ camada: valor === "tema" ? null : valor }, true);
  }

  function mudarDimensao(valor: Dimensao) {
    // Não existe "localidade" em 3D ainda (falta a redução geográfica 3D) —
    // trocar para 3D volta ao layout temático.
    escrever(
      valor === "3d" ? { dim: "3d", camada: null } : { dim: null, camada: organizarPor === "tema" ? null : organizarPor },
      true,
    );
  }

  function mudarAgrupar(valor: AgruparLocalidade) {
    escrever({ agrupar: valor === "instituicao" ? null : valor }, true);
  }

  const instituicoes = useMemo(() => {
    if (!dados) return [];
    const contagem = new Map<string, number>();
    for (const p of dados.projetos) {
      contagem.set(p.sigla, (contagem.get(p.sigla) ?? 0) + 1);
    }
    return [...contagem.entries()]
      .map(([sigla, n]) => ({ sigla, n }))
      .sort((a, b) => b.n - a.n);
  }, [dados]);

  const siglasOrdenadasAlfabeto = useMemo(() => {
    if (!dados) return [];
    return [...new Set(dados.projetos.map((p) => p.sigla))].sort();
  }, [dados]);

  const temaPorCluster = useMemo(
    () => new Map(clustersOrdenados.map((c) => [c.cluster, c.tema])),
    [clustersOrdenados],
  );

  const esquema = useMemo(() => montarEsquema(cfgEsquema), [cfgEsquema]);

  const projetoAberto = useMemo(() => {
    if (!idProjetoUrl || !dados) return null;
    return dados.projetos.find((p) => p.id === idProjetoUrl) ?? null;
  }, [idProjetoUrl, dados]);

  // Chegou por link direto (`?projeto=`), o material pesado precisa ser
  // buscado também — não só quando o clique vem do mapa.
  useEffect(() => {
    if (projetoAberto) carregarMaterialDoProjeto(projetoAberto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetoAberto?.id]);

  const producoesAbertas: ProducaoProjeto[] | null = projetoAberto
    ? (producoesPorProjeto?.[projetoAberto.id] ?? null)
    : null;
  /** "Só o núcleo comparável" tira as demais do mapa, da legenda e da lista (padrão: todas). */
  const producoesVisiveis = useMemo(() => {
    if (!producoesAbertas) return producoesAbertas;
    const vocab = vinculoProjetos?.vinculos ?? null;
    return producoesAbertas.filter((p) => {
      if (apenasNucleo && p.classe !== "nucleo") return false;
      if (mascaraVinculos === 0 || !vocab) return true;
      let m = 0;
      for (const a of p.autores) {
        const j = a.vinculo !== null ? vocab.indexOf(a.vinculo) : -1;
        if (j >= 0) m |= 1 << j;
      }
      return passaVinculo(m, mascaraVinculos, modoVinculo);
    });
  }, [producoesAbertas, apenasNucleo, mascaraVinculos, modoVinculo, vinculoProjetos]);

  const producaoSel = idProducaoUrl;

  /** Clique/toque no mesmo ponto que já está aberto fecha; em outro, abre —
   * é o gesto do mapa ("tocar de novo no alfinete") e funciona igual nos dois
   * tamanhos de tela. */
  const alternarProjeto = useCallback(
    (p: AtlasProjeto) => {
      if (projetoAberto?.id === p.id) fecharProjeto();
      else selecionarProjeto(p);
    },
    [projetoAberto, fecharProjeto, selecionarProjeto],
  );

  const painel: PainelNome | null = projetoAberto
    ? "ficha"
    : temPainelUrl
      ? painelUrl
      : null;

  return {
    // dados
    error,
    dados,
    atlasCarregado: dados !== null,
    programas,
    fichas,
    esquema,
    detalhes,
    carregandoAlternativo,
    membrosPorProjeto,
    descricoesPorProjeto,
    carregandoProducoes,
    // camadas e método
    metodo,
    organizarPor,
    dimensao,
    agruparLocalidade,
    modo,
    setModo,
    mudarMetodo,
    modoPeso,
    mudarModoPeso,
    pesoDisponivel,
    pesoAtivo,
    aderencia,
    alcance,
    setAlcance,
    limiarAlcance,
    pesoDe,
    intensidadeDe,
    mudarOrganizarPor,
    mudarDimensao,
    mudarAgrupar,
    // filtros
    instituicoes,
    siglasOrdenadasAlfabeto,
    clustersOrdenados,
    temasAtivos,
    temaPorCluster,
    siglasSel,
    modoInstituicao,
    setModoInstituicao,
    limparInstituicoes: () => {
      setSiglasSel(new Set());
      setModoInstituicao("ou");
    },
    vinculosSel,
    modoVinculo,
    setModoVinculo,
    vinculos: vinculoProjetos?.vinculos ?? null,
    contagensVinculo,
    alternarVinculo,
    temasSel,
    subareas2Sel,
    alternarSigla,
    alternarTema,
    alternarSubarea2,
    limparFiltros,
    algumFiltroAtivo,
    contagemFiltrada,
    destacadoDe,
    // seleção
    projetoAberto,
    producoesAbertas,
    producoesVisiveis,
    producaoSel,
    selecionarProjeto,
    alternarProjeto,
    fecharProjeto,
    selecionarProducao,
    apenasNucleo,
    setApenasNucleo,
    filtroProd,
    setFiltroProd,
    // painéis
    painel,
    abrirPainel,
    fecharPainel,
  };
}
