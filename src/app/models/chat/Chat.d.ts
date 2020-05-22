import { ChatMessage } from './ChatMessage';
import { ChatSender } from './ChatSender';

export interface Chat {
    getHash(): string;
    getSender(): ChatSender;
    getMessages(): ChatMessage[];
}
