/**
 * Utilitários de seleção de elementos do DOM.
 * Benefício: padroniza a busca por ids e classes em todo o projeto,
 * reduzindo repetição e facilitando a manutenção.
 */

/** Indica se a cliente prefere menos movimento na interface. */
export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Seleciona o primeiro elemento que corresponde ao seletor.
 * @param {string} seletor Seletor CSS, como "#id" ou ".classe".
 * @param {ParentNode} [raiz=document] Elemento base da busca.
 * @returns {Element|null} Elemento encontrado ou null.
 */
export function $(seletor, raiz = document) {
  return raiz.querySelector(seletor);
}

/**
 * Seleciona todos os elementos que correspondem ao seletor.
 * @param {string} seletor Seletor CSS, como ".classe".
 * @param {ParentNode} [raiz=document] Elemento base da busca.
 * @returns {Element[]} Array com todos os elementos encontrados.
 */
export function $$(seletor, raiz = document) {
  return Array.from(raiz.querySelectorAll(seletor));
}