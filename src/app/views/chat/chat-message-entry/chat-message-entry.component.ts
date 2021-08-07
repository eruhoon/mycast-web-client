import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat/ChatMessage';
import { DevelopModeService } from 'src/app/services/option/develop-mode.service';
import { OptionService } from 'src/app/services/option/option.service';

@Component({
  selector: 'chat-message-entry',
  templateUrl: './chat-message-entry.component.html',
  styleUrls: [
    './chat-message-entry.component.scss',
    './chat-message-entry.color.scss',
  ],
})
export class ChatMessageEntryComponent implements OnInit {
  @Input()
  message: ChatMessage;
  readonly developMode: DevelopModeService;
  readonly option: OptionService;
  reaction: boolean;
  timeText: string;

  constructor(option: OptionService, developMode: DevelopModeService) {
    this.timeText = '';
    this.developMode = developMode;
    this.option = option;
  }

  ngOnInit() {
    const timestamp = this.message.getTimestamp();
    this.timeText = ChatMessageEntryComponent.convertTimeToString(timestamp);
  }

  onReactionClick(): void {
    this.reaction = true;
  }

  private static convertTimeToString(timestamp: number): string {
    const padZero = (n: number) => (n < 10 ? `0${n}` : n);
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
