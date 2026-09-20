import { useEffect, useState, type ReactNode } from "react";
import { loadCobertura } from "../dados/loaders";
import type { Cobertura } from "../dados/tipos";
import { pct, pctDe } from "../dados/formato";
import { COMPLETA } from "../dados/edicao";
import { Link } from "react-router-dom";

const TITULOS: string[] = ["A ressalva que atravessa o site inteiro", "Escopo da base", "Cobertura da coleta", "Preenchimento dos campos", "O que não foi possível baixar", "Dupla contagem em totais nacionais", "Nota CAPES: proveniência e limites", "Estatística: o que este site não faz", "Transparência: o que é publicado", "Ícones", "Logos institucionais"].filter((t) => COMPLETA || t !== "Nota CAPES: proveniência e limites");

/**
 * Apêndice de dados.
 *
 * Os números vêm de `cobertura.json`, gerado no build a partir do banco e dos
 * CSVs de falha — não são prosa fixa. Um apêndice com contagens digitadas à mão
 * envelhece em silêncio: seria o único lugar do site que continuaria dizendo
 * "19 programas" depois de a UNICAMP entrar na base.
 */
export default function AppendicesDados() {
  const [dados, setDados] = useState<Cobertura | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [abertas, setAbertas] = useState<Set<string>>(new Set(["A ressalva que atravessa o site inteiro"]));
  const alternar = (t: string) =>
    setAbertas((a) => {
      const n = new Set(a);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });

  useEffect(() => {
    loadCobertura()
      .then(setDados)
      .catch((e: unknown) => setError(String(e)));
  }, []);

  if (error) return <div className="error">Erro ao carregar dados: {error}</div>;
  if (!dados) return <div className="loading">Carregando…</div>;

  const nProgramas = dados.contagens.find((c) => c.tabela === "programas")?.n ?? 0;
  const nProducoes = dados.contagens.find((c) => c.tabela === "producoes")?.n ?? 0;
  const totalFalhas = dados.falhas.reduce((s, f) => s + f.n, 0);
  const nucleo = dados.quadrienio.por_classe.find((c) => c.chave === "nucleo")?.n ?? 0;
  const totalQuadrienio = dados.quadrienio.por_classe.reduce((s, c) => s + c.n, 0);

  const br = (n: number) => n.toLocaleString("pt-BR");

  return (
    <div>
      <h1>Apêndice de dados</h1>
      <p className="page-subtitle">
        Cobertura, limitações conhecidas e ressalvas metodológicas. Os números desta página
        são lidos da própria base a cada compilação do site.
      </p>
      <p className="apendice-tudo">
        <button type="button" className="chip" onClick={() => setAbertas(new Set(TITULOS))}>
          Abrir tudo
        </button>{" "}
        <button type="button" className="chip" onClick={() => setAbertas(new Set())}>
          Recolher tudo
        </button>
      </p>

      <Section title="A ressalva que atravessa o site inteiro" abertas={abertas} alternar={alternar}>
        <p>
          <strong>
            Boa parte da variação entre programas é prática de preenchimento, e não prática de
            pesquisa.
          </strong>{" "}
          A Plataforma registra sob o mesmo rótulo "produção" tanto um artigo em periódico
          quanto um relatório anual de atividades, e programas diferentes usam esse espaço
          de formas muito diferentes. No quadriênio {dados.quadrienio.periodo[0]}–
          {dados.quadrienio.periodo[1]}, das {br(totalQuadrienio)} produções registradas,{" "}
          <strong>{br(nucleo)}</strong> ({pctDe(nucleo, totalQuadrienio, 0)})
          estão no núcleo comparável (artigo, livro, anais, partitura, tradução e produção
          artístico-cultural). O resto é difusão, serviço e gestão, e a proporção varia de
          39% a 83% entre os programas.
        </p>
        <p>
          Além disso, {br(dados.quadrienio.administrativos)} registros do quadriênio são{" "}
          <strong>títulos de rotina administrativa</strong> (relatório anual de atividades,
          parecer ad hoc, participação em comissão) lançados como produção. A regra que os
          identifica é fixa e versionada em <code>analise/nucleo.py</code>.
        </p>
        <p>
          Antes de ler qualquer barra de tamanho deste site, veja o painel "Antes de
          comparar volume" em <Link to="/regimes">Regimes de produção</Link>.
        </p>
      </Section>

      <Section title="Escopo da base" abertas={abertas} alternar={alternar}>
        <p>
          {nProgramas} programas <strong>acadêmicos</strong> de pós-graduação em Música
          vinculados à área de avaliação ARTES da CAPES, com dados de{" "}
          {dados.anos.primeiro}–{dados.anos.ultimo}. Os dados foram coletados pela API pública da
          Plataforma Sucupira.
        </p>
        <p>
          <strong>Lacuna de cobertura, declarada:</strong> os programas abaixo aparecem na
          Avaliação Quadrienal 2025 com nome de Música ou de prática musical e{" "}
          <strong>não estão na base</strong>. Todos são de modalidade profissional (MP/DP). A exclusão é um recorte
          do projeto, e por isso é declarada aqui.
        </p>
        <div className="tabela-rolavel">
          <table className="tabela-dados">
            <thead>
              <tr>
                <th>IES</th>
                <th>Programa</th>
                <th>Nível</th>
                {COMPLETA && <th className="num">Nota 2025</th>}
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              {dados.fora_da_base.map((p) => (
                <tr key={p.codigo_programa}>
                  <td>{p.sigla_ies}</td>
                  <td>{p.nome_programa}</td>
                  <td>{p.nivel}</td>
                  {COMPLETA && <td className="num">{p.nota_final}</td>}
                  <td>
                    <code>{p.codigo_programa}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Cobertura da coleta" abertas={abertas} alternar={alternar}>
        <div className="tabela-rolavel">
          <table className="tabela-dados">
            <thead>
              <tr>
                <th>Tabela</th>
                <th className="num">Registros</th>
              </tr>
            </thead>
            <tbody>
              {dados.contagens.map((c) => (
                <tr key={c.tabela}>
                  <td>
                    {c.rotulo} <code className="tabela-nome">({c.tabela})</code>
                  </td>
                  <td className="num">{br(c.n)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Preenchimento dos campos" abertas={abertas} alternar={alternar}>
        <p>
          Antes de ler um valor baixo como ausência do fenômeno, confira quantas produções
          têm o campo preenchido. Base: {br(nProducoes)} produções.
        </p>
        <div className="tabela-rolavel">
          <table className="tabela-dados">
            <thead>
              <tr>
                <th>Campo</th>
                <th className="num">Produções com o campo</th>
                <th className="num">% da base</th>
              </tr>
            </thead>
            <tbody>
              {dados.campos.map((c) => (
                <tr key={c.campo}>
                  <td>{c.campo}</td>
                  <td className="num">{br(c.n)}</td>
                  <td className="num">{pct(c.pct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          O campo <strong>(PAC) País</strong> só existe para produção artístico-cultural, e
          o valor vem sem normalização: "Brasil", "BRASIL", "Brasil." e "-" convivem. O
          índice de internacionalização deste site normaliza antes de contar; qualquer
          contagem ingênua sai errada para mais.
        </p>
        <p>
          O campo <strong>agência</strong> (<code>projeto_financiador</code>) concatena o
          nome da agência ao do programa de fomento sem separador. Precisa de limpeza antes
          de virar gráfico, e por isso o corte publicado hoje é por esfera (federal,
          estadual ou da própria IES).
        </p>
      </Section>

      <Section title="O que não foi possível baixar" abertas={abertas} alternar={alternar}>
        <p>
          {totalFalhas} requisições falharam de forma permanente. A distinção entre "não
          existe" e "não foi possível baixar" é registrada por motivo; sem ela, uma célula
          vazia seria ambígua.
        </p>
        {dados.falhas.map((f) => (
          <div key={f.arquivo}>
            <p>
              <strong>{f.etapa}</strong> (<code>sucupira_dados/csv/{f.arquivo}</code>):{" "}
              {f.n} registros.
            </p>
            <ul>
              {f.por_motivo.map((m) => (
                <li key={m.motivo}>
                  {m.motivo}: <strong>{m.n}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p>
          Os arquivos de falha não são publicados aqui porque contêm identificadores internos
          e URLs com parâmetros de consulta. Certos registros derrubam a API com
          erro HTTP 500 de forma determinística, e o erro derruba a página inteira; o coletor
          subdivide a página até isolar o registro problemático, o que recuperou cerca de
          5.900 produções.
        </p>
      </Section>

      <Section title="Dupla contagem em totais nacionais" abertas={abertas} alternar={alternar}>
        <p>
          {dados.obras_em_mais_de_um_programa} produções (mesmo título normalizado, mesmo ano)
          foram reportadas por mais de um programa, com identificadores diferentes,
          tipicamente em anais de congresso. Consequências:
        </p>
        <ul>
          <li>
            Os totais <strong>nacionais</strong> são deduplicados por título normalizado e
            ano.
          </li>
          <li>
            Os totais <strong>por programa</strong> mantêm os registros originais: cada
            programa registrou legitimamente a sua participação.
          </li>
          <li>A diferença é indicada em cada gráfico que soma o país.</li>
        </ul>
        <p>
          Pelo mesmo motivo, coautoria <em>entre</em> programas não existe por construção
          nesta base: cada produção pertence a exatamente um programa. A colaboração
          interinstitucional é medida por pessoas que atuam em mais de um programa, uma
          medida diferente, rotulada como tal em <Link to="/colaboracao">Quem trabalha com quem</Link>.
        </p>
      </Section>

      {COMPLETA && (
        <Section title="Nota CAPES: proveniência e limites" abertas={abertas} alternar={alternar}>
          <p>
            A nota exibida vem da planilha oficial da Avaliação Quadrienal 2025 (publicada em
            27/05/2026), tabela <code>avaliacao_quadrienal_2025</code>. O campo{" "}
            <code>situacao_atual</code> da API não é usado: coincide hoje com a nota oficial, mas é uma
            imagem viva, sem data nem proveniência.
          </p>
          <p>
            Três programas (<strong>UFSJ, UNB e
            UNIRIO</strong>) foram à reconsideração (CTC-ES 241) e tiveram a nota mantida; isso não existe na API. UFG: programa
            em implantação, nunca avaliado ("A" não é comparável a nota numérica). UEPA:
            primeira avaliação em 2025, sem nota anterior.
          </p>
          <p>
            A nota de 2025 avalia o quadriênio <strong>2021–2024</strong>; a anterior avalia
            2017–2020. Para relacionar produção e nota nova, use apenas 2021–2024.
          </p>
        </Section>
      )}

      <Section title="Estatística: o que este site não faz" abertas={abertas} alternar={alternar}>
        <ul>
          <li>
            <strong>Nada de p-valor sobre os 20 programas.</strong> Correlação com{COMPLETA ? " nota, com" : ""}
            região ou com tamanho aparece como coeficiente e gráfico, e não como
            "significativa": são apenas 20 programas.
          </li>
          <li>
            <strong>Nada de extrapolação de Música para "as Artes".</strong> O recorte é
            o censo de uma área, e não uma amostra.
          </li>
          <li>
            Comparações entre programas são <strong>descritivas</strong>. A variação de
            prática de preenchimento é grande o bastante para engolir qualquer efeito
            pequeno.
          </li>
        </ul>
      </Section>

      <Section title="Transparência: o que é publicado" abertas={abertas} alternar={alternar}>
        <p>
          Este site adota <strong>transparência total</strong> (decisão do autor, em
          18 de setembro de 2026): tudo o que ele mostra vem da Plataforma Sucupira, que já publica esses
          dados. Aparecem, portanto, os <strong>nomes de pessoas</strong> (autores de cada
          produção e membros de cada projeto), o <strong>título e a descrição de cada
          projeto</strong> e o título e o link de <strong>toda produção</strong>, inclusive as
          que não estão ligadas a nenhum projeto.
        </p>
        <p>
          Nenhuma contagem é suprimida por ser pequena: cada número é o que a base tem, e zero
          é zero. Os identificadores internos da Plataforma (<code>id_pessoa</code>,{" "}
          <code>id_projeto</code>) não são republicados: o site usa identificadores próprios.
        </p>
        <p>
          Os dados são <strong>como os programas os declararam</strong> à Plataforma, com as
          lacunas, grafias e escolhas de preenchimento que isso implica (é o tema de boa parte
          deste site). Este projeto os organiza e não os edita; um erro num nome, num título ou
          num vínculo tem origem no registro do programa.
        </p>
      </Section>

      <Section title="Ícones" abertas={abertas} alternar={alternar}>
        <p>
          Os ícones dos subtipos de produção (artigo, livro, música, apresentação de trabalho…) são
          do <strong>Material Design Icons</strong> (Pictogrammers), licença Apache-2.0, e foram
          escolhidos entre os mais de 7 mil da biblioteca. O logotipo da Plataforma Sucupira, nos
          cartões, é o da própria Plataforma; os ícones de lista e de globo são desenhos deste
          projeto.
        </p>
      </Section>

      <Section title="Logos institucionais" abertas={abertas} alternar={alternar}>
        <p>
          Os logos são marcas registradas das respectivas instituições, reproduzidos apenas
          para identificação editorial de cada programa. Não há vínculo, patrocínio ou
          endosso. As marcas aparecem na forma original, sem recorte nem recoloração, e a
          sigla acompanha sempre o logo, de modo que nenhuma informação depende de reconhecer a imagem.
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  abertas,
  alternar,
  children,
}: {
  title: string;
  abertas: Set<string>;
  alternar: (t: string) => void;
  children: ReactNode;
}) {
  return (
    <details
      className="apendice-sec"
      open={abertas.has(title)}
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open !== abertas.has(title)) alternar(title);
      }}
    >
      <summary>{title}</summary>
      <div className="apendice-corpo">{children}</div>
    </details>
  );
}
