import { TypeCallback } from 'src/app/models/common/callback/TypeCallback';
import { Theme } from 'src/app/models/theme/Theme';

import { Injectable } from '@angular/core';

import { OptionService } from '../option/option.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private mDefaultDarkMode: boolean;

  public constructor(private mOptionService: OptionService) {
    this.mDefaultDarkMode = ThemeService.importDefaultDarkMode();
    ThemeService.addThemeListener(darkMode => this.onThemeChange(darkMode));
  }

  public isDarkMode(): boolean {
    const theme = this.mOptionService.getTheme();
    switch (theme) {
      case Theme.LIGHT: return false;
      case Theme.DARK: return true;
      case Theme.DEFAULT:
      default:
        return this.mDefaultDarkMode;
    }
  }

  private onThemeChange(defaultDarkMode: boolean): void {
    this.mDefaultDarkMode = defaultDarkMode;
  }

  private static importDefaultDarkMode(): boolean {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private static addThemeListener(callback: TypeCallback<boolean>): void {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', e => {
      const newColorScheme = e.matches ? 'dark' : 'light';
      callback(newColorScheme === 'dark');
    });
  }
}
