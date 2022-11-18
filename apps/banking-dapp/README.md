# Banking DApp

The application displays information about the financial status of the user's account.

# Development

Run `npm run dev` in the app directory to start the application server. The server listens for changes and refreshes the application in the browser when you change files. You might have to change the default port 

# Testing
Run `npm run test` in the app directory to run unit tests. Unit tests are written using `jest`.


# Build

Run `npm run build` to build the application. The binaries will be located in the `dist` directory after the build is finished.

# Storybook

Each component should contain stories written in order to display them in **Storybook**. You can write component stories by using the ```<component-name>.stories.ts``` file structure. Storybook searches automatically for ***.stories.ts** files and displays the associated components.