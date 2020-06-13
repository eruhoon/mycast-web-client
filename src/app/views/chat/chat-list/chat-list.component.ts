import { Chat } from 'src/app/models/chat/Chat';
import { CurrentChatService } from 'src/app/services/chat/current-chat.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, HostListener } from '@angular/core';

import { ChatListService } from './chat-list.service';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss', './chat-list.color.scss']
})
export class ChatListComponent implements OnInit {

  @ViewChild('scrollList', { static: true }) mScrollList: ElementRef;
  @Output() entryIconSelect: EventEmitter<string>;

  private mChats: Chat[];
  private mCurrentChatService: CurrentChatService;
  private mOptionService: OptionService;
  private mScrollTop: number;
  private mScrollHeight: number;

  public constructor(
    private mService: ChatListService,
    currentChatService: CurrentChatService,
    optionService: OptionService) {

    this.mChats = [];
    this.entryIconSelect = new EventEmitter<string>();
    this.mCurrentChatService = currentChatService;
    this.mOptionService = optionService;
    this.mScrollTop = 0;
    this.mScrollHeight = 0;
  }

  public ngOnInit() {
    this.mCurrentChatService.subscribeChat(chats => this.onChatsChanged(chats));

    this.mService.setScroller(this);
  }

  public getChats(): Chat[] {
    return this.mChats;
  }

  public onProfileIconSelect(iconSrc: string): void {
    this.entryIconSelect.emit(iconSrc);
  }

  public scrollToBottom(isFirst: boolean): void {
    setTimeout(() => {
      const listElement = this.mScrollList.nativeElement;
      listElement.scrollTo({
        left: 0,
        top: listElement.scrollHeight,
        behavior: isFirst ? 'auto' : 'smooth'
      });
    });
  }

  public onScroll(event: Event): void {
    const listElement = this.mScrollList.nativeElement as HTMLDivElement;
    const scrollHeight = listElement.scrollHeight;
    const scrollTop = listElement.scrollTop;
    const height = listElement.clientHeight;
    if (this.mScrollHeight === scrollHeight &&
      this.mScrollTop > scrollTop) {
      this.mOptionService.setScrollLockMode(true);
    } else if (this.mScrollHeight === scrollTop + height) {
      this.mOptionService.setScrollLockMode(false);
    }
    this.mScrollHeight = scrollHeight;
    this.mScrollTop = scrollTop;
  }

  private onChatsChanged(chats: Chat[]): void {
    const prevChats = this.mChats;
    this.mChats = chats;
    const isFirst = prevChats.length === 0;
    if (!this.mOptionService.isScrollLockMode()) {
      this.scrollToBottom(isFirst);
    }
  }
}
