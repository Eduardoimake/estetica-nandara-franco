/**
 * Galeria, comparador antes/depois e carrossel de resultados.
 * Benefício: apresenta provas sociais e o espaço da clínica
 * de forma visual e interativa.
 */

import { $, $$ } from "./contato.js";

let lightbox = null;
let lightboxBox = null;

/* =========================================================
   LIGHTBOX
   Objetivo: ampliar imagens ou rótulos da galeria do espaço.
   ========================================================= */

/**
 * Fecha o lightbox aberto.
 * Benefício: permite retornar rapidamente à navegação normal.
 * @returns {void}
 */
export function fecharLb() {
  if (lightbox) {
    lightbox.classList.remove("open");
  }
}

/**
 * Inicializa o lightbox da galeria.
 * Benefício: permite ampliar imagens com clique, Enter ou espaço.
 * @returns {void}
 */
export function initLightbox() {
  lightbox = $("#lb");
  lightboxBox = $("#lbBox");

  /**
   * Abre o lightbox com a imagem ou o texto do elemento escolhido.
   * Benefício: dá destaque ao conteúdo sem recarregar a página.
   * @param {HTMLElement} elemento Elemento da galeria clicado.
   * @returns {void}
   */
  function abrirLb(elemento) {
    lightboxBox.innerHTML = "";

    const imagem = $("img", elemento);

    if (imagem) {
      const novaImagem = document.createElement("img");
      novaImagem.src = imagem.src;
      novaImagem.alt = imagem.alt;
      lightboxBox.appendChild(novaImagem);
    } else {
      lightboxBox.textContent = elemento.textContent.trim();
    }

    lightbox.classList.add("open");
  }

  $$(".mos").forEach((mosaico) => {
    mosaico.onclick = () => abrirLb(mosaico);

    mosaico.onkeydown = (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirLb(mosaico);
      }
    };
  });

  $("#lbClose").onclick = fecharLb;

  lightbox.addEventListener("click", (evento) => {
    if (evento.target === lightbox) {
      fecharLb();
    }
  });
}

/* =========================================================
   ANTES E DEPOIS
   Objetivo: controlar a posição do comparador arrastável.
   ========================================================= */

/**
 * Inicializa o comparador visual de antes e depois.
 * Benefício: permite demonstrar resultados de forma interativa.
 * @returns {void}
 */
export function initAntesDepois() {
  const comparador = $("#ba");

  $("input", comparador).addEventListener("input", (evento) => {
    comparador.style.setProperty("--pos", evento.target.value + "%");
  });
}

/* =========================================================
   CARROSSEL ARRASTÁVEL
   Objetivo: permitir navegação horizontal pelo mouse.
   ========================================================= */

/**
 * Inicializa o carrossel arrastável de resultados.
 * Benefício: facilita a visualização de mais fotos sem botões extras.
 * @returns {void}
 */
export function initCarrossel() {
  const carrossel = $("#carousel");
  let arrastando = false;
  let posicaoInicialX = 0;
  let rolagemInicial = 0;

  carrossel.addEventListener("pointerdown", (evento) => {
    if (evento.pointerType === "touch") return;

    arrastando = true;
    posicaoInicialX = evento.clientX;
    rolagemInicial = carrossel.scrollLeft;
    carrossel.classList.add("drag");
  });

  addEventListener("pointerup", () => {
    arrastando = false;
    carrossel.classList.remove("drag");
  });

  addEventListener("pointermove", (evento) => {
    if (arrastando) {
      carrossel.scrollLeft =
        rolagemInicial - (evento.clientX - posicaoInicialX);
    }
  });
}