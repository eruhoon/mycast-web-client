import { NotificationSound } from 'src/app/models/notification/NotificationSound';
import { NotificationSounds } from 'src/app/models/notification/NotificationSounds';
import { OptionService } from 'src/app/services/option/option.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss']
})
export class SettingViewComponent implements OnInit {

  public themeId: string;
  private mProfileService: ProfileService;
  private mOptionService: OptionService;
  private mNotificationSounds: NotificationSounds;
  private mThemes: Option[];
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
    this.mNotificationSoundId = NotificationSound.getDefaultSound().getId();
  }

  public ngOnInit(): void {
    this.mNotificationSoundId = this.mOptionService.getNotificationSound().getId();
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

  public isDataSaveMode(): boolean {
    return this.mOptionService.isDataSaveMode();
  }

  public toggleDataSaveMode(): void {
    const option = this.mOptionService.isDataSaveMode();
    return this.mOptionService.setDataSaveMode(!option);
  }

  public isScrollLockMode(): boolean {
    return this.mOptionService.isScrollLockMode();
  }

  public toggleScrollLockMode(): void {
    const option = this.mOptionService.isScrollLockMode();
    return this.mOptionService.setScrollLockMode(!option);
  }

  public onProfileSettingClick(): void {
    this.mProfileService.setModifyMode(true);
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
