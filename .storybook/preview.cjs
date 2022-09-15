import '../packages/tailwindcss/src/tailwind.css';

import ThemeDecoratorComponent from './ThemeDecorator.svelte';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'default',
    toolbar: {
      // The icon for the toolbar item
      icon: 'circlehollow',
      // Array of options
      items: [
        { value: 'default', icon: 'circle', title: 'default' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

const withTheme = (_, context) => {
  const theme = context.parameters.theme || context.globals.theme;
  const storyTheme = theme || 'default';
  return {
    Component: ThemeDecoratorComponent,
    props: {
      theme: storyTheme,
    },
  };
};

// export all decorators that should be globally applied in an array
export const decorators = [withTheme];
