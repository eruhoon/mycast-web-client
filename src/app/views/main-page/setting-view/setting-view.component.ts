import { NotificationSound } from 'src/app/models/notification/NotificationSound';
import { NotificationSounds } from 'src/app/models/notification/NotificationSounds';
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

  public themeId: string;
  private mProfileService: ProfileService;
  private mOptionService: OptionService;
  private mNotificationSounds: NotificationSounds;
  private mThemes: Option[];
  private mStreamPlatformImages: StreamPlatformImage[];
  private mNotificationSoundId: string;

  public constructor(
    private mThemeService: ThemeService,
    profileService: ProfileService, optionService: OptionService) {
    this.themeId = 'default';

    this.mProfileService = profileService;
    this.mOptionService = optionService;
    this.mNotificationSounds = new NotificationSounds();
    this.mThemes = [
      { id: 'default', name: '기본' },
      { id: 'dark', name: '어두운모드' },
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
    this.mNotificationSoundId = this.mOptionService.getNotificationSound().getId();
    this.mProfileService.loadStream();
  }

  public getNotficationSoundId(): string {
    return this.mNotificationSoundId;
  }

  public getNotificationSounds(): NotificationSound[] {
    return this.mNotificationSounds.getList();
  }

  public getThemes(): Option[] {
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

  public openProfileSettingView(): void {
    this.mProfileService.setModifyMode(ProfileModifyMode.PROFILE);
  }

  public openStreamSettingView(): void {
    this.mProfileService.setModifyMode(ProfileModifyMode.STREAM);
  }

  public onNotificationSoundClick(option: NotificationSound): void {
    const soundId = option.getId();
    this.mNotificationSoundId = soundId;
    this.mOptionService.setNotificationSound(soundId);
  }

  public onThemeClick(themeOption: Option): void {
    console.log(themeOption);
    this.themeId = themeOption.id;
  }
}

type Option = { id: string, name: string };

type StreamPlatformImage = { id: string, src: ImageSrc };
