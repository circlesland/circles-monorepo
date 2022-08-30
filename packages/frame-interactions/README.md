# Frame Interactions Package

The package provides utilities in regards to frame interaction events. When using the event bus, we should strive to strongly type the sent types in order for a better code quality. The interfaces and types found in this package should help us achieve that.

# Development

You can add new interfaces or implementation in this package. To test the implementation, build the package and then use the defined structures in an app or another package by importing as follows: ```import { MyStuff } from '@circlesland/interaction-events'```.

# Testing
Run `yarn test` in the app directory to run unit tests. Unit tests are written using `jest`. The test runner searches for all files that end with ```.test.ts``` and runs them.


# Build

Run `yarn build` to build the package. The binaries will be located in the `dist` directory after the build is finished.

