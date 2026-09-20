import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadProducoesMapa, loadProducoesIndice, loadEsquemaProducao, loadAtlas, loadFichaProjeto, loadDescricoesProjeto, loadAderenciaProducoes } from "../../dados/loaders";
import type {
  ProducoesMapa,
  ProducoesIndice,
  EsquemaProducaoDados,
  Atlas,
  FichasPorProjeto,
  DescricoesPorProjeto,
  AderenciaProducoes,
} from "../../dados/tipos";
import { montarEsquema } from "../corProducao";
import { lerPonte, passaInstituicoes, type ModoInstituicao } from "../../dados/ponte";
import { contarVinculos, mascaraDeVinculos, passaVinculo, type ModoVinculo } from "../../dados/vinculos";

export type MetodoMapa = "texto" | "autoria";
export type Vinculo = "todos" | "com" | "sem";

const METODOS = ["texto", "autoria"] as const;
const PAINEIS = ["filtros", "metodo", "legenda", "sobre"] as const;

/** Corte inicial do controle de alcance (0–100), contínuo. */
const ALCANCE_INICIAL = 30;

function lerEnum<T extends string>(valor: string | null, validos: readonly T[], padrao: T): T {
  return valor !== null && (validos as readonly string[]).includes(valor) ? (valor as T) : padrao;
}

/** Sem acento e sem caixa, para busca e filtro por nome. */
export function normalizar(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * Todo o estado do Mapa de produções (`/mapa-de-producoes`), no mesmo molde do
 * `useAtlas` do Mapa de projetos: o que é de navegação mora na URL
 * (`?metodo=&producao=&projeto=&painel=`), os filtros de múltipla escolha ficam
 * em estado local.
 *
 * Padrão de filtro (§2.3 do PLANO_MAPA_PRODUCOES.md): só o **núcleo comparável**
 * entra — sem isso o mapa fica dominado por pareceres, cursos e eventos. As
 * demais classes entram por chips (`classesSel`).
 */
export function useMapaProducoes() {
  const [params, setParams] = useSearchParams();

  const metodo = lerEnum(params.get("metodo"), METODOS, "texto");
  const painelUrl = lerEnum(params.get("painel"), PAINEIS, "filtros");
  const temPainelUrl = params.has("painel");
  const idProducaoUrl = params.get("producao");
  const idProjetoUrl = params.get("projeto");
  // `?ponte=A,B` (link de "Quem trabalha com quem") só PRÉ-SELECIONA o filtro de instituição no
  // modo "Entre elas"; depois disso o filtro é o do painel e o parâmetro sai da URL.
  const ponteInicial = useMemo(() => lerPonte(params.get("ponte")), []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const [mapa, setMapa] = useState<ProducoesMapa | null>(null);
  const [indice, setIndice] = useState<ProducoesIndice | null>(null);
  const [carregandoIndice, setCarregandoIndice] = useState(false);
  const [cfgEsquema, setCfgEsquema] = useState<EsquemaProducaoDados | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Dados do Mapa de projetos, para a ficha e o tooltip mostrarem o projeto a
  // que a produção pertence (título, tema, responsável, fomento, descrição).
  const [atlas, setAtlas] = useState<Atlas | null>(null);
  const [fichas, setFichas] = useState<FichasPorProjeto | null>(null);
  const [descricoes, setDescricoes] = useState<DescricoesPorProjeto | null>(null);

  // Filtros (múltipla escolha, estado local). Padrão: ver todas as produções.
  const [siglasSel, setSiglasSel] = useState<Set<string>>(() => new Set(ponteInicial ?? []));
  // Como combinar as instituições marcadas: qualquer (OU) ou entre elas (ver `dados/ponte.ts`).
  const [modoInstituicao, setModoInstituicao] = useState<ModoInstituicao>(ponteInicial ? "entre" : "ou");
  const [tiposSel, setTiposSel] = useState<Set<string>>(() => new Set());
  const [subtiposSel, setSubtiposSel] = useState<Set<string>>(() => new Set());
  const [subareasSel, setSubareasSel] = useState<Set<string>>(() => new Set());
  const [anosSel, setAnosSel] = useState<Set<number>>(() => new Set());
  const [classesSel, setClassesSel] = useState<Set<string>>(() => new Set());
  // Vínculo dos autores com o programa (Docente, Discente…): a produção entra se
  // ao menos um autor tem um dos marcados.
  const [vinculosSel, setVinculosSel] = useState<Set<string>>(() => new Set());
  const [modoVinculo, setModoVinculo] = useState<ModoVinculo>("ou");
  const [vinculo, setVinculo] = useState<Vinculo>("todos");
  // Modo do filtro de subárea: por subárea (hard, herdada do projeto) ou por
  // aderência (soft, o quanto a produção pertence a cada subárea). Padrão:
  // aderência, como no Mapa de projetos.
  const [modoSubarea, setModoSubarea] = useState<"discreta" | "aderencia">("aderencia");
  const [aderenciaProd, setAderenciaProd] = useState<AderenciaProducoes | null>(null);
  /** Corte do alcance (0–100), contínuo, só no modo por aderência. */
  const [alcance, setAlcance] = useState(ALCANCE_INICIAL);

  useEffect(() => {
    if (params.has("ponte")) escrever({ ponte: null }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadProducoesMapa()
      .then(setMapa)
      .catch((e: unknown) => setError(String(e)));
    loadEsquemaProducao()
      .then(setCfgEsquema)
      .catch(() => {});
    // O tooltip da produção precisa do nome do projeto; o atlas e a ficha de
    // projeto são leves e vêm em segundo plano, como no Mapa de projetos.
    loadAtlas()
      .then(setAtlas)
      .catch(() => {});
    loadFichaProjeto()
      .then(setFichas)
      .catch(() => {});
  }, []);

  /** Índice (título/autor/link), carregado sob demanda: busca e ficha. */
  const carregarIndice = useCallback(() => {
    if (indice || carregandoIndice) return;
    setCarregandoIndice(true);
    loadProducoesIndice()
      .then(setIndice)
      .catch(() => {})
      .finally(() => setCarregandoIndice(false));
  }, [indice, carregandoIndice]);

  /** Descrição integral dos projetos, só quando a ficha de uma produção com projeto abre. */
  const carregarDescricoes = useCallback(() => {
    if (descricoes) return;
    loadDescricoesProjeto()
      .then(setDescricoes)
      .catch(() => {});
  }, [descricoes]);

  /** Aderência às subáreas, só quando o filtro entra no modo "por aderência". */
  const carregarAderencia = useCallback(() => {
    if (aderenciaProd) return;
    loadAderenciaProducoes()
      .then(setAderenciaProd)
      .catch(() => {});
  }, [aderenciaProd]);

  useEffect(() => {
    if (modoSubarea === "aderencia") carregarAderencia();
  }, [modoSubarea, carregarAderencia]);

  const esquema = useMemo(() => montarEsquema(cfgEsquema), [cfgEsquema]);

  const idParaLinha = useMemo(() => {
    const m = new Map<string, number>();
    if (mapa) mapa.ids.forEach((id, i) => m.set(id, i));
    return m;
  }, [mapa]);

  const idParaIndice = useMemo(() => {
    const m = new Map<string, number>();
    if (indice) indice.ids.forEach((id, i) => m.set(id, i));
    return m;
  }, [indice]);

  /** Coordenadas do método ativo. */
  const xDe = useCallback(
    (i: number): number | null => {
      if (!mapa) return null;
      if (metodo === "autoria") return mapa.aut_x[i];
      return mapa.x[i];
    },
    [mapa, metodo],
  );
  const yDe = useCallback(
    (i: number): number | null => {
      if (!mapa) return null;
      if (metodo === "autoria") return mapa.aut_y[i];
      return mapa.y[i];
    },
    [mapa, metodo],
  );

  // Subárea (ANPPOM, 1º nível) por produção, herdada do projeto a que ela
  // pertence; `null` = produção sem projeto (não tem subárea).
  const subareaPorLinha = useMemo(() => {
    if (!mapa || !atlas) return null;
    const clusterDoProjeto = new Map(atlas.projetos.map((p) => [p.id, p.cluster]));
    const temaDoCluster = new Map(atlas.clusters.map((c) => [c.cluster, c.tema ?? ""]));
    const arr = new Array<string | null>(mapa.n).fill(null);
    for (let i = 0; i < mapa.n; i++) {
      const pi = mapa.projeto[i];
      if (pi < 0) continue;
      const sub = mapa.projetos[pi];
      const c = clusterDoProjeto.get(sub);
      if (c !== undefined) arr[i] = temaDoCluster.get(c) ?? null;
    }
    return arr;
  }, [mapa, atlas]);

  /** As subáreas (1º nível) disponíveis para filtrar. */
  const subareas = useMemo(() => {
    if (!atlas) return [];
    return atlas.clusters.map((c) => c.tema ?? "").filter(Boolean);
  }, [atlas]);

  /** Máscara das categorias de vínculo marcadas (0 = filtro desligado). */
  const mascaraVinculos = useMemo(
    () => (mapa ? mascaraDeVinculos(vinculosSel, mapa.vinculos) : 0),
    [mapa, vinculosSel],
  );
  /** Produções com cada vínculo, no total (não muda com os outros filtros). */
  const contagensVinculo = useMemo(() => (mapa ? contarVinculos(mapa.vinc, mapa.vinculos) : null), [mapa]);

  /** A linha passa nos filtros? */
  const destacado = useCallback(
    (i: number): boolean => {
      if (!mapa) return false;
      if (!passaInstituicoes(mapa.siglas[mapa.sigla[i]], mapa.ponte[i], siglasSel, modoInstituicao, mapa.siglas)) return false;
      if (tiposSel.size > 0 && !tiposSel.has(mapa.tipos[mapa.tipo[i]])) return false;
      if (subtiposSel.size > 0 && !subtiposSel.has(mapa.subtipos[mapa.subtipo[i]])) return false;
      if (subareasSel.size > 0 && modoSubarea !== "aderencia") {
        const s = subareaPorLinha?.[i] ?? null;
        if (s === null || !subareasSel.has(s)) return false;
      }
      if (anosSel.size > 0 && !anosSel.has(mapa.ano[i] as number)) return false;
      if (classesSel.size > 0 && !classesSel.has(mapa.classes[mapa.classe[i]])) return false;
      if (!passaVinculo(mapa.vinc[i], mascaraVinculos, modoVinculo)) return false;
      const temProjeto = mapa.projeto[i] >= 0;
      if (vinculo === "com" && !temProjeto) return false;
      if (vinculo === "sem" && temProjeto) return false;
      return true;
    },
    [mapa, siglasSel, modoInstituicao, tiposSel, subtiposSel, subareasSel, subareaPorLinha, anosSel, classesSel, mascaraVinculos, modoVinculo, vinculo, modoSubarea],
  );

  /** Índices de linha visíveis (filtrados), na ordem do arquivo. */
  const visiveis = useMemo(() => {
    if (!mapa) return [];
    const saida: number[] = [];
    for (let i = 0; i < mapa.n; i++) if (destacado(i)) saida.push(i);
    return saida;
  }, [mapa, destacado]);

  // Índice de cada subárea no vetor de aderência, para o modo "por aderência".
  const areaIdx = useMemo(() => {
    if (!aderenciaProd) return null;
    return new Map(aderenciaProd.areas.map((a, j) => [a, j]));
  }, [aderenciaProd]);

  /** 0–1: o quanto a produção pertence às subáreas marcadas (modo "por aderência");
   * `null` fora desse modo. É o que o mapa usa para acender/esmaecer as marcas. */
  const intensidadeDe = useCallback(
    (i: number): number | null => {
      if (modoSubarea !== "aderencia" || !aderenciaProd || !areaIdx || subareasSel.size === 0) return null;
      const largura = aderenciaProd.areas.length;
      let maior = 0;
      for (const s of subareasSel) {
        const j = areaIdx.get(s);
        if (j !== undefined) maior = Math.max(maior, aderenciaProd.a[i * largura + j]);
      }
      return maior / 100;
    },
    [modoSubarea, aderenciaProd, areaIdx, subareasSel],
  );

  /** Corte atual do alcance (0–1), contínuo. */
  const limiarAderencia = alcance / 100;

  /** Quantas produções (das visíveis) passam do corte, para o resumo do controle. */
  const contagemAderencia = useMemo(() => {
    if (modoSubarea !== "aderencia" || !aderenciaProd || subareasSel.size === 0) return null;
    let n = 0;
    for (const i of visiveis) {
      const v = intensidadeDe(i);
      if (v !== null && v >= limiarAderencia) n++;
    }
    return n;
  }, [modoSubarea, aderenciaProd, subareasSel, visiveis, intensidadeDe, limiarAderencia]);

  const algumFiltroAtivo =
    siglasSel.size > 0 ||
    tiposSel.size > 0 ||
    subtiposSel.size > 0 ||
    subareasSel.size > 0 ||
    anosSel.size > 0 ||
    classesSel.size > 0 ||
    vinculosSel.size > 0 ||
    vinculo !== "todos";

  function alternar<T>(set: Set<T>, valor: T): Set<T> {
    const proximo = new Set(set);
    if (proximo.has(valor)) proximo.delete(valor);
    else proximo.add(valor);
    return proximo;
  }

  const alternarSigla = (s: string) => setSiglasSel((a) => alternar(a, s));
  const alternarTipo = (t: string) => setTiposSel((a) => alternar(a, t));
  const alternarSubtipo = (s: string) => setSubtiposSel((a) => alternar(a, s));
  const alternarSubarea = (s: string) => setSubareasSel((a) => alternar(a, s));
  const alternarAno = (n: number) => setAnosSel((a) => alternar(a, n));
  const alternarClasse = (c: string) => setClassesSel((a) => alternar(a, c));
  const alternarVinculo = (v: string) => setVinculosSel((a) => alternar(a, v));
  const limparFiltros = () => {
    setSiglasSel(new Set());
    setTiposSel(new Set());
    setSubtiposSel(new Set());
    setSubareasSel(new Set());
    setAnosSel(new Set());
    setClassesSel(new Set());
    setVinculosSel(new Set());
    setModoVinculo("ou");
    setModoInstituicao("ou");
    setVinculo("todos");
  };

  function mudarMetodo(m: MetodoMapa) {
    escrever({ metodo: m === "texto" ? null : m, producao: null }, true);
  }

  // Seleção (ficha) e o projeto em foco (`?projeto=` destaca as produções dele).
  const producaoSelId = idProducaoUrl;
  const projetoEmFoco = idProjetoUrl;

  const selecionarProducao = useCallback(
    (id: string | null) => {
      carregarIndice();
      escrever({ producao: id, painel: null }, id === null);
    },
    [escrever, carregarIndice],
  );

  const abrirPainel = useCallback(
    (nome: "filtros" | "metodo" | "legenda" | "sobre") => {
      escrever({ painel: nome, producao: null }, false);
    },
    [escrever],
  );
  const fecharPainel = useCallback(() => {
    escrever({ painel: null, producao: null }, true);
  }, [escrever]);

  const painel: "filtros" | "metodo" | "legenda" | "sobre" | "ficha" | null = producaoSelId
    ? "ficha"
    : temPainelUrl
      ? painelUrl
      : null;

  return {
    error,
    mapa,
    indice,
    carregandoIndice,
    esquema,
    // método e posição
    metodo,
    mudarMetodo,
    xDe,
    yDe,
    // filtros
    siglasSel,
    tiposSel,
    subtiposSel,
    subareasSel,
    subareas,
    subareaPorLinha,
    anosSel,
    classesSel,
    modoInstituicao,
    setModoInstituicao,
    limparInstituicoes: () => {
      setSiglasSel(new Set());
      setModoInstituicao("ou");
    },
    vinculosSel,
    modoVinculo,
    setModoVinculo,
    contagensVinculo,
    alternarVinculo,
    vinculo,
    setVinculo,
    alternarSigla,
    alternarTipo,
    alternarSubtipo,
    alternarSubarea,
    alternarAno,
    alternarClasse,
    limparFiltros,
    algumFiltroAtivo,
    destacado,
    visiveis,
    // subárea por aderência
    modoSubarea,
    setModoSubarea,
    intensidadeDe,
    aderenciaProd,
    aderenciaAtiva: modoSubarea === "aderencia" && subareasSel.size > 0 && aderenciaProd !== null,
    carregarAderencia,
    alcance,
    setAlcance,
    limiarAderencia,
    contagemAderencia,
    // seleção e painéis
    producaoSelId,
    projetoEmFoco,
    selecionarProducao,
    abrirPainel,
    fecharPainel,
    painel,
    idParaLinha,
    idParaIndice,
    carregarIndice,
    carregarDescricoes,
    atlas,
    fichas,
    descricoes,
  };
}
