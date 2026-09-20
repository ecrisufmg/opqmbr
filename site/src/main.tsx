import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    {/* `BASE_URL` é "/" em desenvolvimento e o prefixo do repositório no GitHub Pages: sem o
        `basename`, o roteador não casa nenhuma rota sob o prefixo e o site sai com o <main> vazio. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
