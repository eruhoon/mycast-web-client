export interface ChatSender {
    getHash(): string;
    getNickname(): string;
    getLevel(): number;
    getIcon(): string;
}
