import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['es'],
    },
  },
  plugins: [
    tsConfigPaths(),
    dts({
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('packages/tailwindcss/src', ''),
        content,
      }),
    }),
  ],
});
