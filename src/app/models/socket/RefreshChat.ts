import { Chat } from '../chat/Chat';
import { ChatMessage } from '../chat/ChatMessage';
import { ChatSender, ChatSenderType } from '../chat/ChatSender';
import { ChatType } from '../chat/ChatType';
import { ChatTypeParser } from '../chat/util/ChatTypeParser';
import { RefreshChatDto } from './RefreshChatDto';

export class RefreshChat implements Chat {
  private mSender: ChatSender;
  private mMessages: ChatMessage[];

  public constructor(private mDto: RefreshChatDto) {
    this.mSender = new RefreshChatSender(this.mDto);
    this.mMessages = [new RefreshChatMessage(this.mDto)];
  }
  public getHash(): string {
    return this.mDto.hash;
  }

  public getSender(): ChatSender {
    return this.mSender;
  }

  public getMessages(): ChatMessage[] {
    return this.mMessages;
  }
}

class RefreshChatSender implements ChatSender {
  public constructor(private mDto: RefreshChatDto) {}

  public getHash(): string {
    return this.mDto.nickname + this.mDto.level + this.mDto.icon;
  }

  public getNickname(): string {
    return this.mDto.nickname;
  }

  public getLevel(): number {
    return this.mDto.level;
  }

  public getIcon(): string {
    return this.mDto.icon;
  }

  public getType(): ChatSenderType {
    if (this.isLegacyBot()) {
      return ChatSenderType.BOT;
    }
    if (this.mDto.isMobile) {
      return ChatSenderType.MOBILE;
    }
    return ChatSenderType.PC;
  }

  private isLegacyBot(): boolean {
    return this.mDto.level === 100;
  }
}

class RefreshChatMessage implements ChatMessage {
  private mTimestamp: number;
  private mType: ChatType;

  public constructor(private mDto: RefreshChatDto) {
    this.mType = new ChatTypeParser().parse(this.mDto.type);
    this.mTimestamp = new Date(this.mDto.timestamp).getTime();
  }

  public getHash(): string {
    return this.mDto.hash;
  }

  public getType(): ChatType {
    return this.mType;
  }

  public getRequest(): string {
    return this.mDto.msg.request || '';
  }

  public getMessage(): string {
    return this.mDto.msg.response;
  }

  public getTimestamp(): number {
    return this.mTimestamp;
  }
}
