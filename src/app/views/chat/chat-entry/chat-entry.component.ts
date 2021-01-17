import { Chat } from 'src/app/models/chat/Chat';
import { ChatSenderType } from 'src/app/models/chat/ChatSender';
import { OptionService } from 'src/app/services/option/option.service';

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'chat-entry',
  templateUrl: './chat-entry.component.html',
  styleUrls: ['./chat-entry.component.scss', './chat-entry.color.scss'],
})
export class ChatEntryComponent implements OnInit {
  @Input() chat: Chat;

  @ViewChild('icon', { static: false }) mIconView: ElementRef<HTMLImageElement>;

  @Output()
  public profileIconSelect = new EventEmitter<string>();

  public SenderEnv = SenderEnv;

  private mEnvironment: SenderEnv;
  private mLolFanInfos: string[][] = [
    ['DK', '#0ec7b5'],
    ['DRX', '#5a8dff'],
    ['GEN', '#aa8a00'],
    ['AF', '#00adef'],
    ['T1', '#e4002b'],
    ['KT', '#ffffff'],
    ['LSB', '#fcbf26'],
    ['NS', '#de2027'],
    ['HLE', '#ff6b01'],
    ['BRO', '#00492b'],
  ];
  private mFanColor: string | null;

  public constructor(private mOption: OptionService) {
    this.mFanColor = null;
  }

  public ngOnInit(): void {
    const env = this.chat.getSender().getType();
    this.mEnvironment = ChatEntryComponent.convertEnv(env);

    const nickname = this.chat.getSender().getNickname();
    const fanInfo = this.mLolFanInfos.find((fanInfo) => {
      const prefix = fanInfo[0];
      return nickname.toUpperCase().startsWith(prefix);
    });
    this.mFanColor = fanInfo ? fanInfo[1] : null;
  }

  public getIcon(): string {
    return this.chat.getSender().getIcon().trim();
  }

  public getEnvironment(): SenderEnv {
    return this.mEnvironment;
  }

  public isDataSave(): boolean {
    return this.mOption.isDataSaveMode();
  }

  public onIconContextMenu(): boolean {
    const iconElm = this.mIconView.nativeElement;
    this.profileIconSelect.emit(iconElm.src);
    return false;
  }

  public getBorder(): string {
    if (this.mFanColor) {
      return `2px solid ${this.mFanColor}`;
    }

    return 'none';
  }

  private static convertEnv(rawEnv: ChatSenderType): SenderEnv {
    switch (rawEnv) {
      case ChatSenderType.MOBILE:
        return SenderEnv.MOBILE;
      case ChatSenderType.BOT:
        return SenderEnv.BOT;
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
