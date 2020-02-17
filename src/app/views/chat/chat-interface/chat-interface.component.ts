import { ChatHistoryList } from 'src/app/models/chat/history/ChatHistoryList';
import { ChatService } from 'src/app/services/chat/chat.service';

import {
    Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';

@Component({
  selector: 'chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent implements OnInit {

  @Input() chatText: string;

  @Output() chatInput = new EventEmitter<string>();

  @ViewChild('inputBox', { static: false })
  private mInputBox: ElementRef<HTMLInputElement>;
  private mChatHistoryList: ChatHistoryList;
  private mChatService: ChatService;

  constructor(chatService: ChatService) {
    this.mChatService = chatService;
    this.mChatHistoryList = new ChatHistoryList();
  }

  ngOnInit() {
  }

  public setInput(input: string): void {
    this.getInputBox().value = input;
  }

  public getInput(): string {
    const inputBox = this.mInputBox.nativeElement;
    return inputBox.value;
  }

  public clearInput(): void {
    this.setInput('');
  }

  public onChatUserButtonClick(): void {
    this.mChatService.toggleChatUserList();
  }

  public onPressEnter(): boolean {
    const input = this.getInput();
    if (!input) {
      return false;
    }
    this.chatInput.emit(input);
    this.mChatHistoryList.addHistory(input);
    this.mChatHistoryList.resetIndex();
    this.clearInput();
    return false;
  }

  public onPressUp(): boolean {
    this.setInput(this.getPrevChat());
    return false;
  }
  public onPressDown(): boolean {
    this.setInput(this.getNextChat());
    return false;
  }

  private getPrevChat(): string {
    if (this.mChatHistoryList.isEmpty()) {
      return '';
    }
    return this.mChatHistoryList.getPrev();
  }

  private getNextChat(): string {
    if (this.mChatHistoryList.isEmpty()) {
      return '';
    }
    return this.mChatHistoryList.getNext();
  }

  private getInputBox(): HTMLInputElement {
    return this.mInputBox.nativeElement;
  }
}
