import { Chat } from './Chat';
import { ChatSender } from './ChatSender';
import { MutableChatSender } from './MutableChatSender';
import { ChatMessage } from './ChatMessage';
import { MutableChatMessage } from './MutableChatMessage';

export class MutableChat implements Chat {

    private mHash: string;
    private mNickname: string;
    private mLevel: number;
    private mIcon: string;
    private mMessages: ChatMessage[];

    public constructor() {
        this.mMessages = [];
    }

    public getSender(): ChatSender {
        const sender = new MutableChatSender;
        sender.setHash(this.mNickname + this.mLevel + this.mIcon);
        sender.setNickname(this.mNickname);
        sender.setLevel(this.mLevel);
        sender.setIcon(this.mIcon);
        return sender;
    }

    public getMessages(): ChatMessage[] {
        return this.mMessages;
    }

    public getHash(): string {
        return this.mHash;
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

    public addMessage(message: string): void {
        const chatMessage = new MutableChatMessage;
        chatMessage.setMessage(message);
        this.mMessages.push(chatMessage);
    }

}
