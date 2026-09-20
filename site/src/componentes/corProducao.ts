import type { EsquemaProducaoDados } from "../dados/tipos";

/**
 * Como cada produção é desenhada. Um **círculo** (as produções aparecem agrupadas por subtipo,
 * então a forma não precisa carregar a classe), com três camadas:
 *
 *  - **borda → tipo**: azul (bibliográfica), vermelho (artístico-cultural), verde (técnica), em
 *    tons moderados; o vermelho é mais escuro e o verde mais claro porque vermelho × verde é o
 *    par que o daltonismo mais confunde;
 *  - **miolo → família do subtipo**: subtipos parecidos compartilham o matiz (Okabe-Ito, a paleta
 *    segura para daltônicos) e variam em luminosidade;
 *  - **ícone → o subtipo exato**: plano e monocromático (Material Design Icons).
 *
 * Tudo vem de `esquema_producao.json` (`analise/esquema_producao.py`, regra única). A cor sozinha
 * não identifica 27 subtipos, nem para quem enxerga bem — o ícone é que identifica; a cor agrupa.
 *
 * Subtipo que a Plataforma inventar e o esquema não conhece aparece em cinza com "?", nunca some
 * (`python3 -m analise.esquema_producao --conferir` acusa na base).
 */

export const ROTULO_CLASSE: Record<string, string> = {
  nucleo: "Núcleo comparável",
  difusao: "Difusão e ensino",
  tecnica: "Técnica, serviço e gestão",
  indefinido: "Rubrica indefinida",
};
const ORDEM_CLASSE = ["nucleo", "difusao", "tecnica", "indefinido"];

export interface CategoriaProducao {
  classe: string;
  tipo: string;
  subtipo: string;
}

/** O desenho de uma produção: miolo, borda e o ícone (traçado numa grade 24×24). */
/** Anel institucional da marca (2ª borda, por fora): largura e vão, como fração do raio do círculo
 * (miolo + borda do tipo). O total da marca é `raio × FATOR_ANEL`. */
export const ANEL_LARGURA = 0.15;
export const ANEL_VAO = 0.05;
export const FATOR_ANEL = 1 + ANEL_VAO + ANEL_LARGURA;

export interface Marca {
  fill: string;
  borda: string;
  /** Traçado SVG (atributo `d`) do ícone do subtipo. */
  icone: string;
  corIcone: string;
}

export interface Chaves {
  classe: string;
  tipo: string;
  /** `tipo||subtipo` — a mesma chave da legenda. */
  subtipo: string;
}

export interface EntradaClasse {
  chave: string;
  rotulo: string;
  n: number;
}

export interface EntradaSubtipo {
  chave: string;
  rotulo: string;
  marca: Marca;
  n: number;
}

export interface GrupoTipo {
  chave: string;
  rotulo: string;
  /** Cor da borda do tipo. */
  borda: string;
  subtipos: EntradaSubtipo[];
  n: number;
}

export interface Esquema {
  marca: (c: CategoriaProducao) => Marca;
  chaves: (c: CategoriaProducao) => Chaves;
  /** Ordem dos subtipos na legenda e ao redor do projeto: por tipo, e dentro do tipo na ordem do
   * esquema (por família). */
  ordemSubtipo: (chave: string) => number;
  /** Nome e cor (a da borda do tipo, escura o bastante para texto) de um subtipo — o rótulo do cacho. */
  rotuloSubtipo: (chave: string) => { rotulo: string; cor: string };
  legenda: (presentes: CategoriaProducao[]) => { classes: EntradaClasse[]; tipos: GrupoTipo[] };
}

const CINZA = "#6f6c65"; // escuro o bastante para o ícone branco contrastar
const BORDA_CINZA = "#5c5a54";
/** Ícone "?" (MDI `help`): o subtipo que o esquema não conhece. */
const ICONE_INTERROGACAO =
  "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z";

export function montarEsquema(dados: EsquemaProducaoDados | null): Esquema {
  const porChave = new Map<string, EsquemaProducaoDados["subtipos"][number]>();
  const ordem = new Map<string, number>();
  const tipo = new Map<string, EsquemaProducaoDados["tipos"][number]>();
  const ordemTipo = new Map<string, number>();
  dados?.tipos.forEach((t, i) => {
    tipo.set(t.chave, t);
    ordemTipo.set(t.chave, i);
  });
  dados?.subtipos.forEach((s, i) => {
    porChave.set(`${s.tipo}||${s.subtipo}`, s);
    ordem.set(`${s.tipo}||${s.subtipo}`, (ordemTipo.get(s.tipo) ?? 9) * 100 + i);
  });

  const marca = (c: CategoriaProducao): Marca => {
    const s = porChave.get(`${c.tipo}||${c.subtipo}`);
    const borda = tipo.get(c.tipo)?.borda ?? BORDA_CINZA;
    if (!s) return { fill: CINZA, borda, icone: ICONE_INTERROGACAO, corIcone: "#ffffff" };
    return { fill: s.cor, borda, icone: s.icone_path, corIcone: s.texto };
  };

  const chaves = (c: CategoriaProducao): Chaves => ({
    classe: c.classe,
    tipo: c.tipo,
    subtipo: `${c.tipo}||${c.subtipo}`,
  });

  const ordemSubtipo = (chave: string) => ordem.get(chave) ?? 9999;
  const rotuloSubtipo = (chave: string) => {
    const s = porChave.get(chave);
    const t = tipo.get(chave.split("||")[0]);
    return { rotulo: s?.rotulo ?? chave.split("||")[1] ?? chave, cor: t?.borda ?? BORDA_CINZA };
  };

  const legenda: Esquema["legenda"] = (presentes) => {
    const classes = new Map<string, EntradaClasse>();
    const grupos = new Map<string, GrupoTipo>();
    for (const c of presentes) {
      const ec = classes.get(c.classe) ?? { chave: c.classe, rotulo: ROTULO_CLASSE[c.classe] ?? c.classe, n: 0 };
      ec.n += 1;
      classes.set(c.classe, ec);

      const def = tipo.get(c.tipo);
      const g = grupos.get(c.tipo) ?? { chave: c.tipo, rotulo: def?.rotulo ?? c.tipo, borda: def?.borda ?? BORDA_CINZA, subtipos: [], n: 0 };
      g.n += 1;
      const k = chaves(c).subtipo;
      let s = g.subtipos.find((x) => x.chave === k);
      if (!s) {
        s = { chave: k, rotulo: porChave.get(k)?.rotulo ?? c.subtipo, marca: marca(c), n: 0 };
        g.subtipos.push(s);
      }
      s.n += 1;
      grupos.set(c.tipo, g);
    }
    return {
      classes: [...classes.values()].sort((a, b) => ORDEM_CLASSE.indexOf(a.chave) - ORDEM_CLASSE.indexOf(b.chave)),
      tipos: [...grupos.values()]
        .sort((a, b) => (ordemTipo.get(a.chave) ?? 9) - (ordemTipo.get(b.chave) ?? 9))
        .map((g) => ({ ...g, subtipos: g.subtipos.sort((a, b) => ordemSubtipo(a.chave) - ordemSubtipo(b.chave)) })),
    };
  };

  return { marca, chaves, ordemSubtipo, rotuloSubtipo, legenda };
}
