import type { MetodoMapa } from "./useMapaProducoes";

/**
 * "Sobre este mapa" do Mapa de produções (§2.3 e E8 do PLANO_MAPA_PRODUCOES.md):
 * o que é uma marca, de onde vem a posição e o que o método não garante. Segue o
 * guia de redação (`docs/PLANO_REDESENHO_ABAS.md`): "produção", nunca "obra";
 * sem travessão de pausa.
 */
export default function MapaSobre({
  metodo,
  totalProducoes,
}: {
  metodo: MetodoMapa;
  totalProducoes: number;
}) {
  return (
    <div className="atlas-sobre">
      <p>
        {totalProducoes.toLocaleString("pt-BR")} produções registradas na Plataforma Sucupira
        pelos 20 programas de pós-graduação em Música (2020 a 2024), uma marca por produção. A
        posição de cada marca vem dos dados da própria produção, não do projeto a que ela pertence:
        é a diferença entre este mapa e o Mapa de projetos.
      </p>

      <h3>O que é uma marca</h3>
      <p>
        Cada marca é uma produção individual. A <strong>cor é sempre a instituição</strong> (a mesma
        paleta do resto do site, extraída do logo de cada instituição), a <strong>borda é o tipo</strong>{" "}
        (bibliográfica, artístico-cultural ou técnica) e, com o mapa aproximado, o{" "}
        <strong>ícone identifica o subtipo</strong>. Com 20 instituições, cores vizinhas podem
        parecer iguais para quem tem daltonismo: a legenda nomeia cada uma, e nenhuma leitura deve
        confiar só na cor.
      </p>

      <h3>Como a posição foi calculada</h3>
      {metodo === "texto" ? (
        <p>
          Por padrão, as marcas se organizam por <strong>semelhança de texto</strong>: um modelo de
          linguagem multilíngue (<code>paraphrase-multilingual-MiniLM-L12-v2</code>) transforma o
          título, o tipo, o subtipo e os campos de detalhe que carregam assunto (nome do evento,
          título dos anais, periódico, editora, descrição) em vetores, e o UMAP projeta esses
          vetores em duas dimensões. Pontos próximos têm vocabulário e assunto parecidos; a
          distância exata não tem unidade, só a proximidade relativa importa. Títulos curtos dão
          posições menos informativas, e o método não garante que vizinhos sempre tratem do mesmo
          assunto.
        </p>
      ) : (
        <p>
          No modo <strong>Autoria</strong>, a posição aproxima produções que compartilham autores,
          e também as que pertencem à mesma instituição ou ao mesmo projeto. A proximidade é a
          combinação desses três fatores (autoria, instituição e projeto, cada um com o seu peso,
          decidido na geração dos dados): produções de um mesmo grupo ficam tão mais juntas quanto
          mais recorrente for essa ligação. Como no método por texto, só a proximidade relativa
          importa; a distância exata não tem unidade.
        </p>
      )}

      <h3>O que aparece por padrão</h3>
      <p>
        Por padrão o mapa mostra <strong>todas as produções</strong>, de todas as classes. Para
        comparar programas de forma parecida, use o filtro de classe: o núcleo comparável (artigos,
        livros, trabalhos em anais, partituras, traduções e produções artístico-culturais) é o
        recorte em que os 20 programas registram com critério semelhante, ao contrário de pareceres,
        cursos de curta duração e organização de eventos, que ficam nas demais classes.
      </p>

      <h3>Ressalvas</h3>
      <p>
        Cerca de 280 produções foram reportadas duas vezes, com identificadores diferentes; elas
        aparecem como marcas quase sobrepostas. O mapa mostra o registro como ele está na
        Plataforma, sem apagar nem juntar esses casos. Uma produção pertence a um único programa, e
        os nomes de autores e os títulos são públicos, como em todo o site.
      </p>

      <h3>Como mexer</h3>
      <p>
        Roda do mouse e pinça dão zoom; arrastar o fundo move o mapa. Passe o mouse sobre uma marca
        para ver o tipo e o ano; <strong>clique</strong> (ou toque) para abrir a ficha com o título,
        a autoria e o detalhe. No celular, o toque abre a folha da ficha: arraste a alça para subir,
        toque no fundo do mapa para fechar. Esc ou o botão voltar do sistema também fecham.
      </p>
    </div>
  );
}
