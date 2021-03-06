import { Stream } from './Stream';
import { StreamDto } from './StreamDto';

export class StreamDtoAdapter extends Stream {
  private mRaw: StreamDto;

  public constructor(rawStream: StreamDto) {
    super();
    this.mRaw = rawStream;
  }

  public getPlatform(): string {
    return this.mRaw.platform;
  }

  public getKeyId(): string {
    return this.mRaw.keyid;
  }

  public getIcon(): string {
    if (this.getPlatform() === 'afreeca') {
      const dict = this.mRaw.keyid.substring(0, 2);
      const keyId = this.mRaw.keyid;
      const host = 'profile.img.afreecatv.com';
      return `https://${host}/LOGO/${dict}/${keyId}/${keyId}.jpg`;
    } else {
      return this.mRaw.icon;
    }
  }

  public getThumbnail(): string {
    return this.mRaw.thumbnail;
  }

  public getTitle(): string {
    return this.mRaw.title;
  }

  public getDescription(): string {
    return this.mRaw.description;
  }

  public getUrl(): string {
    if (this.getPlatform() === 'twitch') {
      return `${this.mRaw.url}&parent=${location.hostname}`;
    } else {
      return this.mRaw.url;
    }
  }

  public getViewer(): number {
    return this.mRaw.viewer;
  }

  public isOnAir(): boolean {
    return this.mRaw.onair;
  }
}
