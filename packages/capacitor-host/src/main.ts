import '@circlesland/frame-app/style/tailwind.scss';

import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';
import App from '@circlesland/frame-app/src/App.svelte';

import { AUTH_API_CALLBACK, AUTH_API_URL } from '../config/api';

import type { ICirclesCustomWindow } from "@circlesland/frame-app/types/types";
declare global {
  interface Window extends ICirclesCustomWindow {}
}

window.authApi = {
  login: (testAccount?: number) => {
    const redirectUrl = new URL(AUTH_API_URL);
    redirectUrl.searchParams.set("callback", AUTH_API_CALLBACK);
    redirectUrl.searchParams.set("platform", "capacitor");
    if (testAccount !== undefined && testAccount !== null) {
      redirectUrl.searchParams.set("test_account", `${testAccount}`);
    }
    window.location.assign(redirectUrl.toString());
  },
  logout: () => {
    localStorage.removeItem("privateKey");
    localStorage.removeItem("openlogin_store");
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
    const privateKey = localStorage.getItem("privateKey");
    const _accountData = localStorage.getItem("openlogin_store");
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

CapacitorApp.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
  const url = new URL(event.url);
  const userDataBase64 = url.searchParams.get("user_data");
  if (userDataBase64) {
    window.authApi.processAuth(userDataBase64);
    window.location.reload();
  }
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;
