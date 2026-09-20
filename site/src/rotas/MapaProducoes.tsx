import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AtlasProjeto, DetalheProducaoPrograma, ProducaoProjeto } from "../dados/tipos";
import { corInstituicao } from "../dados/cores";
import { ROTULO_CLASSE_PRODUCAO } from "../dados/formato";
import { destaquesDaProducao } from "../dados/destaques";
import { loadDetalheProducao } from "../dados/loaders";
import Painel from "../componentes/Painel";
import { useTelaEstreita } from "../componentes/useMidia";
import { IconeBusca, IconeFiltro, IconeLegenda, IconeMais, IconeMenos, IconeMetodo, IconeReenquadrar, IconeSobre } from "../componentes/Icones";
import MarcaProducao from "../componentes/MarcaProducao";
import MapaCanvas, { type MapaCanvasHandle } from "../componentes/mapa-producoes/MapaCanvas";
import FaixaPonte from "../componentes/FaixaPonte";
import SeletorModoInstituicao from "../componentes/ModoInstituicao";
import FiltroVinculo from "../componentes/FiltroVinculo";
import MapaFicha from "../componentes/mapa-producoes/MapaFicha";
import MapaSobre from "../componentes/mapa-producoes/MapaSobre";
import MapaTooltip from "../componentes/mapa-producoes/MapaTooltip";
import { normalizar, useMapaProducoes, type MetodoMapa } from "../componentes/mapa-producoes/useMapaProducoes";

const NOME_METODO: Record<MetodoMapa, string> = {
  texto: "Semelhança",
  autoria: "Autoria",
};
const SELO_METODO: Record<MetodoMapa, string> = {
  texto: "embeddings do título e do detalhe, reduzidos por UMAP",
  autoria: "proximidade por autores, instituição e projeto em comum",
};
const MAX_BUSCA = 8;

export default function MapaProducoes() {
  const a = useMapaProducoes();
  const canvasRef = useRef<MapaCanvasHandle>(null);
  const estreito = useTelaEstreita();
  const [flut, setFlut] = useState<"filtros" | "metodo" | null>(null);
  const [legendaAberta, setLegendaAberta] = useState(false);
  const [busca, setBusca] = useState("");
  const [detalhes, setDetalhes] = useState<Record<string, DetalheProducaoPrograma>>({});
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const fecharFlut = useCallback(() => setFlut(null), []);

  const { mapa, indice, esquema, atlas, fichas, descricoes } = a;

  /** Carrega o detalhe de um programa, uma vez (o loader tem cache). */
  const garantirDetalhe = useCallback(
    (sigla: string | undefined) => {
      if (!sigla) return;
      setDetalhes((atual) => {
        if (atual[sigla]) return atual;
        loadDetalheProducao(sigla)
          .then((d) => setDetalhes((v) => (v[sigla] ? v : { ...v, [sigla]: d })))
          .catch(() => {});
        return atual;
      });
    },
    [],
  );

  // Carrega o detalhe do programa quando uma produção é selecionada.
  useEffect(() => {
    if (!a.producaoSelId || !mapa) return;
    const idx = a.idParaLinha.get(a.producaoSelId);
    if (idx === undefined) return;
    garantirDetalhe(mapa.siglas[mapa.sigla[idx]]);
  }, [a.producaoSelId, mapa, a.idParaLinha, garantirDetalhe]);

  // Descrição dos projetos, só quando a ficha de uma produção com projeto abre.
  useEffect(() => {
    if (a.painel === "ficha") a.carregarDescricoes();
  }, [a.painel, a.carregarDescricoes]);

  // Marca por linha: cor (instituição), borda (tipo), ícone (subtipo) — pré-computadas.
  const marcaPorLinha = useMemo(() => {
    if (!mapa || !esquema) return null;
    const cor = new Array<string>(mapa.n);
    const borda = new Array<string>(mapa.n);
    const icone = new Array<string | null>(mapa.n);
    for (let i = 0; i < mapa.n; i++) {
      const c = {
        classe: mapa.classes[mapa.classe[i]],
        tipo: mapa.tipos[mapa.tipo[i]],
        subtipo: mapa.subtipos[mapa.subtipo[i]],
      };
      const m = esquema.marca(c);
      cor[i] = corInstituicao(mapa.siglas[mapa.sigla[i]]);
      borda[i] = m.borda;
      icone[i] = m.icone;
    }
    return { cor, borda, icone };
  }, [mapa, esquema]);

  const bordaPorTipo = useMemo(() => {
    const m = new Map<string, string>();
    if (mapa && marcaPorLinha) {
      for (let i = 0; i < mapa.n; i++) {
        const t = mapa.tipos[mapa.tipo[i]];
        if (!m.has(t)) m.set(t, marcaPorLinha.borda[i]);
      }
    }
    return m;
  }, [mapa, marcaPorLinha]);

  // Projeto (AtlasProjeto) e tema por id substituto, para o tooltip e a ficha
  // reproduzirem o bloco do projeto como no Mapa de projetos.
  const projetoPorSub = useMemo(() => {
    const m = new Map<string, AtlasProjeto>();
    if (atlas) for (const p of atlas.projetos) m.set(p.id, p);
    return m;
  }, [atlas]);
  const temaPorCluster = useMemo(() => {
    const m = new Map<number, string>();
    if (atlas) for (const c of atlas.clusters) m.set(c.cluster, c.tema ?? "");
    return m;
  }, [atlas]);

  const focandoProjeto = a.projetoEmFoco !== null;
  const realceDe = useCallback(
    (i: number) => {
      if (!mapa || a.projetoEmFoco === null) return true;
      const pi = mapa.projeto[i];
      return pi >= 0 && mapa.projetos[pi] === a.projetoEmFoco;
    },
    [mapa, a.projetoEmFoco],
  );

  // Foco inicial no deep link (`?producao=`), uma vez; quem enquadra é o canvas.
  const [focoInicial, setFocoInicial] = useState<number | null>(null);
  const focadoInicialRef = useRef(false);
  useEffect(() => {
    if (focadoInicialRef.current || !mapa) return;
    focadoInicialRef.current = true;
    if (a.producaoSelId) {
      const idx = a.idParaLinha.get(a.producaoSelId);
      if (idx !== undefined) setFocoInicial(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapa]);

  // Título e autoria vêm do índice, que só carregava ao clicar ou buscar: com a
  // ficha aberta por link direto (inclusive vindo do Mapa de projetos) ficaria
  // "sem título registrado".
  const { carregarIndice } = a;
  useEffect(() => {
    if (a.producaoSelId) carregarIndice();
  }, [a.producaoSelId, carregarIndice]);

  // Busca por título/autor (o índice carrega sob demanda).
  const resultados = useMemo(() => {
    const q = normalizar(busca.trim());
    if (q.length < 2 || !indice) return [];
    const saida: Array<{ id: string; i: number }> = [];
    for (let i = 0; i < indice.ids.length; i++) {
      const alvo = [indice.titulo[i] ?? "", indice.autores[i] ?? ""].map(normalizar);
      if (alvo.some((t) => t.includes(q))) {
        saida.push({ id: indice.ids[i], i });
        if (saida.length >= MAX_BUSCA) break;
      }
    }
    return saida;
  }, [busca, indice]);

  // Abrir a ficha esconde o tooltip (o ponteiro pode continuar sobre o canvas).
  useEffect(() => {
    if (a.producaoSelId) setHover(null);
  }, [a.producaoSelId]);

  if (a.error) return <div className="error">Erro ao carregar dados: {a.error}</div>;
  if (!mapa || !marcaPorLinha) return <div className="loading">Carregando…</div>;

  const corDe = (i: number) => marcaPorLinha.cor[i];
  const bordaDe = (i: number) => marcaPorLinha.borda[i];
  const iconeDe = (i: number) => marcaPorLinha.icone[i];

  const qtdFiltros =
    a.siglasSel.size +
    a.tiposSel.size +
    a.subtiposSel.size +
    a.subareasSel.size +
    a.anosSel.size +
    a.classesSel.size +
    a.vinculosSel.size +
    (a.vinculo !== "todos" ? 1 : 0);

  const resumoFiltros = a.algumFiltroAtivo
    ? `${a.visiveis.length.toLocaleString("pt-BR")} de ${mapa.n.toLocaleString("pt-BR")} produções`
    : `${mapa.n.toLocaleString("pt-BR")} produções`;

  // --- ficha / tooltip ---------------------------------------------------
  // Depois da guarda `!mapa`, a referência é estreita para não-nula; `M` segura
  // isso dentro das funções abaixo (o TS não leva o estreitamento para closures).
  const M = mapa;
  /** Reconstrói a produção (linha `i`) como `ProducaoProjeto`, do mapa + índice. */
  function producaoDe(i: number): ProducaoProjeto {
    return {
      id_producao: M.ids[i],
      nome: indice ? indice.titulo[i] : null,
      tipo: M.tipos[M.tipo[i]],
      subtipo: M.subtipos[M.subtipo[i]],
      ano: M.ano[i],
      link: indice ? indice.link[i] : null,
      classe: M.classes[M.classe[i]],
      autores: indice && indice.autores[i]
        ? indice.autores[i].split("; ").map((nome) => ({ nome, vinculo: null }))
        : [],
    };
  }
  /** O projeto a que a linha pertence (AtlasProjeto), ou null. */
  function projetoDaLinha(i: number): AtlasProjeto | null {
    const pi = M.projeto[i];
    if (pi < 0) return null;
    return projetoPorSub.get(M.projetos[pi]) ?? null;
  }

  const linhaIdx = a.producaoSelId ? a.idParaLinha.get(a.producaoSelId) : undefined;
  const prFicha: ProducaoProjeto | null = linhaIdx !== undefined ? producaoDe(linhaIdx) : null;
  const projetoFicha = linhaIdx !== undefined ? projetoDaLinha(linhaIdx) : null;
  const temaFicha = projetoFicha ? (temaPorCluster.get(projetoFicha.cluster) ?? "—") : "—";
  const fichaProjeto = projetoFicha && fichas ? (fichas[projetoFicha.id] ?? null) : null;
  const descricaoFicha = projetoFicha && descricoes ? (descricoes[projetoFicha.id] ?? null) : null;
  // As 9 aderências da produção aberta (0–100), fatia do vetor achatado.
  const perfilFicha =
    linhaIdx !== undefined && a.aderenciaProd
      ? a.aderenciaProd.a.slice(linhaIdx * a.aderenciaProd.areas.length, (linhaIdx + 1) * a.aderenciaProd.areas.length)
      : null;

  // Hover do canvas → tooltip rico. O `hoverTimer` segura o tooltip aberto o
  // tempo de o ponteiro atravessar o vão até o link do projeto.
  function aoHover(i: number | null, x: number, y: number) {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    if (i === null) {
      setHover(null);
      return;
    }
    garantirDetalhe(M.siglas[M.sigla[i]]);
    // O título do tooltip vem do índice (sob demanda): garante que carregue no
    // primeiro mouse-over, senão o nó aparece "sem título registrado".
    a.carregarIndice();
    setHover({ i, x, y });
  }
  function aoSairDoCanvas() {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHover(null), 160);
  }
  function aoEntrarTooltip() {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }
  function aoSairTooltip() {
    setHover(null);
  }

  const hoverPr = hover !== null ? producaoDe(hover.i) : null;
  const hoverProjeto = hover !== null ? projetoDaLinha(hover.i) : null;
  const hoverSigla = hover !== null ? M.siglas[M.sigla[hover.i]] : null;

  function escolherNaBusca(id: string, i: number) {
    setBusca("");
    setFlut(null);
    a.selecionarProducao(id);
    canvasRef.current?.focarProducao(i);
  }

  const abertoTopo: "filtros" | "metodo" | null = estreito
    ? null
    : flut;

  // --- conteúdo dos painéis -------------------------------------------
  const conteudoFiltros = (
    <div className="atlas-filtros">
      {a.algumFiltroAtivo && (
        <div className="atlas-filtros-contagem">
          <button type="button" className="chip" onClick={a.limparFiltros}>
            Limpar filtros
          </button>
        </div>
      )}

      <details open className="atlas-sidebar-secao">
        <summary>Classe{a.classesSel.size > 0 ? ` (${a.classesSel.size})` : ""}</summary>
        <div className="atlas-filtros-chips">
          {mapa.classes.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip${a.classesSel.has(c) ? " ativo" : ""}`}
              aria-pressed={a.classesSel.has(c)}
              onClick={() => a.alternarClasse(c)}
            >
              {ROTULO_CLASSE_PRODUCAO[c] ?? c}
            </button>
          ))}
        </div>
        <span className="chart-nota" style={{ margin: "0.4rem 0 0" }}>
          Sem classe marcada, todas aparecem. O núcleo comparável é o recorte em que os programas
          registram de forma parecida; pareceres, cursos e eventos ficam nas demais classes.
        </span>
      </details>

      <FiltroVinculo
        vinculos={mapa.vinculos}
        sel={a.vinculosSel}
        contagens={a.contagensVinculo}
        unidade="produções"
        modo={a.modoVinculo}
        onModo={a.setModoVinculo}
        onAlternar={a.alternarVinculo}
      />

      <details open className="atlas-sidebar-secao">
        <summary>Subárea (ANPPOM){a.subareasSel.size > 0 ? ` (${a.subareasSel.size})` : ""}</summary>
        <div className="atlas-filtros-peso">
          <div className="segmented" role="group" aria-label="Como filtrar por subárea">
            <button
              type="button"
              className={a.modoSubarea === "discreta" ? "ativo" : ""}
              aria-pressed={a.modoSubarea === "discreta"}
              onClick={() => a.setModoSubarea("discreta")}
            >
              Por subárea
            </button>
            <button
              type="button"
              className={a.modoSubarea === "aderencia" ? "ativo" : ""}
              aria-pressed={a.modoSubarea === "aderencia"}
              onClick={() => a.setModoSubarea("aderencia")}
            >
              Por aderência
            </button>
          </div>
        </div>
        <div className="atlas-checkbox-lista">
          {a.subareas.map((s) => (
            <label key={s} className="atlas-checkbox">
              <input type="checkbox" checked={a.subareasSel.has(s)} onChange={() => a.alternarSubarea(s)} />
              {s}
            </label>
          ))}
        </div>
        <span className="chart-nota" style={{ margin: "0.4rem 0 0" }}>
          {a.modoSubarea === "aderencia"
            ? "Por aderência: marcar subáreas acende as produções conforme o quanto o texto delas pertence a elas, sem ocultar as demais."
            : "Por subárea: entra a produção cujo projeto pertence à subárea. Produção sem projeto não tem subárea."}
        </span>
        {a.modoSubarea === "aderencia" && a.subareasSel.size > 0 && (
          <div className="atlas-alcance" role="group" aria-label="Alcance da aderência">
            <div className="atlas-alcance-topo">
              <span className="atlas-alcance-titulo">
                Aderência a <strong>{a.subareasSel.size <= 2 ? [...a.subareasSel].join(" + ") : `${[...a.subareasSel][0]} + ${a.subareasSel.size - 1}`}</strong>
              </span>
            </div>
            <input
              className="atlas-alcance-range"
              type="range"
              min={0}
              max={100}
              step={1}
              value={a.alcance}
              onChange={(ev) => a.setAlcance(Number(ev.target.value))}
              aria-label="Alcance: corte de aderência"
              aria-valuetext={`aderência de ${a.alcance}% ou mais`}
            />
            <div className="atlas-alcance-marcas" aria-hidden="true">
              <span className={a.alcance < 1 ? "ativo" : ""}>0%</span>
              <span>100%</span>
            </div>
            <div className="atlas-alcance-resumo">
              <strong>aderência ≥ {a.alcance}%</strong> · {a.contagemAderencia ?? 0} de {a.visiveis.length}{" "}
              produções
            </div>
          </div>
        )}
      </details>

      <details open className="atlas-sidebar-secao">
        <summary>Instituição{a.siglasSel.size > 0 ? ` (${a.siglasSel.size})` : ""}</summary>
        <SeletorModoInstituicao
          modo={a.modoInstituicao}
          onModo={a.setModoInstituicao}
          qtdMarcadas={a.siglasSel.size}
          unidade="produções"
        />
        <div className="atlas-checkbox-lista">
          {mapa.siglas.map((s) => (
            <label key={s} className="atlas-checkbox">
              <input type="checkbox" checked={a.siglasSel.has(s)} onChange={() => a.alternarSigla(s)} />
              <span className="legenda-marca" style={{ background: corInstituicao(s) }} />
              {s}
            </label>
          ))}
        </div>
      </details>

      <details className="atlas-sidebar-secao">
        <summary>Tipo{a.tiposSel.size > 0 ? ` (${a.tiposSel.size})` : ""}</summary>
        <div className="atlas-checkbox-lista">
          {mapa.tipos.map((t) => (
            <label key={t} className="atlas-checkbox">
              <input type="checkbox" checked={a.tiposSel.has(t)} onChange={() => a.alternarTipo(t)} />
              <span className="legenda-marca" style={{ background: bordaPorTipo.get(t) ?? "var(--color-text-muted)" }} />
              {t}
            </label>
          ))}
        </div>
      </details>

      <details className="atlas-sidebar-secao">
        <summary>Subtipo{a.subtiposSel.size > 0 ? ` (${a.subtiposSel.size})` : ""}</summary>
        <div className="atlas-checkbox-lista">
          {mapa.subtipos.map((s) => (
            <label key={s} className="atlas-checkbox">
              <input type="checkbox" checked={a.subtiposSel.has(s)} onChange={() => a.alternarSubtipo(s)} />
              {s}
            </label>
          ))}
        </div>
      </details>

      <details className="atlas-sidebar-secao">
        <summary>Ano{a.anosSel.size > 0 ? ` (${a.anosSel.size})` : ""}</summary>
        <div className="atlas-filtros-chips">
          {(() => {
            const anos = [];
            for (let y = mapa.periodo[0]; y <= mapa.periodo[1]; y++) anos.push(y);
            return anos.map((y) => (
              <button
                key={y}
                type="button"
                className={`chip${a.anosSel.has(y) ? " ativo" : ""}`}
                aria-pressed={a.anosSel.has(y)}
                onClick={() => a.alternarAno(y)}
              >
                {y}
              </button>
            ));
          })()}
        </div>
      </details>

      <details open className="atlas-sidebar-secao">
        <summary>Vínculo com projeto</summary>
        <div className="segmented" role="group" aria-label="Vínculo com projeto">
          {(
            [
              ["todos", "Todas"],
              ["com", "Com projeto"],
              ["sem", "Sem projeto"],
            ] as const
          ).map(([v, rotulo]) => (
            <button
              key={v}
              type="button"
              className={a.vinculo === v ? "ativo" : ""}
              aria-pressed={a.vinculo === v}
              onClick={() => a.setVinculo(v)}
            >
              {rotulo}
            </button>
          ))}
        </div>
      </details>
    </div>
  );

  const conteudoMetodo = (
    <div className="atlas-metodo-conteudo">
      <div className="atlas-metodo-lista" role="radiogroup" aria-label="Como organizar as marcas">
        {(Object.keys(NOME_METODO) as MetodoMapa[]).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={a.metodo === m}
            className={`atlas-metodo-opcao${a.metodo === m ? " ativo" : ""}`}
            onClick={() => a.mudarMetodo(m)}
          >
            <span className="atlas-metodo-nome">{NOME_METODO[m]}</span>
            <span className="atlas-metodo-selo">{SELO_METODO[m]}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const conteudoLegenda = (
    <div className="atlas-legenda-corpo">
      <p className="atlas-legenda-minima">
        marca = uma produção · <strong>cor = instituição</strong> · borda = tipo · ícone = subtipo
        (com o mapa aproximado)
      </p>
      <div className="legenda">
        {mapa.siglas.map((s) => (
          <span key={s} className="legenda-item">
            <span className="legenda-marca" style={{ background: corInstituicao(s) }} />
            {s}
          </span>
        ))}
      </div>
      <p className="atlas-legenda-minima" style={{ marginTop: "0.5rem" }}>
        Borda por tipo:{" "}
        {mapa.tipos.map((t) => (
          <span key={t} className="legenda-item">
            <span className="legenda-marca" style={{ background: "var(--color-bg)", boxShadow: `inset 0 0 0 2px ${bordaPorTipo.get(t)}` }} />
            {t}
          </span>
        ))}
      </p>
    </div>
  );

  const comPainel = a.painel !== null && (estreito || a.painel === "ficha" || a.painel === "sobre");

  return (
    <div className="atlas-rota">
      <div className={`atlas-mapa${comPainel ? " com-painel" : ""}`}>
        <MapaCanvas
          ref={canvasRef}
          mapa={mapa}
          visiveis={a.visiveis}
          xDe={a.xDe}
          yDe={a.yDe}
          corDe={corDe}
          bordaDe={bordaDe}
          iconeDe={iconeDe}
          realceDe={realceDe}
          focandoProjeto={focandoProjeto}
          intensidadeDe={a.intensidadeDe}
          aderenciaAtiva={a.aderenciaAtiva}
          limiarAderencia={a.limiarAderencia}
          selecionadoId={a.producaoSelId}
          focoInicial={focoInicial}
          onSelecionar={a.selecionarProducao}
          onToqueFundo={a.fecharPainel}
          onHover={aoHover}
          onSair={aoSairDoCanvas}
        />

        {hover !== null && hoverPr && (
          <MapaTooltip
            x={hover.x}
            y={hover.y}
            pr={hoverPr}
            marca={<MarcaProducao marca={esquema.marca({ classe: hoverPr.classe, tipo: hoverPr.tipo, subtipo: hoverPr.subtipo })} sigla={hoverSigla ?? undefined} tamanho={20} />}
            destaques={destaquesDaProducao(hoverSigla ? detalhes[hoverSigla] : null, hoverPr.id_producao, 3, 150)}
            projetoNome={hoverProjeto?.nome ?? null}
            projetoSub={hoverProjeto?.id ?? null}
            onEnter={aoEntrarTooltip}
            onLeave={aoSairTooltip}
          />
        )}

        {a.modoInstituicao !== "ou" && a.siglasSel.size >= 2 && (
          <FaixaPonte siglas={[...a.siglasSel].sort()} unidade="produções" onLimpar={a.limparInstituicoes} />
        )}

        {/* Alto à direita: busca + Filtros + Método. */}
        <div className="atlas-topo">
          <div className={`atlas-topo-barra atlas-flutua${abertoTopo ? " aberto" : ""}`}>
            <div className="atlas-busca">
              <span className="atlas-busca-icone" aria-hidden="true">
                <IconeBusca tamanho={16} />
              </span>
              <input
                type="search"
                className="campo-busca"
                value={busca}
                onFocus={a.carregarIndice}
                onChange={(ev) => setBusca(ev.target.value)}
                placeholder="Buscar produção por título ou autor"
                aria-label="Buscar produção por título ou autor"
              />
              {busca && (
                <button type="button" className="atlas-busca-limpar" onClick={() => setBusca("")} aria-label="Limpar a busca">
                  ✕
                </button>
              )}
              {resultados.length > 0 && (
                <ul className="atlas-busca-lista">
                  {resultados.map((r) => (
                    <li key={r.id}>
                      <button type="button" onClick={() => escolherNaBusca(r.id, r.i)}>
                        <span className="legenda-marca" style={{ background: corDe(r.i) }} />
                        <span className="atlas-busca-titulo">{indice?.titulo[r.i] ?? r.id}</span>
                        <span className="atlas-busca-meta">
                          {indice?.autores[r.i] ?? ""}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {busca.trim().length >= 2 && resultados.length === 0 && indice && (
                <p className="atlas-busca-vazio">Nada encontrado por título ou autor.</p>
              )}
            </div>

            <button
              type="button"
              className={`atlas-topo-botao${qtdFiltros > 0 ? " com-filtro" : ""}${estreito ? (a.painel === "filtros" ? " ativo" : "") : flut === "filtros" ? " ativo" : ""}`}
              aria-expanded={estreito ? a.painel === "filtros" : flut === "filtros"}
              aria-haspopup="dialog"
              aria-label={qtdFiltros > 0 ? `Filtros (${qtdFiltros} ativos)` : "Filtros"}
              onClick={() => (estreito ? a.abrirPainel("filtros") : setFlut((v) => (v === "filtros" ? null : "filtros")))}
            >
              <IconeFiltro />
              <span className="atlas-topo-rotulo">Filtros</span>
              {qtdFiltros > 0 && <span className="atlas-topo-contador">{qtdFiltros}</span>}
            </button>

            <button
              type="button"
              className={`atlas-topo-botao${estreito ? (a.painel === "metodo" ? " ativo" : "") : flut === "metodo" ? " ativo" : ""}`}
              aria-expanded={estreito ? a.painel === "metodo" : flut === "metodo"}
              aria-haspopup="dialog"
              aria-label={`Como organizar as marcas: ${NOME_METODO[a.metodo]}`}
              onClick={() => (estreito ? a.abrirPainel("metodo") : setFlut((v) => (v === "metodo" ? null : "metodo")))}
            >
              <IconeMetodo />
              <span className="atlas-topo-rotulo">{NOME_METODO[a.metodo]}</span>
            </button>
          </div>

          {!estreito && flut === "filtros" && (
            <div className="flutuante-painel" role="dialog" aria-label="Filtrar marcas do mapa">
              <header className="flutuante-cab">
                <div>
                  <strong>Filtrar marcas do mapa</strong>
                  <div className="atlas-tooltip-nota">{resumoFiltros}</div>
                </div>
                <button type="button" className="painel-fechar" onClick={fecharFlut} aria-label="Fechar">
                  ✕
                </button>
              </header>
              {conteudoFiltros}
            </div>
          )}
          {!estreito && flut === "metodo" && (
            <div className="flutuante-painel" role="dialog" aria-label="Como organizar as marcas">
              <header className="flutuante-cab">
                <strong>Como organizar as marcas</strong>
                <button type="button" className="painel-fechar" onClick={fecharFlut} aria-label="Fechar">
                  ✕
                </button>
              </header>
              {conteudoMetodo}
            </div>
          )}
        </div>

        {/* À direita: coluna de ícones (zoom, reenquadrar, sobre). */}
        <div className="atlas-lateral">
          <div className="atlas-lateral-pilha atlas-flutua" role="toolbar" aria-label="Controles do mapa" aria-orientation="vertical">
            <button type="button" className="atlas-icone-botao so-desktop" aria-label="Aproximar" title="Aproximar" onClick={() => canvasRef.current?.zoomPor(1.5)}>
              <IconeMais />
            </button>
            <button type="button" className="atlas-icone-botao so-desktop" aria-label="Afastar" title="Afastar" onClick={() => canvasRef.current?.zoomPor(1 / 1.5)}>
              <IconeMenos />
            </button>
            <button type="button" className="atlas-icone-botao" aria-label="Reenquadrar tudo" title="Reenquadrar tudo" onClick={() => canvasRef.current?.reenquadrar()}>
              <IconeReenquadrar />
            </button>
            <button type="button" className="atlas-icone-botao" aria-label="Sobre este mapa" title="Sobre este mapa" onClick={() => a.abrirPainel("sobre")}>
              <IconeSobre />
            </button>
          </div>
        </div>

        {/* Embaixo à esquerda: legenda. */}
        <div className="atlas-legenda">
          {!estreito && legendaAberta && (
            <div className="flutuante-painel" role="dialog" aria-label="Chave do mapa">
              <header className="flutuante-cab">
                <strong>Chave do mapa</strong>
                <button type="button" className="painel-fechar" onClick={() => setLegendaAberta(false)} aria-label="Fechar">
                  ✕
                </button>
              </header>
              {conteudoLegenda}
            </div>
          )}
          <button
            type="button"
            className={`atlas-legenda-botao atlas-flutua${estreito ? (a.painel === "legenda" ? " aberto ativo" : "") : legendaAberta ? " aberto ativo" : ""}`}
            aria-expanded={estreito ? a.painel === "legenda" : legendaAberta}
            aria-haspopup="dialog"
            onClick={() => (estreito ? a.abrirPainel("legenda") : setLegendaAberta((v) => !v))}
          >
            <IconeLegenda />
            <span>Legenda</span>
          </button>
        </div>

        {/* Ficha da produção (painel lateral no desktop; a rota usa o Painel). */}
        <MapaFicha
          aberto={a.painel === "ficha"}
          pr={prFicha}
          detalhe={linhaIdx !== undefined ? (detalhes[mapa.siglas[mapa.sigla[linhaIdx]]] ?? null) : null}
          projeto={projetoFicha}
          tema={temaFicha}
          fichaProjeto={fichaProjeto}
          descricao={descricaoFicha}
          aderencia={a.aderenciaProd}
          perfil={perfilFicha}
          limiar={a.alcance}
          onFechar={a.fecharPainel}
        />

        {/* No celular, Filtros, Método, Legenda e Sobre são folhas inferiores. */}
        {estreito && (
          <>
            <Painel
              aberto={a.painel === "filtros"}
              ariaLabel="Filtrar marcas do mapa"
              titulo={
                <>
                  <strong>Filtrar marcas do mapa</strong>
                  <div className="atlas-tooltip-nota">{resumoFiltros}</div>
                </>
              }
              onFechar={a.fecharPainel}
              alturaInicial="meia"
            >
              {conteudoFiltros}
            </Painel>
            <Painel
              aberto={a.painel === "metodo"}
              ariaLabel="Como organizar as marcas"
              titulo={<strong>Como organizar as marcas</strong>}
              onFechar={a.fecharPainel}
              alturaInicial="meia"
            >
              {conteudoMetodo}
            </Painel>
            <Painel
              aberto={a.painel === "legenda"}
              ariaLabel="Chave do mapa"
              titulo={<strong>Chave do mapa</strong>}
              onFechar={a.fecharPainel}
              alturaInicial="meia"
            >
              {conteudoLegenda}
            </Painel>
          </>
        )}

        <Painel
          aberto={a.painel === "sobre"}
          ariaLabel="Sobre este mapa"
          titulo={<strong>Sobre este mapa</strong>}
          onFechar={a.fecharPainel}
          alturaInicial="cheia"
        >
          <MapaSobre metodo={a.metodo} totalProducoes={mapa.n} />
        </Painel>
      </div>
    </div>
  );
}
