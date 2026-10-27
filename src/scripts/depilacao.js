/**
 * Comparador de pacotes de depilação.
 * Benefício: ajuda a visitante a comparar áreas, sessões e valores
 * antes de entrar em contato pelo WhatsApp.
 */

import { PRECOS } from "../data/config.js";
import { $, abrirWhats } from "./contato.js";

let modal = null;
let elementoFocado = null;

/* =========================================================
   COMPARADOR DE PACOTES
   Objetivo: montar tabela, seleção e envio do pacote escolhido.
   ========================================================= */

/**
 * Fecha o modal do comparador e devolve o foco ao elemento anterior.
 * Benefício: melhora a navegação por teclado e a experiência de uso.
 * @returns {void}
 */
export function fecharModal() {
  if (!modal || !modal.classList.contains("open")) return;

  modal.classList.remove("open");

  if (elementoFocado) {
    elementoFocado.focus();
  }
}

/**
 * Inicializa o comparador de pacotes de depilação.
 * Benefício: apresenta as opções de forma organizada e direciona
 * a visitante para o WhatsApp com o pacote escolhido.
 * @returns {void}
 */
export function initComparador() {
  modal = $("#modal");
  const pacotes = PRECOS.pacotes;

  const areas = [
    ...new Set(pacotes.flatMap((pacote) => pacote.itens.map((item) => item[0]))),
  ];

  $("#tbl").innerHTML =
    `<tr style="--i:0"><th>Área</th>${pacotes
      .map(
        (pacote) =>
          `<th>${pacote.medalha} ${pacote.nome}</th>`
      )
      .join("")}</tr>` +
    areas
      .map(
        (area, indice) =>
          `<tr style="--i:${indice + 1}"><td>${area}</td>${pacotes
            .map((pacote) => {
              const item = pacote.itens.find(
                (entrada) => entrada[0] === area
              );

              return `<td>${item ? item[1] + " sessões" : "—"}</td>`;
            })
            .join("")}</tr>`
      )
      .join("") +
    `<tr style="--i:${areas.length + 1}"><td>Valor</td>${pacotes
      .map(
        (pacote) =>
          `<td><strong>10x de R$ ${pacote.parcela}</strong></td>`
      )
      .join("")}</tr>`;

  $("#mSel").innerHTML = pacotes
    .map(
      (pacote) =>
        `<option value="${pacote.nome}">Pacote ${pacote.nome} — 10x de R$ ${pacote.parcela}</option>`
    )
    .join("");

  /**
   * Abre o modal do comparador e prepara o foco para acessibilidade.
   * Benefício: permite comparar os pacotes sem sair da página.
   * @returns {void}
   */
  function abrirModal() {
    elementoFocado = document.activeElement;

    modal.classList.add("open");
    $("#mClose").focus();

    const tabela = $("#tbl");
    tabela.innerHTML = tabela.innerHTML;
  }

  $("#btnComparar").onclick = abrirModal;
  $("#mClose").onclick = fecharModal;

  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      fecharModal();
    }
  });

  $("#mSend").onclick = () =>
    abrirWhats(
      `Olá, Nandara! Tenho interesse no Pacote ${$("#mSel").value} de depilação. Pode me passar mais informações?`
    );
}