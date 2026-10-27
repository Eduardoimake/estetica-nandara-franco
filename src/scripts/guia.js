/**
 * Guia de apresentação do site.
 * Benefício: ajuda a apresentar cada seção à Nandara com explicações simples,
 * sem alterar o site normal das visitantes.
 */

import { $ } from './dom.js';

/** Roteiro explicativo das seções do site. */
const PASSOS = [
  {
    seletor: '#inicio',
    titulo: 'Primeira impressão',
    texto: 'Esta é a primeira dobra. Ela apresenta a clínica, a localização em Xerém e o botão principal de agendamento pelo WhatsApp.'
  },
  {
    seletor: '#sobre',
    titulo: 'História e confiança',
    texto: 'Aqui a Nandara conta sua trajetória. Essa seção cria conexão emocional e transmite experiência antes da cliente agendar.'
  },
  {
    seletor: '#tratamentos',
    titulo: 'Serviços principais',
    texto: 'Os cards mostram os tratamentos e destacam as especialidades: redução de gordura localizada e flacidez.'
  },
  {
    seletor: '#club',
    titulo: 'Club Slim',
    texto: 'Esta seção explica o programa mensal, o valor por forma de pagamento e permite escolher dia e turno para a avaliação.'
  },
  {
    seletor: '#depilacao',
    titulo: 'Pacotes de depilação',
    texto: 'Os quatro pacotes ficam visíveis com áreas, número de sessões e valores. O botão comparar abre uma tabela lado a lado.'
  },
  {
    seletor: '#resultados',
    titulo: 'Prova social',
    texto: 'Esta área está preparada para fotos autorizadas de antes e depois, além de um carrossel de resultados.'
  },
  {
    seletor: '#espaco',
    titulo: 'O espaço',
    texto: 'A galeria valoriza o ambiente da clínica. As fotos serão adicionadas depois no arquivo de configuração.'
  },
  {
    seletor: '#faq',
    titulo: 'Perguntas frequentes',
    texto: 'As dúvidas mais comuns são respondidas aqui, reduzindo objeções antes do contato.'
  },
  {
    seletor: '#contato',
    titulo: 'Conversão final',
    texto: 'Esta é a seção de decisão: endereço, WhatsApp, Instagram, horário, mapa e formulário que envia a mensagem pronta.'
  }
];

let passoAtual = 0;

/**
 * Exibe a dica correspondente ao passo atual do guia.
 * Benefício: orienta a apresentação sem precisar decorar o roteiro.
 */
function mostrarPasso() {
  const guia = $('#guia');
  const dica = $('#guiaDica');
  const contador = $('#guiaContador');

  if (!guia || !dica || !contador) return;

  document.querySelectorAll('.guia-destaque').forEach((item) => {
    item.classList.remove('guia-destaque');
  });

  const passo = PASSOS[passoAtual];
  const secao = document.querySelector(passo.seletor);

  if (secao) {
    secao.classList.add('guia-destaque');
    secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  dica.innerHTML = `<strong>${passo.titulo}</strong>${passo.texto}`;
  contador.textContent = `${passoAtual + 1} / ${PASSOS.length}`;
}

/**
 * Inicia o guia apenas quando a URL contém ?guia=1.
 * Benefício: mantém o guia invisível para as visitantes comuns do site.
 */
export function iniciarGuia() {
  const parametros = new URLSearchParams(window.location.search);

  if (parametros.get('guia') !== '1') return;

  const guia = $('#guia');
  const botaoProximo = $('#guiaProximo');
  const botaoAnterior = $('#guiaAnterior');
  const botaoFechar = $('#guiaFechar');

  if (!guia || !botaoProximo || !botaoAnterior || !botaoFechar) return;

  guia.hidden = false;
  mostrarPasso();

  botaoProximo.addEventListener('click', () => {
    passoAtual = (passoAtual + 1) % PASSOS.length;
    mostrarPasso();
  });

  botaoAnterior.addEventListener('click', () => {
    passoAtual = (passoAtual - 1 + PASSOS.length) % PASSOS.length;
    mostrarPasso();
  });

  botaoFechar.addEventListener('click', () => {
    guia.hidden = true;
    document.querySelectorAll('.guia-destaque').forEach((item) => {
      item.classList.remove('guia-destaque');
    });
  });
}