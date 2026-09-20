import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RotuloPPG } from "../componentes/LogoPPG";
import CicloVidaProjetos, { NotasCicloVida } from "../componentes/CicloVidaProjetos";
import DicaToque from "../componentes/DicaToque";
import GanttProjetos, { NotasGantt } from "../componentes/GanttProjetos";
import PrimeiraObra, { NotasPrimeiraProducao } from "../componentes/PrimeiraObra";
import Secao from "../componentes/Secao";
import { loadProjetos } from "../dados/loaders";
import type { EsferaFomento, Projetos, ProjetosPrograma } from "../dados/tipos";
import { pct, pctDe } from "../dados/formato";

/**
 * Projetos e financiamento (PLANO §4.1b.2 e §4.1b.3).
 *
 * Duas perguntas: quanto da produção está amarrada a um projeto — indicador de
 * preenchimento antes de ser de pesquisa — e de onde vem o dinheiro.
 *
 * O corte por **esfera** (federal / estadual / própria IES / internacional) é o
 * que a base sustenta sem limpeza. O par projeto↔agência não é publicado (§3.2),
 * e nome de projeto não existe em nenhum JSON público.
 */
export default function ProjetosFinanciamento() {
  const [dados, setDados] = useState<Projetos | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjetos()
      .then(setDados)
      .catch((e: unknown) => setError(String(e)));
  }, []);

  if (error) return <div className="error">Erro ao carregar dados: {error}</div>;
  if (!dados) return <div className="loading">Carregando…</div>;

  const pctFinanciados = (dados.n_financiados / dados.n_projetos) * 100;
  const orfaos = dados.distribuicao_producoes.find((f) => f.faixa === "0")?.n_projetos ?? 0;

  const { mediana, mediana_entre_os_com_producao: medianaCom, maximo } = dados.producoes_por_projeto;
  const fmt = (v: number | null) => (v === null ? "—" : String(v).replace(".", ","));
  const semProjeto = dados.programas.filter((p) => p.n_projetos === 0).map((p) => p.sigla);
  const curva = dados.ciclo_vida.primeira_obra.nacional.curva;
  const maiorNatureza = Math.max(...dados.naturezas.map((n) => n.n));

  const leituraPrimeira = (() => {
    if (curva.length === 0) return "Fração dos projetos que já produziram, segundo o tempo desde o início.";
    const f = (v: number) => pct(v * 100, 0);
    const ult = curva[curva.length - 1];
    return `Entre os projetos iniciados a partir de 2020, ${f(curva[0].acumulada)} produziram já no ano de início${
      curva.length > 1 ? ` e ${f(ult.acumulada)} em até ${ult.k} anos` : ""
    }.`;
  })();

  return (
    <div>
      <h1>Projetos e financiamento</h1>
      <p className="page-subtitle">
        Os {dados.n_projetos} projetos de pesquisa que os programas declararam à Plataforma Sucupira: quem os
        financia, quanto da produção está vinculada a eles e como se distribuem no tempo.
      </p>

      <div className="headline-stats">
        <Stat valor={dados.n_projetos.toLocaleString("pt-BR")} rotulo="projetos declarados" />
        <Stat
          valor={`${pct(pctFinanciados, 0)}`}
          rotulo={`com financiador registrado (${dados.n_financiados})`}
        />
        <Stat valor={orfaos.toLocaleString("pt-BR")} rotulo="projetos sem produção vinculada" />
        <Stat
          valor={String(dados.agencias.filter((a) => a.n_projetos !== null).length)}
          rotulo="agências com 5 ou mais projetos"
        />
      </div>

      <Secao
        titulo="De onde vem o financiamento"
        leitura="Número de projetos por agência financiadora, com as agências agrupadas por esfera."
        detalhes={
          <>
            <h3>O que a base registra</h3>
            <p>
              A Plataforma informa quem financia cada projeto, mas não o valor. A leitura possível é por
              agência e por esfera, não por volume de recursos: uma bolsa de iniciação científica e um
              auxílio temático contam igualmente.
            </p>
            <h3>Soma maior que o total</h3>
            <p>
              Um projeto pode ter mais de uma agência e é contado em cada uma delas. Por isso a soma por
              agência supera o número de projetos financiados.
            </p>
            <h3>Financiamento não declarado</h3>
            <p>
              Um projeto sem financiador na base pode não ter financiamento ou ter o campo em branco; não há
              como distinguir os dois casos.
            </p>
            <h3>Projeto a projeto</h3>
            <p>
              Aqui o agregado é por programa e por agência. Quem financia cada projeto, de que esfera e desde
              quando, aparece na ficha do projeto no <Link to="/mapa-de-projetos">Mapa de projetos</Link>.
            </p>
          </>
        }
      >
        <Agencias dados={dados} />
      </Secao>

      <Secao
        titulo="Cada programa e as suas fontes"
        leitura="Financiamento, projetos sem produção e vinculação da produção a projetos, por programa. O “?” de cada coluna traz a definição."
        detalhes={
          <>
            <h3>Células vazias</h3>
            <p>
              Uma célula vazia indica que o programa não tem projetos financiados por aquela esfera.
              {semProjeto.length > 0 && ` Programas sem nenhum projeto declarado: ${semProjeto.join(", ")}.`}
            </p>
            <h3>Vinculação da produção</h3>
            <p>
              "% da produção com projeto" é um indicador de preenchimento do cadastro: informa quanto do que
              o programa registrou está vinculado a algum projeto. Não permite afirmar que a produção
              restante tenha sido realizada sem projeto.
            </p>
          </>
        }
      >
        <TabelaProgramas dados={dados} />
      </Secao>

      <Secao
        titulo="Quantas produções cada projeto reúne"
        leitura={`A mediana é de ${fmt(mediana)} produções por projeto (${fmt(medianaCom)} entre os que têm alguma); o máximo é ${fmt(maximo)}.`}
        detalhes={
          <>
            <h3>Faixas e mediana</h3>
            <p>
              As faixas crescem em progressão (1, 2, 3 a 4, 5 a 9, 10 a 19…) porque a distribuição é muito
              assimétrica: poucos projetos concentram muitas produções. Cada barra conta os projetos da
              faixa, de modo que as faixas mais largas tendem a reunir mais projetos. Reporta-se a mediana, e
              não a média, porque a média seria puxada pelos poucos projetos com muitas produções.
            </p>
            <h3>Projetos sem produção vinculada</h3>
            <p>
              Um projeto sem produção vinculada não é necessariamente um projeto fracassado: pode ser recém-iniciado, ter tido a produção registrada sem o vínculo ou, de fato, não ter gerado registro. A
              base não distingue os três casos, e a proporção varia tanto entre programas que não deve ser
              lida como produtividade.
            </p>
          </>
        }
      >
        <Distribuicao dados={dados} />
      </Secao>

      <Secao
        titulo="O ciclo de vida dos projetos"
        leitura="Cada projeto é classificado em uma de sete classes, conforme tenha produções, membros e atividade recente. As barras listradas indicam projetos que ainda não tiveram tempo de produzir."
        detalhes={<NotasCicloVida dados={dados.ciclo_vida} />}
      >
        <CicloVidaProjetos dados={dados.ciclo_vida} />
      </Secao>

      <Secao
        titulo="Cada projeto no tempo"
        leitura="Escolha um programa: cada barra é um projeto, do início ao fim, com uma marca em cada ano em que houve produção registrada."
        detalhes={<NotasGantt janela={dados.ciclo_vida.janela} />}
      >
        <GanttProjetos
          categorias={dados.ciclo_vida.categorias}
          siglas={[...dados.ciclo_vida.programas]
            .filter((p) => p.n_projetos > 0)
            .sort((a, b) => b.n_projetos - a.n_projetos)
            .map((p) => p.sigla)}
        />
      </Secao>

      <Secao
        titulo="Quanto tempo até a primeira produção"
        leitura={leituraPrimeira}
        detalhes={<NotasPrimeiraProducao dados={dados.ciclo_vida.primeira_obra} />}
      >
        <PrimeiraObra dados={dados.ciclo_vida.primeira_obra} />
      </Secao>

      <Secao
        titulo="Natureza declarada"
        leitura="Natureza atribuída pelos programas a cada projeto no cadastro."
      >
        <div className="barras-empilhadas">
          {dados.naturezas.map((n) => (
            <div key={n.natureza} className="barra-linha">
              <span className="barra-rotulo">{n.natureza}</span>
              <span className="barra-trilho">
                <span
                  className="barra-segmento"
                  style={{ width: `${(n.n / maiorNatureza) * 100}%`, background: "var(--seq-500)" }}
                  title={`${n.n} projetos (${pctDe(n.n, dados.n_projetos)})`}
                />
              </span>
              <span className="barra-valor">
                <span className="forte">{n.n.toLocaleString("pt-BR")}</span>
                <span>{pctDe(n.n, dados.n_projetos, 0)}</span>
              </span>
            </div>
          ))}
        </div>
      </Secao>
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

/* A esfera é ordinal na leitura — de "longe" (federal) a "de casa" (a própria
   IES) —, então rampa sequencial em vez de quatro matizes independentes. */
const COR_ESFERA: Record<EsferaFomento, string> = {
  federal: "var(--seq-600)",
  estadual: "var(--seq-400)",
  propria_ies: "var(--seq-200)",
  internacional: "var(--serie-2)",
  outra: "var(--color-suppressed)",
};

function Agencias({ dados }: { dados: Projetos }) {
  const max = Math.max(...dados.agencias.map((a) => a.n_projetos ?? 0));
  const rotulo = new Map(dados.esferas.map((e) => [e.chave, e.rotulo]));

  return (
    <div>
      <div className="barras-empilhadas">
        {dados.agencias.map((a) => (
          <div key={a.agencia} className="barra-linha">
            <span className="barra-rotulo">{a.agencia}</span>
            <span className="barra-trilho">
              <span
                className="barra-segmento"
                style={{
                  width: a.n_projetos === null ? "3px" : `${(a.n_projetos / max) * 100}%`,
                  background: a.n_projetos === null ? "var(--color-suppressed)" : COR_ESFERA[a.esfera],
                }}
                title={
                  a.n_projetos === null
                    ? `${a.agencia} (${rotulo.get(a.esfera) ?? a.esfera}): menos de 5 projetos, nº suprimido`
                    : `${a.agencia} (${rotulo.get(a.esfera) ?? a.esfera}): ${a.n_projetos} projetos`
                }
              />
            </span>
            <span className="barra-valor">
              <span className="forte">{a.n_projetos ?? "—"}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="legenda">
        {dados.esferas
          .filter((e) => e.chave !== "outra")
          .map((e) => (
            <span key={e.chave} className="legenda-item">
              <span className="legenda-marca" style={{ background: COR_ESFERA[e.chave] }} />
              {e.rotulo}
            </span>
          ))}
      </div>
    </div>
  );
}

type ChaveOrdem = "n_projetos" | "pct_financiados" | "pct_orfaos" | "pct_producao_com_projeto";

const COLUNAS: Array<{ chave: ChaveOrdem; rotulo: string; dica: string }> = [
  { chave: "n_projetos", rotulo: "Projetos", dica: "Projetos declarados pelo programa, em qualquer ano." },
  { chave: "pct_financiados", rotulo: "% com fomento", dica: "Projetos com ao menos uma agência financiadora registrada." },
  { chave: "pct_orfaos", rotulo: "% sem produção", dica: "Projetos sem nenhuma produção vinculada." },
  {
    chave: "pct_producao_com_projeto",
    rotulo: "% da produção com projeto",
    dica: "Produções do quadriênio que apontam para algum projeto. Indica o preenchimento do cadastro, não a ausência de pesquisa sem projeto.",
  },
];

function TabelaProgramas({ dados }: { dados: Projetos }) {
  const [ordem, setOrdem] = useState<ChaveOrdem>("pct_financiados");
  const [desc, setDesc] = useState(true);

  const linhas = dados.programas
    .filter((p) => p.n_projetos > 0)
    .sort((a, b) => {
      const d = (b[ordem] ?? -1) - (a[ordem] ?? -1);
      return desc ? d : -d;
    });

  return (
    <div>
      <div className="chart-controles">
        <label>
          Ordenar por{" "}
          <select value={ordem} onChange={(e) => setOrdem(e.target.value as ChaveOrdem)}>
            {COLUNAS.map((c) => (
              <option key={c.chave} value={c.chave}>
                {c.rotulo}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="chip ativo" onClick={() => setDesc((d) => !d)}>
          {desc ? "▼ maior primeiro" : "▲ menor primeiro"}
        </button>
      </div>

      <div className="tabela-rolavel">
        <table className="tabela-dados">
          <thead>
            <tr>
              <th>Programa</th>
              {COLUNAS.map((c) => (
                <th key={c.chave} className="num">
                  {c.rotulo}
                  <DicaToque dica={c.dica} rotulo={`Definição: ${c.rotulo}`} />
                </th>
              ))}
              {dados.esferas
                .filter((e) => e.chave !== "outra")
                .map((e) => (
                  <th key={e.chave} className="num">
                    {e.rotulo}
                    <DicaToque
                      dica={`Projetos com fomento de esfera ${e.rotulo.toLowerCase()}. Um projeto com duas agências conta nas duas esferas, por isso as colunas de esfera não somam o total de projetos.`}
                      rotulo={`Definição: esfera ${e.rotulo}`}
                    />
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((p) => (
              <tr key={p.sigla}>
                <td>
                  <RotuloPPG sigla={p.sigla} />
                </td>
                <td className="num forte">{p.n_projetos}</td>
                <td className="num">{pct(p.pct_financiados, 0)}</td>
                <td className="num">{pct(p.pct_orfaos, 0)}</td>
                <td className="num">{pct(p.pct_producao_com_projeto, 0)}</td>
                {dados.esferas
                  .filter((e) => e.chave !== "outra")
                  .map((e) => {
                    const v = p[`esfera_${e.chave}` as keyof ProjetosPrograma] as number | null;
                    return v === null ? (
                      <td
                        key={e.chave}
                        className="num celula-suprimida"
                        title="suprimido: menos de 5 projetos"
                      />
                    ) : (
                      <td key={e.chave} className="num">
                        {v}
                      </td>
                    );
                  })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function Distribuicao({ dados }: { dados: Projetos }) {
  const total = dados.distribuicao_producoes.reduce((s, f) => s + f.n_projetos, 0);
  const max = Math.max(...dados.distribuicao_producoes.map((f) => f.n_projetos));

  const NOTA = (faixa: string): string =>
    faixa === "0" ? "Nenhuma produção aponta para eles" : `${faixa} produções vinculadas`;

  return (
    <div>
      <div className="barras-empilhadas">
        {dados.distribuicao_producoes.map((f) => (
          <div key={f.faixa} className="barra-linha">
            <span className="barra-rotulo">{f.faixa} produções</span>
            <span className="barra-trilho">
              <span
                className="barra-segmento"
                style={{
                  width: `${(f.n_projetos / max) * 100}%`,
                  background: f.faixa === "0" ? "var(--color-suppressed)" : "var(--seq-500)",
                }}
                title={`${f.n_projetos} projetos (${pctDe(f.n_projetos, total)}): ${NOTA(f.faixa)}`}
              />
            </span>
            <span className="barra-valor">
              <span className="forte">{f.n_projetos}</span>
              <span>{pctDe(f.n_projetos, total, 0)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
