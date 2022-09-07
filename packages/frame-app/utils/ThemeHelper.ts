const THEME_ATTRIBUTE = 'data-theme';
const THEME_LOCAL_STORAGE = 'circles.theme';

export enum Themes {
  default = 'default',
  neon = 'neon',
  dark = 'dark',
}
export class ThemeHelper {
  private static body = document.getElementsByTagName('body')[0];

  private static getThemeFromLocalStorage(): Themes | null {
    const theme = localStorage.getItem(THEME_LOCAL_STORAGE);
    return theme as Themes | null;
  }

  private static getThemeFromSettings(): Themes {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return Themes.dark;
    }
    return Themes.default;
  }

  private static setThemeOnLocalStorage(theme: string): void {
    localStorage.setItem(THEME_LOCAL_STORAGE, theme);
  }

  static get theme(): Themes {
    const theme =
      ThemeHelper.getThemeFromLocalStorage() ??
      ThemeHelper.getThemeFromSettings();
    return theme;
  }

  static changeTheme(theme: string): void {
    ThemeHelper.body.setAttribute(THEME_ATTRIBUTE, theme);
    ThemeHelper.setThemeOnLocalStorage(theme);
  }

  static loadTheme(): void {
    ThemeHelper.body.setAttribute(THEME_ATTRIBUTE, ThemeHelper.theme);
  }
}
