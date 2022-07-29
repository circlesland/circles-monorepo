import postcss from '@circlesland/frame-app/postcss.config.mjs';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  },
  build: {
    target: "es2020"
  },
  plugins: [svelte()],
  css: {
    postcss,
  },
});
