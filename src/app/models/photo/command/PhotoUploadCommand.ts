import Axios from 'axios';
import * as qs from 'querystring';

import { TypeCallback } from '../../common/callback/TypeCallback';
import { SessionStorage } from '../../storage/SessionStorage';
import { MutablePhoto } from '../MutablePhoto';
import { Photo } from '../Photo';

export class PhotoUploadCommand {

    private mFile: File;
    private mReader: FileReader;
    private mOnComplete: TypeCallback<Photo>;

    public constructor(file: File) {
        this.mFile = file;
        this.mReader = new FileReader();
        this.mReader.onload = _ => {
            if (typeof (this.mReader.result) === 'string') {
                const base64 = this.mReader.result || null;
                this.onFileLoad(base64);
            }
        };
        this.mOnComplete = _ => { };
    }

    public setOnComplete(onComplete: TypeCallback<Photo>) {
        this.mOnComplete = onComplete;
    }

    public execute() {
        if (!this.isValidFile()) {
            console.warn('invalid files');
            return;
        }
        this.mReader.readAsDataURL(this.mFile);
    }

    private onFileLoad(base64: string | null): void {
        const uri = 'http://api.mycast.xyz/photo';
        const privKey = SessionStorage.getInstance().getPrivateKey();
        const query = qs.stringify({ base64, privKey });
        Axios.post<PhotoDto>(uri, query).then(res => {
            const photoDto = res.data;
            const photo = new MutablePhoto(photoDto.hash);
            photo.setForAdult(photoDto.adult);
            photo.setHeight(photoDto.height);
            photo.setMimeType(photoDto.mimeType);
            photo.setRegDate(new Date(photoDto.regDate));
            photo.setTags(photoDto.tag);
            photo.setUrl(photoDto.url);
            photo.setViewer(0);
            photo.setWidth(photoDto.width);

            this.mOnComplete(photo);
        });
    }

    private isValidFile(): boolean {
        if (!this.mFile.type.includes('image')) {
            return false;
        }
        return true;
    }
}

type PhotoDto = {
    adult: boolean,
    hash: string,
    height: number,
    mimeType: string,
    regDate: number,
    url: string,
    width: number,
    tag: string[],
};
