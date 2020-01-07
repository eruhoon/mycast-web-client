import { Chat } from './Chat';

export class MutableChat implements Chat {

    private mHash: string;
    private mNickname: string;
    private mLevel: number;
    private mIcon: string;
    private mMessage: string;

    public constructor() { }

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

    public getMessage(): string {
        return this.mMessage;
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

    public setMessage(message: string): void {
        this.mMessage = message;
    }

}
