/**
 * Ponto de entrada do site.
 * Cada módulo roda isolado: se um falhar, os demais continuam funcionando.
 */

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import "./styles/acessibilidade.css";

import {
  $$,
  initWhats,
  initContato,
  initFormulario,
} from "./scripts/contato.js";
import { renderizarConteudo, aplicarFotos } from "./scripts/render.js";
import {
  initPreloaderProgresso,
  initMenu,
  initScrollspy,
  initReveal,
} from "./scripts/interactions.js";
import {
  initDigitacao,
  initParticulas,
  initTiltEBrilho,
} from "./scripts/hero-effects.js";
import { initClub } from "./scripts/club.js";
import { initComparador } from "./scripts/depilacao.js";
import {
  initAntesDepois,
  initCarrossel,
  initLightbox,
} from "./scripts/galeria.js";
import { initFaq } from "./scripts/faq.js";

/**
 * Executa uma etapa sem derrubar o restante do site.
 * @param {string} nome Nome da etapa, para diagnóstico.
 * @param {Function} funcao Função a executar.
 * @param {Function} [reserva] Ação executada se a etapa falhar.
 */
function executar(nome, funcao, reserva) {
  try {
    funcao();
  } catch (erro) {
    console.error(`Falha em "${nome}":`, erro);

    if (reserva) {
      try {
        reserva();
      } catch (erroReserva) {
        console.error(`Falha na reserva de "${nome}":`, erroReserva);
      }
    }
  }
}

async function carregarGuia() {
  const parametros = new URLSearchParams(window.location.search);

  if (parametros.get("guia") !== "1") {
    return;
  }

  await import("./styles/guia.css");

  const { iniciarGuia } = await import("./scripts/guia.js");

  iniciarGuia();
}

executar("preloader e progresso", initPreloaderProgresso, () => {
  document.getElementById("preloader")?.classList.add("gone");
});
executar("menu", initMenu);
executar("conteúdo", renderizarConteudo);
executar("fotos", aplicarFotos);
executar("contato", initContato);
executar("whatsapp", initWhats);
executar("scrollspy", initScrollspy);
executar("revelação", initReveal, () => {
  $$(".reveal,.tl-item,.chips").forEach((elemento) =>
    elemento.classList.add("visible")
  );
});
executar("digitação", initDigitacao);
executar("partículas", initParticulas);
executar("tilt", initTiltEBrilho);
executar("club", initClub);
executar("comparador", initComparador);
executar("antes e depois", initAntesDepois);
executar("carrossel", initCarrossel);
executar("lightbox", initLightbox);
executar("faq", initFaq);
executar("formulário", initFormulario);

carregarGuia().catch((erro) => {
  console.error("Não foi possível carregar o guia de apresentação:", erro);
});