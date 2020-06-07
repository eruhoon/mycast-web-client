import { NotificationChannelHash } from "./NotificationChannel";

export interface VegaNotification {
    getHash(): string;
    getIcon(): string;
    getTitle(): string;
    getBody(): string;
    getTimeStamp(): number;
    isRead(): boolean;
    isMute(): boolean;
    getChannel(): NotificationChannelHash;
}
