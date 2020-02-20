export interface Notification {
    getIcon(): string;
    getTitle(): string;
    getBody(): string;
    getTimeStamp(): number;
}
