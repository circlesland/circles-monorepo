import { postcss } from '@circlesland/tailwindcss';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020',
  },
  plugins: [svelte()],
  css: {
    postcss,
  },
});
