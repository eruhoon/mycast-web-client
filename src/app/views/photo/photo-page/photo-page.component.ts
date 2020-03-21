import { Photo } from 'src/app/models/photo/Photo';
import { DateUtils } from 'src/app/models/util/DateUtils';
import { PhotoService } from 'src/app/services/photo/photo.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent implements OnInit {

  @ViewChild('scroller', { static: false })
  public mScroller: ElementRef<HTMLDivElement>;

  private mService: PhotoService;
  private mPhotoSetModel: PhotoSetParam[];

  public constructor(service: PhotoService) {
    this.mService = service;
    this.mPhotoSetModel = [];
  }

  public ngOnInit() {
  }

  public getPhotoSetModel(): PhotoSetParam[] {
    this.applyPhoto(this.mService.getPhotos());
    return this.mPhotoSetModel;
  }

  private applyPhoto(photos: Photo[]): void {
    photos.forEach(photo => {
      const dateString = DateUtils.getDateString(photo.getRegDate());
      let photoSetParam = this.mPhotoSetModel.find(
        set => set.dateString === dateString);

      if (!photoSetParam) {
        photoSetParam = this.createPhotoSetParam(dateString);
        this.mPhotoSetModel.push(photoSetParam);
      }

      const photoList = photoSetParam.list;
      if (photoList.every(param => param.hash !== photo.getHash())) {
        photoList.push(this.createPhotoParam(photo));
      }
    });
  }

  private createPhotoSetParam(dateString: string): PhotoSetParam {
    return { dateString, list: [] };
  }

  private createPhotoParam(photo: Photo): PhotoParam {
    const param = {
      hash: photo.getHash(),
      url: photo.getUrl(),
      thumbnail: `https://i.imgur.com/${photo.getHash()}m.png`,
      width: photo.getWidth(),
      height: photo.getHeight(),
      date: photo.getRegDate(),
    };
    return param;
  }

  public onScroll(): void {
    const elm = this.mScroller.nativeElement;
    const diff = elm.scrollHeight - elm.scrollTop;
    if (diff < 1000 && !this.mService.isLoading()) {
      this.mService.loadMore();
    }
  }
}

type PhotoSetParam = {
  dateString: string,
  list: PhotoParam[]
};

type PhotoParam = {
  hash: string,
  url: string,
  thumbnail: string,
  width: number,
  height: number,
  date: Date,
};
