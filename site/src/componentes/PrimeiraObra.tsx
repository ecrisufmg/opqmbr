import { useState } from "react";
import type { CicloVida, CurvaPrimeiraObra } from "../dados/tipos";
import { pct } from "../dados/formato";

/**
 * Quanto tempo um projeto leva até a primeira obra (PLANO §4.4.2).
 *
 * A curva é a fração de projetos que **já produziram** em até k anos desde o início. É
 * Kaplan-Meier em anos discretos (`analise/ciclo_vida.py::curva_primeira_obra`): quem
 * ainda não produziu não é zero, é **censurado** — só se sabe que não produziu até 2024.
 * Dividir os que produziram pelo total subestimaria a curva justamente para os projetos
 * recentes.
 *
 * Só entram projetos iniciados a partir de 2020, porque a base só tem obras desde então:
 * para um projeto de 2012, a primeira obra que ela enxerga não é a primeira que existiu.
 */

const W = 640;
const H = 300;
const M = { top: 20, right: 90, bottom: 56, left: 48 };
const iw = W - M.left - M.right;
const ih = H - M.top - M.bottom;

export default function PrimeiraObra({ dados }: { dados: CicloVida["primeira_obra"] }) {
  const [sigla, setSigla] = useState("");
  const nac = dados.nacional;
  const prog = sigla ? dados.programas.find((p) => p.sigla === sigla) : undefined;
  const kMax = Math.max(...nac.curva.map((c) => c.k));

  const x = (k: number) => M.left + (kMax === 0 ? 0 : (k / kMax) * iw);
  const y = (v: number) => M.top + ih - v * ih;
  const caminho = (c: CurvaPrimeiraObra["curva"]) =>
    c.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.k)},${y(p.acumulada)}`).join(" ");

  const comCurva = dados.programas.filter((p) => p.n > 0).map((p) => p.sigla).sort();
  const ultimo = nac.curva[nac.curva.length - 1];

  return (
    <div>
      <div className="chart-controles">
        <label>
          Comparar com o programa{" "}
          <select value={sigla} onChange={(e) => setSigla(e.target.value)}>
            <option value="">— nenhum —</option>
            {comCurva.map((s) => (
              <option key={s} value={s}>
                {s} ({dados.programas.find((p) => p.sigla === s)?.n} projetos)
              </option>
            ))}
          </select>
        </label>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Fração de projetos que produziram em até k anos: ${nac.curva
          .map((c) => `${c.k} ano(s), ${pct(c.acumulada * 100, 0)}`)
          .join("; ")}`}
        style={{ width: "100%", maxWidth: W, height: "auto" }}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={M.left} x2={M.left + iw} y1={y(v)} y2={y(v)} stroke="var(--color-border)" strokeWidth={1} />
            <text x={M.left - 8} y={y(v)} textAnchor="end" dominantBaseline="middle" fontSize={11} fill="var(--color-text-muted)">
              {pct(v * 100, 0)}
            </text>
          </g>
        ))}
        {nac.curva.map((c) => (
          <g key={c.k}>
            <text x={x(c.k)} y={H - M.bottom + 18} textAnchor="middle" fontSize={11} fill="var(--color-text-muted)">
              {c.k === 0 ? "no ano" : `${c.k} ano${c.k > 1 ? "s" : ""}`}
            </text>
            <text x={x(c.k)} y={H - M.bottom + 34} textAnchor="middle" fontSize={10} fill="var(--color-text-muted)">
              n={c.em_risco}
            </text>
          </g>
        ))}
        <text x={M.left} y={H - 4} fontSize={10.5} fill="var(--color-text-muted)">
          tempo desde o início do projeto · n = projetos ainda observados naquele ponto
        </text>

        <path d={caminho(nac.curva)} fill="none" stroke="var(--color-text-muted)" strokeWidth={2} />
        {nac.curva.map((c) => (
          <circle key={c.k} cx={x(c.k)} cy={y(c.acumulada)} r={4.5} fill="var(--color-text-muted)" stroke="var(--color-surface)" strokeWidth={2}>
            <title>{`Brasil — em até ${c.k} ano(s): ${pct(c.acumulada * 100, 1)} (${c.eventos} produziram neste ponto, ${c.em_risco} em observação)`}</title>
          </circle>
        ))}
        <text x={x(ultimo.k) + 8} y={y(ultimo.acumulada)} dominantBaseline="middle" fontSize={11} fontWeight={600} fill="var(--color-text)">
          Brasil
        </text>

        {prog && prog.curva.length > 0 && (
          <>
            <path d={caminho(prog.curva)} fill="none" stroke="var(--serie-1)" strokeWidth={2} />
            {prog.curva.map((c) => (
              <circle key={c.k} cx={x(c.k)} cy={y(c.acumulada)} r={4.5} fill="var(--serie-1)" stroke="var(--color-surface)" strokeWidth={2}>
                <title>{`${prog.sigla} — em até ${c.k} ano(s): ${pct(c.acumulada * 100, 1)} (${c.eventos} produziram neste ponto, ${c.em_risco} em observação)`}</title>
              </circle>
            ))}
            <text
              x={x(prog.curva[prog.curva.length - 1].k) + 8}
              y={y(prog.curva[prog.curva.length - 1].acumulada) + (prog.curva[prog.curva.length - 1].acumulada === ultimo.acumulada ? 14 : 0)}
              dominantBaseline="middle"
              fontSize={11}
              fontWeight={600}
              fill="var(--color-text)"
            >
              {prog.sigla}
            </text>
          </>
        )}
      </svg>

      {sigla && prog && (
        <p className="chart-nota">
          {prog.sigla}: {prog.n} projeto{prog.n === 1 ? "" : "s"} iniciado{prog.n === 1 ? "" : "s"} desde 2020,{" "}
          {prog.n_com_obra} já com produção. Com poucos projetos, a curva varia bastante de um ponto ao
          seguinte.
        </p>
      )}

      <div className="tabela-rolavel" style={{ maxWidth: "36rem" }}>
        <table className="tabela-dados">
          <thead>
            <tr>
              <th>Até</th>
              <th className="num">Já produziram</th>
              <th className="num">Produziram neste ponto</th>
              <th className="num">Em observação</th>
            </tr>
          </thead>
          <tbody>
            {nac.curva.map((c) => (
              <tr key={c.k}>
                <td>{c.k === 0 ? "o ano do início" : `${c.k} ano${c.k > 1 ? "s" : ""} do início`}</td>
                <td className="num forte">{pct(c.acumulada * 100, 1)}</td>
                <td className="num">{c.eventos}</td>
                <td className="num">{c.em_risco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/** Texto de apoio da curva, para o balão "Como ler" da página. */
export function NotasPrimeiraProducao({ dados }: { dados: CicloVida["primeira_obra"] }) {
  const nac = dados.nacional;
  return (
    <>
      <h3>Quem entra na conta</h3>
      <p>
        Os <strong>{nac.n}</strong> projetos que começaram a partir de 2020, os únicos que a base acompanha
        desde o primeiro ano; {nac.n_com_obra} deles já têm alguma produção registrada.
      </p>
      <h3>Quem ainda não produziu</h3>
      <p>
        Esses projetos não entram na conta como se tivessem zero produção: só sabemos que não produziram até
        2024, e ainda podem produzir. Por isso, em cada ponto da curva, contam-se apenas os projetos que já
        tiveram tempo de ser acompanhados por aquele período, e a curva termina onde já não há projeto
        observado por tanto tempo.
      </p>
      <h3>Coerência dos dados</h3>
      <p>
        Nenhum projeto tem produção registrada antes do ano em que começou ({nac.n_lag_negativo} casos).
      </p>
    </>
  );
}
