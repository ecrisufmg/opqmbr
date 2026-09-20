import type { Aderencia } from "../../dados/tipos";
import DicaToque from "../DicaToque";

const DICA_ALCANCE =
  "Aderência não é probabilidade: é o grau, na escala de A a I do autor, previsto para o par projeto × área " +
  "(rótulo por leitura + similaridade do resumo com descrições de cada área). Acima de ~35% só aparece a área " +
  "principal do projeto; a informação nova está entre 20% e 35%, onde ficam as áreas relacionadas. O corte é " +
  "contínuo, de 0 a 100, para afinar essa fronteira.";

/**
 * O controle de **alcance** do modo "por aderência": mora no painel Filtros, logo abaixo do
 * interruptor, e aparece quando há subáreas marcadas. Move o corte de aderência de forma **contínua**
 * (0–100) e diz quantos projetos acendem no corte.
 */
export default function AlcanceAderencia({
  nomes,
  aderencia,
  alcance,
  onAlcance,
  contagem,
  total,
}: {
  /** Nomes das subáreas marcadas. */
  nomes: string[];
  aderencia: Aderencia;
  /** Corte 0–100. */
  alcance: number;
  onAlcance: (v: number) => void;
  /** Projetos que passam no corte (e nos demais filtros). */
  contagem: number;
  total: number;
}) {
  const titulo = nomes.length <= 2 ? nomes.join(" + ") : `${nomes[0]} + ${nomes.length - 1}`;

  return (
    <div className="atlas-alcance" role="group" aria-label="Alcance da aderência">
      <div className="atlas-alcance-topo">
        <span className="atlas-alcance-titulo">
          Aderência a <strong>{titulo}</strong>
        </span>
        <DicaToque rotulo="Como ler a aderência" dica={DICA_ALCANCE} />
      </div>
      <input
        className="atlas-alcance-range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={alcance}
        onChange={(ev) => onAlcance(Number(ev.target.value))}
        aria-label="Alcance: corte de aderência"
        aria-valuetext={`aderência de ${alcance}% ou mais`}
      />
      <div className="atlas-alcance-marcas" aria-hidden="true">
        <span className={alcance < 1 ? "ativo" : ""}>0%</span>
        <span>100%</span>
      </div>
      <div className="atlas-alcance-resumo">
        <strong>aderência ≥ {alcance}%</strong> · {contagem} de {total} projetos
        {aderencia.validacao && (
          <>
            {" "}
            · em {aderencia.validacao.casos} casos julgados, o principal acerta em{" "}
            {Math.round(aderencia.validacao.principal * 100)}%
            <span className="atlas-alcance-base"> e a separação relevante × irrelevante em {Math.round(aderencia.validacao.relevante_irrelevante * 100)}%</span>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * O perfil de aderência de um projeto, na ficha: 9 barras, da maior para a menor. É a resposta à
 * pergunta que motivou o modo (um projeto de etnomusicologia com traço de educação musical): o
 * projeto deixa de "estar" numa área só e ganha um perfil. Sempre com o aviso de que **não é
 * probabilidade** e do que sustenta o número.
 */
export function PerfilAderencia({
  aderencia,
  a,
  limiar,
  titulo = "Aderência às áreas",
}: {
  /** `validacao` só existe na aderência dos projetos; a das produções é herdada deles. */
  aderencia: Pick<Aderencia, "areas" | "aviso"> & { validacao?: Aderencia["validacao"] };
  /** As 9 aderências (0–100), na ordem de `aderencia.areas`. */
  a: number[];
  /** Corte do alcance atual: as barras que o alcançam ganham destaque. */
  limiar: number;
  titulo?: string;
}) {
  const linhas = aderencia.areas.map((nome, k) => ({ nome, v: a[k] ?? 0 })).sort((x, y) => y.v - x.v);
  return (
    <div className="atlas-perfil">
      <div className="atlas-perfil-cab">
        <strong>{titulo}</strong>
        <DicaToque
          rotulo="O que é a aderência"
          dica={
            aderencia.validacao
              ? `${aderencia.aviso} Nos ${aderencia.validacao.casos} casos julgados, o grupo principal acertou em ${Math.round(aderencia.validacao.principal * 100)}% e a separação entre áreas relevantes e irrelevantes em ${Math.round(aderencia.validacao.relevante_irrelevante * 100)}% dos pares.`
              : aderencia.aviso
          }
        />
      </div>
      <ul className="atlas-perfil-lista">
        {linhas.map((l, i) => (
          <li key={l.nome} className={l.v >= limiar ? "acima" : ""}>
            <span className="atlas-perfil-nome">
              <span className="atlas-perfil-texto" title={l.nome}>
                {l.nome}
              </span>
              {i === 0 && <span className="atlas-perfil-tag">principal</span>}
            </span>
            <span className="atlas-perfil-barra" aria-hidden="true">
              <span style={{ width: `${Math.max(2, l.v)}%` }} />
            </span>
            <span className="atlas-perfil-valor">{l.v}%</span>
          </li>
        ))}
      </ul>
      <p className="atlas-perfil-nota">Não é probabilidade; ver "Sobre este mapa".</p>
    </div>
  );
}
