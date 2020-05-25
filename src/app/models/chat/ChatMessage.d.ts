import { ChatType } from './ChatType';

export interface ChatMessage {
    getType(): ChatType;
    getMessage(): string;
    getTimestamp(): number;
}
