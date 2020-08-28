import Axios from 'axios';
import * as qs from 'querystring';

import { TypeCallback } from '../../common/callback/TypeCallback';
import { SessionStorage } from '../../storage/SessionStorage';
import { MutablePhoto } from '../MutablePhoto';
import { Photo } from '../Photo';

export class PhotoUploadCommand {
  private mFile: File | null;
  private mBase64: string | null;
  private mProgress: boolean;
  private mReader: FileReader;
  private mOnComplete: TypeCallback<Photo>;

  public constructor() {
    this.mFile = null;
    this.mBase64 = null;
    this.mProgress = false;
    this.mReader = new FileReader();
    this.mReader.onload = (_) => {
      if (typeof this.mReader.result === 'string') {
        this.mBase64 = this.mReader.result || null;
        this.onFileLoad(this.mBase64);
      }
    };
    this.mOnComplete = (_) => {};
  }

  public setFile(file: File): void {
    this.mFile = file;
  }

  public setOnComplete(onComplete: TypeCallback<Photo>) {
    this.mOnComplete = onComplete;
  }

  public execute() {
    if (this.mProgress) {
      console.error('already progress');
      return;
    }
    if (!this.mFile || !this.isValidFile()) {
      console.error('invalid files');
      return;
    }
    this.mProgress = true;
    this.mReader.readAsDataURL(this.mFile);
  }

  public getUploadingBase64(): string | null {
    return this.mBase64;
  }

  public getUploadingFile(): File | null {
    return this.mFile;
  }

  public isProgress(): boolean {
    return this.mProgress;
  }

  private onFileLoad(base64: string | null): void {
    const uri = 'https://mycast.xyz:9011/photo';
    const privKey = SessionStorage.getInstance().getPrivateKey();
    const query = qs.stringify({ base64, privKey });
    Axios.post<PhotoDto>(uri, query)
      .then((res) => {
        this.onFileUploadComplete(res.data);
      })
      .finally(() => {
        this.mProgress = false;
        this.mFile = null;
      });
  }

  private onFileUploadComplete(photoDto: PhotoDto): void {
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
  }

  private isValidFile(): boolean {
    if (!this.mFile || !this.mFile.type.includes('image')) {
      return false;
    }
    return true;
  }
}

type PhotoDto = {
  adult: boolean;
  hash: string;
  height: number;
  mimeType: string;
  regDate: number;
  url: string;
  width: number;
  tag: string[];
};
