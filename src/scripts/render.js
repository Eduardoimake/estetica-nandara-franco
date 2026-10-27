/**
 * Renderização do conteúdo dinâmico e aplicação das fotos.
 * Benefício: mantém textos, tratamentos, pacotes, FAQ e galeria
 * centralizados nos arquivos de configuração e conteúdo.
 */

import { PRECOS, FOTOS } from "../data/config.js";
import {
  ICONS,
  TRAT,
  PROCS,
  FAQ,
  MOS_LABELS,
  MARQUEE_ITENS,
} from "../data/conteudo.js";
import { $, $$ } from "./contato.js";

/* =========================================================
   RENDERIZAÇÃO DE CONTEÚDO
   Objetivo: montar tratamentos, Club Slim, pacotes, FAQ,
   mosaico, carrossel e marquee.
   ========================================================= */

/**
 * Renderiza todo o conteúdo dinâmico do site.
 * Benefício: permite atualizar serviços, preços e textos
 * sem editar manualmente o HTML.
 * @returns {void}
 */
export function renderizarConteudo() {
  $("#gridTrat").innerHTML = TRAT.map(
    (tratamento, indice) => `
      <article class="card glow-card reveal ${
        tratamento.dest ? "destaque" : ""
      }" style="--d:${(indice % 4) * 0.08}s">
        ${
          tratamento.dest
            ? '<span class="tag">Especialidade</span>'
            : ""
        }
        <div class="ico">
          <svg viewBox="0 0 24 24" aria-hidden="true">${
            ICONS[tratamento.i]
          }</svg>
        </div>
        <h3>${tratamento.n}</h3>
        <p>${tratamento.d}</p>
        <button class="btn btn-outline" data-whats="x" data-msg="Olá, Nandara! Gostaria de saber mais sobre: ${
          tratamento.n
        }.">Quero saber mais</button>
      </article>`
  ).join("");

  $("#chips").innerHTML = PROCS.map(
    (procedimento, indice) =>
      `<span class="chip" style="--d:${indice * 0.07}s">${procedimento}</span>`
  ).join("");

  $("#pkGrid").innerHTML = PRECOS.pacotes.map(
    (pacote, indice) => `
      <article class="pkg ${pacote.id} reveal" style="--d:${indice * 0.1}s">
        <div class="medal">${pacote.medalha}</div>
        <h3>Pacote ${pacote.nome}</h3>
        <ul>${pacote.itens
          .map(
            (item) =>
              `<li>${item[1]} sessões de ${item[0].toLowerCase()}</li>`
          )
          .join("")}</ul>
        <div class="de">10x de</div>
        <div class="val">R$ ${pacote.parcela}</div>
        <button class="btn" data-whats="x" data-msg="Olá, Nandara! Tenho interesse no Pacote ${
          pacote.nome
        } de depilação. Pode me passar mais informações?">Quero este pacote</button>
      </article>`
  ).join("");

  $("#faqList").innerHTML = FAQ.map(
    (pergunta, indice) => `
      <div class="faq-item reveal">
        <button class="faq-q" aria-expanded="false" aria-controls="fa${indice}">
          ${pergunta[0]}<i>+</i>
        </button>
        <div class="faq-a" id="fa${indice}">
          <p>${pergunta[1]}</p>
        </div>
      </div>`
  ).join("");

  $("#mosaic").innerHTML = MOS_LABELS.map(
    (rotulo, indice) =>
      `<div class="mos" data-img="espaco" data-idx="${indice}" tabindex="0" role="button" aria-label="Ampliar: ${rotulo}">
        <span>${rotulo}</span>
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
    (texto) => `<span>${texto}</span>`
  ).join("").repeat(2);
}

/* =========================================================
   FOTOS
   Objetivo: inserir imagens configuradas em FOTOS.
   ========================================================= */

/**
 * Aplica as fotos configuradas nos espaços reservados.
 * Benefício: permite que Eduardo adicione as imagens depois,
 * apenas editando o objeto FOTOS em config.js.
 * @returns {void}
 */
export function aplicarFotos() {
  $$("[data-img]").forEach((elemento) => {
    const chave = elemento.dataset.img;
    const valor = FOTOS[chave];

    const url = Array.isArray(valor)
      ? valor[+elemento.dataset.idx || 0]
      : valor;

    if (!url) return;

    const imagem = document.createElement("img");
    imagem.src = url;
    imagem.loading = "lazy";

    imagem.alt =
      {
        hero: "Nandara Franco, esteticista",
        sobre: "Nandara Franco em atendimento",
        antes: "Foto antes do tratamento",
        depois: "Foto depois do tratamento",
        espaco: "Espaço da clínica em Xerém",
        resultados: "Resultado de cliente",
      }[chave] || "";

    elemento.prepend(imagem);

    $$(".photo-placeholder,span:not(.ba-tag)", elemento).forEach(
      (item) => item.remove()
    );
  });
}