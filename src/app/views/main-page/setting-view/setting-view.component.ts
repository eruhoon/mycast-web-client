import { NotificationSound } from 'src/app/models/notification/NotificationSound';
import { NotificationSounds } from 'src/app/models/notification/NotificationSounds';
import { Theme } from 'src/app/models/theme/Theme';
import { OptionService } from 'src/app/services/option/option.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss', './setting-view.color.scss']
})
export class SettingViewComponent implements OnInit {

  private static DEFAULT_PLATFORM_IMAGE = {
    default: '',
    dark: ''
  };

  public theme: Theme;
  private mProfileService: ProfileService;
  private mOptionService: OptionService;
  private mNotificationSounds: NotificationSounds;
  private mThemes: ThemeOption[];
  private mStreamPlatformImages: StreamPlatformImage[];
  private mNotificationSoundId: string;

  public constructor(
    private mThemeService: ThemeService,
    profileService: ProfileService, optionService: OptionService) {
    this.theme = Theme.DEFAULT;

    this.mProfileService = profileService;
    this.mOptionService = optionService;
    this.mNotificationSounds = new NotificationSounds();
    this.mThemes = [
      { theme: Theme.DEFAULT, name: '기본' },
      { theme: Theme.LIGHT, name: '밝게' },
      { theme: Theme.DARK, name: '어둡게' },
    ];
    this.mStreamPlatformImages = [
      {
        id: 'local', src: {
          default: '/assets/image/stream/mycast_b.png',
          dark: '/assets/image/stream/mycast.png'
        }
      },
      {
        id: 'twitch', src: {
          default: '/assets/image/stream/twitch_b.png',
          dark: '/assets/image/stream/twitch.png'
        }
      },
      {
        id: 'afreeca', src: {
          default: '/assets/image/stream/afreeca_b.png',
          dark: '/assets/image/stream/afreeca.png'
        }
      },
      {
        id: 'mixer', src: {
          default: '/assets/image/stream/mixer_b.png',
          dark: '/assets/image/stream/mixer.png'
        }
      },
      {
        id: 'totoro', src: {
          default: '/assets/image/stream/totoro_b.png',
          dark: '/assets/image/stream/totoro.png'
        }
      },
    ];
    this.mNotificationSoundId = NotificationSound.getDefaultSound().getId();
  }

  public ngOnInit(): void {
    this.theme = this.mOptionService.getTheme();
    this.mNotificationSoundId = this.mOptionService.getNotificationSound().getId();
    this.mProfileService.loadStream();
  }

  public getNotficationSoundId(): string {
    return this.mNotificationSoundId;
  }

  public getNotificationSounds(): NotificationSound[] {
    return this.mNotificationSounds.getList();
  }

  public getThemes(): ThemeOption[] {
    return this.mThemes;
  }

  public getName(): string {
    return this.mProfileService.getName();
  }

  public getIcon(): string {
    return this.mProfileService.getProfileIcon();
  }

  public getLevel(): number {
    return this.mProfileService.getLevel();
  }

  public getPlatform(): string {
    return this.mProfileService.getStreamPlatform();
  }

  public getPlatformImage(): ImageSrc {
    const platform = this.mProfileService.getStreamPlatform();
    const image = this.mStreamPlatformImages.find(p => p.id === platform);
    const src = image ? image.src : SettingViewComponent.DEFAULT_PLATFORM_IMAGE;
    return src;
  }

  public getPlatformImageSrc(): string {
    const darkMode = this.mThemeService.isDarkMode();
    const image = this.getPlatformImage();
    return darkMode ? image.dark : image.default;
  }

  public isDataSaveMode(): boolean {
    return this.mOptionService.isDataSaveMode();
  }

  public toggleDataSaveMode(): void {
    const option = this.mOptionService.isDataSaveMode();
    return this.mOptionService.setDataSaveMode(!option);
  }

  public isTimestampShow(): boolean {
    return this.mOptionService.isTimestampShow();
  }

  public toggleChatTimestamp(): void {
    const option = this.mOptionService.isTimestampShow();
    return this.mOptionService.setTimestampShow(!option);
  }

  public openProfileSettingView(): void {
    this.mProfileService.setModifyMode(ProfileModifyMode.PROFILE);
  }

  public openStreamSettingView(): void {
    this.mProfileService.setModifyMode(ProfileModifyMode.STREAM);
  }

  public openOptionSettingView(): void {
    this.mProfileService.setModifyMode(ProfileModifyMode.SETTING);
  }

  public onNotificationSoundClick(option: NotificationSound): void {
    const soundId = option.getId();
    this.mNotificationSoundId = soundId;
    this.mOptionService.setNotificationSound(soundId);
  }

  public onThemeClick(themeOption: ThemeOption): void {
    this.theme = themeOption.theme;
    this.mOptionService.setTheme(this.theme);
  }
}

type ThemeOption = { name: string, theme: Theme };

type StreamPlatformImage = { id: string, src: ImageSrc };
