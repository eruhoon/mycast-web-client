import { Notification } from 'src/app/models/notification/Notification';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notification-push-list',
  templateUrl: './notification-push-list.component.html',
  styleUrls: ['./notification-push-list.component.scss']
})
export class NotificationPushListComponent implements OnInit {

  private mNotificationService: NotificationService;

  public constructor(notificationServive: NotificationService) {
    this.mNotificationService = notificationServive;
  }

  public ngOnInit() {
  }

  public getNotification(): Notification[] {
    return [...this.mNotificationService.getNotificationPushes()];
  }
}
