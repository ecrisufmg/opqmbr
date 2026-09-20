import { useEffect, useMemo, useState } from "react";
import Secao from "../componentes/Secao";
import { RotuloPPG } from "../componentes/LogoPPG";
import { loadProducoesSemProjeto, loadEsquemaProducao } from "../dados/loaders";
import type { ProducoesSemProjeto as Dados, EsquemaProducaoDados } from "../dados/tipos";
import ProducaoItem from "../componentes/ProducaoItem";
import LegendaProducoes, { combinaFiltro, type FiltroLegenda } from "../componentes/LegendaProducoes";
import MarcaProducao from "../componentes/MarcaProducao";
import { montarEsquema } from "../componentes/corProducao";
import { pctDe, ROTULO_CLASSE_PRODUCAO } from "../dados/formato";

/**
 * Produções sem projeto (PLANO §4.4.4).
 *
 * São as produções que os programas registraram na Plataforma **sem apontar para
 * nenhum projeto de pesquisa**. Até 2026-09-18 elas não apareciam em lugar nenhum
 * do site (a lista do Atlas é por projeto); com a transparência total, todas
 * saem — título, link, autoria, tipo, ano, programa.
 *
 * A taxa por programa é indicador de **preenchimento** antes de ser de pesquisa:
 * sem projeto não quer dizer sem pesquisa, e a prática de vincular varia muito.
 */

const PASSO = 50;

function semAcento(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export default function ProducoesSemProjeto() {
  const [dados, setDados] = useState<Dados | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sigla, setSigla] = useState("");
  const [classe, setClasse] = useState("");
  const [ano, setAno] = useState("");
  const [busca, setBusca] = useState("");
  const [limite, setLimite] = useState(PASSO);
  const [aberta, setAberta] = useState<string | null>(null);
  const [filtroLeg, setFiltroLeg] = useState<FiltroLegenda | null>(null);
  const [cfgEsquema, setCfgEsquema] = useState<EsquemaProducaoDados | null>(null);

  useEffect(() => {
    loadProducoesSemProjeto()
      .then(setDados)
      .catch((e: unknown) => setError(String(e)));
    loadEsquemaProducao()
      .then(setCfgEsquema)
      .catch(() => {}); // sem ele as marcas saem em cinza com "?"
  }, []);

  // Uma cadeia pesquisável por produção (título + autoria), calculada uma vez.
  const indice = useMemo(
    () =>
      (dados?.producoes ?? []).map((p) =>
        semAcento(`${p.nome ?? ""} ${p.autores.map((a) => a.nome).join(" ")}`),
      ),
    [dados],
  );

  // Forma = classe, cor + letra = subtipo — o mesmo esquema do Atlas.
  const esquema = useMemo(() => montarEsquema(cfgEsquema), [cfgEsquema]);

  const filtradas = useMemo(() => {
    if (!dados) return [];
    const termo = semAcento(busca.trim());
    return dados.producoes.filter(
      (p, i) =>
        (!sigla || p.sigla === sigla) &&
        (!classe || p.classe === classe) &&
        (!ano || String(p.ano) === ano) &&
        (!termo || indice[i].includes(termo)) &&
        combinaFiltro(esquema, p, filtroLeg),
    );
  }, [dados, indice, esquema, sigla, classe, ano, busca, filtroLeg]);

  if (error) return <div className="error">Erro ao carregar dados: {error}</div>;
  if (!dados) return <div className="loading">Carregando…</div>;

  const total = dados.resumo.reduce((s, r) => s + r.total, 0);
  const semProjeto = dados.producoes.length;
  const resumoOrdenado = [...dados.resumo]
    .filter((r) => r.total > 0)
    .sort((a, b) => b.sem_projeto / b.total - a.sem_projeto / a.total);
  const anos = [...new Set(dados.producoes.map((p) => p.ano).filter((a): a is number => a !== null))].sort(
    (a, b) => b - a,
  );
  const classes = [...new Set(dados.producoes.map((p) => p.classe))];

  function mudar<T>(set: (v: T) => void) {
    return (v: T) => {
      set(v);
      setLimite(PASSO);
    };
  }

  return (
    <div>
      <h1>Produções sem projeto</h1>
      <p className="page-subtitle">
        Produções que os programas registraram na Plataforma sem apontar para nenhum projeto de
        pesquisa. Aqui estão todas, com título, autoria e link para a página oficial.
      </p>

      <div className="headline-stats">
        <Stat valor={semProjeto.toLocaleString("pt-BR")} rotulo="produções sem projeto" />
        <Stat valor={pctDe(semProjeto, total, 1)} rotulo={`de todas as ${total.toLocaleString("pt-BR")} produções (${dados.periodo[0]}–${dados.periodo[1]})`} />
      </div>

      <Secao
        titulo="Quanto cada programa deixa sem vínculo"
        leitura="A taxa mede a prática de registro de cada programa. Um clique na linha filtra a lista abaixo."
        detalhes={
          <>
            <h3>Indicador de preenchimento</h3>
            <p>
              Produção sem projeto não significa pesquisa sem projeto: pode ser trabalho que o programa não
              vinculou, projeto que não foi cadastrado ou atividade que nunca foi de pesquisa (curso, serviço,
              evento). A taxa varia muito entre programas por causa da prática de registro.
            </p>
            <h3>Uma limitação da própria Plataforma</h3>
            <p>
              Desde 2025 a Plataforma Sucupira deixou de aceitar o cadastro de novos projetos. Programas que
              ingressaram ou renovaram o registro nesse período, como a UEPA, ficaram impedidos de vincular
              suas produções a um projeto por uma restrição do próprio sistema. Nesses casos, a taxa de
              produções sem projeto reflete essa limitação, e não um descuido no preenchimento nem a ausência
              de vínculo entre a produção e a pesquisa.
            </p>
          </>
        }
      >
      <div className="tabela-rolavel">
        <table className="tabela-dados">
          <thead>
            <tr>
              <th>Programa</th>
              <th className="num">Produções</th>
              <th className="num">Sem projeto</th>
              <th className="num">% sem projeto</th>
            </tr>
          </thead>
          <tbody>
            {resumoOrdenado.map((r) => (
              <tr
                key={r.sigla}
                className={sigla === r.sigla ? "linha-ativa" : undefined}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSigla((s) => (s === r.sigla ? "" : r.sigla));
                  setLimite(PASSO);
                }}
              >
                <td>
                  <RotuloPPG sigla={r.sigla} />
                </td>
                <td className="num">{r.total}</td>
                <td className="num forte">{r.sem_projeto}</td>
                <td className="num">{pctDe(r.sem_projeto, r.total, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Secao>

      <h2>As produções</h2>
      <div className="chart-controles">
        <label>
          Programa{" "}
          <select value={sigla} onChange={(e) => mudar(setSigla)(e.target.value)}>
            <option value="">todos</option>
            {resumoOrdenado
              .map((r) => r.sigla)
              .sort()
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
        </label>
        <label>
          Classe{" "}
          <select value={classe} onChange={(e) => mudar(setClasse)(e.target.value)}>
            <option value="">todas</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {ROTULO_CLASSE_PRODUCAO[c] ?? c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ano{" "}
          <select value={ano} onChange={(e) => mudar(setAno)(e.target.value)}>
            <option value="">todos</option>
            {anos.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label>
          Buscar{" "}
          <input
            type="search"
            className="campo-busca"
            value={busca}
            placeholder="título ou autor"
            onChange={(e) => mudar(setBusca)(e.target.value)}
          />
        </label>
      </div>

      <LegendaProducoes
        esquema={esquema}
        producoes={dados.producoes}
        filtro={filtroLeg}
        onFiltro={(f) => {
          setFiltroLeg(f);
          setLimite(PASSO);
        }}
      />

      <p className="chart-nota">
        {filtradas.length === semProjeto
          ? `${semProjeto.toLocaleString("pt-BR")} produções.`
          : `${filtradas.length.toLocaleString("pt-BR")} de ${semProjeto.toLocaleString("pt-BR")} produções.`}
      </p>

      {filtradas.length === 0 ? (
        <p className="chart-nota">Nenhuma produção com esses filtros.</p>
      ) : (
        <ul className="lista-producoes">
          {filtradas.slice(0, limite).map((p) => (
            <ProducaoItem
              key={p.id_producao}
              p={p}
              sigla={p.sigla}
              marca={<MarcaProducao marca={esquema.marca(p)} sigla={p.sigla} />}
              aberta={aberta === p.id_producao}
              destaque={aberta === p.id_producao}
              onAlternar={() => setAberta((a) => (a === p.id_producao ? null : p.id_producao))}
            />
          ))}
        </ul>
      )}

      {filtradas.length > limite && (
        <p>
          <button type="button" className="chip ativo" onClick={() => setLimite((l) => l + PASSO)}>
            Mostrar mais {Math.min(PASSO, filtradas.length - limite)}
          </button>{" "}
          <span className="chart-nota" style={{ display: "inline" }}>
            mostrando {limite} de {filtradas.length.toLocaleString("pt-BR")}
          </span>
        </p>
      )}
    </div>
  );
}

function Stat({ valor, rotulo }: { valor: string; rotulo: string }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{valor}</div>
      <div className="stat-label">{rotulo}</div>
    </div>
  );
}
