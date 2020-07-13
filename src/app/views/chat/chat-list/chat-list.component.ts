import { Chat } from 'src/app/models/chat/Chat';
import { CurrentChatService } from 'src/app/services/chat/current-chat.service';
import { OptionService } from 'src/app/services/option/option.service';

import {
  Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild
} from '@angular/core';

import { ChatListService } from './chat-list.service';
import { ChatSenderType } from 'src/app/models/chat/ChatSender';

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
  private mScrollTimer = -1;

  public constructor(
    private mService: ChatListService,
    currentChatService: CurrentChatService,
    optionService: OptionService) {

    this.mChats = [];
    this.entryIconSelect = new EventEmitter<string>();
    this.mCurrentChatService = currentChatService;
    this.mOptionService = optionService;
  }

  public ngOnInit() {
    this.mCurrentChatService.subscribeChat(chats => this.onChatsChanged(chats));

    this.mService.setScroller(this);
  }

  public getChats(): Chat[] {
    return this.mChats;
  }

  public isHidden(chat: Chat): boolean {
    if (this.mOptionService.isChatBotDisabled()) {
      return chat.getSender().getType() === ChatSenderType.BOT;
    }
    return false;
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
    if (scrollHeight > scrollTop + height + 300) {
      if (this.mScrollTimer === -1) {
        this.mScrollTimer = Number(setTimeout(() => {
          this.mOptionService.setScrollLockMode(true);
        }, 1000));
      }
    } else {
      clearTimeout(this.mScrollTimer);
      this.mScrollTimer = -1;
      this.mOptionService.setScrollLockMode(false);
    }
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
