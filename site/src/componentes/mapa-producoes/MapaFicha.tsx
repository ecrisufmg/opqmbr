import { Link } from "react-router-dom";
import type { AderenciaProducoes, AtlasProjeto, DetalheProducaoPrograma, FichaProjeto, ProducaoProjeto } from "../../dados/tipos";
import { destaquesDaProducao, linksDaProducao } from "../../dados/destaques";
import { ROTULO_CLASSE_PRODUCAO } from "../../dados/formato";
import FichaProducao from "../FichaProducao";
import Painel from "../Painel";
import { PerfilAderencia } from "../atlas/AtlasAderencia";
import { IconeGlobo, IconeProducoes, IconeSucupira } from "../Icones";

const MAX_AUTORES = 8;

/**
 * A ficha de uma produção no Mapa de produções: os **mesmos detalhes** da ficha
 * aberta ao clicar num nó de produção no Mapa de projetos (`FichaProducao`),
 * com o corpo completo quando a produção pertence a um projeto (autoria,
 * campos-chave do detalhe e o bloco do projeto) e, sem projeto, só o que a
 * produção tem. Se há projeto, um botão leva ao projeto no Mapa de projetos.
 */
export default function MapaFicha({
  aberto,
  pr,
  detalhe,
  projeto,
  tema,
  fichaProjeto,
  descricao,
  aderencia,
  perfil,
  limiar,
  onFechar,
}: {
  aberto: boolean;
  pr: ProducaoProjeto | null;
  detalhe: DetalheProducaoPrograma | null;
  projeto: AtlasProjeto | null;
  tema: string;
  fichaProjeto: FichaProjeto | null;
  descricao: string | null;
  /** Aderência às subáreas (herdada do projeto); null enquanto carrega. */
  aderencia: AderenciaProducoes | null;
  /** As aderências (0–100) desta produção, na ordem de `aderencia.areas`. */
  perfil: number[] | null;
  /** Corte do slider de alcance, para destacar as barras que o alcançam. */
  limiar: number;
  onFechar: () => void;
}) {
  if (!aberto || !pr) return null;

  const destaques = destaquesDaProducao(detalhe, pr.id_producao, 6, 300);
  const links = linksDaProducao(detalhe, pr.id_producao);
  // Produção sem projeto (ou projeto fora do modelo) fica toda em zero: mostrar
  // nove barras vazias sugeriria "aderência nula", quando é "sem estimativa".
  const temPerfil = !!perfil && perfil.some((v) => v > 0);
  const blocoAderencia =
    aderencia && perfil ? (
      <div style={{ marginTop: "0.9rem" }}>
      {temPerfil ? (
        <PerfilAderencia
          aderencia={aderencia}
          a={perfil}
          limiar={limiar}
          titulo="Aderência às áreas (herdada do projeto)"
        />
      ) : (
        <p className="atlas-tooltip-nota">
          Sem estimativa de aderência às áreas: a produção não tem projeto, e a aderência vem do projeto.
        </p>
      )}
      </div>
    ) : null;

  return (
    <Painel
      aberto
      ariaLabel={`Produção: ${pr.nome ?? ""}`}
      titulo={<strong>{pr.nome ?? "sem título registrado"}</strong>}
      onFechar={onFechar}
      acoes={
        <>
          {pr.link && (
            <a
              className="atlas-icone-acao"
              href={pr.link}
              target="_blank"
              rel="noreferrer"
              title="Abrir a página desta produção na Plataforma Sucupira"
              aria-label="Abrir na Plataforma Sucupira"
            >
              <IconeSucupira />
            </a>
          )}
          {links.map((l) => (
            <a
              key={l.url}
              className="atlas-icone-acao"
              href={l.url}
              target="_blank"
              rel="noreferrer"
              title={`${l.rotulo}: ${l.url}`}
              aria-label={`${l.rotulo} (abre em outra aba)`}
            >
              <IconeGlobo />
            </a>
          ))}
          {projeto && (
            <Link
              className="atlas-icone-acao"
              to={`/mapa-de-projetos?projeto=${projeto.id}&producao=${pr.id_producao}`}
              title="Ver esta produção no Mapa de projetos, junto do projeto"
              aria-label="Ver esta produção no Mapa de projetos"
            >
              <IconeProducoes />
            </Link>
          )}
        </>
      }
    >
      {projeto ? (
        <>
          <FichaProducao
            pr={pr}
            destaques={destaques}
            projeto={projeto}
            tema={tema}
            ficha={fichaProjeto}
            descricao={descricao}
          />
          <p style={{ margin: "0.75rem 0 0" }}>
            <Link className="chip mapa-prod-link" to={`/mapa-de-projetos?projeto=${projeto.id}`}>
              Ver o projeto no Mapa de projetos →
            </Link>
          </p>
          {blocoAderencia}
        </>
      ) : (
        <>
          <div className="atlas-tooltip-nota">
            {ROTULO_CLASSE_PRODUCAO[pr.classe] ?? pr.classe} · {pr.tipo} — {pr.subtipo}
            {pr.ano ? ` · ${pr.ano}` : ""}
          </div>
          <div className="atlas-cartao-corpo atlas-cartao-rolagem">
            {pr.autores.length > 0 && (
              <p style={{ margin: "0 0 0.35rem" }}>
                <strong>Autoria:</strong> {pr.autores.slice(0, MAX_AUTORES).map((a) => a.nome).join("; ")}
                {pr.autores.length > MAX_AUTORES ? ` e mais ${pr.autores.length - MAX_AUTORES}` : ""}
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
          </div>
          {blocoAderencia}
        </>
      )}
    </Painel>
  );
}
