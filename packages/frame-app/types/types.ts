export interface ICirclesLocalStorage {
  sessionId: string;
  email: string;
  name: string;
  profileImage: string;
  privateKey: string;
}
export interface ICirclesAuthApi {
  login: (testAccount?: number) => void;
  logout: () => void;
  processAuth: (userData: string) => boolean;
  getDataFromLocalStorage: () => ICirclesLocalStorage | null;
}

export interface ICirclesCustomWindow {
  authApi: ICirclesAuthApi;
}
