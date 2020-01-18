import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagePopupService {

  private mCurrentImage: string | null;

  public constructor() {
    this.mCurrentImage = null;
  }

  public getImage(): string | null {
    return this.mCurrentImage;
  }

  public setImage(image: string | null): void {
    this.mCurrentImage = image;
  }

  public isPopup(): boolean {
    return this.mCurrentImage !== null;
  }
}
