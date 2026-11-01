/**
 * Gera as imagens otimizadas do site.
 * Uso: npm run imagens
 *  - converte PNGs de public/images em WebP (largura máx. 1400 px)
 *  - cria public/og-image.jpg (1200x630) a partir de hero.jpg, se ainda não existir
 *  - cria os ícones PNG a partir de public/favicon.svg
 */

import sharp from "sharp";
import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const pasta = path.resolve("public/images");
const publico = path.resolve("public");

async function converterImagens() {
  const arquivos = await readdir(pasta);

  for (const arquivo of arquivos.filter((nome) => /\.png$/i.test(nome))) {
    const destino = path.join(pasta, arquivo.replace(/\.png$/i, ".webp"));

    await sharp(path.join(pasta, arquivo))
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destino);

    console.log("✔ " + path.basename(destino));
  }
}

async function criarOg() {
  const destino = path.join(publico, "og-image.jpg");
  const origem = path.join(pasta, "hero.jpg");

  if (existsSync(destino)) {
    console.log("• og-image.jpg já existe (mantido).");
    return;
  }

  await sharp(origem)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82 })
    .toFile(destino);

  console.log("✔ og-image.jpg (versão automática; troque por uma arte própria se quiser)");
}

async function criarIcones() {
  const svg = path.join(publico, "favicon.svg");

  const tamanhos = [
    { nome: "favicon-32.png", lado: 32, fundo: null },
    { nome: "icon-192.png", lado: 192, fundo: null },
    { nome: "icon-512.png", lado: 512, fundo: null },
    { nome: "apple-touch-icon.png", lado: 180, fundo: "#ffffff" },
  ];

  for (const { nome, lado, fundo } of tamanhos) {
    let imagem = sharp(svg, { density: 384 }).resize(lado, lado, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });

    if (fundo) {
      imagem = imagem.flatten({ background: fundo });
    }

    await imagem.png().toFile(path.join(publico, nome));
    console.log("✔ " + nome);
  }
}

await converterImagens();
await criarOg();
await criarIcones();

console.log("✅ Imagens prontas. Você já pode apagar os PNGs originais de public/images.");