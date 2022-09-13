function withOpacity(cssVariable) {
  return ({ opacityValue }) => {
    return opacityValue
      ? `rgba(var(${cssVariable}), ${opacityValue})`
      : `rgb(var(${cssVariable}))`;
  };
}

module.exports = {
  generateConfig: (purgeContent) => {
    return {
      plugins: [],
      theme: {
        extend: {},
        colors: {
          esther: withOpacity('--color-esther'),
          maximus: withOpacity('--color-maximus'),
          linx: withOpacity('--color-linx'),
        },
      },
      content: purgeContent, // for unused CSS
      variants: {
        extend: {},
      },
      darkMode: 'media', // or 'media' or 'class'
    };
  },
};
