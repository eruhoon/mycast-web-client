import { NotificationSound } from './NotificationSound';

export class NotificationSounds {
  private static readonly DVA = new NotificationSound(
    'd-va',
    '디바',
    './assets/sound/alarm_dva.mp3'
  );
  private static readonly IPHONE = new NotificationSound(
    'iphone',
    '아이폰',
    './assets/sound/alarm_iphone.mp3'
  );
  private static readonly HORN = new NotificationSound(
    'horn',
    '기상나팔',
    './assets/sound/alarm_mil.mp3'
  );
  private static readonly WAKE_UP = new NotificationSound(
    'wake-up',
    '어서일어나',
    './assets/sound/alarm_wakeup.mp3'
  );

  public getList(): NotificationSound[] {
    return [
      NotificationSound.getNone(),
      NotificationSound.getDefaultSound(),
      NotificationSounds.DVA,
      NotificationSounds.IPHONE,
      NotificationSounds.HORN,
      NotificationSounds.WAKE_UP,
    ];
  }

  public getSoundById(id: string): NotificationSound {
    const sound = this.getList().find((s) => s.getId() === id);
    return sound ? sound : NotificationSound.getDefaultSound();
  }
}
