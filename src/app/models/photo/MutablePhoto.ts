import { Photo } from './Photo';

export class MutablePhoto implements Photo {

    private readonly mHash: string;
    private mUrl: string;
    private mWidth: number;
    private mHeight: number;
    private mMimeType: string;
    private mRegDate: Date;
    private mViewer: number;
    private mTags: string[];
    private mForAdult: boolean;

    public constructor(hash: string) {
        this.mHash = hash;
    }

    public static createWithPhoto(photo: Photo): MutablePhoto {
        const newPhoto = new MutablePhoto(photo.getHash());
        newPhoto.setUrl(photo.getUrl());
        newPhoto.setWidth(photo.getWidth());
        newPhoto.setHeight(photo.getHeight());
        newPhoto.setMimeType(photo.getMimeType());
        newPhoto.setRegDate(photo.getRegDate());
        newPhoto.setViewer(photo.getViewer());
        newPhoto.setTags(photo.getTags());
        newPhoto.setForAdult(photo.isForAdult());
        return newPhoto;
    }

    public getHash(): string {
        return this.mHash;
    }

    public getUrl(): string {
        return this.mUrl;
    }

    public setUrl(url: string): void {
        this.mUrl = url;
    }

    public getWidth(): number {
        return this.mWidth;
    }

    public setWidth(width: number): void {
        this.mWidth = width;
    }

    public getHeight(): number {
        return this.mHeight;
    }

    public setHeight(height: number): void {
        this.mHeight = height;
    }

    public getMimeType(): string {
        return this.mMimeType;
    }

    public setMimeType(mimeType: string) {
        this.mMimeType = mimeType;
    }

    public getRegDate(): Date {
        return this.mRegDate;
    }

    public setRegDate(date: Date): void {
        this.mRegDate = date;
    }

    public getViewer(): number {
        return this.mViewer;
    }

    public setViewer(viewer: number): void {
        this.mViewer = viewer;
    }

    public getTags(): string[] {
        return this.mTags;
    }

    public setTags(tags: string[]): void {
        this.mTags = tags;
    }

    public isForAdult(): boolean {
        return this.mForAdult;
    }

    public setForAdult(adult: boolean): void {
        this.mForAdult = adult;
    }
}
