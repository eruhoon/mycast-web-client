import { Component, OnInit } from '@angular/core';
import { NotificationSound } from 'src/app/models/notification/NotificationSound';
import { NotificationSounds } from 'src/app/models/notification/NotificationSounds';
import { OptionService } from 'src/app/services/option/option.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss']
})
export class SettingViewComponent implements OnInit {

  private static DEFAULT_PLATFORM_IMAGE = '';

  public themeId: string;
  private mProfileService: ProfileService;
  private mOptionService: OptionService;
  private mNotificationSounds: NotificationSounds;
  private mThemes: Option[];
  private mStreamPlatformImages: StreamPlatformImage[];
  private mNotificationSoundId: string;

  public constructor(
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
      { id: 'local', src: '/assets/image/stream/mycast_b.png' },
      { id: 'twitch', src: '/assets/image/stream/twitch_b.png' },
      { id: 'afreeca', src: '/assets/image/stream/afreeca_b.png' },
      { id: 'mixer', src: '/assets/image/stream/mixer_b.png' },
      { id: 'totoro', src: '/assets/image/stream/totoro_b.png' },
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

  public getPlatformImage(): string {
    const platform = this.mProfileService.getStreamPlatform();
    const image = this.mStreamPlatformImages.find(p => p.id === platform);
    const src = image ? image.src : SettingViewComponent.DEFAULT_PLATFORM_IMAGE;
    return src;
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

type StreamPlatformImage = { id: string, src: string };
