import { useEffect, useState } from "react";
import { loadDetalheProducao } from "../dados/loaders";
import type { AutorProducao, DetalheProducaoPrograma } from "../dados/tipos";
import { ROTULO_CLASSE_PRODUCAO } from "../dados/formato";

/** O que as listas de produções (painel do Atlas, /sem-projeto) sabem de cada uma. */
export interface ProducaoResumo {
  id_producao: string;
  nome: string | null;
  tipo: string;
  subtipo: string;
  ano: number | null;
  link: string | null;
  classe: string;
  autores: AutorProducao[];
}

/** "(PAC) Local da Apresentação" → "Local da Apresentação". O prefixo é o tipo de
 * formulário da Plataforma (PAC = produção artístico-cultural, PTT = técnica). */
function rotuloCampo(item: string): string {
  return item.replace(/^\((PAC|PTT)\)\s*/, "");
}

function Valor({ v }: { v: string }) {
  return /^https?:\/\/\S+$/.test(v) ? (
    <a href={v} target="_blank" rel="noreferrer">
      {v}
    </a>
  ) : (
    <>{v}</>
  );
}

/**
 * Uma produção numa lista: o título abre/fecha o detalhe, que mostra a autoria com o
 * vínculo de cada um e **todos os campos preenchidos** que a Plataforma tem (DOI, ISSN,
 * evento, local, descrição, impacto, observações…). O detalhe vem de um arquivo por
 * programa, carregado só na primeira vez que alguém abre uma produção dele.
 *
 * `aberta` é controlado de fora para poder ser sincronizado com o canvas do Atlas
 * (clicar no satélite abre o item e vice-versa).
 */
export default function ProducaoItem({
  p,
  sigla,
  aberta,
  onAlternar,
  destaque = false,
  marca,
  apagado = false,
}: {
  p: ProducaoResumo;
  sigla: string;
  aberta: boolean;
  onAlternar: () => void;
  destaque?: boolean;
  /** A marca (forma + cor + tom) da produção — a mesma do satélite no canvas do Atlas. */
  marca?: React.ReactNode;
  /** Fora do grupo isolado na legenda: esmaece. */
  apagado?: boolean;
}) {
  const [frag, setFrag] = useState<DetalheProducaoPrograma | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!aberta || frag || erro) return;
    loadDetalheProducao(sigla)
      .then(setFrag)
      .catch(() => setErro(true));
  }, [aberta, frag, erro, sigla]);

  const campos = frag?.producoes[p.id_producao] ?? null;

  return (
    <li
      id={`prod-${p.id_producao}`}
      className={`producao-item${destaque ? " destaque" : ""}${apagado ? " apagado" : ""}`}
    >
      <button
        type="button"
        className="producao-titulo"
        aria-expanded={aberta}
        onClick={onAlternar}
      >
        <span className="producao-seta" aria-hidden="true">
          {aberta ? "▾" : "▸"}
        </span>
        {marca}
        {p.nome ?? "sem título registrado"}
      </button>
      <div className="atlas-tooltip-nota">
        {ROTULO_CLASSE_PRODUCAO[p.classe] ?? p.classe} · {p.tipo} — {p.subtipo}
        {p.ano ? ` · ${p.ano}` : ""}
      </div>
      {!aberta && p.autores.length > 0 && (
        <div className="atlas-tooltip-nota">Autoria: {p.autores.map((a) => a.nome).join("; ")}</div>
      )}

      {aberta && (
        <div className="producao-detalhe">
          {p.link && (
            <p style={{ margin: "0.25rem 0" }}>
              <a href={p.link} target="_blank" rel="noreferrer">
                Abrir na Plataforma Sucupira ↗
              </a>
            </p>
          )}
          {p.autores.length > 0 && (
            <div className="producao-autoria">
              <strong>Autoria</strong>
              <ul>
                {p.autores.map((a, i) => (
                  <li key={i}>
                    {a.nome}
                    {a.vinculo && <span className="atlas-tooltip-nota"> — {a.vinculo}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {erro && <p className="chart-nota">Não foi possível carregar o detalhe desta produção.</p>}
          {!erro && !frag && <p className="chart-nota">Carregando detalhe…</p>}
          {frag && campos === null && (
            <p className="chart-nota">A Plataforma não tem detalhamento registrado para esta produção.</p>
          )}
          {frag && campos && (
            <dl className="producao-campos">
              {campos.map(([i, v], k) => (
                <div key={k}>
                  <dt>{rotuloCampo(frag.itens[i])}</dt>
                  <dd>
                    <Valor v={v} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </li>
  );
}
