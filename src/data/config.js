/**
 * Configuração editável do site.
 * Benefício: concentra contato, horários, preços, fotos, selo
 * promocional e mensagens de WhatsApp em um único arquivo.
 */

/* =========================================================
   CONTATO
   Objetivo: manter telefone, endereço e Instagram atualizados.
   ========================================================= */
export const CONTATO = {
  nome: "Estética Nandara Franco",
  tel: "5521976470481",
  telFmt: "(21) 97647-0481",
  endereco:
    "R. Marcio S. Silva, 37 - Xerém, Duque de Caxias - RJ, 25250-410",
  instagram: "https://www.instagram.com/esteticanandarafranco",
};

/**
 * Horário de atendimento exibido no site.
 * Benefício: permite atualizar o texto sem alterar o HTML.
 * @type {string}
 */
export const HORARIOS = "Consulte os horários pelo WhatsApp";

/**
 * Controla a exibição do selo promocional.
 * Benefício: permite ativar ou desativar a condição especial
 * sem remover o componente do site.
 * @type {boolean}
 */
export const MOSTRAR_SELO_OUTUBRO = true;

/* =========================================================
   PREÇOS
   Objetivo: centralizar valores do Club Slim e dos pacotes
   de depilação.
   ========================================================= */
export const PRECOS = {
  clubPix: 420,
  clubCartao: 450,
  pacotes: [
    {
      id: "bronze",
      nome: "Bronze",
      medalha: "🥉",
      itens: [["Axila", 10]],
      parcela: 65,
    },
    {
      id: "prata",
      nome: "Prata",
      medalha: "🥈",
      itens: [
        ["Virilha", 10],
        ["Região perianal", 10],
      ],
      parcela: 100,
    },
    {
      id: "ouro",
      nome: "Ouro",
      medalha: "🥇",
      itens: [
        ["Virilha", 10],
        ["Região perianal", 10],
        ["Axilas", 10],
        ["Buço", 10],
      ],
      parcela: 150,
    },
    {
      id: "diamante",
      nome: "Diamante",
      medalha: "💎",
      itens: [
        ["Perna completa", 10],
        ["Buço", 10],
      ],
      parcela: 160,
    },
  ],
};

/* =========================================================
   FOTOS
   Objetivo: reservar os caminhos das imagens do site.
   Benefício: permite adicionar as fotos depois sem alterar
   o HTML ou os scripts.
   ========================================================= */
export const FOTOS = {
  hero: "",
  sobre: "",
  antes: "",
  depois: "",
  espaco: [],
  resultados: [],
};

/**
 * Mensagem padrão enviada pelo WhatsApp.
 * Benefício: garante uma abordagem profissional quando o botão
 * não tiver uma mensagem específica.
 * @type {string}
 */
export const MSG_PADRAO =
  "Olá, Nandara! Vim pelo site e gostaria de agendar uma avaliação.";

/**
 * Mensagens específicas por seção do site.
 * Benefício: ajuda a Nandara a identificar a origem do contato.
 * @type {Object<string, string>}
 */
export const MSGS = {
  padrao: MSG_PADRAO,
  club:
    "Olá, Nandara! Quero tirar dúvidas e agendar uma avaliação para o Club Slim.",
};