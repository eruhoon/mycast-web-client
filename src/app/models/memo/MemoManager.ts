import { TypeCallback } from '../common/callback/TypeCallback';
import { VegaMemoLoader } from './loader/VegaMemoLoader';
import { Memo } from './Memo';
import { MutableMemo } from './MutableMemo';

export class MemoManager {
  private mLoader: VegaMemoLoader;

  public constructor() {}

  public load(callback: TypeCallback<Memo[]>): void {
    this.mLoader.load((memos) => {
      if (!memos) {
        console.warn('load failed');
        return;
      }
      const mutableMemos = memos.map((memo) =>
        MutableMemo.createWithMemo(memo)
      );

      callback(mutableMemos);
    });
  }
}
