import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { TopBarService } from './top-bar.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss', './top-bar.color.scss']
})
export class TopBarComponent {

  private static readonly INTERVAL_READ: number = 10000;

  @Output()
  public menuClick = new EventEmitter();

  private mProfileService: ProfileService;
  private mNotificationService: NotificationService;
  private mNotificationTimer: number;

  public constructor(
    private mService: TopBarService,
    profileService: ProfileService,
    notificationService: NotificationService) {
    this.mProfileService = profileService;
    this.mNotificationService = notificationService;
  }

  public getProfileIcon(): string {
    return this.mProfileService.getProfileIcon();
  }

  public getUnreadNotificationCount(): number {
    return this.mNotificationService.getUnreadNotificationCount();
  }

  public toggleNotificationList(): void {
    if (!this.mService.isNotiListOpen()) {
      this.mNotificationService.readAll();
      this.startNotificationTimer();
    } else {
      this.stopNotificationTimer();
    }
    this.mService.toggleNotiList();
  }

  public isNotificationListShow(): boolean {
    return this.mService.isNotiListOpen();
  }

  public isSettingShow(): boolean {
    return this.mService.isSettingMenuOpen();
  }

  public toggleSetting() {
    this.mService.toggleSettingMenu();
  }

  public closeSetting(): void {
    this.mService.closeSettingMenu();
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
