import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss']
})
export class SettingViewComponent {

  private mProfileService: ProfileService;
  private mNotificationSounds: NotificationOption[];

  public constructor(profileService: ProfileService) {
    this.mProfileService = profileService;
    this.mNotificationSounds = [
      { id: 'hello-robot', name: '안녕로봇' },
      { id: 'd-va', name: '디바' },
      { id: 'iphone', name: '아이폰' },
      { id: 'horn', name: '기상나팔' },
      { id: 'wake-up', name: '어서일어나' },
    ]
  }

  public getNotificationSounds(): NotificationOption[] {
    return this.mNotificationSounds;
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

  public onProfileSettingClick(): void {
    this.mProfileService.setModifyMode(true);
  }
}

type NotificationOption = { id: string, name: string };
