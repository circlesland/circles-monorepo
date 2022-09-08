import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

import tailwindConfig from './tailwind.config.mjs';

export default {
  // @ts-ignore
  plugins: [tailwind(tailwindConfig), autoprefixer],
};
