// Configuração do Vite para servir e construir o site localmente.
// O Vite mantém o projeto rápido durante o desenvolvimento e gera a versão final em dist/.

import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    open: true
  }
});