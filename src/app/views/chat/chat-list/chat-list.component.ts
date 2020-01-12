import { Chat } from 'src/app/models/chat/Chat';
import { ChatMerger } from 'src/app/models/chat/util/ChatMerger';

import {
    Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild
} from '@angular/core';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnChanges {

  @ViewChild('scrollList', { static: true }) mScrollList: ElementRef;
  @Input() chats: Chat[] | undefined = [];

  private mChatMerger: ChatMerger;

  public constructor() {
    this.chats = [];
    this.mChatMerger = new ChatMerger();
  }

  public ngOnInit() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.chats) {
      this.scrollToBottom(changes.chats.isFirstChange());
    }
  }

  protected getChats(): Chat[] {
    return this.getMergedChats();
  }

  private getMergedChats(): Chat[] {
    return this.mChatMerger.mergeChats(this.chats || []);
  }

  private scrollToBottom(isFirst: boolean): void {
    setTimeout(() => {
      const listElm = this.mScrollList.nativeElement;
      this.mScrollList.nativeElement.scrollTo({
        left: 0,
        top: listElm.scrollHeight,
        behavior: isFirst ? 'auto' : 'smooth'
      });
    });
  }
}
