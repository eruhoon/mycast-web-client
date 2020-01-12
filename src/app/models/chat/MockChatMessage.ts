import { ChatMessage } from './ChatMessage';

export class MockChatMessage implements ChatMessage {

    public getType(): string {
        return 'chat';
    }

    public getMessage(): string {
        return '';
    }
}
