/**
 * Conteúdo dinâmico do site.
 * Benefício: centraliza ícones, tratamentos, procedimentos, FAQ,
 * dias, turnos, palavras do Hero, rótulos da galeria e marquee.
 */

/* =========================================================
   ÍCONES DOS TRATAMENTOS
   Objetivo: fornecer os caminhos SVG usados nos cartões.
   ========================================================= */
export const ICONS = {
  gota:
    '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',
  chama:
    '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
  brilho:
    '<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800z"/><path d="M19 16v4M17 18h4"/>',
  folha:
    '<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z"/><path d="M5 19l8-8"/>',
  ondas:
    '<path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0"/>',
  relogio:
    '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  raio:
    '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
  coracao:
    '<path d="M12 20s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10z"/>',
};

/* =========================================================
   TRATAMENTOS
   Objetivo: definir os serviços exibidos na seção Tratamentos.
   Campos: n = nome, d = descrição, i = ícone, dest = destaque.
   ========================================================= */
export const TRAT = [
  {
    n: "Redução de gordura localizada",
    d: "Uma das especialidades da clínica. O protocolo é montado na avaliação, conforme o seu objetivo.",
    i: "chama",
    dest: true,
  },
  {
    n: "Flacidez",
    d: "Outra especialidade da clínica. Na avaliação, definimos o cuidado mais adequado para você.",
    i: "ondas",
    dest: true,
  },
  {
    n: "Limpeza de pele",
    d: "Cuidado facial para renovar o aspecto da pele, com avaliação individual.",
    i: "gota",
  },
  {
    n: "Rejuvenescimento",
    d: "Tratamentos faciais pensados para cuidar da pele de forma personalizada.",
    i: "brilho",
  },
  {
    n: "Tratamento para diástase",
    d: "Atendimento corporal com protocolo definido após avaliação.",
    i: "coracao",
  },
  {
    n: "Depilação à luz pulsada",
    d: "Opção de depilação com tecnologia de luz pulsada.",
    i: "raio",
  },
  {
    n: "Depilação à cera",
    d: "Depilação tradicional, feita com cuidado e atenção.",
    i: "folha",
  },
  {
    n: "Drenagem estética",
    d: "Técnica de massagem usada em protocolos corporais, definida na avaliação.",
    i: "relogio",
  },
];

/**
 * Procedimentos disponíveis no Club Slim.
 * Benefício: apresenta as opções sem prometer resultado específico.
 * @type {string[]}
 */
export const PROCS = [
  "Hidrolipo",
  "DrenoDetox",
  "Corrente Russa",
  "Massagem Modeladora",
  "Plataforma Vibratória",
  "Carboxiterapia",
  "Drenagem Estética",
  "Eletrolipólise",
  "Endermoterapia",
  "Pump Up Glúteos",
];

/**
 * Tipos de tratamento disponíveis para referência interna.
 * Benefício: mantém a lista organizada para futuras integrações
 * ou filtros, sem alterar o site atual.
 * @type {string[]}
 */
export const TIPOS = [
  "Gordura localizada",
  "Flacidez",
  "Limpeza de pele",
  "Rejuvenescimento",
  "Tratamento para diástase",
  "Depilação à luz pulsada",
  "Depilação à cera",
  "Drenagem estética",
];

/* =========================================================
   PERGUNTAS FREQUENTES
   Objetivo: responder dúvidas comuns e reduzir fricção
   no agendamento.
   ========================================================= */
export const FAQ = [
  [
    "Como funciona a avaliação?",
    "Você conversa com a Nandara sobre o seu objetivo, e juntas definem o protocolo mais adequado para você.",
  ],
  [
    "O Club Slim tem sessões semanais?",
    "Sim. O programa é mensal, com uma sessão por semana, em dia e horário agendados na unidade de Xerém.",
  ],
  [
    "Como faço para agendar?",
    "Pelo botão de WhatsApp, em qualquer parte do site. A mensagem já vai pronta.",
  ],
  [
    "Onde fica a clínica?",
    "No centro de Xerém, Duque de Caxias - RJ, próximo à Praça da Mantiquira. O endereço completo está na seção Contato.",
  ],
  [
    "Quais as formas de pagamento?",
    "O Club Slim tem valores para Pix ou dinheiro e para cartão. As condições dos pacotes de depilação são confirmadas no atendimento.",
  ],
  [
    "Qual o horário de atendimento?",
    "Consulte os horários pelo WhatsApp.",
  ],
];

/* =========================================================
   PLANEJADOR DO CLUB SLIM
   Objetivo: permitir que a visitante escolha dia e turno.
   ========================================================= */
export const DIAS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export const TURNOS = ["Manhã", "Tarde"];

/* =========================================================
   HERO
   Objetivo: alternar os diferenciais principais no efeito
   de digitação.
   ========================================================= */
export const PALAVRAS = [
  "Gordura localizada",
  "Flacidez",
  "Drenagem",
  "Limpeza de pele",
  "Depilação",
];

/* =========================================================
   GALERIA DO ESPAÇO
   Objetivo: definir os rótulos provisórios do mosaico.
   ========================================================= */
export const MOS_LABELS = [
  "Foto do espaço",
  "Sala de atendimento",
  "Equipamentos",
  "Ambiente",
  "Recepção",
  "Detalhes",
];

/* =========================================================
   MARQUEE
   Objetivo: reforçar serviços e diferenciais em movimento.
   ========================================================= */
export const MARQUEE_ITENS = [
  "Estética facial",
  "Estética corporal",
  "Club Slim",
  "Depilação",
  "Drenagem",
  "Limpeza de pele",
  "Atendimento com hora marcada",
];