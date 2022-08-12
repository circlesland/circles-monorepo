import { wrap } from 'svelte-spa-router/wrap';

import AppViewSvelte from '../src/pages/AppView.svelte';
import FinishLoginSvelte from '../src/pages/FinishLogin.svelte';
import Home from '../src/pages/Home.svelte';
import LoginSvelte from '../src/pages/Login.svelte';
import NotFound from '../src/pages/NotFound.svelte';

const isAuth = () => {
  const profileData = window.authApi.getDataFromLocalStorage();
  const privateKey = profileData?.privateKey;
  if (privateKey) {
    return true;
  }

  return false;
};

export const routes = {
  "/": wrap({
    component: Home,

    conditions: [
      (detail) => {
        return isAuth();
      },
    ],
  }),

  "/finish-login": FinishLoginSvelte,

  "/login": wrap({
    component: LoginSvelte,

    conditions: [
      (detail) => {
        return !isAuth();
      },
    ],
  }),

  "/app/:appId": wrap({
    component: AppViewSvelte,

    conditions: [
      (detail) => {
        return isAuth();
      },
    ],
  }),

  // Catch-all
  // This is optional, but if present it must be the last
  "*": NotFound,
};
