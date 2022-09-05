export class ThemeHelper {
  private static body = document.getElementsByTagName('body')[0];
  static get theme() {
    const theme = ThemeHelper.body?.getAttribute('data-theme') ?? 'default';
    return theme;
  }

  static changeTheme(theme: string) {
    ThemeHelper.body.setAttribute('data-theme', theme);
  }

  static loadTheme() {
    ThemeHelper.changeTheme(ThemeHelper.theme);
  }
}
