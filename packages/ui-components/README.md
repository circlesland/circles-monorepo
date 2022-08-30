# Template UI Package Library

This template should help you get started developing new UI Package Libraries using Svelte and Typescript in Vite.

# Setup

1. Copy this directory under <root>/packages
2. Open the `package.json` file and update the name to your desired application name. You can add extra package dependencies as required by your specific package in this file.
3. You are now ready to go

# Development

By default, importing components from this library will take the files under the ```src``` directory. For example, using ```import Counter from @circlesland/template-ui-library-package``` will import it from ```packages/template-ui-library-package```.

# Testing
Run `yarn test` in the app directory to run unit tests. Unit tests are written using `jest`. There is a sample test file under `/src/Counter.test.ts` that you can use as a reference.


# Build

Run `yarn build` to build the package. The binaries will be located in the `dist` directory after the build is finished.

# Storybook

Each component should contain stories written in order to display them in **Storybook**. You can write component stories by using the ```<component-name>.stories.ts``` file structure. Storybook searches automatically for ***.stories.ts** files and displays the associated components.
