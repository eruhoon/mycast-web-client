import { User } from 'src/app/models/user/User';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-user-entry',
  templateUrl: './chat-user-entry.component.html',
  styleUrls: ['./chat-user-entry.component.scss']
})
export class ChatUserEntryComponent {

  @Input() user: User;

  public constructor() { }

}
