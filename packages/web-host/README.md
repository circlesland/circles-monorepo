# Circles Web Host

## How it works?

The `web-host` app will require the `@circlesland/frame-app` as a dependency and build together the full production app. All the host specific APIs will be injected into the `window` object.

## Getting Started

Check the [@circlesland/frame-app](https://github.com/circlesland/frame-app) README for getting started.

1) npm install
2) npm link @circlesland/frame-app
3) npm run dev

## Run with following ENV Vars:
VITE_AUTH_API_URL=http://localhost:3001
VITE_AUTH_CALLBACK=http://localhost:3000
