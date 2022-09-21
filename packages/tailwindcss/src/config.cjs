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
        extend: {
          colors: {
            primary: withOpacity('--color-esther'),
            secondary: withOpacity('--color-maximus'),
            other: withOpacity('--color-linx'),
          },
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
