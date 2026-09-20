import type { Aderencia } from "../../dados/tipos";
import type { Dimensao, Metodo } from "./useAtlas";

/**
 * "Sobre este mapa" — para onde foram o subtítulo, as duas notas metodológicas
 * e a legenda que ficavam *acima* do canvas (§3.3 do plano). Nada disto sumiu:
 * mudou de lugar, e o mapa guarda um sinal visível de que existe (o ⓘ com
 * rótulo, na coluna de camadas, e o selo do método na caixa de controle).
 */
export default function AtlasSobre({
  metodo,
  dimensao,
  organizarPor,
  avisoRotulo,
  totalProjetos,
  totalProgramas,
  aderencia,
}: {
  metodo: Metodo;
  dimensao: Dimensao;
  organizarPor: "tema" | "localidade";
  /** `aviso_rotulo` do JSON do método ativo — a ressalva é do dado, não do front. */
  avisoRotulo: string;
  totalProjetos: number;
  totalProgramas: number;
  aderencia: Aderencia | null;
}) {
  return (
    <div className="atlas-sobre">
      <p>
        {totalProjetos} projetos de pesquisa dos {totalProgramas} programas, um ponto por
        projeto. Organize por semelhança de assunto (embeddings da descrição, reduzidos a duas
        dimensões por UMAP) ou por onde fica o programa; classificados em 9 subáreas — as 8
        oficiais da ANPPOM (2025) mais Musicoterapia, destacada de "Demais Subáreas e
        Interfaces" como categoria própria.
      </p>

      <h3>Como os pontos foram classificados</h3>
      <p>
        {metodo === "anppom" ? (
          <>
            <strong>A classificação por subárea é feita por leitura, não por palavra-chave.</strong>{" "}
            {avisoRotulo} Cada projeto foi classificado a partir do título e do resumo completo,
            não por comparação estatística de vocabulário — um ajuste anterior baseado só em
            similaridade de embedding confundia sistematicamente Performance Musical com
            Composição e Sonologia. Ainda é automático, sem conferência humana projeto a projeto;
            alguns casos de fronteira podem estar na subárea vizinha.
          </>
        ) : (
          <>
            <strong>Este método não usa a taxonomia da ANPPOM.</strong> {avisoRotulo}
          </>
        )}{" "}
        O título de cada projeto é público, qualquer que seja o tamanho do cluster, e o painel do
        projeto mostra a descrição, os membros e as produções com a autoria (transparência total,
        decisão registrada no PLANO). Cada ponto identifica programa, ano, tema, título e nº de
        produções.
      </p>

      {aderencia && (
        <>
          <h3>Aderência × grupos discretos</h3>
          <p>
            Por padrão, marcar uma subárea em Filtros mostra o <strong>quanto</strong> o texto de
            cada projeto pertence a ela — não só quem está no grupo. O matiz continua sendo a
            instituição, e a aderência vira saturação e opacidade. O controle de <em>alcance</em>,
            no mesmo painel, decide até onde ir: do só o principal aos vínculos fracos. A ficha do
            projeto mostra o perfil completo (as 9 áreas). Em Filtros, "Discretas" volta ao modo
            antigo, em que o projeto está ou não no grupo (<code>?peso=discreto</code> na
            URL).
          </p>
          <p>
            <strong>Aderência não é probabilidade.</strong> É o grau, na escala de A (muito alto) a
            I (sem relevância) que o autor usou para julgar {aderencia.validacao.casos} projetos às
            cegas, previsto para os demais por um modelo pequeno que combina o rótulo por leitura
            (o grupo principal) com a similaridade entre o resumo e descrições de cada área
            (as áreas relacionadas). Validado deixando um caso de fora por vez, nesses{" "}
            {aderencia.validacao.casos} casos: o grupo principal acerta em{" "}
            {Math.round(aderencia.validacao.principal * 100)}% e a separação entre áreas relevantes
            e irrelevantes em {Math.round(aderencia.validacao.relevante_irrelevante * 100)}% dos
            pares. Com tão poucos casos a margem é de uns 10 pontos, e o modelo <strong>não
            distingue graus intermediários</strong>: o que ele diz bem é "relevante ou não". Os
            julgamentos continuam sendo ampliados. Disponível no método ANPPOM.
          </p>
        </>
      )}

      <h3>Como ler a posição</h3>
      <p>
        {metodo === "coautoria" ? (
          <>
            No modo Tema, X/Y vêm do layout de força do próprio grafo de colaboração (
            <code>spring_layout</code>) — pontos próximos estão perto na REDE (compartilham gente
            com quem compartilha gente), não perto em conteúdo. Sem aresta nenhuma, um ponto "sem
            colaboração registrada" não participa desse layout — fica numa margem à parte, não
            porque o tema seja diferente, mas porque não há vizinho de rede.
          </>
        ) : (
          <>
            No modo Tema, X/Y não são grandezas — vêm do UMAP, uma projeção 2D do espaço de
            embeddings dos resumos (modelo multilíngue{" "}
            <code>paraphrase-multilingual-MiniLM-L12-v2</code>). Pontos próximos têm vocabulário e
            temática acadêmica parecidos; a distância exata não tem unidade nem significado
            isolado, só a proximidade relativa importa.
          </>
        )}{" "}
        No modo Localidade a posição já não é UMAP nem rede: é a geografia real, desamontoada só o
        suficiente para não sobrepor — em 3 níveis encadeados (Região/UF/Instituição, no menu
        Camadas), do centroide mais agregado ao mais fino, sempre a partir da coordenada real da
        sede de cada programa.
      </p>
      <p>
        O tamanho do ponto é sempre nº de produções no quadriênio, e a cor é sempre a instituição.
        {dimensao === "3d" && (
          <>
            {" "}
            <strong>Em 3D</strong> a posição vem de uma redução independente da 2D (mesmo método,
            terceira dimensão própria) — não é a mesma nuvem "com profundidade", é outra projeção.
            Arraste para girar, roda do mouse dá zoom.
          </>
        )}
      </p>

      <h3>A cor e a marca</h3>
      <p>
        <strong>A cor é sempre por instituição</strong> — extraída do logo de cada uma, não de uma
        paleta arbitrária. Com 20 instituições, cores vizinhas ainda podem ficar parecidas para
        quem tem daltonismo: por isso a legenda nomeia cada uma, clicar isola, e cada marca de
        produção leva um <strong>anel externo</strong> na cor do programa dela. Nunca confie só na
        cor.
      </p>
      <p>
        As marcas de produção (as bolinhas ao redor do projeto aberto) têm três camadas: a{" "}
        <strong>borda</strong> é o tipo (bibliográfica, artístico-cultural, técnica); o{" "}
        <strong>miolo</strong> agrupa o subtipo por família; o <strong>ícone</strong> identifica o
        subtipo exato. Tudo vem de <code>esquema_producao.json</code> — a cor agrupa, o ícone é que
        identifica.
      </p>

      <h3>Como mexer</h3>
      <p>
        Roda do mouse e pinça dão zoom; arrastar o fundo move o mapa.
        {organizarPor === "localidade" && " A posição geográfica é desamontoada por força — arrastar um ponto move só ele, e o resto se reacomoda."}{" "}
        Passe o mouse sobre um ponto para ver o título, o resumo, o responsável e o fomento;{" "}
        <strong>clicar</strong> no ponto fixa o cartão do projeto (dá para rolar e ler a descrição
        inteira) e o ícone de <em>produções</em> abre a lista no painel. No celular, o toque abre a
        folha da ficha: arraste a alça para subir, toque no fundo do mapa para fechar. Esc ou o
        botão voltar do sistema também fecham.
      </p>
    </div>
  );
}
