import { LocalStorage } from 'src/app/models/storage/LocalStorage';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private mStorage: LocalStorage;
  private mDataSaveMode: boolean;
  private mScrollLockMode: boolean;

  public constructor() {
    this.mStorage = LocalStorage.getInstance();

    this.mDataSaveMode = this.mStorage.getDataSaveMode();
    this.mScrollLockMode = this.mStorage.getScrollLockMode();
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
