import { ChatMessage } from './ChatMessage';

export class MutableChatMessage implements ChatMessage {

    private mMessage: string;

    public getMessage(): string {
        return this.mMessage;
    }

    public setMessage(message: string): void {
        this.mMessage = message;
    }
}
