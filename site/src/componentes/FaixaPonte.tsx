/**
 * Aviso de que o mapa está recortado por colaboração entre instituições (modo "Entre elas" do filtro
 * de instituição, também alcançado pelo link de "Quem trabalha com quem").
 * Sem ele, quem chega por um link veria menos marcas sem saber por quê.
 */
export default function FaixaPonte({
  siglas,
  unidade,
  onLimpar,
}: {
  siglas: string[];
  /** "produções" ou "projetos". */
  unidade: string;
  onLimpar: () => void;
}) {
  const lista = siglas.length === 2 ? `${siglas[0]} e ${siglas[1]}` : siglas.join(", ");
  const alvo = unidade === "projetos" ? "Projetos" : "Produções";
  return (
    <div className="atlas-faixa atlas-flutua" role="status">
      <span>
        {alvo} do quadriênio em coautoria com pessoas em comum entre <strong>{lista}</strong>
      </span>
      <button type="button" className="painel-fechar" onClick={onLimpar} aria-label="Remover este recorte" title="Remover este recorte">
        ✕
      </button>
    </div>
  );
}
