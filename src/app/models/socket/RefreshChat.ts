import { Chat } from '../chat/Chat';
import { ChatMessage } from '../chat/ChatMessage';
import { ChatSender, ChatSenderType } from '../chat/ChatSender';
import { ChatType } from '../chat/ChatType';
import { Reaction } from '../chat/reaction/Reaction';
import { ChatTypeParser } from '../chat/util/ChatTypeParser';
import { RefreshChatDto, RefreshReactionDto } from './RefreshChatDto';

export class RefreshChat implements Chat {
  #dto: RefreshChatDto;
  #sender: ChatSender;
  #messages: ChatMessage[];

  constructor(dto: RefreshChatDto) {
    this.#dto = dto;
    this.#sender = new RefreshChatSender(dto);
    this.#messages = [new RefreshChatMessage(dto)];
  }
  getHash(): string {
    return this.#dto.hash;
  }

  getSender(): ChatSender {
    return this.#sender;
  }

  getMessages(): ChatMessage[] {
    return this.#messages;
  }
}

class RefreshChatSender implements ChatSender {
  #dto: RefreshChatDto;
  constructor(dto: RefreshChatDto) {
    this.#dto = dto;
  }

  getHash(): string {
    return this.#dto.nickname + this.#dto.level + this.#dto.icon;
  }

  getNickname(): string {
    return this.#dto.nickname;
  }

  getLevel(): number {
    return this.#dto.level;
  }

  getIcon(): string {
    return this.#dto.icon;
  }

  getType(): ChatSenderType {
    if (this.isLegacyBot()) {
      return ChatSenderType.BOT;
    }
    if (this.#dto.isMobile) {
      return ChatSenderType.MOBILE;
    }
    return ChatSenderType.PC;
  }

  private isLegacyBot(): boolean {
    return this.#dto.level === 100;
  }
}

class RefreshChatMessage implements ChatMessage {
  #dto: RefreshChatDto;
  #timestamp: number;
  #type: ChatType;

  constructor(dto: RefreshChatDto) {
    this.#dto = dto;
    this.#type = new ChatTypeParser().parse(dto.type);
    this.#timestamp = new Date(dto.timestamp).getTime();
  }

  getHash(): string {
    return this.#dto.hash;
  }

  getType(): ChatType {
    return this.#type;
  }

  getRequest(): string {
    return this.#dto.msg.request || '';
  }

  getMessage(): string {
    return this.#dto.msg.response;
  }

  getTimestamp(): number {
    return this.#timestamp;
  }

  getReactions(): Reaction[] {
    return this.makeReactions(this.#dto.reactions || []);
  }

  makeReactions(reactionDto: RefreshReactionDto[]): Reaction[] {
    const reactions: Reaction[] = [];
    for (const entry of reactionDto) {
      const found = reactions.find((r) => r.value === entry.value);
      if (!found) {
        reactions.push({
          users: [entry.user],
          value: entry.value,
        });
      } else {
        found.users.push(entry.user);
      }
    }
    return reactions;
  }
}
