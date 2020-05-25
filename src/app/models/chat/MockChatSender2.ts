import { ChatSender, ChatSenderType } from './ChatSender';

export class MockChatSender2 implements ChatSender {

    public getHash(): string {
        return 'user-hash-2';
    }

    public getNickname(): string {
        return '메구밍';
    }

    public getLevel(): number {
        return 65;
    }

    public getIcon(): string {
        return 'https://i.imgur.com/XEHbEY6.png';
    }

    public getType(): ChatSenderType {
        return ChatSenderType.MOBILE;
    }
}
