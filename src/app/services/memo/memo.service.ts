import { VegaMemoLoader } from 'src/app/models/memo/loader/VegaMemoLoader';
import { Memo } from 'src/app/models/memo/Memo';
import { MemoManager } from 'src/app/models/memo/MemoManager';
import { MutableMemo } from 'src/app/models/memo/MutableMemo';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  private mLoader: VegaMemoLoader;
  private mMemos: MutableMemo[];
  private mCurrentMemo: Memo | null;
  private mNextStart: number;

  public constructor() {
    this.mLoader = new VegaMemoLoader();
    this.mMemos = [];
    this.mCurrentMemo = null;
    this.mNextStart = 0;

    this.loadMore();
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

  public loadMore(): void {
    this.mLoader.load(memos => {
      if (!memos) {
        console.warn('load failed');
        return;
      }
      const mutableMemos = memos.map(
        memo => MutableMemo.createWithMemo(memo));
      this.mMemos = [...this.mMemos, ...mutableMemos];
      this.mNextStart += 20;
      this.mLoader.setStart(this.mNextStart);
    });
  }

  public isLoading(): boolean {
    return this.mLoader.isLoading();
  }
}
