/**
 * Integração com o WhatsApp.
 * Benefício: transforma cada botão do site em um canal direto de agendamento,
 * com mensagem pronta e identificação da seção de origem.
 */

import { CONTATO, MSGS } from '../data/config.js';

/** Mensagem enviada quando o botão não define uma mensagem específica. */
const MENSAGEM_PADRAO = MSGS.padrao;

/**
 * Abre o WhatsApp com uma mensagem pré-preenchida.
 * @param {string} [mensagem] Texto enviado para a clínica.
 */
export function abrirWhats(mensagem) {
  const texto = mensagem || MENSAGEM_PADRAO;
  const url = `https://wa.me/${CONTATO.tel}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank', 'noopener');
}

/**
 * Monta a mensagem final de um botão, incluindo a seção de origem.
 * Benefício: ajuda a Nandara a identificar de qual parte do site veio o contato.
 * @param {HTMLElement} botao Botão clicado com atributo data-whats.
 * @returns {string} Mensagem pronta para o WhatsApp.
 */
function montarMensagem(botao) {
  const chave = botao.dataset.whats;
  const mensagemEspecifica = botao.dataset.msg;
  const origem = botao.dataset.origem;

  if (mensagemEspecifica) {
    return origem ? `${mensagemEspecifica} Vim pelo site, pela seção ${origem}.` : mensagemEspecifica;
  }

  if (MSGS[chave]) {
    return MSGS[chave];
  }

  return origem
    ? `Olá, Nandara! Vim pelo site, pela seção ${origem}. Gostaria de agendar uma avaliação.`
    : MENSAGEM_PADRAO;
}

/**
 * Ativa todos os botões com o atributo data-whats.
 * Benefício: mantém o comportamento do WhatsApp centralizado em um único módulo.
 */
export function iniciarWhatsapp() {
  document.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-whats]');

    if (!botao) {
      return;
    }

    evento.preventDefault();
    abrirWhats(montarMensagem(botao));
  });
}