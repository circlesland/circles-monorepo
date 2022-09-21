const { generateConfig } = require('./packages/tailwindcss/src/config.cjs');

module.exports = generateConfig([
  './apps/**/*.{svelte,js,ts,jsx,tsx}',
  './packages/**/*.{svelte,js,ts,jsx,tsx}',
]);
