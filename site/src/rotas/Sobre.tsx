import { useState } from "react";
import { Link } from "react-router-dom";
import { COMPLETA } from "../dados/edicao";
import PreferenciaEstatisticas from "../componentes/PreferenciaEstatisticas";

// Contato do encarregado que vai na política de privacidade (D3, docs/PLANO_UMAMI_PROTECAO.md, A6).
const CONTATO_ENCARREGADO = "ecris@ecris.cc";
import {
  CITACAO,
  citacaoAbnt,
  citacaoApa,
  citacaoBibtex,
  doiUrl,
  publicadoExtenso,
  versaoExtenso,
} from "../dados/citacao";

/** Copia para a área de transferência; cai num `textarea` temporário onde a API moderna não
 * existe (página fora de HTTPS/localhost). Devolve se conseguiu. */
async function copiar(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const t = document.createElement("textarea");
    t.value = texto;
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(t);
    return ok;
  }
}

function BlocoCitacao({ rotulo, texto }: { rotulo: string; texto: string }) {
  const [estado, setEstado] = useState<"" | "copiado" | "erro">("");
  return (
    <div className="citacao-bloco">
      <div className="citacao-cab">
        <strong>{rotulo}</strong>
        <button
          type="button"
          className="chip"
          onClick={async () => {
            setEstado((await copiar(texto)) ? "copiado" : "erro");
            window.setTimeout(() => setEstado(""), 2200);
          }}
        >
          {estado === "copiado" ? "Copiado ✓" : estado === "erro" ? "Selecione e copie" : "Copiar"}
        </button>
      </div>
      <pre className="citacao-texto">{texto}</pre>
    </div>
  );
}

/**
 * "Sobre": autoria, como citar e de onde vêm os dados. A citação é sempre montada com a **data de
 * acesso de hoje** (`dataAcesso`): quem cita é quem acessou. Nada aqui é decidido pelo front — os
 * valores vêm de `dados/citacao.ts`.
 */
export default function Sobre() {
  const { autor, titulo, fonteDados, doi } = CITACAO;
  return (
    <div className="pagina-sobre">
      <h1>Sobre</h1>
      <p className="sobre-lead">
        <strong>{titulo}</strong> reúne, em mapas e gráficos, o que os programas acadêmicos de
        pós-graduação em Música do país informam à Plataforma Sucupira sobre docentes,
        projetos, produções e financiamento no quadriênio 2021–2024.
      </p>

      <h2>Autoria</h2>
      <p>
        Concepção, análise e desenvolvimento: <strong>{autor.nome} {autor.sobrenome}</strong>. Publicado em{" "}
        {publicadoExtenso}.
      </p>
      <p>
        <strong>Versão {versaoExtenso}.</strong> O site é versionado: cite sempre a versão que você consultou
        (ela consta nas citações abaixo). Enquanto for 0.x, o site está em desenvolvimento e a interface e os
        números podem mudar entre versões.
        {typeof __COMMIT__ === "string" && __COMMIT__ && <span className="chart-nota"> Compilação: {__COMMIT__}.</span>}
      </p>

      <h2>Como citar</h2>
      <p>
        Se este trabalho, um gráfico ou uma análise ajudou o seu, cite-o. A data de acesso abaixo é a de
        hoje; use a do seu acesso.
      </p>
      <p>
        <strong>DOI:</strong>{" "}
        <a href={doiUrl(doi.conceito)} target="_blank" rel="noreferrer">
          {doi.conceito}
        </a>{" "}
        (o mesmo para todas as versões; leva sempre à mais recente). Para reproduzir a versão {doi.versaoArquivada.numero}{" "}
        exatamente como foi arquivada (código, site compilado e dados públicos), use o DOI dela:{" "}
        <a href={doiUrl(doi.versaoArquivada.doi)} target="_blank" rel="noreferrer">
          {doi.versaoArquivada.doi}
        </a>
        . Os arquivos estão no Zenodo.
      </p>
      <BlocoCitacao rotulo="ABNT (NBR 6023); no seu texto, o título vai em negrito" texto={citacaoAbnt()} />
      <BlocoCitacao rotulo="APA (7ª ed.)" texto={citacaoApa()} />
      <BlocoCitacao rotulo="BibTeX" texto={citacaoBibtex()} />
      <p className="chart-nota">
        Ao usar os <em>dados</em>, cite também a fonte original: {fonteDados.abnt}
      </p>

      <h2>De onde vêm os dados</h2>
      <p>
        Os dados brutos são <strong>públicos</strong> e foram obtidos da{" "}
        <a href={fonteDados.url} target="_blank" rel="noreferrer">
          {fonteDados.nome}
        </a>{" "}
        em {CITACAO.coletaDados}
        {COMPLETA && ", junto com a planilha oficial da Avaliação Quadrienal 2025 da CAPES (notas dos programas)"}.
        Este site <strong>não é uma publicação da CAPES</strong> e não tem o seu endosso.
      </p>
      <ul className="sobre-lista">
        <li>
          <strong>Da fonte:</strong> programas, projetos, produções, membros e financiamento
          {COMPLETA && ", além das notas dos programas,"} como a Plataforma os publica. Os programas preenchem e revisam essas informações;
          lacunas e inconsistências existem, e os gráficos as tratam como tal (ver as notas de cada página).
          Nomes de pessoas, títulos e descrições de projetos e produções são exibidos como a Plataforma os
          publica.
        </li>
        <li>
          <strong>Do autor:</strong> a classificação de cada projeto por subárea, a aderência a cada área, as
          posições no mapa, os índices, as classes de produção (núcleo comparável × demais), a seleção das
          visualizações e todos os textos. Onde há classificação automática (por leitura de um modelo de
          linguagem, sem conferência projeto a projeto), isso é dito no próprio mapa; ver{" "}
          <Link to="/mapa-de-projetos">Mapa de projetos</Link>, "Sobre este mapa".
        </li>
      </ul>

      <h2>Licença</h2>
      <p>
        Textos, visualizações, análises, dados derivados e código deste trabalho estão sob a licença{" "}
        <a href={CITACAO.licenca.url} target="_blank" rel="noreferrer">
          {CITACAO.licenca.nome}
        </a>
        : você pode copiar, adaptar e redistribuir, inclusive para fins comerciais, <strong>desde que dê o
        crédito</strong> ({autor.nome} {autor.sobrenome}, {publicadoExtenso}), indique a licença e aponte se
        houve alterações. Ficam de fora: os <em>dados brutos</em> da Plataforma Sucupira (seguem os termos da
        fonte), os <em>logotipos e marcas</em> das instituições (pertencem a elas) e os componentes de
        terceiros (ícones Material Design Icons, sob Apache-2.0, e as bibliotecas de código, cada uma com a
        sua licença).
      </p>
      <p>
        O autor pede que os textos, as visualizações e os dados derivados deste site não sejam usados para
        treinar modelos de inteligência artificial sem a sua autorização (sinal <code>ai-train=no</code>,
        declarado no <code>robots.txt</code>). É um pedido do autor, e não uma restrição da licença: a CC BY
        4.0 continua valendo para o reuso com atribuição, inclusive comercial.
      </p>

      <h2>Uso de ferramentas de inteligência artificial</h2>
      <p>
        O código do site e das análises foi escrito com o apoio de modelos de linguagem ({CITACAO.ferramentasIA.join(" e ")}),
        usados como assistentes de codificação. A concepção, as escolhas de
        método, a revisão do código e dos resultados e as decisões de conteúdo são do autor, que responde
        pelo trabalho.
      </p>

      {!COMPLETA && (
        <>
          <h2>Privacidade e estatísticas de uso</h2>
          <p>
            Este site conta as visitas para saber o que é lido e melhorar o conteúdo. A medição usa uma
            ferramenta própria (Umami), instalada pelo autor, <strong>sem cookies e sem guardar o endereço
            IP</strong> de quem visita. O sinal "Do Not Track" do navegador é respeitado, e você pode recusar
            a contagem no botão abaixo.
          </p>
          <PreferenciaEstatisticas />
          <p>
            Em cada visita são registrados: as páginas visitadas e seus títulos, o endereço de origem (a
            página de onde você veio, quando existe) e dados aproximados de país, região e cidade, além de
            navegador, sistema, tipo de dispositivo, tamanho de tela e idioma. Não são registrados cookies,
            endereço IP nem qualquer dado que identifique uma pessoa.
          </p>
          <p>
            Contato: <a href={`mailto:${CONTATO_ENCARREGADO}`}>{CONTATO_ENCARREGADO}</a>.
          </p>
        </>
      )}

      <h2>Limites</h2>
      <p>
        O volume bruto de produção não é comparável entre programas, porque as políticas de preenchimento
        diferem muito. Por isso o site separa o "núcleo comparável" do total e não compara volume sem essa
        ressalva. Os números descrevem o que foi <em>registrado</em>, e não a qualidade nem a totalidade do
        que os programas produzem.
      </p>
    </div>
  );
}
