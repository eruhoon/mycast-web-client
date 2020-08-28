import Axios from 'axios';

import { AsyncLoader, OnLoadCallback } from '../../loader/AsyncLoader';
import { Memo } from '../Memo';

export class VegaMemoLoader implements AsyncLoader<Memo[]> {
  private static readonly HOST = 'https://mycast.xyz:9011/memo';

  public constructor() {}

  public load(callback: OnLoadCallback<Memo[]>): void {
    const uri = VegaMemoLoader.HOST;
    Axios.get<MemoDto[]>(uri).then((res) => {
      if (!res || !res.data) {
        callback(null);
        return;
      }
      callback(res.data.map((dto) => new MemoDtoAdapter(dto)));
    });
  }
}

type MemoDto = {
  idx: number;
  userIcon: string;
  userNickname: string;
  content: string;
  regDate: number;
};

class MemoDtoAdapter implements Memo {
  private mMemoDto: MemoDto;

  public constructor(memoDto: MemoDto) {
    this.mMemoDto = memoDto;
  }

  public getHash(): string {
    return this.mMemoDto.idx.toString();
  }

  public getUserName(): string {
    return this.mMemoDto.userNickname;
  }

  public getUserIcon(): string {
    return this.mMemoDto.userIcon;
  }

  public getBody(): string {
    return this.mMemoDto.content;
  }

  public getRegDate(): Date {
    return new Date(this.mMemoDto.regDate);
  }
}
