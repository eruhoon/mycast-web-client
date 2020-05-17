import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss', './top-bar.color.scss']
})
export class TopBarComponent {

  private static readonly INTERVAL_READ: number = 10000;

  @Output()
  public menuClick = new EventEmitter();

  @Output()
  public settingClick = new EventEmitter();

  private mProfileService: ProfileService;
  private mNotificationService: NotificationService;
  private mNotificationListShow: boolean;
  private mNotificationTimer: number;

  public constructor(
    profileService: ProfileService,
    notificationService: NotificationService) {
    this.mProfileService = profileService;
    this.mNotificationService = notificationService;
    this.mNotificationListShow = false;
  }

  public getProfileIcon(): string {
    return this.mProfileService.getProfileIcon();
  }

  public getUnreadNotificationCount(): number {
    return this.mNotificationService.getUnreadNotificationCount();
  }

  public toggleNotificationList(): void {
    if (!this.mNotificationListShow) {
      this.mNotificationService.readAll();
      this.startNotificationTimer();
    } else {
      this.stopNotificationTimer();
    }
    this.mNotificationListShow = !this.mNotificationListShow;
  }

  public isNotificationListShow(): boolean {
    return this.mNotificationListShow;
  }

  public onMenuClick() {
    this.menuClick.emit();
  }

  public onSettingClick() {
    this.settingClick.emit();
  }

  private startNotificationTimer(): void {
    this.mNotificationTimer = Number(setInterval(() => {
      this.mNotificationService.readAll();
    }, TopBarComponent.INTERVAL_READ));
  }

  private stopNotificationTimer(): void {
    clearInterval(this.mNotificationTimer);
  }
}
