import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  @Output()
  public menuClick = new EventEmitter();

  @Output()
  public settingClick = new EventEmitter();

  private mProfileService: ProfileService;
  private mNotificationService: NotificationService;

  public constructor(
    profileService: ProfileService,
    notificationService: NotificationService) {
    this.mProfileService = profileService;
    this.mNotificationService = notificationService;
  }

  public getProfileIcon(): string {
    return this.mProfileService.getProfileIcon();
  }

  public getNotificationCount(): number {
    return this.mNotificationService.getNotifications().length;
  }

  public onMenuClick() {
    this.menuClick.emit();
  }

  public onSettingClick() {
    this.settingClick.emit();
  }

}
