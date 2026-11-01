/**
 * Interações gerais do site: preloader, progresso, menu,
 * destaque de seção ativa e revelação ao rolar.
 */

import { $, $$, reduce } from "./contato.js";
import { fecharModal } from "./depilacao.js";
import { fecharLb } from "./galeria.js";

/** Preloader, barra de progresso, cabeçalho fixo e botão de topo. */
export function initPreloaderProgresso() {
  const preloader = $("#preloader");

  function esconderPreloader() {
    preloader.classList.add("gone");
  }

  if (document.readyState === "complete") {
    setTimeout(esconderPreloader, reduce ? 0 : 300);
  } else {
    addEventListener("load", () => {
      setTimeout(esconderPreloader, reduce ? 0 : 300);
    });
  }

  /* Plano B: nunca deixa a tela de carregamento presa. */
  setTimeout(esconderPreloader, 3500);

  const cabecalho = $("header");
  const progresso = $("#progress");
  const botaoTopo = $("#toTop");

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

  botaoTopo.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
}

/** Menu mobile e fechamento por tecla Escape. */
export function initMenu() {
  const burger = $("#burger");
  const menu = $("#menu");
  const desktop = window.matchMedia("(min-width: 1200px)");

  function toggleMenu(forcarEstado) {
    const aberto =
      !desktop.matches &&
      (forcarEstado ?? !menu.classList.contains("open"));

    menu.classList.toggle("open", aberto);
    burger.classList.toggle("open", aberto);
    document.body.classList.toggle("menu-open", aberto);
    burger.setAttribute("aria-expanded", String(aberto));
    burger.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  burger.onclick = () => toggleMenu();

  $$("a", menu).forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  desktop.addEventListener("change", () => toggleMenu(false));

  addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      toggleMenu(false);
      fecharModal();
      fecharLb();
    }
  });
}

/** Destaca no menu a seção visível. */
export function initScrollspy() {
  const menu = $("#menu");

  const secoes = [
    "inicio",
    "sobre",
    "tratamentos",
    "club",
    "depilacao",
    "resultados",
    "espaco",
    "faq",
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

/** Revelação suave dos elementos ao rolar. */
export function initReveal() {
  const alvos = $$(".reveal,.tl-item,.chips");

  if (!("IntersectionObserver" in window)) {
    alvos.forEach((elemento) => elemento.classList.add("visible"));
    return;
  }

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

  alvos.forEach((elemento, indice) => {
    if (elemento.classList.contains("tl-item")) {
      elemento.style.transitionDelay = (indice % 5) * 0.08 + "s";
    }

    revelador.observe(elemento);
  });
}