import { Chat } from '../chat/Chat';
import { ChatMessage } from '../chat/ChatMessage';
import { ChatSender, ChatSenderType } from '../chat/ChatSender';
import { ChatType } from '../chat/ChatType';
import { Reaction } from '../chat/reaction/Reaction';
import { ChatTypeParser } from '../chat/util/ChatTypeParser';
import { RefreshChatDto, RefreshReactionDto } from './RefreshChatDto';

export class RefreshChat implements Chat {
  private mSender: ChatSender;
  private mMessages: ChatMessage[];

  constructor(private mDto: RefreshChatDto) {
    this.mSender = new RefreshChatSender(this.mDto);
    this.mMessages = [new RefreshChatMessage(this.mDto)];
  }
  getHash(): string {
    return this.mDto.hash;
  }

  getSender(): ChatSender {
    return this.mSender;
  }

  getMessages(): ChatMessage[] {
    return this.mMessages;
  }
}

class RefreshChatSender implements ChatSender {
  constructor(private mDto: RefreshChatDto) {}

  getHash(): string {
    return this.mDto.nickname + this.mDto.level + this.mDto.icon;
  }

  getNickname(): string {
    return this.mDto.nickname;
  }

  getLevel(): number {
    return this.mDto.level;
  }

  getIcon(): string {
    return this.mDto.icon;
  }

  getType(): ChatSenderType {
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
