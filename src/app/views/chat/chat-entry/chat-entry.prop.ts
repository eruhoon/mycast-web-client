export class ChatEntryProp {
  readonly nickname: string;
  readonly icon: string;
  readonly senderType: string;
  readonly border: string;

  constructor(
    nickname: string,
    icon: string,
    senderType: ChatEntryPropSenderType,
    border: string
  ) {
    this.nickname = nickname;
    this.icon = icon;
    this.senderType = senderType;
    this.border = border;
  }
}

export type ChatEntryPropSenderType = 'PC' | 'MOBILE' | 'BOT';
