import postcss from '@circlesland/frame-app/postcss.config.mjs';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.IS_DEV !== "true" ? "./" : "/",
  build: {
    outDir: "app/build",
    target: "es2020",
  },
  plugins: [svelte()],
  css: {
    postcss,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
