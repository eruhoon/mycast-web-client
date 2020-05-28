import Axios from 'axios';

import { AsyncLoader, OnLoadCallback } from '../../loader/AsyncLoader';
import { Photo } from '../Photo';

export class VegaImgurLoader implements AsyncLoader<any> {

    private static readonly HOST = 'https://mycast.xyz:9011/imgur';

    private mHash: string;
    private mLoading: boolean;

    public constructor(hash: string) {
        this.mHash = hash;
        this.mLoading = false;
    }

    public setHash(hash: string): void {
        this.mHash = hash;
    }

    public load(callback: OnLoadCallback<ImgurDtoAdapter>): void {
        this.mLoading = true;
        const uri = this.getUri();
        Axios.get<ImgurDto>(uri).then(res => {
            if (!res || !res.data) {
                callback(null);
            } else {
                const imgurPhoto = new ImgurDtoAdapter(res.data);
                callback(imgurPhoto);
            }
        }).finally(() => {
            this.mLoading = false;
        });
    }

    public isLoading(): boolean {
        return this.mLoading;
    }

    private getUri(): string {
        return `${VegaImgurLoader.HOST}/${this.mHash}`;
    }

}

type ImgurDto = {
    id: string,
    type: string,
    animated: boolean,
    datetime: number,
    width: number,
    height: number,
    views: number,
    link: string,
};

class ImgurDtoAdapter implements Photo {
    private mImgurDto: ImgurDto;

    public constructor(imgurDto: ImgurDto) {
        this.mImgurDto = imgurDto;
    }

    public getHash(): string { return this.mImgurDto.id; }
    public getUrl(): string { return this.mImgurDto.link; }
    public getWidth(): number { return this.mImgurDto.width; }
    public getHeight(): number { return this.mImgurDto.height; }
    public getMimeType(): string { return this.mImgurDto.type; }
    public getRegDate(): Date { return new Date(this.mImgurDto.datetime); }
    public getViewer(): number { return this.mImgurDto.views; }
    public getTags(): string[] { return []; }
    public isForAdult(): boolean { return false; }
}
