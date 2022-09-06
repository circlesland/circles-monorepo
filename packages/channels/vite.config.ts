import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import * as path from 'path';

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
      beforeWriteFile: (filePath, content) => {
        const packageName = path.basename(__dirname);
        return {
          filePath: filePath.replace(`packages/${packageName}/src`, ''),
          content,
        };
      },
    }),
  ],
});