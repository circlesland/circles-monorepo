# Circles Monorepo

Lerna monorepo that enables development for apps and libraries using Svelte and Typescript in CirclesLand.

# Structure

The repository contains an ```apps``` directory use to create Dapp while library packages will be found under ```packages```. Packages are automatically linked together, meaning you can do cross-package work with this repository.

# Dependency installation

We are using "yarn" as a package manager together with larna to take account of the "workspaces" feature that they come up with.

# Development

Each Dapp can be started separately in its own webserver. For more information on how to run each DApp locally, please visit the associated DApp readme file.

Each package can be built separately. On dev mode however, packages can be imported directly into other packages or apps without the need to build them.

# Build

Each Dapp and each package can be built separately. For more information on how to build each DApp/package, please visit the associatied readme file.

# Testing

We are using jest together with @testing-library/svelte in order to test Svelte components. Simple business logic can be tested usign only jest. XState related flows are also tested using jest. For more information on how to test Svelte and XState components, please refer to their official documentation.

# Storybook

We are currently using storybook in order to create stories for components and XState flows.

We are aiming for each reusable entity (component, XState flow) to define a set of stories that we can use as documentation and for testing purposes. Each Svelte component should have an associtated ```.stories``` file that defines at least one story.

Later on, the stories from storybook will be used for automation testing purposes.

##  Basic Development (Web Host)
1. `yarn # installs lerna and all top-level dev dependencies`
2. `cd packages/web-host`
3. `yarn dev`