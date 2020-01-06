import { Chat } from './Chat';

export class MockChat implements Chat {

    public getHash(): string {
        return 'chat-hash-1';
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
}
