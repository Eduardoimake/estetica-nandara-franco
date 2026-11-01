/**
 * Renderização do conteúdo dinâmico e aplicação das fotos.
 */

import {
  PRECOS,
  FOTOS,
  DEPILACAO_NOTA,
  CLUB_INFO,
} from "../data/config.js";
import {
  ICONS,
  TRAT,
  PROCS,
  FAQ,
  OBJETIVOS,
  MOS_LABELS,
  MARQUEE_ITENS,
} from "../data/conteudo.js";
import { $, $$, urlWhats } from "./contato.js";

/**
 * Escapa texto para uso seguro em HTML e atributos.
 * @param {unknown} texto Texto original.
 * @returns {string} Texto escapado.
 */
function esc(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const moeda = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Renderiza todo o conteúdo dinâmico do site. */
export function renderizarConteudo() {
  $("#gridTrat").innerHTML = TRAT.map((tratamento, indice) => {
    const mensagem = `Olá, Nandara! Gostaria de saber mais sobre: ${tratamento.n}.`;

    return `
      <article class="card glow-card reveal ${
        tratamento.dest ? "destaque" : ""
      }" style="--d:${(indice % 4) * 0.08}s">
        ${tratamento.dest ? '<span class="tag">Especialidade</span>' : ""}
        <div class="ico">
          <svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[tratamento.i]}</svg>
        </div>
        <h3>${esc(tratamento.n)}</h3>
        <p>${esc(tratamento.d)}</p>
        <a class="btn btn-outline" href="${esc(urlWhats(mensagem))}" data-whats="x" data-msg="${esc(
      mensagem
    )}" target="_blank" rel="noopener">Quero saber mais</a>
      </article>`;
  }).join("");

  $("#chips").innerHTML = PROCS.map(
    (procedimento, indice) =>
      `<span class="chip" style="--d:${indice * 0.07}s">${esc(procedimento)}</span>`
  ).join("");

  const infoClub = $("#clubInfo");

  if (CLUB_INFO.length) {
    infoClub.innerHTML = CLUB_INFO.map((item) => `<li>${esc(item)}</li>`).join("");
    infoClub.hidden = false;
  }

  const notaDepilacao = $("#depNota");

  if (DEPILACAO_NOTA) {
    notaDepilacao.textContent = DEPILACAO_NOTA;
    notaDepilacao.hidden = false;
  }

  $("#pkGrid").innerHTML = PRECOS.pacotes
    .map((pacote, indice) => {
      const mensagem = `Olá, Nandara! Tenho interesse no Pacote ${pacote.nome} de depilação. Pode me passar mais informações?`;

      return `
      <article class="pkg ${esc(pacote.id)} reveal" style="--d:${indice * 0.1}s">
        <div class="medal" aria-hidden="true">${pacote.medalha}</div>
        <h3>Pacote ${esc(pacote.nome)}</h3>
        <ul>${pacote.itens
          .map(
            (item) =>
              `<li>${item[1]} sessões de ${esc(item[0].toLowerCase())}</li>`
          )
          .join("")}</ul>
        <div class="de">10x de</div>
        <div class="val">R$ ${pacote.parcela}</div>
        <div class="total">Total: ${moeda(pacote.parcela * 10)}</div>
        <a class="btn" href="${esc(urlWhats(mensagem))}" data-whats="x" data-msg="${esc(
        mensagem
      )}" target="_blank" rel="noopener">Quero este pacote</a>
      </article>`;
    })
    .join("");

  $("#faqList").innerHTML = FAQ.map(
    (pergunta, indice) => `
      <div class="faq-item reveal">
        <button type="button" class="faq-q" id="fq${indice}" aria-expanded="false" aria-controls="fa${indice}">
          ${esc(pergunta[0])}<i aria-hidden="true">+</i>
        </button>
        <div class="faq-a" id="fa${indice}" role="region" aria-labelledby="fq${indice}" inert>
          <p>${esc(pergunta[1])}</p>
        </div>
      </div>`
  ).join("");

  $("#fObj").innerHTML = OBJETIVOS.map(
    (objetivo) => `<option>${esc(objetivo)}</option>`
  ).join("");

  $("#mosaic").innerHTML = MOS_LABELS.map(
    (rotulo, indice) =>
      `<div class="mos" data-img="espaco" data-idx="${indice}" tabindex="0" role="button" aria-label="Ampliar: ${esc(
        rotulo
      )}">
        <span>${esc(rotulo)}</span>
      </div>`
  ).join("");

  $("#carousel").innerHTML = [0, 1, 2, 3, 4]
    .map(
      (indice) =>
        `<div class="slide" data-img="resultados" data-idx="${indice}">
          <span>Resultado real<br>(foto autorizada)</span>
        </div>`
    )
    .join("");

  $("#marquee").innerHTML = MARQUEE_ITENS.map(
    (texto) => `<span>${esc(texto)}</span>`
  )
    .join("")
    .repeat(2);
}

/** Aplica as fotos configuradas nos espaços reservados. */
export function aplicarFotos() {
  $$("[data-img]").forEach((elemento) => {
    const chave = elemento.dataset.img;
    const valor = FOTOS[chave];
    const indice = +elemento.dataset.idx || 0;
    const url = Array.isArray(valor) ? valor[indice] : valor;

    if (!url) return;

    const textos = {
      hero: "Nandara Franco, esteticista",
      sobre: "Nandara Franco em atendimento",
      antes: "Foto antes do tratamento",
      depois: "Foto depois do tratamento",
      espaco: `Espaço da clínica em Xerém: ${MOS_LABELS[indice] || ""}`.trim(),
      resultados: `Resultado ${indice + 1} de cliente da Estética Nandara Franco`,
    };

    const imagem = document.createElement("img");
    imagem.src = url;
    imagem.alt = textos[chave] || "";
    imagem.decoding = "async";

    if (chave === "hero") {
      imagem.loading = "eager";
      imagem.fetchPriority = "high";
    } else {
      imagem.loading = "lazy";
    }

    elemento.prepend(imagem);

    $$(".photo-placeholder,span:not(.ba-tag)", elemento).forEach((item) =>
      item.remove()
    );
  });
}