import { ChatSender } from './ChatSender';

export class MutableChatSender implements ChatSender {

    private mHash: string;
    private mNickname: string;
    private mLevel: number;
    private mIcon: string;

    public getHash(): string {
        return this.mHash;
    }

    public getNickname(): string {
        return this.mNickname;
    }

    public getLevel(): number {
        return this.mLevel;
    }

    public getIcon(): string {
        return this.mIcon;
    }

    public setHash(hash: string): void {
        this.mHash = hash;
    }

    public setNickname(nickname: string): void {
        this.mNickname = nickname;
    }

    public setLevel(level: number): void {
        this.mLevel = level;
    }

    public setIcon(icon: string): void {
        this.mIcon = icon;
    }
}
