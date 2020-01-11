import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat/Chat';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Input() chats: Chat[];

  public constructor() { }

  public ngOnInit() { }

  protected getChats(): Chat[] {
    return this.chats;
  }
}
