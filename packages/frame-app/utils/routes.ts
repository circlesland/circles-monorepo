import { wrap } from 'svelte-spa-router/wrap';

import { AuthService } from '../services/AuthService';
import AppViewSvelte from '../src/pages/AppView.svelte';
import FinishLoginSvelte from '../src/pages/FinishLogin.svelte';
import Home from '../src/pages/Home.svelte';
import LoginSvelte from '../src/pages/Login.svelte';
import NotFound from '../src/pages/NotFound.svelte';

import type { ICirclesCustomWindow } from '../types/types';

declare global {
  interface Window extends ICirclesCustomWindow {}
}

const isAuth = () => {
  const profileData = AuthService.getDataFromLocalStorage();
  const privateKey = profileData?.privateKey;

  return !!privateKey;
};

export const routes = {
  '/': wrap({
    component: Home,

    conditions: [
      (_) => {
        return isAuth();
      },
    ],
  }),

  '/finish-login': FinishLoginSvelte,

  '/login': wrap({
    component: LoginSvelte,

    conditions: [
      (_) => {
        return !isAuth();
      },
    ],
  }),

  '/app/:appId': wrap({
    component: AppViewSvelte,

    conditions: [
      (_) => {
        return isAuth();
      },
    ],
  }),

  // Catch-all
  // This is optional, but if present it must be the last
  '*': NotFound,
};
