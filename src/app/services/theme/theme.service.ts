import { TypeCallback } from 'src/app/models/common/callback/TypeCallback';
import { Theme } from 'src/app/models/theme/Theme';

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { OptionService } from '../option/option.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private mDefaultDarkMode: boolean;
    private mTheme: Theme;

    public constructor(
        @Inject(DOCUMENT) private mDocument: Document,
        private mOptionService: OptionService) {

        this.mDefaultDarkMode = ThemeService.importDefaultDarkMode();
        this.mTheme = this.mOptionService.getTheme();
        ThemeService.addThemeListener(
            darkMode => this.onDefaultDarkModeChange(darkMode));
        mOptionService.addThemeCallback(theme => this.onThemeChange(theme));

        this.renderTheme();
    }

    public isDarkMode(): boolean {
        switch (this.mTheme) {
            case Theme.LIGHT: return false;
            case Theme.DARK: return true;
            case Theme.DEFAULT:
            default:
                return this.mDefaultDarkMode;
        }
    }

    private onDefaultDarkModeChange(defaultDarkMode: boolean): void {
        this.mDefaultDarkMode = defaultDarkMode;
        this.renderTheme();
    }

    private onThemeChange(theme: Theme): void {
        this.mTheme = theme;
        this.renderTheme();
    }

    private renderTheme(): void {
        const classes = this.mDocument.body.classList;
        if (this.isDarkMode()) {
            classes.remove('theme-light');
            classes.add('theme-dark');
        } else {
            classes.remove('theme-dark');
            classes.add('theme-light');
        }
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
