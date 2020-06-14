import { ChatType } from './ChatType';

export interface ChatMessage {
    getType(): ChatType;
    getRequest(): string;
    getMessage(): string;
    getTimestamp(): number;
}
