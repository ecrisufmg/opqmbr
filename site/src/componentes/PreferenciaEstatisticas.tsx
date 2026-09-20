import { useState } from "react";

/** Chave que o rastreador do Umami lê ao carregar (docs/PLANO_UMAMI_PROTECAO.md, A0): quando existe e vale
 * "true", o script não conta a visita. A mesma chave é usada aqui e pelo próprio Umami. */
const CHAVE = "umami.disabled";

function ler(): boolean {
  try {
    return window.localStorage.getItem(CHAVE) === "true";
  } catch {
    return false;
  }
}

/** Grava (ou remove) a preferência; devolve se conseguiu. `try/catch`: o armazenamento pode estar
 * bloqueado (navegação privada estrita, por exemplo). */
function gravar(valor: boolean): boolean {
  try {
    if (valor) window.localStorage.setItem(CHAVE, "true");
    else window.localStorage.removeItem(CHAVE);
    return true;
  } catch {
    return false;
  }
}

/**
 * Botão de recusa das estatísticas de uso, mostrado na página Sobre **só da edição pública** (a completa
 * nunca carrega rastreador, então o botão não faria sentido). A preferência vale neste navegador e passa a
 * valer a partir da próxima página aberta, porque o rastreador só decide na carga da página.
 */
export default function PreferenciaEstatisticas() {
  const [desligado, setDesligado] = useState(ler);
  const [erro, setErro] = useState(false);

  function alternar() {
    const novo = !desligado;
    if (!gravar(novo)) {
      setErro(true);
      return;
    }
    setErro(false);
    setDesligado(novo);
  }

  return (
    <div className="estatisticas-preferencia">
      <p>
        {desligado
          ? "Você pediu para não ser contado. A preferência vale neste navegador, a partir da próxima página aberta."
          : "Você pode pedir para que suas visitas não sejam contadas."}
      </p>
      <button type="button" className="chip" onClick={alternar}>
        {desligado ? "Voltar a contar minhas visitas" : "Não contar minhas visitas"}
      </button>
      {erro && (
        <p className="chart-nota">
          Não foi possível gravar a preferência neste navegador (o armazenamento pode estar bloqueado). O
          sinal "Do Not Track" do navegador continua sendo respeitado.
        </p>
      )}
    </div>
  );
}
