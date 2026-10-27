/**
 * Atualiza o título e a descrição no index.html.
 * Benefício: facilita ajustes futuros de SEO sem procurar as tags manualmente.
 *
 * Uso:
 * node tools/atualizar-seo.mjs "Novo título" "Nova descrição"
 */

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const caminho = resolve('index.html');
const titulo = process.argv[2];
const descricao = process.argv[3];

if (!titulo || !descricao) {
  console.error('Uso: node tools/atualizar-seo.mjs "Título" "Descrição"');
  process.exit(1);
}

let html = await readFile(caminho, 'utf8');

html = html.replace(
  /<title>.*?<\/title>/,
  `<title>${titulo}</title>`
);

html = html.replace(
  /<meta name="description" content=".*?" \/>/,
  `<meta name="description" content="${descricao}" />`
);

await writeFile(caminho, html, 'utf8');

console.log('✅ SEO atualizado com sucesso.');