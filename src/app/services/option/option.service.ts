import { TypeCallback } from 'src/app/models/common/callback/TypeCallback';
import { NotificationSound } from 'src/app/models/notification/NotificationSound';
import { NotificationSounds } from 'src/app/models/notification/NotificationSounds';
import { LocalStorage } from 'src/app/models/storage/LocalStorage';
import { Theme } from 'src/app/models/theme/Theme';
import { ThemeParser } from 'src/app/models/theme/ThemeParser';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private mStorage: LocalStorage;
  private mThemeParser: ThemeParser;
  private mChatPosition: number;
  private mNotificationSounds: NotificationSounds;
  private mNotificationSoundId: string;
  private mDataSaveMode: boolean;
  private mScrollLockMode: boolean;
  private mTimestampShow: boolean;
  private mTheme: Theme;
  private mThemeCallbacks: TypeCallback<Theme>[];
  private mMobile: boolean;

  public constructor() {
    this.mStorage = LocalStorage.getInstance();
    this.mThemeParser = new ThemeParser();
    this.mChatPosition = this.mStorage.getChatPosition();
    this.mNotificationSounds = new NotificationSounds();
    this.mNotificationSoundId = this.mStorage.getNotificationSoundId();
    this.mDataSaveMode = this.mStorage.getDataSaveMode();
    this.mScrollLockMode = this.mStorage.getScrollLockMode();
    this.mTimestampShow = this.mStorage.getTimestampShow();
    this.mTheme = this.mThemeParser.parse(this.mStorage.getTheme());
    this.mThemeCallbacks = [];
    this.mMobile = OptionService.isMobile();
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

  public isTimestampShow(): boolean {
    return this.mTimestampShow;
  }

  public setTimestampShow(show: boolean): void {
    this.mTimestampShow = show;
    this.mStorage.setTimestampShow(show);
  }

  public getTheme(): Theme {
    return this.mTheme;
  }

  public setTheme(theme: Theme): void {
    this.mTheme = theme;
    this.mStorage.setTheme(theme);
    this.mThemeCallbacks.forEach(callback => callback(theme));
  }

  public addThemeCallback(callback: TypeCallback<Theme>): void {
    this.mThemeCallbacks.push(callback);
  }

  public isMobile(): boolean {
    return this.mMobile;
  }

  private static isMobile(): boolean {
    const userAgent = navigator.userAgent;
    const isMobile = userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || userAgent.match(/LG|SAMSUNG|Samsung/) != null;
    return isMobile;
  }
}
