import { ICirclesCustomWindow } from '../types/types';

declare global {
  interface Window extends ICirclesCustomWindow {}
}

export class AuthService {
  static login(testAccount?: number | undefined) {
    return window.authApi.login(testAccount);
  }
  static logout() {
    window.authApi.logout();
  }
  static processAuth(userData: string) {
    return window.authApi.processAuth(userData);
  }
  static getDataFromLocalStorage() {
    return window.authApi.getDataFromLocalStorage();
  }
}
