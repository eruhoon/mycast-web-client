import Axios from 'axios';
import * as qs from 'querystring';

import { AsyncLoader, OnLoadCallback } from '../../loader/AsyncLoader';
import { Memo } from '../Memo';

export class VegaMemoLoader implements AsyncLoader<Memo[]> {

    private static readonly HOST = 'http://api.mycast.xyz/memo';

    private mLoading: boolean;

    public constructor() {
        this.mLoading = false;
    }

    public isLoading(): boolean {
        return this.mLoading;
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
        return `${VegaMemoLoader.HOST}`;
    }
}

type MemoDto = {
    idx: number,
    userIcon: string,
    userNickname: string,
    content: string,
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
}
