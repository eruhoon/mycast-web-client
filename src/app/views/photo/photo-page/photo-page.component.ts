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

  public constructor(service: PhotoService) {
    this.mService = service;
  }

  public ngOnInit() {
  }

  public createPhotoSets(): PhotoSetParam[] {
    const photoParams: PhotoParam[] = this.mService.getPhotos().map(photo => {
      const dateSet = this.createDateSet(photo.getRegDate());
      return {
        url: photo.getUrl(),
        width: photo.getWidth(),
        height: photo.getHeight(),
        date: dateSet,
      };
    });

    const photoSets: PhotoSetParam[] = [];
    photoParams.forEach(photo => {
      let photoSet = photoSets.find(
        param => param.dateString === photo.date.dateString);
      if (!photoSet) {
        photoSet = {
          dateString: photo.date.dateString,
          list: []
        };
        photoSets.push(photoSet);
      }
      photoSet.list.push(photo);
    });
    console.log(photoSets);
    return photoSets;
  }

  private createDateSet(dateObj: Date): DateSetParam {
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const dayString = DateUtils.getDayString(dateObj.getDay());
    return {
      date: dateObj,
      dateString: `${month}월 ${date}일 (${dayString})`,
    };
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

type DateSetParam = {
  date: Date,
  dateString: string,
};

type PhotoParam = {
  url: string,
  width: number,
  height: number,
  date: DateSetParam,
};
