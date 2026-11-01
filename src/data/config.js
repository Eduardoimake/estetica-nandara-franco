/*
 * Configuração editável do site.
 * Concentra contato, horários, preços, fotos, selo promocional
 * e mensagens de WhatsApp em um único arquivo.
*/

/* CONTATO
   Confirme o nome oficial da rua e o CEP no site dos Correios antes de publicar.
   Se alterar aqui, altere também o rodapé e o JSON-LD no index.html
   (o comando "npm run verificar" avisa se o telefone divergir). */
export const CONTATO = {
  nome: "Estética Nandara Franco",
  tel: "5521976470481",
  telFmt: "(21) 97647-0481",
  endereco:
    "R. Marcio S. Silva, 37 - Xerém, Duque de Caxias - RJ, 25250-410",
  instagram: "https://www.instagram.com/esteticanandarafranco",
};

/** Horário de atendimento exibido no site (confirmar com a Nandara). */
export const HORARIOS = "Segunda a sexta, das 09h às 19h. Sábado, das 09h às 14h";

/** Liga ou desliga o selo promocional. */
export const MOSTRAR_SELO = true;

/**
 * Selo promocional.
 * "ate" é a última data (AAAA-MM-DD) em que o selo aparece; depois some sozinho.
 */
export const SELO = {
  texto: "CONDIÇÃO ESPECIAL DE NOVEMBRO",
  ate: "2026-11-30",
};

/* PREÇOS */
export const PRECOS = {
  clubPix: 420,
  clubCartao: 450,
  pacotes: [
    {
      id: "bronze",
      nome: "Bronze",
      medalha: "🥉",
      itens: [["Axilas", 10]],
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

/**
 * Texto opcional exibido abaixo do título dos pacotes de depilação.
 * Exemplo: "Depilação à luz pulsada." (preencher após confirmar com a Nandara).
 * Deixe vazio para não exibir.
 */
export const DEPILACAO_NOTA = "";

/**
 * Lista opcional de informações do Club Slim (exibida abaixo do preço).
 * Exemplo: ["4 sessões por mês", "Sessões de 50 minutos"].
 * Deixe vazio para não exibir.
 */
export const CLUB_INFO = [];

/* FOTOS
   Os arquivos .webp são gerados por "npm run imagens". */
export const FOTOS = {
  hero: "/images/hero.jpg",
  sobre: "/images/sobre.jpg",
  antes: "/images/antes.webp",
  depois: "/images/depois.webp",
  espaco: [
    "/images/recepcao.webp",
    "/images/corredor.webp",
    "/images/sala-de-atendimento.webp",
  ],
  resultados: [
    "/images/resultado-1.webp",
    "/images/resultado-2.webp",
    "/images/resultado-3.webp",
    "/images/resultado-4.webp",
    "/images/resultado-5.webp",
  ],
};

/** Mensagem padrão enviada pelo WhatsApp. */
export const MSG_PADRAO =
  "Olá, Nandara! Vim pelo site e gostaria de agendar uma avaliação.";

/** Mensagens específicas por botão. */
export const MSGS = {
  padrao: MSG_PADRAO,
  club:
    "Olá, Nandara! Quero tirar dúvidas e agendar uma avaliação para o Club Slim.",
};

/** Nome da seção que aparece na mensagem, para a Nandara saber de onde veio o contato. */
export const SECOES_ORIGEM = {
  inicio: "Início",
  sobre: "Sobre",
  tratamentos: "Tratamentos",
  club: "Club Slim",
  depilacao: "Depilação",
  resultados: "Resultados",
  espaco: "Espaço",
  faq: "Dúvidas",
  contato: "Contato",
  header: "Cabeçalho",
  footer: "Rodapé",
};