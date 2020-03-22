import { VegaImgurLoader } from 'src/app/models/photo/loader/VegaImgurLoader';
import { Photo } from 'src/app/models/photo/Photo';
import { DateUtils } from 'src/app/models/util/DateUtils';
import { PhotoService } from 'src/app/services/photo/photo.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'photo-detail-view',
  templateUrl: './photo-detail-view.component.html',
  styleUrls: ['./photo-detail-view.component.scss']
})
export class PhotoDetailViewComponent implements OnInit {

  private mPhotoService: PhotoService;
  private mImgurLoader: VegaImgurLoader;
  private mViewer: number;
  private mEditTagMode: boolean;

  public constructor(photoService: PhotoService) {
    this.mPhotoService = photoService;
    this.mViewer = 0;
    this.mEditTagMode = false;
  }

  public ngOnInit() {
    this.mViewer = this.getPhoto().getViewer();
    this.mEditTagMode = false;

    new VegaImgurLoader(this.getPhoto().getHash()).load(photo => {
      if (!photo) { return; }
      this.mViewer = photo.getViewer();
    });
  }

  public getPhoto(): Photo {
    const photo = this.mPhotoService.getCurrentPhoto();
    if (photo !== null) {
      return photo;
    }
    return new EmptyPhoto();
  }

  public getSizeText(): string {
    const width = this.getPhoto().getWidth();
    const height = this.getPhoto().getHeight();
    return `${width}x${height}`;
  }

  public getDateText(): string {
    const dateObj = this.getPhoto().getRegDate();
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${year}년 ${month}월 ${date}일`;
  }

  public getTimeText(): string {
    const dateObj = this.getPhoto().getRegDate();
    const day = DateUtils.getDayString(dateObj.getDay());
    const rawHour = dateObj.getHours();
    const amPm = rawHour < 12 ? '오전' : '오후';
    const hour = rawHour % 12;
    const minute = dateObj.getMinutes();
    return `${day}, ${amPm} ${hour}:${minute}`;
  }

  public getMimeType(): string {
    const rawMimeType = this.getPhoto().getMimeType();
    try {
      const mimeType = rawMimeType.split('/')[1].toUpperCase();
      return mimeType;
    } catch (e) {
      return 'NONE';
    }
  }

  public getRawMimeType(): string {
    return this.getPhoto().getMimeType();
  }

  public getUri(): string {
    return this.getPhoto().getUrl();
  }

  public getViewer(): number {
    return this.mViewer;
  }

  public getTags(): string[] {
    return this.getPhoto().getTags();
  }

  public isEditTagMode(): boolean {
    return this.mEditTagMode;
  }

  public setEditTagMode(tagMode: boolean): void {
    this.mEditTagMode = tagMode;
  }

  public onCloseClick(): void {
    this.mPhotoService.setCurrentPhoto(null);
  }

}

class EmptyPhoto implements Photo {
  public getHash(): string { return ''; }
  public getUrl(): string { return ''; }
  public getWidth(): number { return 0; }
  public getHeight(): number { return 0; }
  public getMimeType(): string { return ''; }
  public getRegDate(): Date { return new Date(); }
  public getViewer(): number { return 0; }
  public getTags(): string[] { return []; }
  public isForAdult(): boolean { return false; }
}
