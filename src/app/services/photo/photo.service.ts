import { PhotoUploadCommand } from 'src/app/models/photo/command/PhotoUploadCommand';
import { VegaPhotoLoader } from 'src/app/models/photo/loader/VegaPhotoLoader';
import { MutablePhoto } from 'src/app/models/photo/MutablePhoto';
import { Photo } from 'src/app/models/photo/Photo';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private mLoader: VegaPhotoLoader;
  private mPhotoUploadCommand: PhotoUploadCommand;
  private mPhotos: MutablePhoto[];
  private mCurrentPhoto: Photo | null;
  private mNextStart: number;

  public constructor() {
    this.mLoader = new VegaPhotoLoader();
    this.mPhotoUploadCommand = new PhotoUploadCommand();
    this.mPhotoUploadCommand.setOnComplete(photo => {
      const newPhoto = MutablePhoto.createWithPhoto(photo);
      this.mPhotos = [newPhoto, ...this.mPhotos];
    });
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

  public setCurrentPhoto(photo: Photo | null): void {
    this.mCurrentPhoto = photo;
  }

  public addPhotoByFile(file: File): void {
    this.mPhotoUploadCommand.setFile(file);
    this.mPhotoUploadCommand.execute();
  }

  public loadMore(): void {
    this.mLoader.load(photos => {
      if (!photos) {
        console.warn('load failed');
        return;
      }
      const mutablePhotos = photos.map(
        photo => MutablePhoto.createWithPhoto(photo));
      this.mPhotos = [...this.mPhotos, ...mutablePhotos];
      this.mNextStart += 100;
      this.mLoader.setStart(this.mNextStart);
    });
  }

  public setAdult(hash: string, adult: boolean): void {
    const photo = this.mPhotos.find(p => p.getHash() === hash);
    if (!photo) {
      console.warn('not found');
      return;
    }
    photo.setForAdult(adult);
  }

  public setTags(hash: string, tagQuery: string): void {
    const photo = this.mPhotos.find(p => p.getHash() === hash);
    if (!photo) {
      console.warn('not found');
      return;
    }
    photo.setTags(tagQuery.split(',').map(s => s.trim()).filter(s => s));
  }

  public isLoading(): boolean {
    return this.mLoader.isLoading();
  }

  public getUploadingFile(): File | null {
    return this.mPhotoUploadCommand.getUploadingFile();
  }

  public getUploadingImage(): string | null {
    return this.mPhotoUploadCommand.getUploadingBase64();
  }

  public isUploading(): boolean {
    return this.mPhotoUploadCommand.isProgress();
  }
}
