/**
 * Interações gerais do site.
 * Benefício: controla preloader, progresso, menu, destaque de
 * seção ativa e revelação suave dos elementos.
 */

import { $, $$, reduce } from "./contato.js";
import { fecharModal } from "./depilacao.js";
import { fecharLb } from "./galeria.js";

/* =========================================================
   PRELOADER, PROGRESSO E BOTÃO DE TOPO
   Objetivo: melhorar a sensação de carregamento e navegação.
   ========================================================= */

/**
 * Inicializa preloader, barra de progresso, cabeçalho fixo
 * e botão de retorno ao topo.
 * Benefício: dá feedback visual durante a rolagem e facilita
 * o retorno ao início da página.
 * @returns {void}
 */
export function initPreloaderProgresso() {
  addEventListener("load", () => {
    setTimeout(() => {
      $("#preloader").classList.add("gone");
    }, reduce ? 0 : 900);
  });

  const cabecalho = $("header");
  const progresso = $("#progress");
  const botaoTopo = $("#toTop");

  /**
   * Atualiza a barra de progresso e o estado do cabeçalho.
   * Benefício: orienta a visitante sobre a posição na página.
   * @returns {void}
   */
  function aoRolar() {
    const posicao = scrollY;
    const alturaRestante =
      document.documentElement.scrollHeight - innerHeight;

    progresso.style.width =
      (alturaRestante > 0 ? (posicao / alturaRestante) * 100 : 0) + "%";

    cabecalho.classList.toggle("scrolled", posicao > 40);
    botaoTopo.classList.toggle("show", posicao > 600);
  }

  addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  botaoTopo.onclick = () =>
    scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   MENU
   Objetivo: controlar abertura, fechamento e acessibilidade.
   ========================================================= */

/**
 * Inicializa o menu mobile e o fechamento por tecla Escape.
 * Benefício: melhora a navegação em celulares e encerra modais abertos.
 * @returns {void}
 */
export function initMenu() {
  const burger = $("#burger");
  const menu = $("#menu");

  /**
   * Abre ou fecha o menu conforme o estado atual.
   * Benefício: mantém o menu acessível e bloqueia a rolagem
   * enquanto estiver aberto.
   * @param {boolean} forcarEstado Estado opcional do menu.
   * @returns {void}
   */
  function toggleMenu(forcarEstado) {
    const aberto =
      forcarEstado ?? !menu.classList.contains("open");

    menu.classList.toggle("open", aberto);
    burger.classList.toggle("open", aberto);
    document.body.classList.toggle("menu-open", aberto);
    burger.setAttribute("aria-expanded", aberto);
  }

  burger.onclick = () => toggleMenu();

  $$("a", menu).forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      toggleMenu(false);
      fecharModal();
      fecharLb();
    }
  });
}

/* =========================================================
   SCROLLSPY
   Objetivo: destacar no menu a seção visível.
   ========================================================= */

/**
 * Inicializa o destaque automático do menu conforme a rolagem.
 * Benefício: ajuda a visitante a entender em qual parte do site está.
 * @returns {void}
 */
export function initScrollspy() {
  const menu = $("#menu");

  const secoes = [
    "inicio",
    "sobre",
    "tratamentos",
    "club",
    "depilacao",
    "resultados",
    "contato",
  ].map((id) => $("#" + id));

  const spy = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          $$("a", menu).forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entrada.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  secoes.forEach((secao) => secao && spy.observe(secao));
}

/* =========================================================
   REVELAÇÃO AO ROLAR
   Objetivo: dar entrada suave aos elementos marcados.
   ========================================================= */

/**
 * Inicializa a animação de revelação dos elementos.
 * Benefício: torna a navegação mais fluida e valoriza cada seção.
 * @returns {void}
 */
export function initReveal() {
  const revelador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          revelador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  $$(".reveal,.tl-item,.chips").forEach((elemento, indice) => {
    if (elemento.classList.contains("tl-item")) {
      elemento.style.transitionDelay = (indice % 5) * 0.08 + "s";
    }

    revelador.observe(elemento);
  });
}