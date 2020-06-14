import { ChatMessage } from './ChatMessage';
import { ChatType } from './ChatType';

export class MockChatMessage implements ChatMessage {

    public getType(): ChatType {
        return ChatType.TEXT;
    }

    public getRequest(): string {
        return '';
    }

    public getMessage(): string {
        return '';
    }

    public getTimestamp(): number {
        return 0;
    }
}
