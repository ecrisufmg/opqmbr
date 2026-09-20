import { MODOS_INSTITUICAO, type ModoInstituicao } from "../dados/ponte";

/**
 * A chave de como combinar as instituições marcadas (OU, Entre elas), abaixo da lista
 * de instituições dos dois mapas. `unidade` = "produções" ou "projetos".
 */
export default function SeletorModoInstituicao({
  modo,
  onModo,
  qtdMarcadas,
  unidade,
}: {
  modo: ModoInstituicao;
  onModo: (m: ModoInstituicao) => void;
  qtdMarcadas: number;
  unidade: string;
}) {
  const artigo = unidade === "projetos" ? "os" : "as";
  const nota: Record<ModoInstituicao, string> = {
    ou: `Entram ${artigo} ${unidade} de qualquer das instituições marcadas.`,
    entre: `Entram ${artigo} ${unidade} de uma instituição marcada em coautoria com pessoas que também atuam em outra marcada. Com duas marcadas, é a ligação entre elas em "Quem trabalha com quem".`,
  };
  return (
    <div className="atlas-filtros-modo filtro-modo">
      <div className="segmented" role="group" aria-label="Como combinar as instituições marcadas">
        {MODOS_INSTITUICAO.map((m) => (
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
        {nota[modo]}
        {modo !== "ou" && qtdMarcadas < 2 ? " Marque duas ou mais instituições para combinar." : ""}
      </p>
    </div>
  );
}
