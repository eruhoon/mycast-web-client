export class NotificationSound {

    private mId: string;
    private mName: string;

    public constructor(id: string, name: string) {
        this.mId = id;
        this.mName = name;
    }

    public getId(): string {
        return this.mId;
    }

    public getName(): string {
        return this.mName;
    }
}
