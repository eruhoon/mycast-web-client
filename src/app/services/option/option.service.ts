import { LocalStorage } from 'src/app/models/storage/LocalStorage';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private mStorage: LocalStorage;
  private mChatPosition: number;
  private mDataSaveMode: boolean;
  private mScrollLockMode: boolean;

  public constructor() {
    this.mStorage = LocalStorage.getInstance();
    this.mChatPosition = this.mStorage.getChatPosition();
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
