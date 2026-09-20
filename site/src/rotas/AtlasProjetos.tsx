import { useCallback, useRef, useState } from "react";
import type { AtlasCluster, AtlasProjeto } from "../dados/tipos";
import { corInstituicao } from "../dados/cores";
import Painel from "../componentes/Painel";
import { useTelaEstreita } from "../componentes/useMidia";
import AtlasCanvas, { type AtlasCanvasHandle } from "../componentes/atlas/AtlasCanvas";
import AtlasControles, { ListaMetodos } from "../componentes/atlas/AtlasControles";
import { AtlasBarraLateral, AtlasCamadasBotoes } from "../componentes/atlas/AtlasCamadas";
import FaixaPonte from "../componentes/FaixaPonte";
import AtlasFiltros from "../componentes/atlas/AtlasFiltros";
import AtlasFicha from "../componentes/atlas/AtlasFicha";
import AtlasLegenda, { LegendaConteudo } from "../componentes/atlas/AtlasLegenda";
import AtlasSobre from "../componentes/atlas/AtlasSobre";
import { ROTULO_COLUNA_GRUPO, ROTULO_COLUNA_PALAVRAS, ROTULO_GRUPO_TABELA, useAtlas, type Metodo } from "../componentes/atlas/useAtlas";

/**
 * `/mapa-de-projetos` (era `/atlas`) em modo mapa (§3 do `PLANO_ATLAS_MOBILE.md`): o canvas é a página —
 * em tela cheia, medido pelo contêiner — e tudo o mais vive em sobreposições
 * **que se expandem a partir de ícones** e ficam translúcidas em repouso:
 *
 *  - alto à direita: busca, **Filtros** (instituições e grupos) e **Método**;
 *  - à direita: coluna de ícones (camadas, zoom, reenquadrar, tabelas, sobre);
 *  - embaixo à esquerda: **Legenda**;
 *  - à esquerda: painel da ficha do projeto / "sobre este mapa".
 *
 * No desktop os quatro primeiros abrem um painel suspenso ao lado do próprio
 * ícone (estado local, um de cada vez, fecha ao clicar fora ou com `Esc`); no
 * celular os mesmos botões abrem a folha inferior, com o estado na URL
 * (`?painel=`), para o "voltar" do sistema fechá-la.
 *
 * Só as tabelas de clusters e de instituições continuam abaixo do mapa, em
 * rolagem de página: são dado de referência, não parte da tela principal.
 */
/** O rótulo curto do botão do seletor; o título longo fica no `h2` da tabela. */
const NOME_GRUPO_CURTO: Record<Metodo, string> = {
  anppom: "Subáreas",
  hdbscan: "Clusters",
  topicos: "Tópicos",
  coautoria: "Comunidades",
};

export default function AtlasProjetos() {
  const a = useAtlas();
  const canvasRef = useRef<AtlasCanvasHandle>(null);
  const estreito = useTelaEstreita();
  // Desktop: qual painel suspenso da direita está aberto (um de cada vez) e a
  // legenda, que é independente. No celular quem manda é `a.painel` (URL).
  const [flut, setFlut] = useState<"filtros" | "metodo" | "camadas" | null>(null);
  const [legendaAberta, setLegendaAberta] = useState(false);
  const fecharFlut = useCallback(() => setFlut(null), []);
  const fecharLegenda = useCallback(() => setLegendaAberta(false), []);

  if (a.error) return <div className="error">Erro ao carregar dados: {a.error}</div>;
  if (!a.dados) return <div className="loading">Carregando…</div>;

  const dados = a.dados;
  const totalProgramas = a.programas?.length ?? a.siglasOrdenadasAlfabeto.length;
  const qtdFiltros = a.siglasSel.size + a.temasSel.size + a.subareas2Sel.size + a.vinculosSel.size;

  type Flutuante = "filtros" | "metodo" | "camadas" | "legenda";
  const estaAberto = (n: Flutuante) =>
    estreito ? a.painel === n : n === "legenda" ? legendaAberta : flut === n;
  const alternar = (n: Flutuante) => {
    if (estreito) {
      if (a.painel === n) a.fecharPainel();
      else a.abrirPainel(n);
    } else if (n === "legenda") {
      setLegendaAberta((v) => !v);
    } else {
      setFlut((atual) => (atual === n ? null : n));
    }
  };
  const abrirSobre = () => {
    setFlut(null);
    a.abrirPainel("sobre");
  };
  const escolherProjeto = (p: AtlasProjeto) => {
    setFlut(null);
    a.selecionarProjeto(p);
  };
  // O painel lateral só existe no desktop para a ficha e o "sobre"; no celular
  // qualquer folha aberta ocupa o pé da tela e recolhe a legenda.
  const comPainel = a.painel !== null && (estreito || a.painel === "ficha" || a.painel === "sobre");

  const camadas = (
    <AtlasCamadasBotoes
      organizarPor={a.organizarPor}
      dimensao={a.dimensao}
      agruparLocalidade={a.agruparLocalidade}
      onOrganizar={a.mudarOrganizarPor}
      onDimensao={a.mudarDimensao}
      onAgrupar={a.mudarAgrupar}
    />
  );
  const metodos = <ListaMetodos metodo={a.metodo} carregando={a.carregandoAlternativo} onMetodo={a.mudarMetodo} />;
  const resumoFiltros = a.algumFiltroAtivo
    ? `${a.contagemFiltrada} de ${dados.projetos.length} projetos`
    : `${dados.projetos.length} projetos · ${totalProgramas} programas`;
  const filtros = (
    <AtlasFiltros
      metodo={a.metodo}
      instituicoes={a.instituicoes}
      clustersOrdenados={a.clustersOrdenados}
      temasAtivos={a.temasAtivos}
      siglasSel={a.siglasSel}
      modoInstituicao={a.modoInstituicao}
      onModoInstituicao={a.setModoInstituicao}
      temasSel={a.temasSel}
      subareas2Sel={a.subareas2Sel}
      vinculos={a.vinculos}
      vinculosSel={a.vinculosSel}
      modoVinculo={a.modoVinculo}
      onModoVinculo={a.setModoVinculo}
      contagensVinculo={a.contagensVinculo}
      onVinculo={a.alternarVinculo}
      algumFiltroAtivo={a.algumFiltroAtivo}
      modoPeso={a.modoPeso}
      pesoDisponivel={a.pesoDisponivel}
      onModoPeso={a.mudarModoPeso}
      aderencia={a.aderencia}
      alcance={a.alcance}
      onAlcance={a.setAlcance}
      contagem={a.contagemFiltrada}
      total={dados.projetos.length}
      onSigla={a.alternarSigla}
      onTema={a.alternarTema}
      onSubarea2={a.alternarSubarea2}
      onLimpar={a.limparFiltros}
    />
  );
  const legenda = (
    <LegendaConteudo
      siglas={a.siglasOrdenadasAlfabeto}
      producoes={a.producoesVisiveis}
      esquema={a.esquema}
      filtro={a.filtroProd}
      onFiltro={a.setFiltroProd}
    />
  );
  const abertoTopo: "filtros" | "metodo" | null = estaAberto("filtros") ? "filtros" : estaAberto("metodo") ? "metodo" : null;

  return (
    <div className="atlas-rota">
      <div className={`atlas-mapa${comPainel ? " com-painel" : ""}`}>
        <AtlasCanvas
          ref={canvasRef}
          dados={dados}
          programas={a.programas}
          organizarPor={a.organizarPor}
          dimensao={a.dimensao}
          agruparLocalidade={a.agruparLocalidade}
          destacadoDe={a.destacadoDe}
          intensidadeDe={a.intensidadeDe}
          algumFiltroAtivo={a.algumFiltroAtivo}
          projetoAberto={a.projetoAberto}
          producoesVisiveis={a.producoesVisiveis}
          producaoSel={a.producaoSel}
          filtroProd={a.filtroProd}
          esquema={a.esquema}
          fichas={a.fichas}
          descricoes={a.descricoesPorProjeto}
          detalhes={a.detalhes}
          temaPorCluster={a.temaPorCluster}
          onSelecionarProjeto={a.selecionarProjeto}
          onAlternarProjeto={a.alternarProjeto}
          onSelecionarProducao={a.selecionarProducao}
          onToqueFundo={a.fecharPainel}
        />

        {a.modoInstituicao !== "ou" && a.siglasSel.size >= 2 && (
          <FaixaPonte siglas={[...a.siglasSel].sort()} unidade="projetos" onLimpar={a.limparInstituicoes} />
        )}

        <AtlasControles
          projetos={dados.projetos}
          fichas={a.fichas}
          metodo={a.metodo}
          qtdFiltros={qtdFiltros}
          aberto={abertoTopo}
          comPopover={!estreito}
          filtros={
            <>
              <header className="flutuante-cab">
                <div>
                  <strong>Filtrar pontos do mapa</strong>
                  <div className="atlas-tooltip-nota">{resumoFiltros}</div>
                </div>
                <button type="button" className="painel-fechar" onClick={fecharFlut} aria-label="Fechar">
                  ✕
                </button>
              </header>
              {filtros}
            </>
          }
          metodos={metodos}
          onEscolher={escolherProjeto}
          onAlternar={alternar}
          onFecharPopover={fecharFlut}
        />

        <AtlasBarraLateral
          aberto={estaAberto("camadas")}
          comPopover={!estreito}
          conteudo={camadas}
          onAlternar={() => alternar("camadas")}
          onFecharPopover={fecharFlut}
          onZoom={(f) => canvasRef.current?.zoomPor(f)}
          onReenquadrar={() => canvasRef.current?.reenquadrar()}
          onSobre={abrirSobre}
        />

        <AtlasLegenda
          aberta={estaAberto("legenda")}
          comPopover={!estreito}
          filtroAtivo={a.filtroProd !== null}
          onAlternar={() => alternar("legenda")}
          onFechar={fecharLegenda}
          conteudo={legenda}
        />

        <AtlasFicha
          aberto={a.painel === "ficha"}
          projeto={a.projetoAberto}
          tema={a.projetoAberto ? (a.temaPorCluster.get(a.projetoAberto.cluster) ?? "—") : ""}
          ficha={a.fichas}
          detalhes={a.detalhes}
          descricao={a.descricoesPorProjeto}
          membros={a.membrosPorProjeto}
          producoes={a.producoesVisiveis}
          producoesAbertas={a.producoesAbertas}
          carregando={a.carregandoProducoes}
          producaoSel={a.producaoSel}
          esquema={a.esquema}
          filtro={a.filtroProd}
          apenasNucleo={a.apenasNucleo}
          onApenasNucleo={a.setApenasNucleo}
          onSelecionarProducao={a.selecionarProducao}
          onFechar={a.fecharPainel}
          aderencia={a.aderencia}
          limiarAlcance={a.pesoAtivo ? a.limiarAlcance : 101}
        />

        {/* No celular, Filtros, Método, Camadas e Legenda são folhas inferiores;
            no desktop são os painéis suspensos ao lado de cada ícone (acima). */}
        {estreito && (
          <>
            <Painel
              aberto={a.painel === "filtros"}
              ariaLabel="Filtrar pontos do mapa"
              titulo={
                <>
                  <strong>Filtrar pontos do mapa</strong>
                  <div className="atlas-tooltip-nota">{resumoFiltros}</div>
                </>
              }
              onFechar={a.fecharPainel}
              alturaInicial="meia"
            >
              {filtros}
            </Painel>
            <Painel
              aberto={a.painel === "metodo"}
              ariaLabel="Método de clusterização"
              titulo={<strong>Método de clusterização</strong>}
              onFechar={a.fecharPainel}
              alturaInicial="meia"
            >
              {metodos}
            </Painel>
            <Painel
              aberto={a.painel === "camadas"}
              ariaLabel="Camadas do mapa"
              titulo={<strong>Camadas</strong>}
              onFechar={a.fecharPainel}
              alturaInicial="meia"
            >
              {camadas}
            </Painel>
            <Painel
              aberto={a.painel === "legenda"}
              ariaLabel="Chave do mapa"
              titulo={<strong>Chave do mapa</strong>}
              onFechar={a.fecharPainel}
              alturaInicial="meia"
            >
              {legenda}
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
          <AtlasSobre
            metodo={a.metodo}
            dimensao={a.dimensao}
            organizarPor={a.organizarPor}
            avisoRotulo={dados.aviso_rotulo}
            totalProjetos={dados.projetos.length}
            totalProgramas={totalProgramas}
            aderencia={a.aderencia}
          />
        </Painel>

      </div>

      <section className="atlas-tabelas" id="atlas-tabelas">
        {/* O seletor mora aqui, ao lado do que ele troca: no painel de camadas
            ele mexia numa tabela fora da tela e parecia não fazer nada. */}
        <div className="atlas-tabelas-cab">
          <div className="segmented" role="group" aria-label="Tabela de referência">
            <button
              type="button"
              className={a.modo === "subarea" ? "ativo" : ""}
              aria-pressed={a.modo === "subarea"}
              onClick={() => a.setModo("subarea")}
            >
              {NOME_GRUPO_CURTO[a.metodo]}
            </button>
            <button
              type="button"
              className={a.modo === "instituicao" ? "ativo" : ""}
              aria-pressed={a.modo === "instituicao"}
              onClick={() => a.setModo("instituicao")}
            >
              Instituições
            </button>
          </div>
        </div>
        {a.modo === "subarea" ? (
          <>
            <h2>{ROTULO_GRUPO_TABELA[a.metodo]}</h2>
            <div className="tabela-rolavel">
              <table className="tabela-dados">
                <thead>
                  <tr>
                    <th>{ROTULO_COLUNA_GRUPO[a.metodo]}</th>
                    <th className="num">Projetos</th>
                    <th>{ROTULO_COLUNA_PALAVRAS[a.metodo]}</th>
                  </tr>
                </thead>
                <tbody>
                  {a.clustersOrdenados.map((c) => (
                    <LinhaCluster key={c.cluster} c={c} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <h2>Instituições</h2>
            <div className="tabela-rolavel">
              <table className="tabela-dados">
                <thead>
                  <tr>
                    <th>Instituição</th>
                    <th className="num">Projetos</th>
                  </tr>
                </thead>
                <tbody>
                  {a.instituicoes.map(({ sigla, n }) => (
                    <tr key={sigla}>
                      <td className="forte">
                        <span className="legenda-marca" style={{ background: corInstituicao(sigla) }} /> {sigla}
                      </td>
                      <td className="num">{n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function LinhaCluster({ c }: { c: AtlasCluster }) {
  return (
    <tr>
      <td className="forte">{c.tema}</td>
      <td className="num">{c.n_projetos}</td>
      <td>{c.subareas.join(", ")}</td>
    </tr>
  );
}
