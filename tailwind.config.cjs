function withOpacity(cssVariable) {
    return ({ opacityValue }) => {
      return opacityValue
        ? `rgba(var(${cssVariable}), ${opacityValue})`
        : `rgb(var(${cssVariable}))`;
    };
  }
  
  module.exports = {
    plugins: [],
    content: [
      './apps/**/*.{svelte,js,ts}',
      './packages/**/*.{svelte,js,ts}',
    ], // for unused CSS
    variants: {
      extend: {},
    },
    darkMode: 'media', // or 'media' or 'class'
  };
  