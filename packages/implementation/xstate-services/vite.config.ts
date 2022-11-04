import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

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
        filePath: filePath.replace('packages/xstate-services/src', ''),
        content,
      }),
    }),
  ],
});
