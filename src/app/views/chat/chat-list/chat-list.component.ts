import { Chat } from 'src/app/models/chat/Chat';
import { ChatMerger } from 'src/app/models/chat/util/ChatMerger';
import { CurrentChatService } from 'src/app/services/chat/current-chat.service';

import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @ViewChild('scrollList', { static: true }) mScrollList: ElementRef;
  @Output() entryIconSelect: EventEmitter<string>;

  private mChats: Chat[];
  private mCurrentChatService: CurrentChatService;
  private mChatMerger: ChatMerger;

  public constructor(currentChatService: CurrentChatService) {
    this.mChats = [];
    this.entryIconSelect = new EventEmitter<string>();
    this.mCurrentChatService = currentChatService;
    this.mChatMerger = new ChatMerger();
  }

  public ngOnInit() {
    this.mCurrentChatService.getChats().subscribe(chats => {
      const prevChats = this.mChats;
      this.mChats = chats;
      const isFirst = prevChats.length === 0;
      this.scrollToBottom(isFirst);
    });
  }

  public getChats(): Chat[] {
    return this.mChatMerger.mergeChats(this.mChats || []);
  }

  public onProfileIconSelect(iconSrc: string): void {
    this.entryIconSelect.emit(iconSrc);
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
