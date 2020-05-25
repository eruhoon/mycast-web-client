import { ChatSender, ChatSenderType } from './ChatSender';

export class MockChatSender implements ChatSender {

    public getHash(): string {
        return 'user-hash-1';
    }

    public getNickname(): string {
        return '펭수';
    }

    public getLevel(): number {
        return 87;
    }

    public getIcon(): string {
        return 'https://i.imgur.com/JoNayLq.png';
    }

    public getType(): ChatSenderType {
        throw ChatSenderType.PC;
    }
}
