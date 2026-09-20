/**
 * A "ponte" entre dois programas: as produções (e os projetos) do quadriênio em coautoria com
 * pessoas que também aparecem no outro programa. É a regra da aresta do cartograma de "Quem
 * trabalha com quem" (`build_rede_obras_por_tipo` em `analise/build_public.py`), e por isso o
 * número do filtro bate com a espessura da ligação. Cada produção pertence a um único programa;
 * a máscara `ponte` diz com quais OUTROS programas ela tem pessoas em comum.
 *
 * Na URL: `?ponte=UFMG,USP` (a ordem não importa).
 */

export type Ponte = [string, string];

/** `"UFMG,USP"` → par ordenado; `null` se ausente ou malformado. */
export function lerPonte(valor: string | null): Ponte | null {
  if (!valor) return null;
  const partes = valor.split(",").map((s) => s.trim()).filter(Boolean);
  if (partes.length !== 2 || partes[0] === partes[1]) return null;
  return partes.sort() as Ponte;
}

export function textoPonte(par: Ponte): string {
  return par.join(",");
}

/**
 * Como combinar as instituições marcadas no filtro de instituição:
 *  - `ou`: a produção é de qualquer das marcadas (união);
 *  - `entre`: é de uma marcada e tem pessoas em comum com ao menos OUTRA marcada (com duas
 *    marcadas, é exatamente a ligação entre elas em "Quem trabalha com quem").
 * Com menos de duas marcadas, `entre` age como `ou`. Símbolos: ∪ união; ∩ interseção de pares.
 * (Havia também "Com todas": exigia pessoas em comum com TODAS as outras marcadas. Foi retirado em
 * 2026-09-20 porque, nos testes do autor, não se distinguia de `entre` na prática.)
 */
export type ModoInstituicao = "ou" | "entre";

export const MODOS_INSTITUICAO: ReadonlyArray<{ modo: ModoInstituicao; simbolo: string; rotulo: string; dica: string }> = [
  { modo: "ou", simbolo: "∪", rotulo: "Qualquer (OU)", dica: "Produções de qualquer das instituições marcadas" },
  {
    modo: "entre",
    simbolo: "∩",
    rotulo: "Entre elas",
    dica: "Produções de uma instituição marcada em coautoria com pessoas que também atuam em outra marcada",
  },
];

/**
 * A produção (ou o projeto) do programa `sigla`, com a máscara `mascara` de outros programas com
 * pessoas em comum (bit j = `siglas[j]`), passa no filtro de instituição?
 */
export function passaInstituicoes(
  sigla: string,
  mascara: number,
  sel: ReadonlySet<string>,
  modo: ModoInstituicao,
  siglas: readonly string[] | null,
): boolean {
  if (sel.size === 0) return true;
  if (!sel.has(sigla)) return false;
  // Sem duas marcadas, ou sem a máscara carregada, só vale "ser de uma marcada".
  if (modo === "ou" || sel.size < 2 || !siglas) return true;
  let alvo = 0;
  for (const o of sel) {
    if (o === sigla) continue;
    const j = siglas.indexOf(o);
    if (j >= 0) alvo |= 1 << j; // instituição sem produções no arquivo: sem bit, nunca é ligação
  }
  return (mascara & alvo) !== 0;
}
