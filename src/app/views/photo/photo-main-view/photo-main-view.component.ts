import { Photo } from 'src/app/models/photo/Photo';
import { DateUtils } from 'src/app/models/util/DateUtils';
import { PhotoService } from 'src/app/services/photo/photo.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'photo-main-view',
  templateUrl: './photo-main-view.component.html',
  styleUrls: ['./photo-main-view.component.scss', './photo-main-view.color.scss']
})
export class PhotoMainViewComponent implements OnInit {

  @ViewChild('scroller', { static: false })
  public mScroller: ElementRef<HTMLDivElement>;

  private mService: PhotoService;
  private mPhotoSetModel: PhotoSetParam[];

  public constructor(service: PhotoService) {
    this.mService = service;
    this.mPhotoSetModel = [];
  }

  ngOnInit() {
  }

  public getPhotoSetModel(): PhotoSetParam[] {
    this.applyPhoto(this.mService.getPhotos());
    return this.mPhotoSetModel;
  }

  public onScroll(): void {
    const elm = this.mScroller.nativeElement;
    const diff = elm.scrollHeight - elm.scrollTop;
    const threashold = elm.clientHeight * 2;
    if (diff < threashold && !this.mService.isLoading()) {
      this.mService.loadMore();
    }
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
      if (photoList.every(p => p.getHash() !== photo.getHash())) {
        photoList.push(photo);
        photoList.sort(
          (a, b) => b.getRegDate().getTime() - a.getRegDate().getTime());
      }
    });
  }

  private createPhotoSetParam(dateString: string): PhotoSetParam {
    return { dateString, list: [] };
  }

}

type PhotoSetParam = {
  dateString: string,
  list: Photo[]
};
