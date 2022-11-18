import './app.css';
import './style/tailwind.scss';

import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
