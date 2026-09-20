import { execSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/** Commit da compilação, para ligar um site no ar ao código que o gerou (útil até as tags `v*` existirem).
 * Sem git (ou fora de um repositório) devolve "" e a página simplesmente não mostra a linha. */
function commit(): string {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

const COMPLETA = process.env.VITE_EDICAO === "completa";

/**
 * Edição pública: o `dist/` sai **sem** os dados das abas reservadas e sem as notas da CAPES em qualquer
 * arquivo (docs/DEPLOY.md, "Edição pública e edição completa"). Feito aqui, no fim da compilação, para valer
 * também quando o build roda no GitHub Actions. `analise/conferir_edicao.py` confere o resultado.
 *
 * Também copia `index.html` para `404.html`: o GitHub Pages serve esse arquivo em qualquer caminho que não
 * existe, e assim um link direto (`/opqmbr/mapa-de-projetos?projeto=…`) abre o site em vez de um erro.
 */
function edicaoPublica(): Plugin {
  let dist = "dist";
  return {
    name: "edicao-publica",
    apply: "build",
    configResolved(c) {
      dist = join(c.root, c.build.outDir);
    },
    closeBundle() {
      if (COMPLETA) return;
      const dados = join(dist, "data");
      for (const f of ["indices.json", "distribuicao_notas.json", "totais_nacionais.json"]) {
        rmSync(join(dados, f), { force: true });
      }
      const reescrever = (arquivo: string, editar: (d: any) => void) => {
        const caminho = join(dados, arquivo);
        if (!existsSync(caminho)) return;
        const d = JSON.parse(readFileSync(caminho, "utf-8"));
        editar(d);
        writeFileSync(caminho, JSON.stringify(d));
      };
      reescrever("programas.json", (lista: any[]) => {
        for (const p of lista) {
          delete p.nota_anterior;
          delete p.nota_2025;
          delete p.variacao;
        }
      });
      reescrever("cobertura.json", (d) => {
        for (const p of d.fora_da_base ?? []) delete p.nota_final;
      });
      if (existsSync(join(dist, "index.html"))) copyFileSync(join(dist, "index.html"), join(dist, "404.html"));
    },
  };
}

/**
 * Estatísticas de uso (Umami, sem cookies; docs/PLANO_UMAMI_PROTECAO.md). Injeta **uma** tag `<script>` no
 * `index.html` do build, e só quando as duas condições valem:
 *
 *  - é a edição **pública** (a completa nunca carrega rastreador: só roda na máquina do autor);
 *  - `VITE_UMAMI_SCRIPT_URL` e `VITE_UMAMI_WEBSITE_ID` existem (vêm de `site/.env.production`; variável vazia
 *    desliga). `npm run dev` e `vite preview` não passam por aqui (`apply: "build"`).
 *
 * Os atributos são os que a política de privacidade da página Sobre promete: só dispara em `ecris.cc`
 * (`data-domains`, comparado com o hostname), respeita o "Do Not Track" e corta a query string da URL.
 * `analise/conferir_edicao.py` confere o resultado antes de toda publicação.
 */
function estatisticas(env: Record<string, string>): Plugin {
  const src = env.VITE_UMAMI_SCRIPT_URL;
  const id = env.VITE_UMAMI_WEBSITE_ID;
  return {
    name: "estatisticas-umami",
    apply: "build",
    transformIndexHtml() {
      if (COMPLETA || !src || !id) return;
      return [
        {
          tag: "script",
          attrs: {
            defer: true,
            src,
            "data-website-id": id,
            "data-domains": "ecris.cc",
            "data-do-not-track": "true",
            "data-exclude-search": "true",
          },
          injectTo: "head",
        },
      ];
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react(), edicaoPublica(), estatisticas(env)],
    define: { __COMMIT__: JSON.stringify(commit()) },
    // Deploy no Caddy (docs/DEPLOY.md, caminhos A/B) serve na raiz do domínio —
    // base "/" por padrão. GitHub Pages (caminho C) serve projeto sob subpath
    // (`.../<repo>/`, inclusive com domínio custom herdado da conta), e o
    // workflow injeta VITE_BASE_PATH para isso. Todo fetch em tempo de execução
    // já usa import.meta.env.BASE_URL (site/src/dados/loaders.ts e afins), então
    // isto é o único lugar que precisa saber da diferença.
    base: process.env.VITE_BASE_PATH || "/",
    build: {
      outDir: COMPLETA ? "dist-completa" : "dist",
      sourcemap: false, // never expose sourcemaps in production (they can contain PII via bundle analysis)
    },
  };
});
