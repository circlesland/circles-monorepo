// TODO: DO NOT DELETE. MIGHT NEED TO CHECK THIS IN THE FUTURE.
// const { typescript: svelteTS } = require('svelte-preprocess');
// const tailwindcss = require('./tailwind.config');

// module.exports = {
//   "stories": [
//     // Stories from apps
//     "../apps/**/*.stories.mdx",
//     "../apps/**/*.stories.@(js|jsx|ts|tsx|svelte)",
//     // Stories from packages
//     "../packages/**/*.stories.mdx",
//     "../packages/**/*.stories.@(js|jsx|ts|tsx|svelte)"
//   ],
//   "addons": [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions",
//     "@storybook/addon-postcss"
//   ],
//   "framework": "@storybook/svelte",
//   "core": {
//     "builder": "@storybook/builder-vite"
//   },
//   "svelteOptions": {
//     "preprocess": svelteTS()
//   },
//   "features": {
//     "storyStoreV7": true
//   }
// }

const postcss = require('postcss');
const { typescript: svelteTS } = require('svelte-preprocess');

module.exports = {
  stories: [
    "../apps/**/*.stories.mdx",
        "../apps/**/*.stories.@(js|jsx|ts|tsx|svelte)",
        // Stories from packages
        "../packages/**/*.stories.mdx",
        "../packages/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-svelte-csf',
      "@storybook/addon-interactions",
      "@storybook/addon-postcss"
  ],
  core: {
    builder: "@storybook/builder-vite"
  },
  framework: '@storybook/svelte',
  svelteOptions: {
      preprocess: svelteTS({ postcss })
  }
};