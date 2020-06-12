import { ChatMessage } from 'src/app/models/chat/ChatMessage';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-message-entry',
  templateUrl: './chat-message-entry.component.html',
  styleUrls: [
    './chat-message-entry.component.scss',
    './chat-message-entry.color.scss']
})
export class ChatMessageEntryComponent implements OnInit {

  @Input()
  public message: ChatMessage;

  private mTimeStr: string;

  public constructor(
    private mOption: OptionService) {
    this.mTimeStr = '';
  }

  public ngOnInit() {
    const timestamp = this.message.getTimestamp();
    this.mTimeStr = ChatMessageEntryComponent.convertTimeToString(timestamp);
  }

  public isTimestampShow(): boolean {
    return this.mOption.isTimestampShow();
  }

  public getTimeString() {
    return this.mTimeStr;
  }

  private static convertTimeToString(timestamp: number): string {
    const padZero = (n: number) => n < 10 ? `0${n}` : n;
    const time = new Date(timestamp);

    const y = time.getFullYear();
    const mm = padZero(time.getMonth() + 1);
    const d = padZero(time.getDate());
    const h = padZero(time.getHours());
    const m = padZero(time.getMinutes());
    const s = padZero(time.getSeconds());
    return `${y}-${mm}-${d} ${h}:${m}:${s}`;
  }
}
