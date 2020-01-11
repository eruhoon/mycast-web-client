import { Chat } from 'src/app/models/chat/Chat';
import { ChatMerger } from 'src/app/models/chat/util/ChatMerger';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Input() chats: Chat[] | undefined = [];

  private mChatMerger: ChatMerger;

  public constructor() {
    this.chats = [];
    this.mChatMerger = new ChatMerger();
  }

  public ngOnInit() { }

  protected getChats(): Chat[] {
    return this.getMergedChats();
  }

  private getMergedChats(): Chat[] {
    const chats = this.chats || [];
    return this.mChatMerger.mergeChats(chats);
  }
}
