import { Notification } from './Notification';

export class MutableNotification implements Notification {

    private mIcon: string;

    public setIcon(icon: string): void {
        this.mIcon = icon;
    }

    public getIcon(): string {
        return this.mIcon;
    }
}
