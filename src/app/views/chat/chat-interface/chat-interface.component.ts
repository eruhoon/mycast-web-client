import { ChatHistoryList } from 'src/app/models/chat/history/ChatHistoryList';

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

  constructor() {
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

  protected onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter': return this.onPressEnter();
      case 'ArrowUp': return this.onPressUp();
      case 'ArrowDown': return this.onPressDown();
    }
  }
  protected onPressEnter(): void {
    const input = this.getInput();
    if (!input) {
      return;
    }
    this.chatInput.emit(input);
    this.mChatHistoryList.addHistory(input);
    this.mChatHistoryList.resetIndex();
    this.clearInput();
  }

  protected onPressUp(): void {
    this.setInput(this.getPrevChat());
  }
  protected onPressDown(): void {
    this.setInput(this.getNextChat());
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
