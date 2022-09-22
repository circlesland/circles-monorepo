import config from '@circlesland/tailwindcss/src/config.cjs';
import * as path from 'path';

const { generateConfig } = config;
export default generateConfig([
  './src/**/*.{html,js,svelte,ts}',
  // Include component library files in tailwind content since they are not compiled together.
  // If using node: path.join(require.resolve('@circlesland/ui-components), '**/*.{html,js,svelte,ts}')
  path.join('../../packages/ui-components', '**/*.{html,js,svelte,ts}'),
]);