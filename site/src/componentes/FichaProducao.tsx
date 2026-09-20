import { useState } from "react";
import type { AtlasProjeto, FichaProjeto, ProducaoProjeto } from "../dados/tipos";
import type { Destaque } from "../dados/destaques";
import { ROTULO_CLASSE_PRODUCAO } from "../dados/formato";
import { LinhasProjeto, metaProjeto } from "./FichaProjeto";

const MAX_AUTORES = 8;

/**
 * O corpo da ficha de uma produção: tipo e ano, autoria, os campos-chave do
 * detalhe e — abaixo — as informações do **projeto** a que ela pertence (com
 * as produções abertas o cartão do projeto sai de cena, e o que ele dizia vem
 * para cá).
 *
 * Vive separado do cartão flutuante porque as duas formas do Atlas mostram a
 * mesma produção: o **cartão arrastável** no desktop e o **painel/folha** da
 * ficha (nível "produção"). O que muda é só a moldura e as ações.
 */
export default function FichaProducao({
  pr,
  destaques,
  projeto,
  tema,
  ficha,
  descricao,
}: {
  pr: ProducaoProjeto;
  destaques: Destaque[];
  projeto: AtlasProjeto;
  tema: string;
  ficha: FichaProjeto | null;
  descricao: string | null;
}) {
  const autores = pr.autores.map((a) => a.nome);
  const [verDescricao, setVerDescricao] = useState(false);
  const textoProjeto = descricao ?? ficha?.resumo ?? null;

  return (
    <>
      <div className="atlas-tooltip-nota">
        {ROTULO_CLASSE_PRODUCAO[pr.classe] ?? pr.classe} · {pr.tipo} — {pr.subtipo}
        {pr.ano ? ` · ${pr.ano}` : ""}
      </div>

      <div className="atlas-cartao-corpo atlas-cartao-rolagem">
        {autores.length > 0 && (
          <p style={{ margin: "0 0 0.35rem" }}>
            <strong>Autoria:</strong> {autores.slice(0, MAX_AUTORES).join("; ")}
            {autores.length > MAX_AUTORES ? ` e mais ${autores.length - MAX_AUTORES}` : ""}
          </p>
        )}
        {destaques.length > 0 && (
          <dl className="cartao-destaques">
            {destaques.map((d) => (
              <div key={d.rotulo}>
                <dt>{d.rotulo}</dt>
                <dd>{d.valor}</dd>
              </div>
            ))}
          </dl>
        )}
        {destaques.length === 0 && (
          <span className="atlas-tooltip-nota">Sem campos de detalhe na Plataforma para esta produção.</span>
        )}

        {/* O projeto desta produção: o que o cartão do projeto dizia, agora aqui. */}
        <div className="cartao-projeto">
          <div className="cartao-projeto-rotulo">Projeto</div>
          <strong>{projeto.nome ?? "(sem título)"}</strong>
          <div className="atlas-tooltip-nota">{metaProjeto(projeto, ficha)}</div>
          <LinhasProjeto projeto={projeto} tema={tema} ficha={ficha} />
          {textoProjeto && (
            <>
              <button type="button" className="atlas-cartao-alterna" onClick={() => setVerDescricao((v) => !v)}>
                {verDescricao ? "recolher a descrição do projeto ▴" : "mostrar a descrição do projeto ▾"}
              </button>
              {verDescricao && <div className="cartao-projeto-descricao">{textoProjeto}</div>}
            </>
          )}
        </div>
      </div>
    </>
  );
}
