import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeCallback } from 'src/app/models/common/callback/TypeCallback';
import { PhotoUploadCommand } from 'src/app/models/photo/command/PhotoUploadCommand';
import { VegaPhotoLoader } from 'src/app/models/photo/loader/VegaPhotoLoader';
import { MutablePhoto } from 'src/app/models/photo/MutablePhoto';
import { Photo } from 'src/app/models/photo/Photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private mPhotoSubject: BehaviorSubject<MutablePhoto[]>;
  private mLoader: VegaPhotoLoader;
  private mPhotoUploadCommand: PhotoUploadCommand;
  private mCurrentPhoto: Photo | null;
  private mNextStart: number;

  public constructor() {
    this.mPhotoSubject = new BehaviorSubject<MutablePhoto[]>([]);
    this.mLoader = new VegaPhotoLoader();
    this.mPhotoUploadCommand = new PhotoUploadCommand();
    this.mPhotoUploadCommand.setOnComplete((photo) => {
      const newPhoto = MutablePhoto.createWithPhoto(photo);
      const current = this.mPhotoSubject.getValue();
      const next = [newPhoto, ...current];
      this.mPhotoSubject.next(next);
    });
    this.mCurrentPhoto = null;
    this.mNextStart = 0;
  }

  public subscribePhoto(callback: TypeCallback<Photo[]>): void {
    this.mPhotoSubject.subscribe(callback);
  }

  public init(): void {
    this.mNextStart = 0;
    this.mLoader.setStart(0);
    this.mLoader.load((photos) => {
      const loaded = photos ? photos : [];
      const mutabled = loaded.map((p) => MutablePhoto.createWithPhoto(p));
      this.mPhotoSubject.next(mutabled);
    });
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
    this.mLoader.load((photos) => {
      if (!photos) {
        console.warn('load failed');
        return;
      }
      const mutablePhotos = photos.map((photo) =>
        MutablePhoto.createWithPhoto(photo)
      );
      const current = this.mPhotoSubject.getValue();
      this.mPhotoSubject.next([...current, ...mutablePhotos]);
      this.mNextStart += 100;
      this.mLoader.setStart(this.mNextStart);
    });
  }

  public setAdult(hash: string, adult: boolean): void {
    const photos = this.mPhotoSubject.getValue();
    const photo = photos.find((p) => p.getHash() === hash);
    if (!photo) {
      console.warn('not found');
      return;
    }
    photo.setForAdult(adult);
    this.mPhotoSubject.next(photos);
  }

  public setTags(hash: string, tagQuery: string): void {
    const photos = this.mPhotoSubject.getValue();
    const photo = photos.find((p) => p.getHash() === hash);
    if (!photo) {
      console.warn('not found');
      return;
    }
    photo.setTags(
      tagQuery
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s)
    );
    this.mPhotoSubject.next(photos);
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
