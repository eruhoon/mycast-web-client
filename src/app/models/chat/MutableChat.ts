import { Chat } from './Chat';
import { ChatMessage } from './ChatMessage';
import { ChatSender, ChatSenderType } from './ChatSender';
import { MutableChatSender } from './MutableChatSender';

export class MutableChat implements Chat {
  #hash: string;
  #nickname: string;
  #level: number;
  #icon: string;
  #senderType: ChatSenderType;
  #messages: ChatMessage[];

  constructor() {
    this.#messages = [];
  }

  getSender(): ChatSender {
    const sender = new MutableChatSender();
    sender.setHash(this.#nickname + this.#level + this.#icon);
    sender.setNickname(this.#nickname);
    sender.setLevel(this.#level);
    sender.setIcon(this.#icon);
    sender.setType(this.#senderType);
    return sender;
  }

  getMessages(): ChatMessage[] {
    return this.#messages;
  }

  getHash(): string {
    return this.#hash;
  }

  setHash(hash: string): void {
    this.#hash = hash;
  }

  setNickname(nickname: string): void {
    this.#nickname = nickname;
  }

  setLevel(level: number): void {
    this.#level = level;
  }

  setIcon(icon: string): void {
    this.#icon = icon;
  }

  setSenderType(senderType: ChatSenderType): void {
    this.#senderType = senderType;
  }

  setMessages(chatMessages: ChatMessage[]): void {
    this.#messages = chatMessages;
  }

  addMessage(chatMessage: ChatMessage): void {
    this.#messages.push(chatMessage);
  }
}
