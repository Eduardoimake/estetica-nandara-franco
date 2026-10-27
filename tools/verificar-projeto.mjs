/**
 * Verificação estática dos arquivos do projeto.
 * Benefício: detecta arquivos ausentes, imports locais inválidos e referências
 * suspeitas antes de apresentar o site à cliente.
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../', import.meta.url));
const erros = [];

const esperados = [
  'package.json',
  'vite.config.js',
  '.nvmrc',
  '.gitignore',
  'src/data/config.js',
  'src/data/conteudo.js',
  'src/main.js',
  'src/scripts/dom.js',
  'src/scripts/whatsapp.js',
  'index.html',
  'src/styles/base.css',
  'src/styles/layout.css',
  'src/styles/components.css',
  'src/styles/animations.css',
  'src/styles/responsive.css',
  'src/styles/guia.css',
  'src/scripts/render.js',
  'src/scripts/interactions.js',
  'src/scripts/hero-effects.js',
  'src/scripts/club.js',
  'src/scripts/depilacao.js',
  'src/scripts/galeria.js',
  'src/scripts/faq.js',
  'src/scripts/contato.js',
  'src/scripts/guia.js',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/site.webmanifest',
  'public/favicon.svg',
  'public/images/logo.svg',
  'tools/atualizar-seo.mjs',
  'tools/verificar-projeto.mjs',
  'README.md'
];

/**
 * Apresenta um caminho relativo usando barras normais.
 * Benefício: mantém os relatórios legíveis no Windows e em outros sistemas.
 * @param {string} arquivo Caminho absoluto.
 * @returns {string} Caminho relativo para apresentação.
 */
function relativo(arquivo) {
  return path.relative(raiz, arquivo).split(path.sep).join('/');
}

/**
 * Lista os arquivos de uma pasta recursivamente.
 * Benefício: permite verificar todos os módulos sem uma lista manual de imports.
 * @param {string} pasta Caminho da pasta.
 * @returns {Promise<string[]>} Arquivos encontrados.
 */
async function listarArquivos(pasta) {
  if (!existsSync(pasta)) {
    return [];
  }

  const entradas = await readdir(pasta, { withFileTypes: true });
  const arquivos = [];

  for (const entrada of entradas) {
    const destino = path.join(pasta, entrada.name);

    if (entrada.isDirectory()) {
      arquivos.push(...await listarArquivos(destino));
    } else {
      arquivos.push(destino);
    }
  }

  return arquivos;
}

/**
 * Extrai caminhos de imports estáticos e dinâmicos.
 * Benefício: inclui estilos e módulos carregados apenas quando necessários.
 * @param {string} codigo Código JavaScript.
 * @returns {string[]} Referências encontradas.
 */
function extrairImports(codigo) {
  const referencias = [];
  const padroes = [
    /\bfrom\s*['"]([^'"]+)['"]/g,
    /\bimport\s*['"]([^'"]+)['"]/g,
    /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g
  ];

  for (const padrao of padroes) {
    for (const resultado of codigo.matchAll(padrao)) {
      referencias.push(resultado[1]);
    }
  }

  return Array.from(new Set(referencias));
}

/**
 * Verifica os arquivos obrigatórios e seus conteúdos.
 * Benefício: evita executar um projeto com arquivos faltando ou vazios.
 * @returns {Promise<void>} Conclusão da verificação.
 */
async function verificarArquivos() {
  for (const nome of esperados) {
    const arquivo = path.join(raiz, nome);

    if (!existsSync(arquivo)) {
      erros.push(`Arquivo ausente: ${nome}`);
      continue;
    }

    const informacoes = await stat(arquivo);

    if (!informacoes.isFile()) {
      erros.push(`O caminho não é um arquivo: ${nome}`);
      continue;
    }

    const conteudo = await readFile(arquivo, 'utf8');

    if (!conteudo.trim()) {
      erros.push(`Arquivo vazio: ${nome}`);
    }

    if (nome.endsWith('.svg') && !/<svg\b/i.test(conteudo)) {
      erros.push(`SVG sem elemento raiz: ${nome}`);
    }
  }
}

/**
 * Confere caminhos de imports sem confundir escapes com caminhos.
 * Benefício: identifica referências inválidas sem gerar os falsos alertas anteriores.
 * @param {string[]} arquivos Arquivos JavaScript do projeto.
 * @returns {Promise<Map<string, string>>} Código lido por arquivo.
 */
async function verificarImports(arquivos) {
  const codigos = new Map();

  for (const arquivo of arquivos) {
    const codigo = await readFile(arquivo, 'utf8');
    codigos.set(arquivo, codigo);

    for (const referencia of extrairImports(codigo)) {
      if (referencia.includes(String.fromCharCode(92))) {
        erros.push(`Barra invertida em import de ${relativo(arquivo)}: ${referencia}`);
        continue;
      }

      if (!referencia.startsWith('.')) {
        continue;
      }

      const caminhoLimpo = referencia.split('?')[0].split('#')[0];
      const destino = path.resolve(path.dirname(arquivo), caminhoLimpo);

      if (!existsSync(destino)) {
        erros.push(`Import ausente em ${relativo(arquivo)}: ${referencia}`);
      }
    }
  }

  return codigos;
}

/**
 * Confere seletores simples literais contra HTML e templates dos scripts.
 * Benefício: detecta erros de digitação em IDs e classes usados nas interações.
 * @param {Map<string, string>} codigos Código dos módulos.
 * @returns {Promise<void>} Conclusão da verificação.
 */
async function verificarSeletores(codigos) {
  const arquivoHtml = path.join(raiz, 'index.html');

  if (!existsSync(arquivoHtml)) {
    return;
  }

  const html = await readFile(arquivoHtml, 'utf8');
  const fonte = [html, ...codigos.values()].join('\n');
  const ids = new Set();
  const classes = new Set();

  for (const resultado of fonte.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) {
    ids.add(resultado[1]);
  }

  for (const resultado of fonte.matchAll(/\bclass\s*=\s*["']([^"']+)["']/g)) {
    for (const classe of resultado[1].split(/\s+/)) {
      classes.add(classe);
    }
  }

  for (const [arquivo, codigo] of codigos) {
    if (!relativo(arquivo).startsWith('src/')) {
      continue;
    }

    const padrao = /\${1,2}\(\s*(['"])([#.][\w-]+)\1/g;

    for (const resultado of codigo.matchAll(padrao)) {
      const seletor = resultado[2];
      const nome = seletor.slice(1);
      const existe = seletor.startsWith('#') ? ids.has(nome) : classes.has(nome);

      if (!existe) {
        erros.push(`Seletor sem elemento declarado em ${relativo(arquivo)}: ${seletor}`);
      }
    }
  }
}

/**
 * Executa as verificações e define o resultado do comando.
 * Benefício: permite detectar falhas antes de iniciar ou construir o site.
 * @returns {Promise<void>} Conclusão da execução.
 */
async function executar() {
  await verificarArquivos();

  const arquivosSrc = await listarArquivos(path.join(raiz, 'src'));
  const arquivosTools = await listarArquivos(path.join(raiz, 'tools'));

  const arquivosJs = [
    ...arquivosSrc,
    ...arquivosTools,
    path.join(raiz, 'vite.config.js')
  ].filter(arquivo => existsSync(arquivo) && /\.(?:js|mjs)$/.test(arquivo));

  const codigos = await verificarImports(arquivosJs);

  await verificarSeletores(codigos);

  if (erros.length) {
    for (const erro of new Set(erros)) {
      console.error(erro);
    }

    process.exitCode = 1;
    return;
  }

  console.log('✅ Projeto consistente');
}

/**
 * Relata uma falha inesperada durante a verificação.
 * Benefício: apresenta o motivo da interrupção sem informar sucesso incorretamente.
 * @param {Error} erro Falha encontrada.
 */
function relatarFalha(erro) {
  console.error(`Falha ao verificar o projeto: ${erro.message}`);
  process.exitCode = 1;
}

executar().catch(relatarFalha);