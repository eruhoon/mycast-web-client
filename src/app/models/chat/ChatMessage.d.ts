import { ChatType } from './ChatType';

export interface ChatMessage {
    getHash(): string;
    getType(): ChatType;
    getRequest(): string;
    getMessage(): string;
    getTimestamp(): number;
}
