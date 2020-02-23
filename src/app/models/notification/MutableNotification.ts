import { Notification } from './Notification';

export class MutableNotification implements Notification {

    private mIcon: string;
    private mTitle: string;
    private mBody: string;
    private mTimeStamp: number;
    private mRead: boolean;

    public constructor() {
        this.mIcon = '';
        this.mTitle = '';
        this.mBody = '';
        this.mTimeStamp = new Date().getTime();
        this.mRead = false;
    }

    public setIcon(icon: string): void {
        this.mIcon = icon;
    }

    public getIcon(): string {
        return this.mIcon;
    }

    public setTitle(title: string): void {
        this.mTitle = title;
    }

    public getTitle(): string {
        return this.mTitle;
    }

    public setBody(body: string): void {
        this.mBody = body;
    }

    public getBody(): string {
        return this.mBody;
    }

    public getTimeStamp(): number {
        return this.mTimeStamp;
    }

    public isRead(): boolean {
        return this.mRead;
    }

    public read(): void {
        this.mRead = true;
    }
}
