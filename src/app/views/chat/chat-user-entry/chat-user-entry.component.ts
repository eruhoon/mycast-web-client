import { User } from 'src/app/models/user/User';
import { MainService } from 'src/app/services/main/main.service';

import { Component, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'chat-user-entry',
  templateUrl: './chat-user-entry.component.html',
  styleUrls: ['./chat-user-entry.component.scss']
})
export class ChatUserEntryComponent {

  @Input() user: User;

  private mMainService: MainService;
  private mNotificationService: NotificationService;

  public constructor(
    mainService: MainService,
    notificationService: NotificationService) {
    this.mMainService = mainService;
    this.mNotificationService = notificationService;
  }

  public onUserIconClick(): void {
    this.mNotificationService.setTarget(this.user);
  }

}
