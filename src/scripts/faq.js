/**
 * Funcionalidades da seção de perguntas frequentes.
 * Benefício: reduz dúvidas comuns e facilita a decisão de agendamento.
 */

import { $, $$ } from "./contato.js";

/* =========================================================
   FAQ
   Objetivo: abrir e fechar cada pergunta com animação suave.
   ========================================================= */

/**
 * Inicializa o comportamento de abrir e fechar as perguntas.
 * Benefício: mantém apenas uma resposta visível por vez,
 * sem sobrecarregar a leitura da visitante.
 * @returns {void}
 */
export function initFaq() {
  $$(".faq-item").forEach((item) => {
    const pergunta = $(".faq-q", item);
    const resposta = $(".faq-a", item);

    pergunta.onclick = () => {
      const aberto = item.classList.toggle("open");

      pergunta.setAttribute("aria-expanded", aberto);
      resposta.style.maxHeight = aberto
        ? resposta.scrollHeight + "px"
        : 0;
    };
  });
}