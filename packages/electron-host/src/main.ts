import '@circlesland/tailwindcss/src/tailwind.scss';

import App from '@circlesland/frame-app/src/App.svelte';

import { AUTH_API_CALLBACK, AUTH_API_URL } from '../config/api';

import type { ICirclesCustomWindow } from '@circlesland/frame-app/types/types';
declare global {
  interface Window extends ICirclesCustomWindow {
    electronApi: {
      openExternalUrl: (url: string) => void;
    };
  }
}

window.authApi = {
  login: (testAccount?: number) => {
    const redirectUrl = new URL(AUTH_API_URL);
    redirectUrl.searchParams.set('callback', AUTH_API_CALLBACK);
    redirectUrl.searchParams.set('platform', 'electron');
    if (testAccount !== undefined && testAccount !== null) {
      redirectUrl.searchParams.set('test_account', `${testAccount}`);
    }
    console.log(redirectUrl.toString());
    window.electronApi.openExternalUrl(redirectUrl.toString());
  },
  logout: () => {
    localStorage.removeItem('privateKey');
    localStorage.removeItem('openlogin_store');
  },
  processAuth: (userDataParam) => {
    try {
      if (userDataParam) {
        const userDataJson = JSON.parse(atob(userDataParam));
        if (userDataJson) {
          Object.keys(userDataJson).forEach(function (k) {
            localStorage.setItem(k, userDataJson[k]);
          });
        }

        return true;
      }
    } finally {
      return false;
    }
  },
  getDataFromLocalStorage: () => {
    const privateKey = localStorage.getItem('privateKey');
    const _accountData = localStorage.getItem('openlogin_store');
    if (privateKey && _accountData) {
      const accountData = JSON.parse(_accountData);
      return {
        sessionId: accountData.sessionId,
        email: accountData.email,
        name: accountData.name,
        profileImage: accountData.profileImage,
        privateKey,
      };
    }

    return null;
  },
};

const app = new App({
  target: document.getElementById('app'),
});

export default app;
