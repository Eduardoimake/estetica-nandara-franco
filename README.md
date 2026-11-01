# Estética Nandara Franco — Site institucional

Site institucional de uma página para a Estética Nandara Franco, no centro de Xerém, Duque de Caxias - RJ.

Construído com [Vite](https://vitejs.dev/) e preparado para deploy estático na [Vercel](https://vercel.com/).

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Primeiros passos

```bash
npm install
npm run imagens
npm run verificar
npm run dev
```

O comando `npm run imagens` gera os arquivos `.webp`, o `og-image.jpg` (imagem de compartilhamento) e os ícones PNG. Depois dele, os PNGs originais de `public/images` podem ser apagados.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Abre o site em desenvolvimento (http://localhost:5173) |
| `npm run verificar` | Confere arquivos, imports, imagens e telefone |
| `npm run imagens` | Otimiza imagens e gera ícones e og-image |
| `npm run build` | Gera a versão final em `dist/` |
| `npm run preview` | Testa a versão final localmente |

## Deploy na Vercel

1. Envie o projeto para um repositório no GitHub.
2. Na Vercel: **Add New > Project** e importe o repositório.
3. Confirme: Framework Vite, Build `npm run build`, Output `dist`.
4. Clique em **Deploy**.

## Onde editar

- `src/data/config.js`: contato, horários, preços, selo promocional (com data de validade), fotos e mensagens do WhatsApp.
- `src/data/conteudo.js`: tratamentos, procedimentos, FAQ, dias, turnos e opções do formulário.
- `public/images/logo.svg`: logo oficial.
- `public/privacidade.html`: política de privacidade.

## Antes de publicar

- Confirmar endereço oficial e CEP.
- Confirmar horários.
- Preencher `DEPILACAO_NOTA` e `CLUB_INFO` em `config.js`, se desejado.
- Confirmar que as fotos de resultados são reais e autorizadas por escrito.
- Se usar domínio próprio, trocar a URL em `index.html` (canonical, og:url, og:image, JSON-LD), `public/robots.txt` e `public/sitemap.xml`.

## Analítica de cliques no WhatsApp

Cada clique dispara o evento `whatsapp:clique` e, se existir, chama `plausible` ou `gtag` informando a seção de origem. Para ativar, descomente a linha do Plausible no `index.html` (ajustando o domínio).

## Guia de apresentação

Abra o site com `?guia=1` no final do endereço, por exemplo `http://localhost:5173/?guia=1`. O guia explica cada seção durante a apresentação à cliente.