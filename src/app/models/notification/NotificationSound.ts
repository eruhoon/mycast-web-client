export class NotificationSound {

    private static readonly NONE =
        new NotificationSound('none', '무음');
    private static readonly DEFAULT_NOTIFICATION_SOUND =
        new NotificationSound('hello-robot', '안녕로봇');

    private mId: string;
    private mName: string;

    public constructor(id: string, name: string) {
        this.mId = id;
        this.mName = name;
    }

    public static getNone(): NotificationSound {
        return NotificationSound.NONE;
    }

    public static getDefaultSound(): NotificationSound {
        return NotificationSound.DEFAULT_NOTIFICATION_SOUND;
    }

    public getId(): string {
        return this.mId;
    }

    public getName(): string {
        return this.mName;
    }
}
