# UI Components Package

The package implements a series of basic UI Components written in Svelte. The components can then either be used in other View Componnets or can be used to dynamically build forms based on a common interface (Ex: View/ViewType).

# Development

You can add new interfaces or components in this package. To test the implementation, build the package and then use the defined structures in an app or another package by importing as follows: ```import { MyStuff } from '@circlesland/ui-components'```.

# Testing
Run `yarn test` in the app directory to run unit tests. Unit tests are written using `jest`. The test runner searches for all files that end with ```.test.ts``` and runs them.


# Build

Run `yarn build` to build the package. The binaries will be located in the `dist` directory after the build is finished.

