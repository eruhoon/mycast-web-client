import { MutableNotification } from 'src/app/models/notification/MutableNotification';
import { VegaNotification } from 'src/app/models/notification/VegaNotification';
import { User } from 'src/app/models/user/User';

import { Injectable } from '@angular/core';

import { OptionService } from '../option/option.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private mOption: OptionService;
  private mTarget: User | null;
  private mNotifications: MutableNotification[];
  private mNotificationPushes: VegaNotification[];

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

  public getUnreadNotificationCount(): number {
    return this.mNotifications.filter(n => !n.isRead()).length;
  }

  public getNotifications(): VegaNotification[] {
    return this.mNotifications;
  }

  public getNotificationPushes(): VegaNotification[] {
    return this.mNotificationPushes;
  }

  public pushNotification(notification: VegaNotification): void {
    const mutableNotification = MutableNotification.clone(notification);
    this.mNotifications.unshift(mutableNotification);
    this.mNotifications = this.mNotifications.filter((_, i) => i < 10);
    this.mNotificationPushes.push(mutableNotification);
    this.performSound();
    setTimeout(() => {
      this.mNotificationPushes =
        this.mNotificationPushes.filter(n => n !== mutableNotification);
    }, 3000);

    this.requestToPushWebNotification(notification);
  }

  private requestToPushWebNotification(vegaNoti: VegaNotification): void {
    const onGrant = () => {
      const notification = new Notification(vegaNoti.getTitle(), {
        icon: vegaNoti.getIcon(),
        body: vegaNoti.getBody(),
        timestamp: vegaNoti.getTimeStamp(),
      });
      notification.onclick = () => {
        window.focus();
      };
    };
    if (!('Notification' in window)) {
      console.error('notification not supported');
    } else if (Notification.permission === 'granted') {
      onGrant();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          onGrant();
        }
      });
    }
  }

  public readAll(): void {
    this.mNotifications.forEach(notification => notification.read());
  }

  private performSound(): void {
    const audio = new Audio();
    audio.src = this.mOption.getNotificationSound().getSource();
    audio.load();
    audio.play();
  }
}
