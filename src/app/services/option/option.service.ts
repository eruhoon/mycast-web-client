import { LocalStorage } from 'src/app/models/storage/LocalStorage';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private mStorage: LocalStorage;
  private mDataSaveMode: boolean;

  public constructor() {
    this.mStorage = LocalStorage.getInstance();

    this.mDataSaveMode = this.mStorage.getDataSaveMode();
  }

  public isDataSaveMode(): boolean {
    return this.mDataSaveMode;
  }

  public setDataSaveMode(mode: boolean): void {
    this.mDataSaveMode = mode;
    this.mStorage.setDataSaveMode(mode);
  }
}
