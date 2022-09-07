function withOpacity(cssVariable) {
  return ({ opacityValue }) => {
    return opacityValue
      ? `rgba(var(${cssVariable}), ${opacityValue})`
      : `rgb(var(${cssVariable}))`;
  };
}

export default {
  plugins: [],
  theme: {
    extend: {},
    colors: {
      esther: withOpacity('--color-esther'),
      maximus: withOpacity('--color-maximus'),
      linx: withOpacity('--color-linx'),
    },
  },
  content: [
    './index.html',
    './src/**/*.{svelte,js,ts}',
    '../frame-app/src/**/*.{svelte,js,ts}',
  ], // for unused CSS
  variants: {
    extend: {},
  },
  darkMode: 'media', // or 'media' or 'class'
};
