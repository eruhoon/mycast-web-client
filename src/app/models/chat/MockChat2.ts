import { Chat } from './Chat';
import { ChatMessage } from './ChatMessage';
import { ChatSender } from './ChatSender';
import { MockChatMessage } from './MockChatMessage';
import { MockChatSender2 } from './MockChatSender2';

export class MockChat2 implements Chat {

    public getHash(): string {
        return 'chat-hash-2';
    }

    public getSender(): ChatSender {
        return new MockChatSender2();
    }

    public getMessages(): ChatMessage[] {
        return [new MockChatMessage()];
    }
}
