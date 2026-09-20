import { useRef } from "react";
import { IconeCamadas, IconeMais, IconeMenos, IconeReenquadrar, IconeSobre, IconeTabela } from "../Icones";
import { useFechaFora } from "../useMidia";
import type { AgruparLocalidade, Dimensao, OrganizarPor } from "./useAtlas";

/**
 * O conteúdo do painel **Camadas** — o que no Google Maps é "mapa/satélite":
 * como os pontos se posicionam (tema ou localidade, com os três níveis de
 * agrupamento geográfico) e 2D/3D. No desktop abre ao lado da coluna de
 * ícones; no celular, numa folha inferior. O mesmo conteúdo nos dois.
 *
 * Zoom e "reenquadrar" moram na coluna de ícones (`AtlasBarraLateral`); o
 * seletor "Tabela abaixo do mapa" saiu daqui — não mexia em nada do que se vê
 * no mapa — e foi para o cabeçalho das próprias tabelas.
 */
export function AtlasCamadasBotoes({
  organizarPor,
  dimensao,
  agruparLocalidade,
  onOrganizar,
  onDimensao,
  onAgrupar,
}: {
  organizarPor: OrganizarPor;
  dimensao: Dimensao;
  agruparLocalidade: AgruparLocalidade;
  onOrganizar: (v: OrganizarPor) => void;
  onDimensao: (v: Dimensao) => void;
  onAgrupar: (v: AgruparLocalidade) => void;
}) {
  return (
    <div className="atlas-camadas-conteudo">
      <div className="atlas-camada-grupo">
        <span className="atlas-camada-rotulo" id="rot-camada">Posição dos pontos</span>
        <div className="segmented" role="group" aria-labelledby="rot-camada">
          <button
            type="button"
            className={organizarPor === "tema" ? "ativo" : ""}
            aria-pressed={organizarPor === "tema"}
            onClick={() => onOrganizar("tema")}
          >
            Tema
          </button>
          <button
            type="button"
            className={organizarPor === "localidade" ? "ativo" : ""}
            aria-pressed={organizarPor === "localidade"}
            disabled={dimensao === "3d"}
            onClick={() => onOrganizar("localidade")}
          >
            Localidade
          </button>
        </div>
        {dimensao === "3d" && (
          <span className="chart-nota" style={{ margin: 0 }}>
            Localidade só existe em 2D — a geografia em 3D ainda não foi feita (ver o plano).
          </span>
        )}
      </div>

      {organizarPor === "localidade" && dimensao === "2d" && (
        <div className="atlas-camada-grupo">
          <span className="atlas-camada-rotulo" id="rot-agrupar">Agrupar geografia por</span>
          <div className="segmented" role="group" aria-labelledby="rot-agrupar">
            {(["regiao", "uf", "instituicao"] as const).map((nivel) => (
              <button
                key={nivel}
                type="button"
                className={agruparLocalidade === nivel ? "ativo" : ""}
                aria-pressed={agruparLocalidade === nivel}
                onClick={() => onAgrupar(nivel)}
              >
                {nivel === "regiao" ? "Região" : nivel === "uf" ? "UF" : "Instituição"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="atlas-camada-grupo">
        <span className="atlas-camada-rotulo" id="rot-dim">Dimensão</span>
        <div className="segmented" role="group" aria-labelledby="rot-dim">
          <button
            type="button"
            className={dimensao === "2d" ? "ativo" : ""}
            aria-pressed={dimensao === "2d"}
            onClick={() => onDimensao("2d")}
          >
            2D
          </button>
          <button
            type="button"
            className={dimensao === "3d" ? "ativo" : ""}
            aria-pressed={dimensao === "3d"}
            disabled={organizarPor === "localidade"}
            onClick={() => onDimensao("3d")}
          >
            3D
          </button>
        </div>
        {organizarPor === "localidade" && (
          <span className="chart-nota" style={{ margin: 0 }}>
            3D só existe com a posição por Tema — a geografia em 3D ainda não existe. Volte a Tema para usar o 3D.
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * A coluna de ícones do canto direito: **Camadas** (que expande o painel ao
 * lado), zoom, reenquadrar, tabelas e "Sobre este mapa". Translúcida em
 * repouso, opaca com o mouse — o mapa é o protagonista.
 *
 * No celular o zoom sai da coluna (a pinça faz o serviço; classe
 * `so-desktop`) e o painel de camadas vira folha — a rota decide.
 */
export function AtlasBarraLateral({
  aberto,
  comPopover,
  conteudo,
  onAlternar,
  onFecharPopover,
  onZoom,
  onReenquadrar,
  onSobre,
}: {
  /** O painel Camadas está aberto (popover no desktop, folha no celular). */
  aberto: boolean;
  comPopover: boolean;
  conteudo: React.ReactNode;
  onAlternar: () => void;
  onFecharPopover: () => void;
  onZoom: (fator: number) => void;
  onReenquadrar: () => void;
  onSobre: () => void;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  useFechaFora(caixa, comPopover && aberto, onFecharPopover);

  return (
    <div className="atlas-lateral" ref={caixa}>
      <div className={`atlas-lateral-pilha atlas-flutua${aberto ? " aberto" : ""}`} role="toolbar" aria-label="Controles do mapa" aria-orientation="vertical">
        <button
          type="button"
          className={`atlas-icone-botao${aberto ? " ativo" : ""}`}
          aria-expanded={aberto}
          aria-haspopup="dialog"
          aria-label="Camadas do mapa"
          title="Camadas: posição dos pontos e dimensão"
          onClick={onAlternar}
        >
          <IconeCamadas />
        </button>
        <button
          type="button"
          className="atlas-icone-botao so-desktop"
          aria-label="Aproximar"
          title="Aproximar"
          onClick={() => onZoom(1.5)}
        >
          <IconeMais />
        </button>
        <button
          type="button"
          className="atlas-icone-botao so-desktop"
          aria-label="Afastar"
          title="Afastar"
          onClick={() => onZoom(1 / 1.5)}
        >
          <IconeMenos />
        </button>
        <button
          type="button"
          className="atlas-icone-botao"
          aria-label="Reenquadrar tudo"
          title="Reenquadrar tudo"
          onClick={onReenquadrar}
        >
          <IconeReenquadrar />
        </button>
        <a className="atlas-icone-botao" href="#atlas-tabelas" aria-label="Ver as tabelas abaixo do mapa" title="Ver as tabelas abaixo do mapa">
          <IconeTabela />
        </a>
        <button
          type="button"
          className="atlas-icone-botao"
          aria-label="Sobre este mapa"
          title="Sobre este mapa"
          onClick={onSobre}
        >
          <IconeSobre />
        </button>
      </div>

      {comPopover && aberto && (
        <div className="flutuante-painel" role="dialog" aria-label="Camadas do mapa">
          <header className="flutuante-cab">
            <strong>Camadas</strong>
            <button type="button" className="painel-fechar" onClick={onFecharPopover} aria-label="Fechar">
              ✕
            </button>
          </header>
          {conteudo}
        </div>
      )}
    </div>
  );
}

export default AtlasBarraLateral;
