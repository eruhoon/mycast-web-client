import { ChatHistoryList } from 'src/app/models/chat/history/ChatHistoryList';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent implements OnInit {

  @Input() chatText: string;

  @Output() chatInput = new EventEmitter<string>();

  private mChatHistoryList: ChatHistoryList;

  constructor() {
    this.mChatHistoryList = new ChatHistoryList();
  }

  ngOnInit() {
  }

  protected onEnter(chatStr: string): void {
    if (!chatStr) {
      return;
    }
    this.chatInput.emit(chatStr);
    this.mChatHistoryList.addHistory(chatStr);
    this.mChatHistoryList.resetIndex();
  }

  protected getPrevChat(): string {
    if (this.mChatHistoryList.isEmpty()) {
      return '';
    }
    return this.mChatHistoryList.getPrev();
  }

  protected getNextChat(): string {
    if (this.mChatHistoryList.isEmpty()) {
      return '';
    }
    return this.mChatHistoryList.getNext();
  }
}
