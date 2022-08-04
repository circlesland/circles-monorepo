import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

import postcss from './postcss.config.mjs';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  build: {
    target: "es2020",
  },
  plugins: [svelte()],
  css: {
    postcss,
  },
});
