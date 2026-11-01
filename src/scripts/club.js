/**
 * Seção Club Slim: selo, preço animado, forma de pagamento
 * e planejador semanal.
 */

import { PRECOS, MOSTRAR_SELO, SELO } from "../data/config.js";
import { DIAS, TURNOS } from "../data/conteudo.js";
import { $, $$, reduce, abrirWhats } from "./contato.js";

/**
 * Indica se o selo ainda está dentro da validade.
 * @returns {boolean} Verdadeiro se deve aparecer.
 */
function seloVigente() {
  if (!MOSTRAR_SELO) return false;
  if (!SELO.ate) return true;

  const [ano, mes, dia] = SELO.ate.split("-").map(Number);
  const limite = new Date(ano, mes - 1, dia, 23, 59, 59);

  return new Date() <= limite;
}

export function initClub() {
  const selo = $("#selo");

  if (seloVigente()) {
    selo.textContent = SELO.texto;
    selo.hidden = false;
  } else {
    selo.hidden = true;
  }

  const priceVal = $("#priceVal");
  let precoAtual = 0;

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

      precoAtual = Math.round(inicial + (alvo - inicial) * suavizacao);
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
        item.setAttribute("aria-pressed", String(item === botao));
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

  function chipBtns(container, opcoes, aoEscolher) {
    container.innerHTML = opcoes
      .map(
        (opcao) =>
          `<button type="button" class="chip-btn" aria-pressed="false">${opcao}</button>`
      )
      .join("");

    $$("button", container).forEach((botao, indice) => {
      botao.onclick = () => {
        $$("button", container).forEach((item) => {
          item.classList.remove("on");
          item.setAttribute("aria-pressed", "false");
        });

        botao.classList.add("on");
        botao.setAttribute("aria-pressed", "true");
        aoEscolher(opcoes[indice]);
      };
    });
  }

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
      $("#plOut").textContent = "Escolha um dia e um turno para continuar.";
      return;
    }

    abrirWhats(
      `Olá, Nandara! Quero agendar uma avaliação para o Club Slim. Prefiro ${diaSelecionado} pela ${turnoSelecionado.toLowerCase()}. Pode me confirmar a disponibilidade?`,
      "Club Slim (planejador)"
    );
  };
}