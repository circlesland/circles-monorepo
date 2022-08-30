# Localization Package

The package provides support for localizing strings, dates and numbers but can be extended more as we progress. The package exports a "LocalizationService" that allows localization from either component level or just a function implementation level.

# Development

You can add new interfaces or implementation in this package. To test the implementation, build the package and then use the defined structures in an app or another package by importing as follows: ```import { MyStuff } from '@circlesland/localization'```.

# Testing
Run `yarn test` in the app directory to run unit tests. Unit tests are written using `jest`. The test runner searches for all files that end with ```.test.ts``` and runs them.


# Build

Run `yarn build` to build the package. The binaries will be located in the `dist` directory after the build is finished.

