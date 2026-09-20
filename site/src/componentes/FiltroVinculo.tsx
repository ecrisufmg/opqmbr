import { DICA_VINCULO, MODOS_VINCULO, type ModoVinculo } from "../dados/vinculos";

/**
 * O filtro "vínculo" dos dois mapas: chips de múltipla escolha (Docente, Discente, Egresso…) e
 * a chave de como combiná-los (OU, E, Só estas — ver `ModoVinculo`). O vínculo é o da autoria
 * naquela produção, não uma propriedade fixa da pessoa. Sem chip marcado, tudo aparece.
 */
export default function FiltroVinculo({
  vinculos,
  sel,
  contagens,
  unidade,
  modo,
  onModo,
  onAlternar,
}: {
  vinculos: readonly string[];
  sel: ReadonlySet<string>;
  /** Quantos itens têm cada vínculo (na ordem de `vinculos`). */
  contagens: readonly number[] | null;
  /** "produções" ou "projetos", para a nota. */
  unidade: string;
  modo: ModoVinculo;
  onModo: (m: ModoVinculo) => void;
  onAlternar: (v: string) => void;
}) {
  const nota: Record<ModoVinculo, string> = {
    ou: `Entram as ${unidade} com pelo menos um autor de qualquer das categorias marcadas.`,
    e: `Entram as ${unidade} em que as categorias marcadas aparecem juntas na mesma produção (por exemplo, docente e discente como coautores).`,
    so: `Entram as ${unidade} em que todos os autores são de categorias marcadas.`,
  };
  return (
    <details open className="atlas-sidebar-secao">
      <summary>Vínculo dos autores{sel.size > 0 ? ` (${sel.size})` : ""}</summary>
      <div className="atlas-filtros-chips">
        {vinculos.map((v, j) => (
          <button
            key={v}
            type="button"
            className={`chip${sel.has(v) ? " ativo" : ""}`}
            aria-pressed={sel.has(v)}
            title={DICA_VINCULO[v]}
            onClick={() => onAlternar(v)}
          >
            {v}
            {contagens ? ` (${contagens[j].toLocaleString("pt-BR")})` : ""}
          </button>
        ))}
      </div>
      <div className="filtro-modo">
        <div className="segmented" role="group" aria-label="Como combinar as categorias marcadas">
          {MODOS_VINCULO.map((m) => (
            <button
              key={m.modo}
              type="button"
              className={modo === m.modo ? "ativo" : ""}
              aria-pressed={modo === m.modo}
              title={m.dica}
              onClick={() => onModo(m.modo)}
            >
              <span className="modo-simbolo" aria-hidden="true">
                {m.simbolo}
              </span>
              {m.rotulo}
            </button>
          ))}
        </div>
        <p className="filtro-modo-nota">
          {nota[modo]} O vínculo é o da autoria naquela produção: a mesma pessoa pode ser docente num programa e
          participante externo noutro.
        </p>
      </div>
    </details>
  );
}
