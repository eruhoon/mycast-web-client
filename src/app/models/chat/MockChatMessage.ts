import { ChatMessage } from './ChatMessage';

export class MockChatMessage implements ChatMessage {

    public getMessage(): string {
        return '';
    }
}
