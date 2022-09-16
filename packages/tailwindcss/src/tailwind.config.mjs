import config from './config.cjs';

const { generateConfig } = config;
export default generateConfig([
  './index.html',
  './src/**/*.{svelte,js,ts}',
  '../frame-app/src/**/*.{svelte,js,ts}',
]);
