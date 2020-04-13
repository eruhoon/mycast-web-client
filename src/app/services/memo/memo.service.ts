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

  public constructor() {
    this.mLoader = new VegaMemoLoader();
    this.mMemos = [];
    this.loadMore();
  }

  public getMemos(): Memo[] {
    return this.mMemos;
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
    });
  }
}
