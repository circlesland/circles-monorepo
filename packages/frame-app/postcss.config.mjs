import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

import tailwindConfig from './tailwind.config.mjs';

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};
