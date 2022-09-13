import config from '@circlesland/tailwindcss/src/config.cjs';

const { generateConfig } = config;
export default generateConfig([
  './index.html',
  './src/**/*.{svelte,js,ts}',
  '../frame-app/src/**/*.{svelte,js,ts}',
]);
