import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat/Chat';
import { MockChat } from 'src/app/models/chat/MockChat';
import { MockChat2 } from 'src/app/models/chat/MockChat2';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  private mChats: Chat[];

  public constructor() {
    this.mChats = [new MockChat(), new MockChat2()];
  }

  public ngOnInit() { }

  protected getChats(): Chat[] {
    return this.mChats;
  }
}
