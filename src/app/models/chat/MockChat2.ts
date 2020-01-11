import { Chat } from './Chat';
import { ChatSender } from './ChatSender';
import { MockChatSender2 } from './MockChatSender2';
import { ChatMessage } from './ChatMessage';
import { MockChatMessage } from './MockChatMessage';

export class MockChat2 implements Chat {

    public getHash(): string {
        return 'chat-hash-2';
    }

    public getSender(): ChatSender {
        return new MockChatSender2;
    }

    public getMessages(): ChatMessage[] {
        return [new MockChatMessage];
    }
}
