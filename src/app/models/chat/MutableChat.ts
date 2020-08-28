import { Chat } from './Chat';
import { ChatMessage } from './ChatMessage';
import { ChatSender, ChatSenderType } from './ChatSender';
import { MutableChatSender } from './MutableChatSender';

export class MutableChat implements Chat {
  private mHash: string;
  private mNickname: string;
  private mLevel: number;
  private mIcon: string;
  private mSenderType: ChatSenderType;
  private mMessages: ChatMessage[];

  public constructor() {
    this.mMessages = [];
  }

  public getSender(): ChatSender {
    const sender = new MutableChatSender();
    sender.setHash(this.mNickname + this.mLevel + this.mIcon);
    sender.setNickname(this.mNickname);
    sender.setLevel(this.mLevel);
    sender.setIcon(this.mIcon);
    sender.setType(this.mSenderType);
    return sender;
  }

  public getMessages(): ChatMessage[] {
    return this.mMessages;
  }

  public getHash(): string {
    return this.mHash;
  }

  public setHash(hash: string): void {
    this.mHash = hash;
  }

  public setNickname(nickname: string): void {
    this.mNickname = nickname;
  }

  public setLevel(level: number): void {
    this.mLevel = level;
  }

  public setIcon(icon: string): void {
    this.mIcon = icon;
  }

  public setSenderType(senderType: ChatSenderType): void {
    this.mSenderType = senderType;
  }

  public addMessage(chatMessage: ChatMessage): void {
    this.mMessages.push(chatMessage);
  }
}
