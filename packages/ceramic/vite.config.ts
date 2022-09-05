import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    target: "ESNext",
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    terserOptions: {
      module: true
    }
  }
});
