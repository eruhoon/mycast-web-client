import { Theme } from './Theme';

export class ThemeParser {
  public parse(raw: string): Theme {
    switch (raw) {
      case Theme.DARK:
        return Theme.DARK;
      case Theme.LIGHT:
        return Theme.LIGHT;
      case Theme.DEFAULT:
      default:
        return Theme.DEFAULT;
    }
  }
}
