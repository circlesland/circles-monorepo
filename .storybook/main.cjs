const { typescript: svelteTS } = require('svelte-preprocess');
module.exports = {
  "stories": [
    // Stories from apps
    "../apps/**/*.stories.mdx",
    "../apps/**/*.stories.@(js|jsx|ts|tsx|svelte)",
    // Stories from packages
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/svelte",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "svelteOptions": {
    "preprocess": svelteTS()
  },
  "features": {
    "storyStoreV7": true
  }
}