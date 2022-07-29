import About from '../src/pages/About.svelte';
import Home from '../src/pages/Home.svelte';
import NotFound from '../src/pages/NotFound.svelte';

export const routes = {
  // Exact path
  "/": Home,

  "/about": About,

  // Catch-all
  // This is optional, but if present it must be the last
  "*": NotFound,
};
