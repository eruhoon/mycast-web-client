import { ChatHistoryList } from 'src/app/models/chat/history/ChatHistoryList';
import { ChatService } from 'src/app/services/chat/chat.service';
import { CurrentChatService } from 'src/app/services/chat/current-chat.service';
import { OptionService } from 'src/app/services/option/option.service';

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
  private mOptionService: OptionService;
  private mCurrentChatService: CurrentChatService;

  constructor(
    chatService: ChatService,
    optionService: OptionService,
    currentChatService: CurrentChatService) {

    this.mChatService = chatService;
    this.mOptionService = optionService;
    this.mCurrentChatService = currentChatService;
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

  public isChatUserListShow(): boolean {
    return this.mChatService.isChatUserListShow();
  }

  public onChatUserButtonClick(): void {
    this.mChatService.toggleChatUserList();
  }

  public onChatClearButtonClick(): void {
    this.mCurrentChatService.clearChat();
  }

  public onPressEnter(event: KeyboardEvent): boolean {
    const input = this.getInput();
    this.sendChat(input);
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

  private sendChat(input: string | null): void {
    if (!input) {
      return;
    }
    this.chatInput.emit(input);
    this.mChatHistoryList.addHistory(input);
    this.mChatHistoryList.resetIndex();
  }

  public isScrollLockMode(): boolean {
    return this.mOptionService.isScrollLockMode();
  }

  public toggleScrollLockMode(): void {
    const scrollLock = this.mOptionService.isScrollLockMode();
    this.mOptionService.setScrollLockMode(!scrollLock);
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
