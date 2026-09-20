import { useState } from "react";
import { RotuloPPG } from "./LogoPPG";
import { estiloCategoria } from "./cicloCores";
import type { CicloVida } from "../dados/tipos";
import { pctDe } from "../dados/formato";

/**
 * Ciclo de vida dos projetos (PLANO §4.4.1–4.4.2).
 *
 * A classificação é de `analise/ciclo_vida.py` — o front só desenha o que chega
 * pronto (mesmo contrato do `nucleo.py`).
 *
 * Forma: barra 100% empilhada, uma linha por programa. Composição de um todo, com
 * programas de 12 a 93 projetos: comprimento numa escala comum lê melhor do que 19
 * waffles de tamanhos diferentes. O n de cada programa vai ao lado.
 *
 * Cor: regular (a maioria) fica cinza, para que as classes que pedem leitura
 * apareçam; as outras seis usam a paleta categórica do site, em ordem fixa. O
 * matiz do verde, do âmbar e do rosa fica abaixo de 3:1 contra a superfície, então
 * a legenda com contagens e a visão em tabela não são opcionais.
 *
 * Sem supressão de célula pequena (política de 2026-09-18): cada segmento é a
 * contagem real, e o total do programa é a soma exata dos segmentos.
 */

type Contagens = Record<string, number>;

export default function CicloVidaProjetos({ dados }: { dados: CicloVida }) {
  const [tabela, setTabela] = useState(false);
  const [ordem, setOrdem] = useState<"n" | "sigla">("n");

  const nTotal = dados.programas.reduce((s, p) => s + p.n_projetos, 0);
  const programas = [...dados.programas].sort((a, b) =>
    ordem === "n" ? b.n_projetos - a.n_projetos || a.sigla.localeCompare(b.sigla) : a.sigla.localeCompare(b.sigla),
  );

  // Categorias sem nenhum projeto no país não entram na legenda — mas são
  // nomeadas na nota abaixo, para "classe vazia" nunca passar por "classe esquecida".
  const naNacao = dados.nacional;
  const presentes = dados.categorias.filter((c) => (naNacao[c.chave] ?? 0) > 0);

  return (
    <div>
      <div className="chart-controles">
        <label>
          Ordenar por{" "}
          <select value={ordem} onChange={(e) => setOrdem(e.target.value as "n" | "sigla")}>
            <option value="n">Nº de projetos</option>
            <option value="sigla">Sigla</option>
          </select>
        </label>
        <button type="button" className="chip" aria-pressed={tabela} onClick={() => setTabela((t) => !t)}>
          {tabela ? "Ver como gráfico" : "Ver como tabela"}
        </button>
      </div>

      <div className="legenda" role="list">
        {presentes.map((c) => (
          <span key={c.chave} className="legenda-item" role="listitem" title={c.descricao}>
            <span className="legenda-marca" style={estiloCategoria(c.chave)} />
            {c.rotulo}
            <span className="legenda-n">{naNacao[c.chave]}</span>
          </span>
        ))}
      </div>

      {tabela ? (
        <TabelaCiclo dados={dados} programas={programas} />
      ) : (
        <div className="ciclo-linhas">
          <LinhaCiclo
            rotulo={<strong>Brasil</strong>}
            total={nTotal}
            contagens={dados.nacional}
            dados={dados}
            destaque
          />
          {programas.map((p) => (
            <LinhaCiclo
              key={p.sigla}
              rotulo={<RotuloPPG sigla={p.sigla} />}
              total={p.n_projetos}
              contagens={p.categorias}
              dados={dados}
            />
          ))}
        </div>
      )}

    </div>
  );
}

function LinhaCiclo({
  rotulo,
  total,
  contagens,
  dados,
  destaque = false,
}: {
  rotulo: React.ReactNode;
  total: number;
  contagens: Contagens;
  dados: CicloVida;
  destaque?: boolean;
}) {
  const resumo = dados.categorias
    .filter((c) => (contagens[c.chave] ?? 0) > 0)
    .map((c) => `${c.rotulo}: ${contagens[c.chave]}`)
    .join("; ");

  return (
    <div className={`ciclo-linha${destaque ? " destacada" : ""}`}>
      <span className="barra-rotulo">{rotulo}</span>
      <span className="barra-trilho" role="img" aria-label={`${total} projetos. ${resumo}`}>
        {dados.categorias.map((c) => {
          const n = contagens[c.chave];
          if (!n) return null;
          return (
            <span
              key={c.chave}
              className="barra-segmento"
              style={{ ...estiloCategoria(c.chave), width: `${(n / total) * 100}%` }}
              title={`${c.rotulo}: ${n} projetos (${pctDe(n, total, 0)}) — ${c.descricao}`}
            />
          );
        })}
      </span>
      <span className="ciclo-n">{total}</span>
    </div>
  );
}

function TabelaCiclo({
  dados,
  programas,
}: {
  dados: CicloVida;
  programas: CicloVida["programas"];
}) {
  const nTotal = programas.reduce((s, p) => s + p.n_projetos, 0);
  const linhas = [
    { sigla: "Brasil", n: nTotal, c: dados.nacional },
    ...programas.map((p) => ({ sigla: p.sigla, n: p.n_projetos, c: p.categorias })),
  ];
  return (
    <div className="tabela-rolavel">
      <table className="tabela-dados">
        <thead>
          <tr>
            <th>Programa</th>
            <th className="num">Projetos</th>
            {dados.categorias.map((c) => (
              <th key={c.chave} className="num" title={c.descricao}>
                {c.rotulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l) => (
            <tr key={l.sigla}>
              <td>{l.sigla === "Brasil" ? <strong>Brasil</strong> : <RotuloPPG sigla={l.sigla} />}</td>
              <td className="num forte">{l.n}</td>
              {dados.categorias.map((c) => (
                <td key={c.chave} className="num">
                  {l.c[c.chave]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** O texto de apoio do gráfico, para o balão "Como ler" da página. Vive aqui porque usa os mesmos
 * números (janela de anos, limiar do "prolífico") que o gráfico. */
export function NotasCicloVida({ dados }: { dados: CicloVida }) {
  const [ini, fim] = dados.janela;
  const vazias = dados.categorias.filter((c) => dados.nacional[c.chave] === 0);
  return (
    <>
      <h3>As sete classes</h3>
      <p>
        Cada projeto é classificado a partir do que a base registra sobre ele: se tem produções, se tem
        membros, se está em andamento e se produz acima do comum. As classes vão dos projetos vazios (sem
        produção e sem membros) aos que concentram a produção do programa. Passe o mouse, ou toque, em um
        segmento para ver a definição da classe.
      </p>
      <p>
        <strong>Demais projetos</strong> (em cinza) é a classe residual e a mais numerosa: não pertencer às demais
        não indica problema.
      </p>

      <h3>Definições</h3>
      <p>
        Aqui, <strong>produção</strong> inclui as teses e dissertações vinculadas ao projeto, além das
        produções cadastradas. <strong>Alta produção</strong> é o projeto com mais de{" "}
        {String(dados.limiar_prolifico).replace(".", ",")} produções por ano observado (percentil 90 entre
        os projetos que têm produção; os anos contam de {ini} a {fim}, a partir do início do projeto,
        porque a produção costuma sair depois do fim do projeto). <strong>Sem produção recente</strong> é o projeto em
        andamento cuja última produção tem mais de dois anos.
      </p>

      <h3>Janela parcial (barras listradas)</h3>
      <p>
        A base cobre produções de {ini} a {fim}. Um projeto sem produção que começou em 2023 ou depois, ou
        que terminou antes de {ini}, não teve oportunidade de aparecer nessa janela; por isso é mostrado
        à parte de "Sem produção". Sem essa separação, um programa de projetos recentes pareceria
        inteiramente sem produção.
      </p>

      {vazias.length > 0 && (
        <>
          <h3>Classes sem projetos</h3>
          <p>
            Nenhum projeto do país se enquadra em: {vazias.map((c) => c.rotulo).join("; ")}. É resultado
            da regra de classificação, e não erro.
          </p>
        </>
      )}

      <h3>Registro, não mérito</h3>
      <p>
        As diferenças entre programas refletem também a prática de preenchimento (vincular produções a
        projetos, manter o cadastro atualizado), e não apenas a produtividade.
      </p>
    </>
  );
}
