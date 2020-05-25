export interface ChatSender {
    getHash(): string;
    getNickname(): string;
    getLevel(): number;
    getIcon(): string;
    getType(): ChatSenderType;
}

export const enum ChatSenderType {
    PC,
    MOBILE,
    BOT,
}
