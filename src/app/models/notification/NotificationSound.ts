export class NotificationSound {
  private static readonly NONE = new NotificationSound('none', '무음', '');
  private static readonly DEFAULT_NOTIFICATION_SOUND = new NotificationSound(
    'hello-robot',
    '안녕로봇',
    './assets/sound/alarm_hellorobot.mp3'
  );

  private mId: string;
  private mName: string;
  private mSource: string;

  public constructor(id: string, name: string, source: string) {
    this.mId = id;
    this.mName = name;
    this.mSource = source;
  }

  public getId(): string {
    return this.mId;
  }

  public getName(): string {
    return this.mName;
  }

  public getSource(): string {
    return this.mSource;
  }

  public static getNone(): NotificationSound {
    return NotificationSound.NONE;
  }

  public static getDefaultSound(): NotificationSound {
    return NotificationSound.DEFAULT_NOTIFICATION_SOUND;
  }
}
