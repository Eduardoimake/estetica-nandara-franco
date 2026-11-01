/**
 * Contato e WhatsApp.
 * Reúne o que antes estava em contato.js e whatsapp.js.
 */

import {
  CONTATO,
  HORARIOS,
  MSG_PADRAO,
  MSGS,
  SECOES_ORIGEM,
} from "../data/config.js";
import { $, $$, reduceMotion } from "./dom.js";

export { $, $$ };

/** Indica se a visitante prefere reduzir animações. */
export const reduce = reduceMotion;

/**
 * Monta o endereço do WhatsApp com a mensagem.
 * @param {string} [mensagem] Texto da mensagem.
 * @returns {string} URL pronta.
 */
export function urlWhats(mensagem) {
  return `https://wa.me/${CONTATO.tel}?text=${encodeURIComponent(
    mensagem || MSG_PADRAO
  )}`;
}

/**
 * Descobre de qual parte do site veio o clique.
 * @param {HTMLElement} elemento Botão ou link clicado.
 * @returns {string} Nome da seção ou vazio.
 */
function descobrirOrigem(elemento) {
  if (elemento.dataset.origem) return elemento.dataset.origem;

  const secao = elemento.closest("section[id]");

  if (secao && SECOES_ORIGEM[secao.id]) return SECOES_ORIGEM[secao.id];
  if (elemento.closest("header")) return SECOES_ORIGEM.header;
  if (elemento.closest("footer")) return SECOES_ORIGEM.footer;

  return "";
}

function comOrigem(mensagem, origem) {
  return origem ? `${mensagem} [Origem: ${origem}]` : mensagem;
}

function mensagemDe(elemento) {
  return (
    elemento.dataset.msg || MSGS[elemento.dataset.whats] || MSG_PADRAO
  );
}

/**
 * Registra o clique para analítica (se houver) e para eventos do site.
 * @param {string} origem Seção de origem.
 */
function registrarClique(origem) {
  window.dispatchEvent(
    new CustomEvent("whatsapp:clique", { detail: { origem } })
  );

  if (typeof window.plausible === "function") {
    window.plausible("WhatsApp", { props: { origem: origem || "n/d" } });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", { origem: origem || "n/d" });
  }
}

/**
 * Abre o WhatsApp com a mensagem pronta.
 * @param {string} mensagem Texto da mensagem.
 * @param {string} [origem] Seção de origem.
 */
export function abrirWhats(mensagem, origem = "") {
  registrarClique(origem);

  window.open(
    urlWhats(comOrigem(mensagem || MSG_PADRAO, origem)),
    "_blank",
    "noopener"
  );
}

/**
 * Ativa os botões e links com data-whats.
 * Links <a> recebem o href completo (funcionam até com clique direito).
 * Botões <button> abrem o WhatsApp por JavaScript.
 */
export function initWhats() {
  $$("a[data-whats]").forEach((link) => {
    const origem = descobrirOrigem(link);

    link.href = urlWhats(comOrigem(mensagemDe(link), origem));
    link.target = "_blank";
    link.rel = "noopener";
  });

  document.addEventListener("click", (evento) => {
    const alvo = evento.target.closest("[data-whats]");

    if (!alvo) return;

    const origem = descobrirOrigem(alvo);

    if (alvo.tagName === "A") {
      registrarClique(origem);
      return;
    }

    evento.preventDefault();
    abrirWhats(mensagemDe(alvo), origem);
  });
}

/** Preenche contato, mapa, Instagram e ano do rodapé. */
export function initContato() {
  const consultaMapa = encodeURIComponent(
    "R. Marcio S. Silva 37 Xerem Duque de Caxias RJ"
  );

  $("#ctEnd").textContent = CONTATO.endereco;
  $("#ctTel").textContent = CONTATO.telFmt;
  $("#ctTel").href = `tel:+${CONTATO.tel}`;
  $("#ctHor").textContent = HORARIOS;
  $("#ctMapa").href =
    "https://www.google.com/maps/search/?api=1&query=" + consultaMapa;
  $("#mapa").src =
    "https://www.google.com/maps?q=" + consultaMapa + "&output=embed";
  $("#ctIg").href = CONTATO.instagram;
  $("#ftIg").href = CONTATO.instagram;
  $("#ano").textContent = new Date().getFullYear();
}

/** Envia o formulário como mensagem pronta no WhatsApp. */
export function initFormulario() {
  $("#form").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = $("#fNome").value.trim();
    const objetivo = $("#fObj").value;
    const dia = $("#fDia").value;

    abrirWhats(
      `Olá, Nandara! Meu nome é ${nome}. Tenho interesse em: ${objetivo}. Prefiro atendimento na ${dia.toLowerCase()}. Pode me ajudar com a avaliação?`,
      "Contato (formulário)"
    );
  });
}