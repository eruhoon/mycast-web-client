import { ChatMessage } from './ChatMessage';

export class MutableChatMessage implements ChatMessage {

    private mType: string;
    private mMessage: string;

    public getType(): string {
        return this.mType;
    }

    public getMessage(): string {
        return this.mMessage;
    }

    public setType(type: string): void {
        this.mType = type;
    }

    public setMessage(message: string): void {
        this.mMessage = message;
    }
}
