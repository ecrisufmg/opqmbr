import type { AtlasProjeto, FichaProjeto } from "../dados/tipos";

/** '2010-05-03' → 2010. */
export function anoDe(d: string | null | undefined): string | null {
  return d && /^\d{4}/.test(d) ? d.slice(0, 4) : null;
}

/** "2010–hoje", "2005–2018", "desde 2021" ou null. */
export function periodo(f: Pick<FichaProjeto, "inicio" | "fim" | "situacao">): string | null {
  const i = anoDe(f.inicio);
  const fim = anoDe(f.fim);
  if (!i) return null;
  return fim ? `${i}–${fim}` : `${i}–hoje`;
}

const ROTULO_SITUACAO: Record<string, string> = {
  "EM ANDAMENTO": "em andamento",
  "CONCLUÍDO": "concluído",
  "DESATIVADO": "desativado",
};

export function situacaoRotulo(s: string | null | undefined): string | null {
  return s ? (ROTULO_SITUACAO[s] ?? s.toLowerCase()) : null;
}

/** Nomes distintos das agências ("CAPES, CNPq"), na ordem em que aparecem. */
export function agenciasDistintas(f: FichaProjeto): string[] {
  return [...new Set(f.fomento.map((x) => x.agencia))];
}

const ROTULO_ESFERA: Record<string, string> = {
  federal: "federal",
  estadual: "estadual",
  propria_ies: "da própria instituição",
  internacional: "internacional",
  outra: "não identificada",
};

export function esferaRotulo(e: string): string {
  return ROTULO_ESFERA[e] ?? e;
}

/** "UFMG · em andamento · 2013–hoje · 111 produções · 9 membros". */
export function metaProjeto(projeto: AtlasProjeto, ficha: FichaProjeto | null): string {
  const per = ficha ? periodo(ficha) : null;
  const sit = ficha ? situacaoRotulo(ficha.situacao) : null;
  return [projeto.sigla, sit, per, `${projeto.n_producoes} produções`, ficha ? `${ficha.n_membros} membros` : null]
    .filter(Boolean)
    .join(" · ");
}

/** Responsável, fomento e tema — as linhas que o cartão do projeto e o da produção repetem. */
export function LinhasProjeto({
  projeto,
  tema,
  ficha,
}: {
  projeto: AtlasProjeto;
  tema: string;
  ficha: FichaProjeto | null;
}) {
  return (
    <>
      {ficha && ficha.responsaveis.length > 0 && (
        <div className="atlas-tooltip-nota">Responsável: {ficha.responsaveis.join("; ")}</div>
      )}
      {ficha && ficha.fomento.length > 0 && (
        <div className="atlas-tooltip-nota">
          Fomento:{" "}
          {ficha.fomento
            .map((f) => `${f.agencia} (${esferaRotulo(f.esfera)}${f.desde ? `, desde ${f.desde}` : ""})`)
            .join("; ")}
        </div>
      )}
      {ficha && ficha.fomento.length === 0 && <div className="atlas-tooltip-nota">Sem fomento registrado.</div>}
      <div className="atlas-tooltip-nota">
        {tema}
        {projeto.subarea ? ` · ${projeto.subarea}` : ""}
      </div>
    </>
  );
}
