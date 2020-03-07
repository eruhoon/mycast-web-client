import { OptionService } from 'src/app/services/option/option.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss']
})
export class SettingViewComponent {

  public notificationSoundId: string;
  public themeId: string;
  private mProfileService: ProfileService;
  private mOptionService: OptionService;
  private mNotificationSounds: NotificationOption[];
  private mThemes: Option[];

  public constructor(
    profileService: ProfileService, optionService: OptionService) {
    this.notificationSoundId = 'hello-robot';
    this.themeId = 'default';

    this.mProfileService = profileService;
    this.mOptionService = optionService;
    this.mNotificationSounds = [
      { id: 'hello-robot', name: '안녕로봇' },
      { id: 'd-va', name: '디바' },
      { id: 'iphone', name: '아이폰' },
      { id: 'horn', name: '기상나팔' },
      { id: 'wake-up', name: '어서일어나' },
    ];
    this.mThemes = [
      { id: 'default', name: '기본' },
      { id: 'dark', name: '어두운모드' },
    ];
  }

  public getNotificationSounds(): NotificationOption[] {
    return this.mNotificationSounds;
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

  public getNotificationSound(): string {
    return 'hello-robot';
  }

  public isDataSaveMode(): boolean {
    return this.mOptionService.isDataSaveMode();
  }

  public toggleDataSaveMode(): void {
    console.log('toggle');
    const option = this.mOptionService.isDataSaveMode();
    return this.mOptionService.setDataSaveMode(!option);
  }

  public onProfileSettingClick(): void {
    this.mProfileService.setModifyMode(true);
  }

  public onThemeClick(themeOption: Option): void {
    console.log(themeOption);
    this.themeId = themeOption.id;
  }
}

type Option = { id: string, name: string };
type NotificationOption = { id: string, name: string };
