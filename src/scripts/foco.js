/**
 * Mantém o foco do teclado dentro de janelas (modal e lightbox).
 */

const FOCAVEIS =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Prende o foco dentro do container.
 * @param {HTMLElement} container Janela que deve reter o foco.
 * @returns {Function} Função que remove a retenção.
 */
export function prenderFoco(container) {
  function aoTeclar(evento) {
    if (evento.key !== "Tab") return;

    const itens = Array.from(container.querySelectorAll(FOCAVEIS)).filter(
      (item) => item.getClientRects().length > 0
    );

    if (!itens.length) {
      evento.preventDefault();
      return;
    }

    const primeiro = itens[0];
    const ultimo = itens[itens.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  container.addEventListener("keydown", aoTeclar);

  return () => container.removeEventListener("keydown", aoTeclar);
}