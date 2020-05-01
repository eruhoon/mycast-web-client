import Axios from 'axios';
import * as qs from 'querystring';

import { AsyncLoader, OnLoadCallback } from '../../loader/AsyncLoader';
import { Memo } from '../Memo';

export class VegaMemoLoader implements AsyncLoader<Memo[]> {

    private static readonly HOST = 'http://api.mycast.xyz/memo';
    private static readonly DEFAULT_INDEX_LENGTH = 20;

    private mStartIndex: number;
    private mIndexLength: number;
    private mLoading: boolean;

    public constructor() {
        this.mStartIndex = 0;
        this.mIndexLength = VegaMemoLoader.DEFAULT_INDEX_LENGTH;
        this.mLoading = false;
    }

    public isLoading(): boolean {
        return this.mLoading;
    }

    public setStart(startIndex: number): void {
        this.mStartIndex = startIndex;
    }

    public load(callback: OnLoadCallback<Memo[]>): void {
        if (this.mLoading) {
            console.warn('already loading');
            return;
        }

        this.loadInternal(callback);
    }

    private loadInternal(callback: OnLoadCallback<Memo[]>): void {
        this.mLoading = true;
        const uri = this.getUri();
        Axios.get<MemoDto[]>(uri).then(res => {
            console.log(res.data);
            if (!res || !res.data) {
                callback(null);
                return;
            }
            callback(res.data.map(dto => new MemoDtoAdapter(dto)));
        }).finally(() => {
            this.mLoading = false;
        });
    }

    private getUri(): string {
        const query = qs.stringify({
            start: this.mStartIndex,
            size: this.mIndexLength,
        });
        return `${VegaMemoLoader.HOST}?${query}`;
    }
}

type MemoDto = {
    idx: number,
    userIcon: string,
    userNickname: string,
    content: string,
    regDate: number,
};

class MemoDtoAdapter implements Memo {
    private mMemoDto: MemoDto;

    public constructor(memoDto: MemoDto) {
        this.mMemoDto = memoDto;
    }

    public getHash(): string { return this.mMemoDto.idx.toString(); }

    public getUserName(): string { return this.mMemoDto.userNickname; }

    public getUserIcon(): string { return this.mMemoDto.userIcon; }

    public getBody(): string { return this.mMemoDto.content; }

    public getRegDate(): Date { return new Date(this.mMemoDto.regDate); }
}
