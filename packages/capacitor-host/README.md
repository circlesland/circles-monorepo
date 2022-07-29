# Circles Capacitor Host

## How it works?

The `capacitor-host` app will require the `@circlesland/frame-app` as a dependency and build together the full production app. All the host specific APIs will be injected into the `window` object.

## Getting Started

Check the [@circlesland/frame-app](https://github.com/circlesland/frame-app) README for getting started.

- You'll need xcode installed to run the iOS build

## run with following ENV Vars:

VITE_AUTH_API_URL=https://auth-provider.vercel.app
VITE_AUTH_CALLBACK=https://web-host-iota.vercel.app/open
