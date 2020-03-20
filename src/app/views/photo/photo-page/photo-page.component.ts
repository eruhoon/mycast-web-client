import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PhotoService } from 'src/app/services/photo/photo.service';

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

  public getPhotos(): any[] {
    return this.mService.getPhotos();
  }

  public getPhotoSets(): PhotoSet[] {
    const photos: Photo[] = this.mService.getPhotos().map(raw => {
      let dateSet = this.getDateSet(raw.regDate);
      return {
        url: raw.url,
        width: raw.width,
        height: raw.height,
        date: dateSet,
      }
    });

    const photoSets: PhotoSet[] = [];
    photos.forEach(photo => {
      let photoSet = photoSets.find(photoSet => photoSet.dateString === photo.date.dateString);
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

  private getDateSet(regDate: string): DateSet {
    const date = new Date(regDate);
    const dayString = (d: number) => {
      switch (d) {
        case 0: return '일';
        case 1: return '월';
        case 2: return '화';
        case 3: return '수';
        case 4: return '목';
        case 5: return '금';
        case 6: return '토';
      }
      return '';
    }

    return {
      date,
      dateString: `${date.getMonth() + 1}월 ${date.getDate()}일 (${dayString(date.getDay())})`,
    };
  }

  public onScroll(): void {
    if (this.mService.isLoading()) {
      return;
    }
    const elm = this.mScroller.nativeElement;
    const diff = elm.scrollHeight - elm.scrollTop;
    if (diff < 1000) {
      this.mService.loadMore();
    }
  }
}

type PhotoSet = {
  dateString: string,
  list: Photo[]
}

type DateSet = {
  date: Date,
  dateString: string,
}

type Photo = {
  url: string,
  width: number,
  height: number,
  date: DateSet,
}
