/**
 * Utilitários de contato, WhatsApp e acesso ao DOM.
 * Benefício: centraliza ações repetidas e mantém os pontos de
 * conversão do site consistentes em todas as seções.
 */

import {
  CONTATO,
  HORARIOS,
  MSG_PADRAO,
  MSGS,
} from "../data/config.js";

/**
 * Seleciona o primeiro elemento correspondente ao seletor.
 * Benefício: reduz repetição e facilita a leitura dos módulos.
 * @param {string} seletor Seletor CSS desejado.
 * @param {ParentNode} raiz Elemento base da busca.
 * @returns {Element|null} Elemento encontrado.
 */
export const $ = (seletor, raiz = document) => raiz.querySelector(seletor);

/**
 * Seleciona todos os elementos correspondentes ao seletor.
 * Benefício: permite percorrer listas de elementos com facilidade.
 * @param {string} seletor Seletor CSS desejado.
 * @param {ParentNode} raiz Elemento base da busca.
 * @returns {Element[]} Lista de elementos encontrados.
 */
export const $$ = (seletor, raiz = document) => [
  ...raiz.querySelectorAll(seletor),
];

/**
 * Indica se a visitante prefere reduzir animações.
 * Benefício: respeita a acessibilidade e a preferência do sistema.
 * @type {boolean}
 */
export const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Abre o WhatsApp com uma mensagem pronta para a Nandara.
 * Benefício: facilita o agendamento e identifica a origem do contato.
 * @param {string} mensagem Texto enviado automaticamente ao WhatsApp.
 * @returns {void}
 */
export function abrirWhats(mensagem) {
  window.open(
    "https://wa.me/" +
      CONTATO.tel +
      "?text=" +
      encodeURIComponent(mensagem || MSG_PADRAO),
    "_blank",
    "noopener"
  );
}

/**
 * Ativa todos os botões que possuem o atributo data-whats.
 * Benefício: permite que qualquer botão do site abra o WhatsApp
 * com a mensagem correta para a seção clicada.
 * @returns {void}
 */
export function initWhats() {
  document.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-whats]");

    if (!botao) return;

    evento.preventDefault();

    abrirWhats(
      botao.dataset.msg || MSGS[botao.dataset.whats] || MSG_PADRAO
    );
  });
}

/**
 * Preenche os dados de contato, mapa, Instagram e ano do rodapé.
 * Benefício: mantém as informações da clínica centralizadas na configuração.
 * @returns {void}
 */
export function initContato() {
  const consultaMapa = encodeURIComponent(
    "R. Marcio S. Silva 37 Xerem Duque de Caxias RJ"
  );

  $("#ctEnd").textContent = CONTATO.endereco;
  $("#ctTel").textContent = CONTATO.telFmt;
  $("#ctHor").textContent = HORARIOS;
  $("#ctMapa").href =
    "https://www.google.com/maps/search/?api=1&query=" + consultaMapa;
  $("#mapa").src =
    "https://www.google.com/maps?q=" + consultaMapa + "&output=embed";
  $("#ctIg").href = CONTATO.instagram;
  $("#ftIg").href = CONTATO.instagram;
  $("#ano").textContent = new Date().getFullYear();
}

/* =========================================================
   FORMULÁRIO DE CONTATO
   Objetivo: transformar nome, objetivo e dia preferido
   em uma mensagem pronta para o WhatsApp.
   ========================================================= */

/**
 * Inicializa o envio do formulário pelo WhatsApp.
 * Benefício: permite que a visitante solicite avaliação sem
 * precisar digitar a mensagem manualmente.
 * @returns {void}
 */
export function initFormulario() {
  $("#form").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = $("#fNome").value.trim();
    const objetivo = $("#fObj").value;
    const dia = $("#fDia").value;

    abrirWhats(
      `Olá, Nandara! Meu nome é ${nome}. Tenho interesse em: ${objetivo}. Prefiro atendimento na ${dia.toLowerCase()}. Pode me ajudar com a avaliação?`
    );
  });
}