import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification/Notification';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent {

  private mNotificationService: NotificationService;

  public constructor(notificationServive: NotificationService) {
    this.mNotificationService = notificationServive;
  }

  public getNotificationParams(): Param[] {
    return this.mNotificationService.getNotifications().map(n => {
      const timeText = this.createTimeText(n.getTimeStamp());
      return {
        notification: n,
        timeText: timeText,
      }
    });
  }

  private createTimeText(timestamp: number): string {
    const now = new Date().getTime();
    const ago = now - timestamp;
    const agoSecond = Math.round(ago / 1000);
    const agoMinute = Math.floor(agoSecond / 60);
    const agoHour = Math.floor(agoMinute / 60);
    const agoDate = Math.floor(agoHour / 24);
    let timeText: string;
    if (agoDate > 0) {
      timeText = `${agoDate}일 전`;
    } else if (agoHour > 0) {
      timeText = `${agoHour}시간 전`;
    } else if (agoMinute > 0) {
      timeText = `${agoMinute}분 전`;
    } else {
      timeText = '방금' + agoSecond;
    }
    return timeText;
  }
}

type Param = {
  notification: Notification,
  timeText: string,
};
