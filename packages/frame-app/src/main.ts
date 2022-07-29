import App from './App.svelte';

import type { ICirclesCustomWindow } from "../types/types";
declare global {
  interface Window extends ICirclesCustomWindow {}
}

const app = new App({
  target: document.getElementById("app"),
});

export default app;
