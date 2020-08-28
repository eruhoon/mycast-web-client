import { Stream } from './Stream';

export class MutableStream extends Stream {
  private mPlatform: string;
  private mKeyId: string;
  private mIcon: string;
  private mThumbnail: string;
  private mTitle: string;
  private mDescription: string;
  private mUrl: string;
  private mViewer: number;
  private mOnAir: boolean;

  public constructor() {
    super();
    this.mPlatform = '';
    this.mKeyId = '';
    this.mIcon = '';
    this.mThumbnail = '';
    this.mTitle = '';
    this.mDescription = '';
    this.mUrl = '';
    this.mViewer = 0;
    this.mOnAir = false;
  }

  public getPlatform(): string {
    return this.mPlatform;
  }

  public setPlatform(platform: string): void {
    this.mPlatform = platform;
  }

  public getKeyId(): string {
    return this.mKeyId;
  }

  public setKeyId(keyId: string): void {
    this.mKeyId = keyId;
  }

  public getIcon(): string {
    return this.mIcon;
  }

  public setIcon(icon: string): void {
    this.mIcon = icon;
  }

  public getThumbnail(): string {
    return this.mThumbnail;
  }

  public setThumbnail(thumbnail: string): void {
    this.mThumbnail = thumbnail;
  }

  public getTitle(): string {
    return this.mTitle;
  }

  public setTitle(title: string): void {
    this.mTitle = title;
  }

  public getDescription(): string {
    return this.mDescription;
  }

  public setDescription(description: string): void {
    this.mDescription = description;
  }

  public getUrl(): string {
    return this.mUrl;
  }

  public setUrl(url: string): void {
    this.mUrl = url;
  }

  public getViewer(): number {
    return this.mViewer;
  }

  public setViewer(viewer: number): void {
    this.mViewer = viewer;
  }

  public isOnAir(): boolean {
    return this.mOnAir;
  }

  public setOnAir(onAir: boolean): void {
    this.mOnAir = onAir;
  }
}
