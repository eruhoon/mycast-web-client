import { ChatType } from './ChatType';
import { Reaction } from './reaction/Reaction';

export interface ChatMessage {
  getHash(): string;
  getType(): ChatType;
  getRequest(): string;
  getMessage(): string;
  getReactions(): Reaction[];
  getTimestamp(): number;
}
