import { User } from 'src/app/models/user/User';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-user-entry',
  templateUrl: './chat-user-entry.component.html',
  styleUrls: ['./chat-user-entry.component.scss','./chat-user-entry.color.scss']
})
export class ChatUserEntryComponent {

  @Input() user: User;

  private mNotificationService: NotificationService;

  public constructor(
    notificationService: NotificationService) {
    this.mNotificationService = notificationService;
  }

  public onUserIconClick(): void {
    this.mNotificationService.setTarget(this.user);
  }

}
