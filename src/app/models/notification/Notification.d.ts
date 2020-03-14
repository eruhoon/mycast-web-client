export interface Notification {
    getHash(): string;
    getIcon(): string;
    getTitle(): string;
    getBody(): string;
    getTimeStamp(): number;
    isRead(): boolean;
}
