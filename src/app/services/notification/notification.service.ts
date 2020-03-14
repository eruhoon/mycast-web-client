import { Injectable, Input } from '@angular/core';
import { Notification } from 'src/app/models/notification/Notification';
import { User } from 'src/app/models/user/User';
import { OptionService } from '../option/option.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private mOption: OptionService;
  private mTarget: User | null;
  private mNotifications: Notification[];
  private mNotificationPushes: Notification[];

  public constructor(option: OptionService) {
    this.mOption = option;
    this.mTarget = null;
    this.mNotifications = [];
    this.mNotificationPushes = [];
  }

  public setTarget(target: User | null): void {
    this.mTarget = target;
  }

  public getTarget(): User | null {
    return this.mTarget;
  }

  public getNotifications(): Notification[] {
    return this.mNotifications;
  }

  public getNotificationPushes(): Notification[] {
    return this.mNotificationPushes;
  }

  public pushNotification(notification: Notification): void {
    this.mNotifications.unshift(notification);
    this.mNotifications =
      this.mNotifications.filter((_, i) => i < 10);
    this.mNotificationPushes.push(notification);
    this.performSound();
    setTimeout(() => {
      this.mNotificationPushes =
        this.mNotificationPushes.filter(n => n !== notification);
    }, 3000);
  }

  private performSound(): void {
    const audio = new Audio();
    audio.src = this.mOption.getNotificationSound().getSource();
    audio.load();
    audio.play();
  }
}
