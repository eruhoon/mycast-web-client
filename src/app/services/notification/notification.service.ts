import { Notification } from 'src/app/models/notification/Notification';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private mNotifications: Notification[];
  private mNotificationPushes: Notification[];

  public constructor() {
    this.mNotifications = [];
    this.mNotificationPushes = [];
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
    setTimeout(() => {
      this.mNotificationPushes =
        this.mNotificationPushes.filter(n => n !== notification);
    }, 3000);
  }
}
