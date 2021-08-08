import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Chat } from 'src/app/models/chat/Chat';
import { ChatSenderType } from 'src/app/models/chat/ChatSender';
import { CurrentChatService } from 'src/app/services/chat/current-chat.service';
import { OptionService } from 'src/app/services/option/option.service';
import { ChatListService } from './chat-list.service';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss', './chat-list.color.scss'],
})
export class ChatListComponent implements OnInit {
  @ViewChild('scrollList', { static: true }) mScrollList: ElementRef;
  @Output() entryIconSelect = new EventEmitter<string>();

  #chats: Chat[];
  #currentChatService: CurrentChatService;
  #optionService: OptionService;
  #scrollTimer = -1;
  #service: ChatListService;

  constructor(
    service: ChatListService,
    currentChatService: CurrentChatService,
    optionService: OptionService
  ) {
    this.#chats = [];
    this.#service = service;
    this.#currentChatService = currentChatService;
    this.#optionService = optionService;
  }

  ngOnInit() {
    this.#currentChatService.subscribeChat((chats) =>
      this.onChatsChanged(chats)
    );

    this.#service.setScroller(this);
  }

  getChats(): Chat[] {
    return this.#chats;
  }

  isHidden(chat: Chat): boolean {
    if (this.#optionService.isChatBotDisabled()) {
      return chat.getSender().getType() === ChatSenderType.BOT;
    }
    return false;
  }

  onProfileIconSelect(iconSrc: string): void {
    this.entryIconSelect.emit(iconSrc);
  }

  scrollToBottom(isFirst: boolean): void {
    setTimeout(() => {
      const listElement = this.mScrollList.nativeElement;
      listElement.scrollTo({
        left: 0,
        top: listElement.scrollHeight,
        behavior: isFirst ? 'auto' : 'smooth',
      });
    });
  }

  onScroll(event: Event): void {
    const listElement = this.mScrollList.nativeElement as HTMLDivElement;
    const scrollHeight = listElement.scrollHeight;
    const scrollTop = listElement.scrollTop;
    const height = listElement.clientHeight;
    if (scrollHeight > scrollTop + height + 300) {
      if (this.#scrollTimer === -1) {
        this.#scrollTimer = Number(
          setTimeout(() => {
            this.#optionService.setScrollLockMode(true);
          }, 1000)
        );
      }
    } else {
      clearTimeout(this.#scrollTimer);
      this.#scrollTimer = -1;
      this.#optionService.setScrollLockMode(false);
    }
  }

  private onChatsChanged(chats: Chat[]): void {
    const prevChats = this.#chats;
    this.#chats = chats;
    const isFirst = prevChats.length === 0;
    if (!this.#optionService.isScrollLockMode()) {
      this.scrollToBottom(isFirst);
    }
  }
}
