/**
 * Duas edições do mesmo código (docs/DEPLOY.md, "Edição pública e edição completa"):
 *
 *  - **pública** (padrão): o que vai ao ar em `https://ecris.cc/opqmbr/`. Sem "O campo em números" e sem
 *    "Conceito CAPES", e sem as notas da CAPES em nenhum arquivo de dados;
 *  - **completa**: tudo, para uso do autor. Nunca é publicada: `npm run build:completa` gera `dist-completa/`,
 *    que só é servido na máquina do autor (`servir_site_privado.sh`).
 *
 * A escolha é feita **na compilação** (`VITE_EDICAO`), não em tempo de execução: o Vite troca a constante e o
 * código das abas reservadas nem entra no pacote da edição pública. `analise/conferir_edicao.py` confere isso
 * no `dist/` antes de qualquer publicação.
 */
export const COMPLETA = import.meta.env.VITE_EDICAO === "completa";
