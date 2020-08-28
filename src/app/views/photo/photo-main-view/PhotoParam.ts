import { Photo } from 'src/app/models/photo/Photo';

export class PhotoParam implements Photo {
  public getHash(): string {
    throw new Error('Method not implemented.');
  }

  public getUrl(): string {
    throw new Error('Method not implemented.');
  }

  public getWidth(): number {
    throw new Error('Method not implemented.');
  }

  public getHeight(): number {
    throw new Error('Method not implemented.');
  }

  public getMimeType(): string {
    throw new Error('Method not implemented.');
  }

  public getRegDate(): Date {
    throw new Error('Method not implemented.');
  }

  public getViewer(): number {
    throw new Error('Method not implemented.');
  }

  public getTags(): string[] {
    throw new Error('Method not implemented.');
  }

  public isForAdult(): boolean {
    throw new Error('Method not implemented.');
  }
}
