import Axios from 'axios';
import * as qs from 'querystring';

import { AsyncLoader, OnLoadCallback } from '../../loader/AsyncLoader';
import { Photo } from '../Photo';

export class VegaPhotoLoader implements AsyncLoader<Photo[]> {

    private static readonly HOST = 'http://api.mycast.xyz/photo';
    private static readonly DEFAULT_INDEX_LENGTH = 100;

    private mStartIndex: number;
    private mIndexLength: number;
    private mLoading: boolean;

    public constructor() {
        this.mStartIndex = 0;
        this.mIndexLength = VegaPhotoLoader.DEFAULT_INDEX_LENGTH;
        this.mLoading = false;
    }

    public isLoading(): boolean {
        return this.mLoading;
    }

    public setStart(startIndex: number): void {
        this.mStartIndex = startIndex;
    }

    public load(callback: OnLoadCallback<Photo[]>): void {
        if (this.mLoading) {
            console.warn('already loading');
            return;
        }

        this.loadInternal(callback);
    }

    private loadInternal(callback: OnLoadCallback<Photo[]>): void {
        this.mLoading = true;
        const uri = this.getUri();
        Axios.get<PhotoDto[]>(uri).then(res => {
            console.log(res.data);
            if (!res || !res.data) {
                callback(null);
                return;
            }
            callback(res.data.map(dto => new PhotoDtoAdapter(dto)));
        }).finally(() => {
            this.mLoading = false;
        });
    }

    private getUri(): string {
        const query = qs.stringify({
            start: this.mStartIndex,
            num: this.mIndexLength,
        });
        return `${VegaPhotoLoader.HOST}?${query}`;
    }
}

type PhotoDto = {
    adult: boolean,
    hash: string,
    height: number,
    idx: number,
    mimeType: string,
    regDate: string,
    url: string,
    width: number,
};

class PhotoDtoAdapter implements Photo {
    private mPhotoDto: PhotoDto;

    public constructor(photoDto: PhotoDto) {
        this.mPhotoDto = photoDto;
    }

    public getHash(): string { return this.mPhotoDto.hash; }
    public getUrl(): string { return this.mPhotoDto.url; }
    public getWidth(): number { return this.mPhotoDto.width; }
    public getHeight(): number { return this.mPhotoDto.height; }
    public getMimeType(): string { return this.mPhotoDto.mimeType; }
    public getRegDate(): Date { return new Date(this.mPhotoDto.regDate); }
    public isForAdult(): boolean { return this.mPhotoDto.adult; }
}
