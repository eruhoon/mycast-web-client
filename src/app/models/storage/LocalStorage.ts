import { NotificationSound } from '../notification/NotificationSound';

export class LocalStorage {
  private static sInstance: LocalStorage | null = null;

  private static readonly DEFAULT_STRING = '';
  private static readonly DEFAULT_CHAT_BOT_DISABLED = false;
  private static readonly DEFAULT_CHAT_POSITION = 300;
  private static OPTION_TRUE = 'true';
  private static OPTION_FALSE = 'false';

  private constructor() {}

  public getChatPosition(): number {
    const rawPos = this.getItem(LocalStorageKey.CHAT_POSITION);
    if (rawPos === null) {
      return LocalStorage.DEFAULT_CHAT_POSITION;
    } else {
      return Number(rawPos);
    }
  }

  public setChatPosition(value: number): void {
    const pos = Math.round(value);
    this.setItem(LocalStorageKey.CHAT_POSITION, pos.toString());
  }

  public getChatBotDisabled(): boolean {
    const raw = this.getItem(LocalStorageKey.CHAT_BOT_DISABLED);
    if (raw === null) {
      return LocalStorage.DEFAULT_CHAT_BOT_DISABLED;
    } else {
      return raw === LocalStorage.OPTION_TRUE;
    }
  }

  public setChatBotDisabled(value: boolean): void {
    this.setItem(
      LocalStorageKey.CHAT_BOT_DISABLED,
      value ? LocalStorage.OPTION_TRUE : LocalStorage.OPTION_FALSE
    );
  }

  public getNotificationEnable(): boolean {
    const raw = this.getItem(LocalStorageKey.NOTIFICATION_ENABLE);
    return raw !== LocalStorage.OPTION_FALSE;
  }

  public setNotificationEnable(value: boolean): void {
    this.setItem(
      LocalStorageKey.NOTIFICATION_ENABLE,
      value ? LocalStorage.OPTION_TRUE : LocalStorage.OPTION_FALSE
    );
  }

  public getRawNotificationChannels(): string {
    const raw = this.getItem(LocalStorageKey.NOTIFICATION_CHANNELS);
    return raw ? raw : '';
  }

  public setRawNotificationChannels(value: string): void {
    this.setItem(LocalStorageKey.NOTIFICATION_CHANNELS, value);
  }

  public getNotificationSoundId(): string {
    const raw = this.getItem(LocalStorageKey.NOTIFICATION_SOUND);
    return raw ? raw : NotificationSound.getDefaultSound().getId();
  }

  public setNotificationSoundId(id: string): void {
    this.setItem(LocalStorageKey.NOTIFICATION_SOUND, id);
  }

  public getDataSaveMode(): boolean {
    const rawDataSaveMode = this.getItem(LocalStorageKey.DATA_SAVE_MODE);
    return rawDataSaveMode === LocalStorage.OPTION_TRUE;
  }

  public setDataSaveMode(value: boolean): void {
    this.setItem(
      LocalStorageKey.DATA_SAVE_MODE,
      value ? LocalStorage.OPTION_TRUE : LocalStorage.OPTION_FALSE
    );
  }

  public getScrollLockMode(): boolean {
    const rawScrollLockMode = this.getItem(LocalStorageKey.SCROLL_LOCK_MODE);
    return rawScrollLockMode === LocalStorage.OPTION_TRUE;
  }

  public setScrollLockMode(value: boolean): void {
    this.setItem(
      LocalStorageKey.SCROLL_LOCK_MODE,
      value ? LocalStorage.OPTION_TRUE : LocalStorage.OPTION_FALSE
    );
  }

  public getTimestampShow(): boolean {
    const rawTimestampShow = this.getItem(LocalStorageKey.TIMESTAMP_SHOW);
    return rawTimestampShow === LocalStorage.OPTION_TRUE;
  }

  public setTimestampShow(show: boolean): void {
    this.setItem(
      LocalStorageKey.TIMESTAMP_SHOW,
      show ? LocalStorage.OPTION_TRUE : LocalStorage.OPTION_FALSE
    );
  }

  public getTheme(): string {
    const rawThemeMode = this.getItem(LocalStorageKey.THEME);
    return rawThemeMode ? rawThemeMode : LocalStorage.DEFAULT_STRING;
  }

  public setTheme(value: string): void {
    this.setItem(LocalStorageKey.THEME, value);
  }

  public getFavorites(): string {
    const rawFavorites = this.getItem(LocalStorageKey.FAVORITES);
    return rawFavorites ? rawFavorites : LocalStorage.DEFAULT_STRING;
  }

  public setFavorites(favorites: string): void {
    this.setItem(LocalStorageKey.FAVORITES, favorites);
  }

  public static getInstance(): LocalStorage {
    if (this.sInstance === null) {
      this.sInstance = new LocalStorage();
    }
    return this.sInstance;
  }

  private getItem(key: LocalStorageKey): string | null {
    return localStorage.getItem(key.toString());
  }

  private setItem(key: LocalStorageKey, value: string): void {
    localStorage.setItem(key.toString(), value);
  }

  private clear(): void {
    localStorage.clear();
  }
}

enum LocalStorageKey {
  CHAT_POSITION = 'vega.chat_position',
  CHAT_BOT_DISABLED = 'vega.chat_bot_disabled',
  FAVORITES = 'vega.favorites',
  NOTIFICATION_ENABLE = 'vega.notification_enable',
  NOTIFICATION_CHANNELS = 'vega.notification_channels',
  NOTIFICATION_SOUND = 'vega.notification_sound',
  DATA_SAVE_MODE = 'vega.data_save_mode',
  SCROLL_LOCK_MODE = 'vega.scroll_lock_mode',
  TIMESTAMP_SHOW = 'vega.timestamp_show',
  THEME = 'vega.theme',
}
