/**
 * Ponto de entrada do site.
 * Benefício: centraliza a inicialização dos módulos sem misturar
 * estilos, renderização, interações, efeitos e regras de negócio.
 */

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/animations.css";
import "./styles/responsive.css";

/* Módulos de contato, conteúdo e interações gerais. */
import { initWhats, initContato, initFormulario } from "./scripts/contato.js";
import { renderizarConteudo, aplicarFotos } from "./scripts/render.js";
import {
  initPreloaderProgresso,
  initMenu,
  initScrollspy,
  initReveal,
} from "./scripts/interactions.js";

/* Efeitos visuais exclusivos do Hero. */
import {
  initDigitacao,
  initParticulas,
  initTiltEBrilho,
} from "./scripts/hero-effects.js";

/* Módulos das seções comerciais e de conteúdo. */
import { initClub } from "./scripts/club.js";
import { initComparador } from "./scripts/depilacao.js";
import {
  initAntesDepois,
  initCarrossel,
  initLightbox,
} from "./scripts/galeria.js";
import { initFaq } from "./scripts/faq.js";

/**
 * Carrega o guia somente quando solicitado pela URL.
 * Benefício: mantém os recursos da apresentação separados da experiência normal.
 * @returns {Promise<void>} Conclusão do carregamento opcional do guia.
 */
async function carregarGuia() {
  const parametros = new URLSearchParams(window.location.search);

  if (parametros.get("guia") !== "1") {
    return;
  }

  await import("./styles/guia.css");

  const { iniciarGuia } = await import("./scripts/guia.js");

  iniciarGuia();
}

/**
 * Registra uma eventual falha no carregamento do guia.
 * Benefício: facilita o diagnóstico sem interromper o funcionamento do site.
 * @param {unknown} erro Erro encontrado durante o carregamento.
 */
function relatarErroGuia(erro) {
  console.error("Não foi possível carregar o guia de apresentação:", erro);
}

/* Inicialização dos estilos, conteúdo e interações do site. */
initWhats();
initContato();
renderizarConteudo();
aplicarFotos();
initPreloaderProgresso();
initMenu();
initScrollspy();
initReveal();
initDigitacao();
initParticulas();
initTiltEBrilho();
initClub();
initComparador();
initAntesDepois();
initCarrossel();
initLightbox();
initFaq();
initFormulario();

/* O guia é carregado apenas com ?guia=1 na URL. */
carregarGuia().catch(relatarErroGuia);