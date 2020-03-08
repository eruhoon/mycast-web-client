import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardImageService {

  private mCurrentImage: string | null;

  public constructor() {
    this.mCurrentImage = null;
  }

  public getCurrentImage(): string | null {
    return this.mCurrentImage;
  }

  public setCurrentImage(image: string): void {
    this.mCurrentImage = image;
  }

  public clearImage(): void {
    this.mCurrentImage = null;
  }
}
