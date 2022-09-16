const { generateConfig } = require('./packages/tailwindcss/src/config.cjs');

module.exports = generateConfig([
  './apps/**/*.{svelte,js,ts}',
  './packages/**/*.{svelte,js,ts}',
]);
