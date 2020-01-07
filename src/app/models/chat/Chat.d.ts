export interface Chat {
    getHash(): string;
    getNickname(): string;
    getLevel(): number;
    getIcon(): string;
    getMessage(): string;
}
