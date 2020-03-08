import { Injectable } from '@angular/core';
import { NotificationSound } from 'src/app/models/notification/NotificationSound';
import { LocalStorage } from 'src/app/models/storage/LocalStorage';
import { NotificationSounds } from 'src/app/models/notification/NotificationSounds';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private mStorage: LocalStorage;
  private mChatPosition: number;
  private mNotificationSounds: NotificationSounds;
  private mNotificationSoundId: string;
  private mDataSaveMode: boolean;
  private mScrollLockMode: boolean;

  public constructor() {
    this.mStorage = LocalStorage.getInstance();
    this.mChatPosition = this.mStorage.getChatPosition();
    this.mNotificationSounds = new NotificationSounds();
    this.mNotificationSoundId = this.mStorage.getNotificationSoundId();
    this.mDataSaveMode = this.mStorage.getDataSaveMode();
    this.mScrollLockMode = this.mStorage.getScrollLockMode();
  }

  public getChatPosition(): number {
    return this.mChatPosition;
  }

  public setChatPosition(pos: number): void {
    this.mChatPosition = pos;
    this.mStorage.setChatPosition(pos);
  }

  public getNotificationSound(): NotificationSound {
    return this.mNotificationSounds.getSoundById(this.mNotificationSoundId);
  }

  public setNotificationSound(soundId: string): void {
    this.mNotificationSoundId = soundId;
    this.mStorage.setNotificationSoundId(soundId);
  }

  public isDataSaveMode(): boolean {
    return this.mDataSaveMode;
  }

  public setDataSaveMode(mode: boolean): void {
    this.mDataSaveMode = mode;
    this.mStorage.setDataSaveMode(mode);
  }

  public isScrollLockMode(): boolean {
    return this.mScrollLockMode;
  }

  public setScrollLockMode(mode: boolean): void {
    this.mScrollLockMode = mode;
    this.mStorage.setScrollLockMode(mode);
  }
}
