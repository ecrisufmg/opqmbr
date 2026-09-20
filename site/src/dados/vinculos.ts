/**
 * Vínculo da pessoa com o programa em cada autoria (Docente, Discente, Egresso…), para o filtro
 * "vínculo" dos dois mapas. O vocabulário e a ordem vêm dos dados (`vinculos` em
 * `producoes_mapa.json` e `vinculo_projetos.json`, a mesma lista de `analise/build_public.py`);
 * cada categoria é um bit da máscara `vinc`.
 */

/** Máscara das categorias marcadas (0 = nenhuma marcada). */
export function mascaraDeVinculos(sel: ReadonlySet<string>, vocabulario: readonly string[]): number {
  let m = 0;
  vocabulario.forEach((v, j) => {
    if (sel.has(v)) m |= 1 << j;
  });
  return m;
}

/**
 * Como combinar as categorias marcadas, olhando os autores de UMA produção:
 *  - `ou`: ao menos um autor tem algum dos vínculos marcados (união);
 *  - `e`: a produção reúne todos os vínculos marcados, cada um em algum autor (interseção:
 *    "Docente E Discente" = produção conjunta de docente e discente);
 *  - `so`: todos os autores têm vínculo entre os marcados (nenhum autor de fora do grupo).
 * Símbolos: ∪ união, ∩ interseção, ⊆ "contido em" (os autores cabem dentro do grupo marcado).
 */
export type ModoVinculo = "ou" | "e" | "so";

export const MODOS_VINCULO: ReadonlyArray<{ modo: ModoVinculo; simbolo: string; rotulo: string; dica: string }> = [
  { modo: "ou", simbolo: "∪", rotulo: "Qualquer (OU)", dica: "Produções com pelo menos um autor de qualquer das categorias marcadas" },
  { modo: "e", simbolo: "∩", rotulo: "Todas juntas (E)", dica: "Produções que reúnem, entre os autores, todas as categorias marcadas" },
  { modo: "so", simbolo: "⊆", rotulo: "Só estas", dica: "Produções em que todos os autores são de categorias marcadas" },
];

/** A máscara de vínculos de UMA produção passa no filtro? `sel` = 0 (nada marcado) passa tudo. */
export function passaVinculo(mascara: number, sel: number, modo: ModoVinculo): boolean {
  if (sel === 0) return true;
  if (modo === "e") return (mascara & sel) === sel;
  if (modo === "so") return mascara !== 0 && (mascara & ~sel) === 0;
  return (mascara & sel) !== 0;
}

/** Quantas máscaras têm o bit de cada categoria ligado. */
export function contarVinculos(mascaras: Iterable<number>, vocabulario: readonly string[]): number[] {
  const n = new Array<number>(vocabulario.length).fill(0);
  for (const m of mascaras) {
    if (!m) continue;
    for (let j = 0; j < n.length; j++) if (m & (1 << j)) n[j]++;
  }
  return n;
}

/** Nome do vínculo → dica curta, para o `title` dos chips. Categorias novas ficam sem dica. */
export const DICA_VINCULO: Record<string, string> = {
  Docente: "Docente do programa",
  Discente: "Discente (mestrado, doutorado ou graduação) do programa",
  Egresso: "Egresso do programa",
  "Pós-doc": "Pesquisador de pós-doutorado",
  "Participante externo": "Pessoa de fora do programa",
  "Sem vínculo": "A Plataforma registra a autoria sem vínculo com o programa",
};
