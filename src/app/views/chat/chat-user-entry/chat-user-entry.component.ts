import { User } from 'src/app/models/user/User';
import { MainService } from 'src/app/services/main/main.service';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-user-entry',
  templateUrl: './chat-user-entry.component.html',
  styleUrls: ['./chat-user-entry.component.scss']
})
export class ChatUserEntryComponent {

  @Input() user: User;

  private mMainService: MainService;

  public constructor(mainService: MainService) {
    this.mMainService = mainService;
  }

  public onUserIconClick(): void {
    this.mMainService.notify(this.user.getHash());
  }

}
