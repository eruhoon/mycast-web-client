import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { User } from 'src/app/models/user/User';
import { MainService } from 'src/app/services/main/main.service';
import { ToastService } from 'src/app/services/notification/toast.service';

@Component({
  selector: 'notification-request-popup',
  templateUrl: './notification-request-popup.component.html',
  styleUrls: ['./notification-request-popup.component.scss']
})
export class NotificationRequestPopupComponent implements OnInit {

  private mMainService: MainService;
  private mNotificationService: NotificationService;
  private mToastService: ToastService;

  public constructor(
    mainService: MainService,
    notificationService: NotificationService,
    toastService: ToastService) {
    this.mMainService = mainService;
    this.mNotificationService = notificationService;
    this.mToastService = toastService;
  }

  public ngOnInit() {
  }

  public onSendClick(): void {
    this.sendNotification();
    this.mNotificationService.setTarget(null);
  }

  public getTarget(): User | null {
    return this.mNotificationService.getTarget();
  }

  public getIcon(): string {
    const target = this.mNotificationService.getTarget();
    return target ? target.getIcon() : '';
  }

  public sendNotification(): void {
    const target = this.mNotificationService.getTarget();
    if (target === null) {
      console.log('no target');
      return;
    }
    this.mMainService.notify(target.getHash());
    this.mToastService.toast(`'${target.getName()}'님에게 호출했어요 !`);
  }

  public clearTarget(): void {
    this.mNotificationService.setTarget(null);
  }
}
