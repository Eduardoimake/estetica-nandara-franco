/**
 * Verificação estática do projeto.
 * Detecta arquivos ausentes, imports inválidos, seletores suspeitos,
 * imagens referenciadas que não existem e dados de contato divergentes.
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../', import.meta.url));
const erros = [];
const avisos = [];

const esperados = [
  'package.json',
  'vite.config.js',
  '.nvmrc',
  '.gitignore',
  'vercel.json',
  'src/data/config.js',
  'src/data/conteudo.js',
  'src/main.js',
  'src/scripts/dom.js',
  'src/scripts/foco.js',
  'index.html',
  'src/styles/base.css',
  'src/styles/layout.css',
  'src/styles/components.css',
  'src/styles/animations.css',
  'src/styles/responsive.css',
  'src/styles/acessibilidade.css',
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
  'public/privacidade.html',
  'public/favicon.svg',
  'public/favicon-32.png',
  'public/apple-touch-icon.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/og-image.jpg',
  'public/images/logo.svg',
  'tools/atualizar-seo.mjs',
  'tools/verificar-projeto.mjs',
  'tools/otimizar-imagens.mjs',
  'README.md'
];

function relativo(arquivo) {
  return path.relative(raiz, arquivo).split(path.sep).join('/');
}

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

    if (informacoes.size === 0) {
      erros.push(`Arquivo vazio: ${nome}`);
      continue;
    }

    if (nome.endsWith('.svg')) {
      const conteudo = await readFile(arquivo, 'utf8');

      if (!/<svg\b/i.test(conteudo)) {
        erros.push(`SVG sem elemento raiz: ${nome}`);
      }
    }
  }

  if (existsSync(path.join(raiz, 'src/scripts/whatsapp.js'))) {
    avisos.push('src/scripts/whatsapp.js não é mais usado. Pode apagar.');
  }
}

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

async function verificarDados() {
  const caminhoConfig = path.join(raiz, 'src/data/config.js');
  const caminhoHtml = path.join(raiz, 'index.html');

  if (!existsSync(caminhoConfig) || !existsSync(caminhoHtml)) {
    return;
  }

  const config = await readFile(caminhoConfig, 'utf8');
  const html = await readFile(caminhoHtml, 'utf8');

  const tel = config.match(/\btel:\s*"(\d+)"/)?.[1];
  const telFmt = config.match(/\btelFmt:\s*"([^"]+)"/)?.[1];

  if (tel) {
    if (!html.includes('+' + tel)) {
      erros.push(`Telefone +${tel} do config.js não aparece no JSON-LD do index.html.`);
    }

    if (!html.includes('wa.me/' + tel)) {
      erros.push(`Link wa.me/${tel} não aparece no index.html.`);
    }
  }

  if (telFmt && !html.includes(telFmt)) {
    erros.push(`Telefone formatado "${telFmt}" não aparece no index.html.`);
  }

  for (const resultado of config.matchAll(/"(\/images\/[^"]+)"/g)) {
    const arquivo = path.join(raiz, 'public', resultado[1]);

    if (!existsSync(arquivo)) {
      erros.push(`Imagem do config.js não existe: public${resultado[1]} (rode "npm run imagens").`);
    }
  }

  const ate = config.match(/\bate:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];

  if (ate && new Date(ate + 'T23:59:59') < new Date()) {
    avisos.push(`O selo promocional venceu em ${ate}. Atualize SELO em config.js.`);
  }

  if (/SEU-DOMINIO|TODO|FIXME/.test(html)) {
    avisos.push('O index.html contém um marcador pendente (SEU-DOMINIO, TODO ou FIXME).');
  }
}

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
  await verificarDados();

  for (const aviso of new Set(avisos)) {
    console.warn('⚠️  ' + aviso);
  }

  if (erros.length) {
    for (const erro of new Set(erros)) {
      console.error('❌ ' + erro);
    }

    process.exitCode = 1;
    return;
  }

  console.log('✅ Projeto consistente');
}

executar().catch((erro) => {
  console.error(`Falha ao verificar o projeto: ${erro.message}`);
  process.exitCode = 1;
});