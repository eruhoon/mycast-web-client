import { Chat } from 'src/app/models/chat/Chat';
import { ChatSenderType } from 'src/app/models/chat/ChatSender';

import {
    Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';

@Component({
  selector: 'chat-entry',
  templateUrl: './chat-entry.component.html',
  styleUrls: ['./chat-entry.component.scss', './chat-entry.color.scss']
})
export class ChatEntryComponent implements OnInit {

  @Input() chat: Chat;

  @ViewChild('icon', { static: false }) mIconView: ElementRef<HTMLImageElement>;

  @Output()
  public profileIconSelect = new EventEmitter<string>();

  public SenderEnv = SenderEnv;

  private mEnvironment: SenderEnv;

  public constructor() { }

  public ngOnInit(): void {
    const env = this.chat.getSender().getType();
    this.mEnvironment = ChatEntryComponent.convertEnv(env);

  }

  public getIcon(): string {
    return this.chat.getSender().getIcon().trim();
  }

  public getEnvironment(): SenderEnv {
    return this.mEnvironment;
  }

  public onIconContextMenu(): boolean {
    const iconElm = this.mIconView.nativeElement;
    this.profileIconSelect.emit(iconElm.src);
    return false;
  }

  public onImagePackClick(image: string): void {
    console.log(image);
  }

  private static convertEnv(rawEnv: ChatSenderType): SenderEnv {
    switch (rawEnv) {
      case ChatSenderType.MOBILE: return SenderEnv.MOBILE;
      case ChatSenderType.BOT: return SenderEnv.BOT;
      case ChatSenderType.PC:
      default:
        return SenderEnv.PC;
    }
  }
}

enum SenderEnv {
  PC,
  MOBILE,
  BOT,
}
