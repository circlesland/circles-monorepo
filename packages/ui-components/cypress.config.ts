import { defineConfig } from "cypress";
import postcss from './cypress/support/styles/postcss.config';

export default defineConfig({
  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
      viteConfig: {
        css: {
          postcss
        },
        server: {
          port: 3000,
          host: '127.0.0.1'
        }
      }
    }
  }
});
