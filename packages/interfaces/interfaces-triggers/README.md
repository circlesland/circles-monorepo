# Template Package Library

This template should help you get started developing new Package Libraries using typescript.

# Setup

1. Copy this directory under <root>/packages
2. Open the `package.json` file and update the name to your desired package name. You can add extra package dependencies as required by your specific package in this file.
3. You are now ready to go

# Development

By default, importing components from this library will take the files under the ```src``` directory. For example, using ```import utils from @circlesland/template-library-package``` will import it from ```packages/template-library-package```.

# Testing
Run `yarn test` in the app directory to run unit tests. Unit tests are written using `jest`. There is a sample test file under `/src/testUtils.test.ts` that you can use as a reference.


# Build

Run `yarn build` to build the package. The binaries will be located in the `dist` directory after the build is finished.

