import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat/Chat';
import { ChatMerger } from 'src/app/models/chat/util/ChatMerger';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Input() chats: Chat[];

  private mChatMerger: ChatMerger;

  public constructor() {
    this.mChatMerger = new ChatMerger;
  }

  public ngOnInit() { }

  protected getChats(): Chat[] {
    return this.getMergedChats();
  }

  private getMergedChats(): Chat[] {
    return this.mChatMerger.mergeChats(this.chats);
  }
}
