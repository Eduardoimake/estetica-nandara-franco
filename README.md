# Estética Nandara Franco — Site institucional

Site de uma página para a Estética Nandara Franco, no centro de Xerém, Duque de Caxias - RJ.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação

```powershell
npm install
```

## Rodar em desenvolvimento

```powershell
npm run dev
```

O Vite abrirá automaticamente o site no navegador.

## Verificar consistência

```powershell
npm run verificar
```

## Gerar versão de produção

```powershell
npm run build
```

## Testar versão de produção

```powershell
npm run preview
```

## Configurações principais

- `src/data/config.js`: contato, horários, preços, fotos, logo, selo promocional e mensagens do WhatsApp.
- `src/data/conteudo.js`: tratamentos, procedimentos, FAQ, dias, turnos e textos dinâmicos.
- `public/images/logo.svg`: substitua pelo logo oficial em SVG.
- `src/data/config.js`, objeto `FOTOS`: adicione depois os caminhos das fotos de hero, sobre, antes, depois, espaço e resultados.

## Guia de apresentação

Abra o site com:

```text
http://localhost:5173/?guia=1
```

O guia explica cada seção durante a reunião de apresentação.