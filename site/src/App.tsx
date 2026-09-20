import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from "react";
import "./App.css";
import { CITACAO, dataIsoAbnt, dataIsoExtenso, publicadoAbnt } from "./dados/citacao";
import { COMPLETA } from "./dados/edicao";
import LogoEcris from "./componentes/LogoEcris";

// As abas reservadas à edição completa moram em `rotas-completas/`, que o espelho público
// (`mirrar_site_github.sh`) não leva. Na edição pública o `COMPLETA ? … : {}` vira `{}` na compilação, então
// nem o código nem o rótulo delas entram no pacote.
const reservadas = COMPLETA ? import.meta.glob("./rotas-completas/*.tsx") : {};
function reservada(nome: string) {
  const carregar = reservadas[`./rotas-completas/${nome}.tsx`];
  return carregar ? lazy(carregar as () => Promise<{ default: ComponentType }>) : null;
}
const CampoEmNumeros = reservada("CampoEmNumeros");
const ConceitoMede = reservada("ConceitoMede");
const RegimesProducao = lazy(() => import("./rotas/RegimesProducao"));
const QuemTrabalhaCom = lazy(() => import("./rotas/QuemTrabalhaCom"));
const ProjetosFinanciamento = lazy(() => import("./rotas/ProjetosFinanciamento"));
const AtlasProjetos = lazy(() => import("./rotas/AtlasProjetos"));
const MapaProducoes = lazy(() => import("./rotas/MapaProducoes"));
const ProducoesSemProjeto = lazy(() => import("./rotas/ProducoesSemProjeto"));
const AppendicesDados = lazy(() => import("./rotas/AppendicesDados"));
const Sobre = lazy(() => import("./rotas/Sobre"));

/** Ordem do menu (2026-09-19): o Atlas abre o site, seguido de projetos/financiamento e das
 * produções sem projeto; depois vêm, na ordem de sempre, as análises de conjunto. `/` leva ao
 * Atlas; "O campo em números", que era a página inicial, mora em `/campo`. */
const NAV = [
  { to: "/mapa-de-projetos", label: "Mapa de projetos" },
  { to: "/mapa-de-producoes", label: "Mapa de produções" },
  { to: "/projetos", label: "Projetos e financiamento" },
  { to: "/sem-projeto", label: "Produções sem projeto" },
  // As abas reservadas entram por `COMPLETA ? […] : []` (e não por um filtro) para que o rótulo
  // também saia do pacote da edição pública.
  ...(COMPLETA ? [{ to: "/campo", label: "O campo em números" }] : []),
  { to: "/regimes", label: "Regimes de produção" },
  { to: "/colaboracao", label: "Quem trabalha com quem" },
  ...(COMPLETA ? [{ to: "/conceito", label: "Conceito CAPES" }] : []),
  { to: "/dados", label: "Apêndice de dados" },
  { to: "/sobre", label: "Sobre" },
];

/** Rotas que querem a página inteira para si: o `/mapa-de-projetos` é um mapa em tela
 * cheia, e a moldura do `.site-main` (padding + max-width) atrapalha. Todas as
 * outras seguem com a moldura normal de leitura. */
const ROTAS_SEM_MOLDURA = new Set(["/mapa-de-projetos", "/mapa-de-producoes"]);

/** O endereço antigo (`/atlas`, até a versão 0.2.1) continua valendo, com `?projeto=` e o resto da
 * consulta: links já compartilhados não quebram. */
function RedirecionaAtlas() {
  const { search, hash } = useLocation();
  return <Navigate to={`/mapa-de-projetos${search}${hash}`} replace />;
}

export default function App() {
  const { pathname } = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Altura real do cabeçalho numa variável CSS: o mapa do Atlas se dimensiona
  // por ela (`100dvh − cabeçalho`), sem chutar um valor fixo por breakpoint —
  // o cabeçalho muda de altura quando a navegação vira menu.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const aplicar = () =>
      document.documentElement.style.setProperty("--altura-cabecalho", `${el.offsetHeight}px`);
    aplicar();
    const ro = new ResizeObserver(aplicar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Trocar de rota fecha o menu do celular.
  useEffect(() => setMenuAberto(false), [pathname]);

  const rotaAtiva = NAV.find((n) => pathname.startsWith(n.to));

  return (
    <div className="layout">
      <header className="site-header" ref={headerRef}>
        <div className="site-cabecalho">
          <div className="site-marca">
            <a
              className="logo-ecris"
              href="https://ecris.cc/"
              aria-label="ECrIS: página principal (ecris.cc)"
              title="ECrIS · ecris.cc"
            >
              <LogoEcris />
            </a>
            <div className="site-title">
              <span className="site-title-linha">
                <span className="site-title-main">
                  <span className="site-title-completo">Observatório da Pesquisa em Música no Brasil</span>
                  <span className="site-title-curto">OPqM-BR</span>
                </span>
                <span className="site-tags">
                  <span className="tag-site tag-versao" title={`Versão ${CITACAO.versao.numero} do site`}>
                    v{CITACAO.versao.numero}
                  </span>
                  <span className="tag-site tag-data" title={`Última atualização: ${dataIsoExtenso(CITACAO.versao.data)}`}>
                    <span className="tag-data-prefixo">atualizado em </span>
                    <time dateTime={CITACAO.versao.data}>{dataIsoAbnt(CITACAO.versao.data)}</time>
                  </span>
                </span>
              </span>
              <span className="site-title-sub">
                20 programas de pós-graduação · 2021–2024
                {COMPLETA && <span className="selo-completa" title="Edição completa: uso do autor, não publicada">edição completa (privada)</span>}
              </span>
            </div>
          </div>
          {/* Abaixo de 900 px a navegação vira este botão; ele mostra a rota
              ativa, para a seção em que se está continuar visível com o menu
              fechado (o `aria-current` continua no link, dentro do menu). */}
          <button
            type="button"
            className="nav-botao"
            aria-expanded={menuAberto}
            aria-controls="site-nav"
            onClick={() => setMenuAberto((v) => !v)}
          >
            <span aria-hidden="true">☰</span>
            <span className="nav-botao-rotulo">{rotaAtiva?.label ?? "Menu"}</span>
          </button>
        </div>
        <nav id="site-nav" className={`site-nav${menuAberto ? " aberto" : ""}`} aria-label="Seções do site">
          {NAV.map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className={`site-main${ROTAS_SEM_MOLDURA.has(pathname) ? " sem-moldura" : ""}`}>
        <Suspense fallback={<div className="loading">Carregando…</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/mapa-de-projetos" replace />} />
            {CampoEmNumeros && <Route path="/campo" element={<CampoEmNumeros />} />}
            <Route path="/regimes" element={<RegimesProducao />} />
            <Route path="/colaboracao" element={<QuemTrabalhaCom />} />
            {ConceitoMede && <Route path="/conceito" element={<ConceitoMede />} />}
            <Route path="/projetos" element={<ProjetosFinanciamento />} />
            <Route path="/mapa-de-projetos" element={<AtlasProjetos />} />
            <Route path="/mapa-de-producoes" element={<MapaProducoes />} />
            <Route path="/atlas" element={<RedirecionaAtlas />} />
            <Route path="/sem-projeto" element={<ProducoesSemProjeto />} />
            <Route path="/dados" element={<AppendicesDados />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="*" element={<Navigate to="/mapa-de-projetos" replace />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="site-footer">
        <p>
          <strong>
            {CITACAO.titulo} · {CITACAO.autor.nome} {CITACAO.autor.sobrenome}, {publicadoAbnt} · v{CITACAO.versao.numero}
          </strong>{" "}
          · <NavLink to="/sobre">Sobre e como citar</NavLink> ·{" "}
          <a href={CITACAO.licenca.url} target="_blank" rel="noreferrer">
            {CITACAO.licenca.nome}
          </a>
        </p>
        <p>
          Dados: Plataforma Sucupira (CAPES){COMPLETA ? " · Avaliação Quadrienal 2025" : ""}. Programas acadêmicos de
          Música em atividade. Mestrados e doutorados profissionais não entram; ver o apêndice.
        </p>
      </footer>
    </div>
  );
}
