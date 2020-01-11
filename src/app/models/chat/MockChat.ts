import { Chat } from './Chat';
import { ChatSender } from './ChatSender';
import { MockChatSender } from './MockChatSender';
import { ChatMessage } from './ChatMessage';
import { MockChatMessage } from './MockChatMessage';

export class MockChat implements Chat {

    public getHash(): string {
        return 'chat-hash-1';
    }

    public getSender(): ChatSender {
        return new MockChatSender();
    }

    public getNickname(): string {
        return '펭수';
    }

    public getLevel(): number {
        return 87;
    }

    public getIcon(): string {
        return 'https://i.imgur.com/nkpMn6R.jpg';
    }

    public getMessage(): string {
        return '테스트트트트트';
    }

    public getMessages(): ChatMessage[] {
        return [new MockChatMessage()];
    }
}
