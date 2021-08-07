import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/theme/Theme';
import { ToastService } from 'src/app/services/notification/toast.service';
import { DevelopModeService } from 'src/app/services/option/develop-mode.service';
import { OptionService } from 'src/app/services/option/option.service';
import {
  ProfileModifyMode,
  ProfileService,
} from 'src/app/services/profile/profile.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss', './setting-view.color.scss'],
})
export class SettingViewComponent implements OnInit {
  private static DEFAULT_PLATFORM_IMAGE = {
    default: '',
    dark: '',
  };

  theme: Theme;
  readonly themeSrv: ThemeService;
  readonly profileSrv: ProfileService;
  readonly optionSrv: OptionService;
  readonly themeOptions: ThemeOption[];
  readonly #streamPlatformImages: StreamPlatformImage[];
  readonly #developModeSrv: DevelopModeService;
  readonly #toastSrv: ToastService;
  #clickCount: number;
  #clickResetTimer: number | null;

  constructor(
    themeService: ThemeService,
    profileService: ProfileService,
    optionService: OptionService,
    developModeService: DevelopModeService,
    toastService: ToastService
  ) {
    this.theme = Theme.DEFAULT;
    this.themeSrv = themeService;
    this.profileSrv = profileService;
    this.optionSrv = optionService;
    this.#developModeSrv = developModeService;
    this.#toastSrv = toastService;
    this.#clickCount = 0;
    this.#clickResetTimer = null;
    this.themeOptions = [
      { theme: Theme.DEFAULT, name: '기본' },
      { theme: Theme.LIGHT, name: '밝게' },
      { theme: Theme.DARK, name: '어둡게' },
    ];
    this.#streamPlatformImages = [
      {
        id: 'local',
        src: {
          default: '/assets/image/stream/mycast_b.png',
          dark: '/assets/image/stream/mycast.png',
        },
      },
      {
        id: 'twitch',
        src: {
          default: '/assets/image/stream/twitch_b.png',
          dark: '/assets/image/stream/twitch.png',
        },
      },
      {
        id: 'afreeca',
        src: {
          default: '/assets/image/stream/afreeca_b.png',
          dark: '/assets/image/stream/afreeca.png',
        },
      },
      {
        id: 'totoro',
        src: {
          default: '/assets/image/stream/totoro_b.png',
          dark: '/assets/image/stream/totoro.png',
        },
      },
    ];
  }

  ngOnInit(): void {
    this.theme = this.optionSrv.getTheme();
    this.profileSrv.loadStream();
  }

  getPlatformImage(): ImageSrc {
    const platform = this.profileSrv.getStreamPlatform();
    const image = this.#streamPlatformImages.find((p) => p.id === platform);
    const src = image ? image.src : SettingViewComponent.DEFAULT_PLATFORM_IMAGE;
    return src;
  }

  getPlatformImageSrc(): string {
    const darkMode = this.themeSrv.isDarkMode();
    const image = this.getPlatformImage();
    return darkMode ? image.dark : image.default;
  }

  openMobilePage(): void {
    window.open('/mobile', '_blank', 'width=800');
  }

  openProfileSettingView(): void {
    this.profileSrv.setModifyMode(ProfileModifyMode.PROFILE);
  }

  openStreamSettingView(): void {
    this.profileSrv.setModifyMode(ProfileModifyMode.STREAM);
  }

  openOptionSettingView(): void {
    this.profileSrv.setModifyMode(ProfileModifyMode.SETTING);
  }

  onThemeClick(themeOption: ThemeOption): void {
    this.theme = themeOption.theme;
    this.optionSrv.setTheme(this.theme);
  }

  onProfileIconClick(): void {
    this.resetTimer();
    this.#clickCount++;
    if (this.#clickCount === 5) {
      this.#toastSrv.toast('Develop Mode Enabled');
      this.#developModeSrv.enabled = true;
    }
    this.setTimer();
  }

  private resetTimer(): void {
    if (this.#clickResetTimer !== null) {
      clearTimeout(this.#clickResetTimer);
      this.#clickResetTimer = null;
    }
  }

  private setTimer(): void {
    this.#clickResetTimer = setTimeout(() => {
      this.#clickResetTimer = null;
      this.#clickCount = 0;
    }, 5000);
  }
}

type ThemeOption = { name: string; theme: Theme };

type StreamPlatformImage = { id: string; src: ImageSrc };
