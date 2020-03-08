import { NotificationSound } from './NotificationSound';

export class NotificationSounds {

    private static readonly NONE = new NotificationSound('none', '무음');
    private static readonly HELLO_ROBOT =
        new NotificationSound('hello-robot', '안녕로봇');
    private static readonly DVA = new NotificationSound('d-va', '디바');
    private static readonly IPHONE = new NotificationSound('iphone', '아이폰');
    private static readonly HORN = new NotificationSound('horn', '기상나팔');
    private static readonly WAKE_UP =
        new NotificationSound('wake-up', '어서일어나');

    public getList(): NotificationSound[] {
        return [
            NotificationSounds.NONE,
            NotificationSounds.HELLO_ROBOT,
            NotificationSounds.DVA,
            NotificationSounds.IPHONE,
            NotificationSounds.HORN,
            NotificationSounds.WAKE_UP,
        ];
    }
}
