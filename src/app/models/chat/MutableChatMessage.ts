import { ChatMessage } from './ChatMessage';
import { ChatType } from './ChatType';

export class MutableChatMessage implements ChatMessage {

    private mType: ChatType;
    private mMessage: string;
    private mTime: Date;

    public getType(): ChatType {
        return this.mType;
    }

    public getMessage(): string {
        return this.mMessage;
    }

    public getTimestamp(): number {
        return this.mTime.getTime();
    }

    public setType(type: ChatType): void {
        this.mType = type;
    }

    public setMessage(message: string): void {
        this.mMessage = message;
    }

    public setTimestamp(timestamp: number): void {
        this.mTime = new Date(timestamp);
    }
}
