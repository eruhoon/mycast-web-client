import { VegaPhotoLoader } from 'src/app/models/photo/loader/VegaPhotoLoader';
import { Photo } from 'src/app/models/photo/Photo';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private mLoader: VegaPhotoLoader;
  private mPhotos: Photo[];
  private mCurrentPhoto: Photo | null;
  private mNextStart: number;

  public constructor() {
    this.mLoader = new VegaPhotoLoader();
    this.mPhotos = [];
    this.mCurrentPhoto = null;
    this.mNextStart = 0;

    this.loadMore();
  }

  public getPhotos(): Photo[] {
    return this.mPhotos;
  }

  public getCurrentPhoto(): Photo | null {
    return this.mCurrentPhoto;
  }

  public setCurrentPhoto(photo: Photo): void {
    this.mCurrentPhoto = photo;
  }

  public loadMore(): void {
    this.mLoader.load(photos => {
      this.mPhotos = [...this.mPhotos, ...photos];
      this.mNextStart += 100;
      this.mLoader.setStart(this.mNextStart);
    });
  }

  public isLoading(): boolean {
    return this.mLoader.isLoading();
  }
}
