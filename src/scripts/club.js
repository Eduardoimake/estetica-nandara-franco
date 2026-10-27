/**
 * Funcionalidades da seção Club Slim.
 * Benefício: apresenta o programa, anima o valor mensal e permite
 * que a visitante envie sua preferência de dia e turno pelo WhatsApp.
 */

import {
  PRECOS,
  MOSTRAR_SELO_OUTUBRO,
} from "../data/config.js";
import {
  DIAS,
  TURNOS,
} from "../data/conteudo.js";
import {
  $,
  $$,
  reduce,
  abrirWhats,
} from "./contato.js";

/* =========================================================
   CLUB SLIM
   Objetivo: controlar selo promocional, preço animado,
   forma de pagamento e planejamento semanal.
   ========================================================= */

/**
 * Inicializa todas as interações do Club Slim.
 * Benefício: torna a seção mais clara e facilita o agendamento.
 * @returns {void}
 */
export function initClub() {
  const selo = $("#selo");

  selo.style.display = MOSTRAR_SELO_OUTUBRO ? "inline-block" : "none";

  const priceVal = $("#priceVal");
  let precoAtual = 0;

  /**
   * Anima a transição entre os valores do Club Slim.
   * Benefício: dá sensação de atualização natural ao trocar
   * entre Pix/dinheiro e cartão.
   * @param {number} alvo Valor final a ser exibido.
   * @returns {void}
   */
  function animaPreco(alvo) {
    if (reduce) {
      priceVal.textContent = alvo;
      precoAtual = alvo;
      return;
    }

    const inicial = precoAtual;
    const tempoInicial = performance.now();
    const duracao = 700;

    (function animar(tempo) {
      const progresso = Math.min(1, (tempo - tempoInicial) / duracao);
      const suavizacao = 1 - Math.pow(1 - progresso, 3);

      precoAtual = Math.round(
        inicial + (alvo - inicial) * suavizacao
      );

      priceVal.textContent = precoAtual;

      if (progresso < 1) {
        requestAnimationFrame(animar);
      }
    })(tempoInicial);
  }

  let precoIniciado = false;

  new IntersectionObserver(
    (entradas, observador) => {
      if (entradas[0].isIntersecting && !precoIniciado) {
        precoIniciado = true;
        animaPreco(PRECOS.clubPix);
        observador.disconnect();
      }
    },
    { threshold: 0.4 }
  ).observe($(".price-box"));

  $$(".toggle button").forEach((botao) => {
    botao.onclick = () => {
      $$(".toggle button").forEach((item) => {
        item.classList.toggle("on", item === botao);
        item.setAttribute("aria-selected", item === botao);
      });

      const cartao = botao.dataset.pay === "cartao";

      animaPreco(cartao ? PRECOS.clubCartao : PRECOS.clubPix);
      $("#priceNote").textContent = cartao
        ? "No cartão."
        : "No dinheiro ou Pix.";
    };
  });

  let diaSelecionado = "";
  let turnoSelecionado = "";

  /**
   * Cria botões de escolha para dias ou turnos.
   * Benefício: ajuda a visitante a informar a preferência
   * sem precisar escrever no WhatsApp.
   * @param {HTMLElement} container Elemento que receberá os botões.
   * @param {string[]} opcoes Opções disponíveis.
   * @param {Function} aoEscolher Ação executada após a escolha.
   * @returns {void}
   */
  function chipBtns(container, opcoes, aoEscolher) {
    container.innerHTML = opcoes
      .map(
        (opcao) =>
          `<button type="button" class="chip-btn">${opcao}</button>`
      )
      .join("");

    $$("button", container).forEach((botao, indice) => {
      botao.onclick = () => {
        $$("button", container).forEach((item) =>
          item.classList.remove("on")
        );

        botao.classList.add("on");
        aoEscolher(opcoes[indice]);
      };
    });
  }

  /**
   * Atualiza a mensagem de preferência exibida no planejador.
   * Benefício: mostra à visitante exatamente o que será enviado.
   * @returns {void}
   */
  function atualizaPl() {
    $("#plOut").textContent =
      diaSelecionado && turnoSelecionado
        ? `Olá, Nandara! Quero agendar uma avaliação para o Club Slim. Prefiro ${diaSelecionado} pela ${turnoSelecionado.toLowerCase()}.`
        : "Selecione um dia e um turno.";
  }

  chipBtns($("#plDias"), DIAS, (valor) => {
    diaSelecionado = valor;
    atualizaPl();
  });

  chipBtns($("#plTurnos"), TURNOS, (valor) => {
    turnoSelecionado = valor;
    atualizaPl();
  });

  $("#plBtn").onclick = () => {
    if (!diaSelecionado || !turnoSelecionado) {
      $("#plOut").textContent =
        "Escolha um dia e um turno para continuar.";
      return;
    }

    abrirWhats(
      `Olá, Nandara! Quero agendar uma avaliação para o Club Slim. Prefiro ${diaSelecionado} pela ${turnoSelecionado.toLowerCase()}. Pode me confirmar a disponibilidade?`
    );
  };
}