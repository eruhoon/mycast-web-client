import { Chat } from 'src/app/models/chat/Chat';
import { CurrentChatService } from 'src/app/services/chat/current-chat.service';

import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { OptionService } from 'src/app/services/option/option.service';

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
  private mOptionService: OptionService;

  public constructor(
    currentChatService: CurrentChatService,
    optionService: OptionService) {

    this.mChats = [];
    this.entryIconSelect = new EventEmitter<string>();
    this.mCurrentChatService = currentChatService;
    this.mOptionService = optionService;
  }

  public ngOnInit() {
    this.mCurrentChatService.getChats().subscribe(chats => {
      const prevChats = this.mChats;
      this.mChats = chats;
      const isFirst = prevChats.length === 0;
      if (!this.mOptionService.isScrollLockMode()) {
        this.scrollToBottom(isFirst);
      }
    });
  }

  public getChats(): Chat[] {
    return this.mChats;
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
