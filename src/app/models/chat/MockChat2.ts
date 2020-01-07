
import { Chat } from './Chat';

export class MockChat2 implements Chat {

    public getHash(): string {
        return 'chat-hash-2';
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

    public getMessage(): string {
        return '테스트트트트트';
    }
}
