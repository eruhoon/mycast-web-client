import { MemoUploadCommand } from 'src/app/models/memo/command/MemoUploadCommand';
import { VegaMemoLoader } from 'src/app/models/memo/loader/VegaMemoLoader';
import { Memo } from 'src/app/models/memo/Memo';
import { MutableMemo } from 'src/app/models/memo/MutableMemo';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  private mLoader: VegaMemoLoader;
  private mUploadCommand: MemoUploadCommand;
  private mMemos: MutableMemo[];
  private mCurrentMemo: Memo | null;
  private mUploadMode: boolean;

  public constructor() {
    const privKey = SessionStorage.getInstance().getPrivateKey() || '';
    this.mLoader = new VegaMemoLoader();
    this.mUploadCommand = new MemoUploadCommand(privKey);
    this.mMemos = [];
    this.mCurrentMemo = null;
    this.mUploadMode = false;
  }

  public getMemos(): Memo[] {
    return this.mMemos;
  }

  public getCurrentMemo(): Memo | null {
    return this.mCurrentMemo;
  }

  public setCurrentMemo(memo: Memo | null): void {
    this.mCurrentMemo = memo;
  }

  public loadMemos(): void {
    this.mLoader.load(memos => {
      if (!memos) {
        console.warn('load failed');
        return;
      }
      const mutableMemos = memos.map(
        memo => MutableMemo.createWithMemo(memo));
      this.mMemos = mutableMemos;
    });
  }

  public isUploadMode(): boolean {
    return this.mUploadMode;
  }

  public setUploadMode(mode: boolean): void {
    this.mUploadMode = mode;
  }

  public upload(memo: string): void {
    this.mUploadCommand.execute(memo).finally(() => {
      this.mUploadMode = false;
      this.loadMemos();
    });
  }
}
