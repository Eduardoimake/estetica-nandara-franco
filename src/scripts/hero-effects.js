/**
 * Efeitos visuais do Hero.
 * Benefício: cria uma primeira impressão premium com digitação,
 * partículas, tilt 3D e brilho interativo.
 */

import { PALAVRAS } from "../data/conteudo.js";
import { $, $$, reduce } from "./contato.js";

/* =========================================================
   DIGITAÇÃO
   Objetivo: alternar palavras de destaque no Hero.
   ========================================================= */

/**
 * Inicializa o efeito de digitação.
 * Benefício: comunica rapidamente os principais diferenciais
 * da Estética Nandara Franco.
 * @returns {void}
 */
export function initDigitacao() {
  const palavras = PALAVRAS;
  let indicePalavra = 0;
  let indiceCaractere = 0;
  let apagando = false;

  const typed = $("#typed");

  /**
   * Escreve e apaga as palavras do Hero em sequência.
   * Benefício: mantém a primeira dobra dinâmica sem recarregar a página.
   * @returns {void}
   */
  function type() {
    const palavra = palavras[indicePalavra];

    if (reduce) {
      typed.textContent = palavra;
      indicePalavra = (indicePalavra + 1) % palavras.length;
      return setTimeout(type, 2200);
    }

    typed.textContent = palavra.slice(0, indiceCaractere);

    if (!apagando && indiceCaractere < palavra.length) {
      indiceCaractere++;
    } else if (!apagando) {
      apagando = true;
      return setTimeout(type, 1400);
    } else if (apagando && indiceCaractere > 0) {
      indiceCaractere--;
    } else {
      apagando = false;
      indicePalavra = (indicePalavra + 1) % palavras.length;
    }

    setTimeout(type, apagando ? 40 : 85);
  }

  type();
}

/* =========================================================
   PARTÍCULAS
   Objetivo: criar conexões visuais no fundo do Hero.
   ========================================================= */

/**
 * Inicializa as partículas animadas do Hero.
 * Benefício: reforça a identidade visual premium sem afetar
 * a navegação da visitante.
 * @returns {void}
 */
export function initParticulas() {
  const canvas = $("#particles");

  if (!canvas || reduce) return;

  const contexto = canvas.getContext("2d");
  let largura;
  let altura;
  let particulas = [];
  let executando = true;

  /**
   * Ajusta o canvas e recria as partículas conforme o tamanho da tela.
   * Benefício: mantém o efeito responsivo em diferentes dispositivos.
   * @returns {void}
   */
  function size() {
    largura = canvas.width = canvas.offsetWidth;
    altura = canvas.height = canvas.offsetHeight;

    particulas = Array.from(
      { length: Math.min(55, Math.floor(largura / 22)) },
      () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
      })
    );
  }

  /**
   * Desenha as partículas e as conexões entre elas.
   * Benefício: cria profundidade e movimento no Hero.
   * @returns {void}
   */
  function frame() {
    if (executando) {
      contexto.clearRect(0, 0, largura, altura);

      particulas.forEach((particula) => {
        particula.x += particula.vx;
        particula.y += particula.vy;

        if (particula.y < -5) {
          particula.y = altura + 5;
          particula.x = Math.random() * largura;
        }

        contexto.beginPath();
        contexto.arc(
          particula.x,
          particula.y,
          particula.r,
          0,
          6.283
        );
        contexto.fillStyle = "rgba(98,230,200,.55)";
        contexto.fill();
      });

      for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
          const dx = particulas[i].x - particulas[j].x;
          const dy = particulas[i].y - particulas[j].y;
          const distancia = dx * dx + dy * dy;

          if (distancia < 9000) {
            contexto.strokeStyle =
              "rgba(98,230,200," +
              0.15 * (1 - distancia / 9000) +
              ")";
            contexto.beginPath();
            contexto.moveTo(particulas[i].x, particulas[i].y);
            contexto.lineTo(particulas[j].x, particulas[j].y);
            contexto.stroke();
          }
        }
      }
    }

    requestAnimationFrame(frame);
  }

  size();
  addEventListener("resize", size);

  new IntersectionObserver((entradas) => {
    executando = entradas[0].isIntersecting;
  }).observe(canvas);

  frame();
}

/* =========================================================
   TILT E BRILHO
   Objetivo: reagir ao movimento do ponteiro no Hero,
   cartões e botões principais.
   ========================================================= */

/**
 * Inicializa o efeito de inclinação e brilho interativo.
 * Benefício: dá sensação de modernidade e resposta ao toque/mouse.
 * @returns {void}
 */
export function initTiltEBrilho() {
  const tilt = $("#tilt");

  if (tilt && !reduce) {
    const areaVisual = tilt.parentElement;

    areaVisual.addEventListener("pointermove", (evento) => {
      const retangulo = tilt.getBoundingClientRect();
      const posX = (evento.clientX - retangulo.left) / retangulo.width;
      const posY = (evento.clientY - retangulo.top) / retangulo.height;

      tilt.style.transform = `rotateY(${
        (posX - 0.5) * 14
      }deg) rotateX(${(0.5 - posY) * 14}deg)`;

      tilt.style.setProperty("--mx", posX * 100 + "%");
      tilt.style.setProperty("--my", posY * 100 + "%");
    });

    areaVisual.addEventListener("pointerleave", () => {
      tilt.style.transform = "";
    });
  }

  document.addEventListener("pointermove", (evento) => {
    const cartao = evento.target.closest(".glow-card");

    if (!cartao) return;

    const retangulo = cartao.getBoundingClientRect();

    cartao.style.setProperty("--mx", evento.clientX - retangulo.left + "px");
    cartao.style.setProperty("--my", evento.clientY - retangulo.top + "px");
  });

  if (matchMedia("(hover:hover)").matches && !reduce) {
    $$(".btn-menta,.btn-primary").forEach((botao) => {
      botao.addEventListener("pointermove", (evento) => {
        const retangulo = botao.getBoundingClientRect();

        botao.style.transform = `translate(${
          (evento.clientX - retangulo.left - retangulo.width / 2) * 0.15
        }px,${
          (evento.clientY - retangulo.top - retangulo.height / 2) * 0.25
        }px)`;
      });

      botao.addEventListener("pointerleave", () => {
        botao.style.transform = "";
      });
    });
  }
}