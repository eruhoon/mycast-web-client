import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VegaPhotoLoader } from 'src/app/models/photo/loader/VegaPhotoLoader';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { PhotoSetParam } from './PhotoSetParam';
import { PhotoSetParamContainer } from './PhotoSetParamContainer';

@Component({
  selector: 'photo-main-view',
  templateUrl: './photo-main-view.component.html',
  styleUrls: [
    './photo-main-view.component.scss',
    './photo-main-view.color.scss',
  ],
})
export class PhotoMainViewComponent implements OnInit {
  @ViewChild('scroller', { static: false })
  public mScroller: ElementRef<HTMLDivElement>;

  @ViewChild('searchInput', { static: false })
  public mSearchInput: ElementRef<HTMLInputElement>;

  private mContainer: PhotoSetParamContainer;
  private mLoader: VegaPhotoLoader;
  private mTimer: number;

  public constructor(private mService: PhotoService) {
    this.mContainer = new PhotoSetParamContainer();
    this.mLoader = new VegaPhotoLoader();
    this.mTimer = -1;
  }

  public ngOnInit() {
    this.mService.subscribePhoto((photos) => {
      this.mContainer.update(photos);
    });
    this.mService.init();
  }

  public getPhotoSetModel(): PhotoSetParam[] {
    return this.mContainer.getPhotoSets();
  }

  public onKeyDown(): void {
    clearTimeout(this.mTimer);
    this.mTimer = Number(
      setTimeout(() => {
        this.searchPhoto();
        this.mTimer = -1;
      }, 600)
    );
  }

  public onScroll(): void {
    const elm = this.mScroller.nativeElement;
    const diff = elm.scrollHeight - elm.scrollTop;
    const threashold = elm.clientHeight * 2;
    if (diff < threashold && !this.mLoader.isLoading()) {
      this.mService.loadMore();
    }
  }

  private searchPhoto(): void {
    const elm = this.mSearchInput.nativeElement;
    this.mLoader.setStart(0);
    this.mLoader.setQuery(elm.value);
    this.mLoader.load((rawPhotos) => {
      const photos = rawPhotos !== null ? rawPhotos : [];
      this.mContainer.update(photos);
    });
  }
}
