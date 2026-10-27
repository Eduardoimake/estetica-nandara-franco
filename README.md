# Estética Nandara Franco — Site institucional

Site institucional de uma página para a Estética Nandara Franco, no centro de Xerém, Duque de Caxias - RJ.

O projeto é construído com [Vite](https://vitejs.dev/) e preparado para deploy estático na [Vercel](https://vercel.com/).

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Instalação

```bash
npm install
```

## Rodar em desenvolvimento

```bash
npm run dev
```

O Vite abrirá o site automaticamente no navegador, normalmente em:

```text
http://localhost:5173
```

## Verificar consistência

```bash
npm run verificar
```

## Gerar versão de produção

```bash
npm run build
```

O build gera os arquivos finais na pasta:

```text
dist/
```

## Testar versão de produção

```bash
npm run preview
```

## Deploy na Vercel

### Opção 1 — Pelo site da Vercel

1. Envie o projeto para um repositório no GitHub.
2. Acesse a [Vercel](https://vercel.com/) e clique em **Add New > Project**.
3. Importe o repositório `estetica-nandara-franco-site`.
4. A Vercel deve detectar automaticamente o projeto Vite.
5. Confirme as configurações:

| Configuração | Valor |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

6. Clique em **Deploy**.

### Opção 2 — Pela Vercel CLI

```bash
npm install -g vercel
vercel
```

Para publicar a versão de produção:

```bash
vercel --prod
```

## Configurações principais

- `src/data/config.js`: contato, horários, preços, fotos, logo, selo promocional e mensagens do WhatsApp.
- `src/data/conteudo.js`: tratamentos, procedimentos, FAQ, dias, turnos e textos dinâmicos.
- `public/images/logo.svg`: substitua pelo logo oficial em SVG.
- `src/data/config.js`, objeto `FOTOS`: adicione os caminhos das fotos de hero, sobre, antes, depois, espaço e resultados.

## Guia de apresentação

Abra o site com:

```text
http://localhost:5173/?guia=1
```

Em produção:

```text
[https://SEU-DOMINIO.vercel.app/?guia=1](https://SEU-DOMINIO.vercel.app/?guia=1)
```

O guia explica cada seção durante a reunião de apresentação.