import type { CategoriaProducao, Esquema } from "./corProducao";
import MarcaProducao from "./MarcaProducao";

/** Um grupo isolado na legenda: `nivel` diz de qual das três dimensões é a `chave`. */
export type FiltroLegenda = { nivel: "classe" | "tipo" | "subtipo"; chave: string };

/** Uma produção entra no grupo isolado? (`null` = nada isolado: todas entram.) */
export function combinaFiltro(esquema: Esquema, c: CategoriaProducao, f: FiltroLegenda | null): boolean {
  if (!f) return true;
  return esquema.chaves(c)[f.nivel] === f.chave;
}

/**
 * Legenda dos níveis de uma vez: **borda = tipo**, **miolo = família do subtipo**, **ícone =
 * subtipo** — e a classe (núcleo, difusão…) como filtro em texto. Cada item é um botão: clicar
 * **isola** o grupo no mapa (o resto esmaece), de novo desfaz. Mostra só o que o projeto aberto
 * tem, com a contagem.
 */
export default function LegendaProducoes({
  esquema,
  producoes,
  filtro,
  onFiltro,
}: {
  esquema: Esquema;
  producoes: CategoriaProducao[];
  filtro: FiltroLegenda | null;
  onFiltro: (f: FiltroLegenda | null) => void;
}) {
  const { classes, tipos } = esquema.legenda(producoes);
  const alterna = (f: FiltroLegenda) => onFiltro(filtro?.nivel === f.nivel && filtro.chave === f.chave ? null : f);
  const ativo = (nivel: FiltroLegenda["nivel"], chave: string) => filtro?.nivel === nivel && filtro.chave === chave;

  return (
    <div className="legenda-producoes" role="group" aria-label="Legenda das produções: forma, cor e tom">
      <p className="legenda-anel">
        <strong>Anel externo</strong> = instituição do programa (a cor do ponto do projeto). Dentro dele: a
        <strong> borda</strong> é o tipo, o <strong>miolo</strong> agrupa o subtipo por família e o <strong>ícone</strong>{" "}
        o identifica.
      </p>
      <div className="legenda-linha">
        <span className="legenda-dimensao" title="A classe da produção (analise/nucleo.py)">
          Classe
        </span>
        {classes.map((c) => (
          <button
            key={c.chave}
            type="button"
            className={`legenda-item legenda-botao${ativo("classe", c.chave) ? " ativo" : ""}`}
            aria-pressed={ativo("classe", c.chave)}
            onClick={() => alterna({ nivel: "classe", chave: c.chave })}
            title="Clique para isolar esta classe no mapa"
          >
            {c.rotulo} <span className="legenda-n">{c.n}</span>
          </button>
        ))}
      </div>

      {tipos.map((g) => (
        <div key={g.chave} className="legenda-linha">
          <button
            type="button"
            className={`legenda-dimensao legenda-botao${ativo("tipo", g.chave) ? " ativo" : ""}`}
            style={{ borderColor: g.borda }}
            aria-pressed={ativo("tipo", g.chave)}
            onClick={() => alterna({ nivel: "tipo", chave: g.chave })}
            title="A borda do círculo é o tipo. Clique para isolar todo este tipo no mapa"
          >
            <span className="legenda-marca-tipo" style={{ borderColor: g.borda }} />
            {g.rotulo} <span className="legenda-n">{g.n}</span>
          </button>
          {g.subtipos.map((s) => (
            <button
              key={s.chave}
              type="button"
              className={`legenda-item legenda-botao${ativo("subtipo", s.chave) ? " ativo" : ""}`}
              aria-pressed={ativo("subtipo", s.chave)}
              onClick={() => alterna({ nivel: "subtipo", chave: s.chave })}
              title={
                "O ícone é o subtipo. Clique para isolá-lo no mapa"
              }
            >
              <MarcaProducao marca={s.marca} />
              {s.rotulo} <span className="legenda-n">{s.n}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
