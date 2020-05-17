import { TypeCallback } from 'src/app/models/common/callback/TypeCallback';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private mDarkMode: boolean;

  public constructor() {
    this.mDarkMode = ThemeService.importDarkModeFromWindow();
    ThemeService.addThemeListener(darkMode => this.onThemeChange(darkMode));
  }

  public isDarkMode(): boolean {
    return this.mDarkMode;
  }

  private onThemeChange(darkMode: boolean): void {
    this.mDarkMode = darkMode;
  }

  private static importDarkModeFromWindow(): boolean {
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
