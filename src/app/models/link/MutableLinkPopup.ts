import { LinkPopup } from './LinkPopup';

export class MutableLinkPopup implements LinkPopup {

    private mTitle: string;
    private mWidth: number;
    private mHeight: number;
    private mLink: string;

    public constructor() {
        this.mTitle = '';
        this.mWidth = 400;
        this.mHeight = 300;
        this.mLink = '';
    }

    public setTitle(title: string): void { this.mTitle = title; }
    public setWidth(width: number): void { this.mWidth = width; }
    public setHeight(height: number): void { this.mHeight = height; }
    public setLink(link: string): void { this.mLink = link; }

    public getTitle(): string { return this.mTitle; }
    public getWidth(): number { return this.mWidth; }
    public getHeight(): number { return this.mHeight; }
    public getLink(): string { return this.mLink; }

}
