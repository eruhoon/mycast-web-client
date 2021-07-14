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
import { ChatEntryProp, ChatEntryPropSenderType } from './chat-entry.prop';

@Component({
  selector: 'chat-entry',
  templateUrl: './chat-entry.component.html',
  styleUrls: ['./chat-entry.component.scss', './chat-entry.color.scss'],
})
export class ChatEntryComponent implements OnInit {
  @Input() chat: Chat;

  @ViewChild('icon', { static: false }) mIconView: ElementRef<HTMLImageElement>;

  @Output() profileIconSelect = new EventEmitter<string>();

  static lolFanInfos: string[][] = [
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
    ['PSG', '#e30041'],
  ];

  prop: ChatEntryProp;

  public constructor(private mOption: OptionService) {}

  public ngOnInit(): void {
    const rawSenderType = this.chat.getSender().getType();
    const senderType = ChatEntryComponent.convertEnv(rawSenderType);
    const nickname = this.chat.getSender().getNickname();
    const iconBorder = ChatEntryComponent.createBorder(nickname);
    const icon = nickname.toUpperCase().startsWith('RNG')
      ? 'https://i.imgur.com/KUG4Uvq.png'
      : this.chat.getSender().getIcon();
    this.prop = new ChatEntryProp(nickname, icon, senderType, iconBorder);
  }

  public isDataSave(): boolean {
    return this.mOption.isDataSaveMode();
  }

  public onIconContextMenu(): boolean {
    const iconElm = this.mIconView.nativeElement;
    this.profileIconSelect.emit(iconElm.src);
    return false;
  }

  private static createBorder(nickname: string): string {
    const fanInfo = this.lolFanInfos.find((fanInfo) => {
      const prefix = fanInfo[0];
      return nickname.toUpperCase().startsWith(prefix);
    });
    const fanColor = fanInfo ? fanInfo[1] : null;
    return fanColor ? `2px solid ${fanColor}` : '2px transparent';
  }

  private static convertEnv(rawEnv: ChatSenderType): ChatEntryPropSenderType {
    switch (rawEnv) {
      case ChatSenderType.MOBILE:
        return ChatEntryProp.TYPE_MOBILE;
      case ChatSenderType.BOT:
        return ChatEntryProp.TYPE_BOT;
      case ChatSenderType.PC:
      default:
        return ChatEntryProp.TYPE_PC;
    }
  }
}
