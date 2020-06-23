import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VegaPhotoLoader } from 'src/app/models/photo/loader/VegaPhotoLoader';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { PhotoSetParam } from './PhotoSetParam';
import { PhotoSetParamContainer } from './PhotoSetParamContainer';
import { MutablePhoto } from 'src/app/models/photo/MutablePhoto';

@Component({
  selector: 'photo-main-view',
  templateUrl: './photo-main-view.component.html',
  styleUrls: ['./photo-main-view.component.scss', './photo-main-view.color.scss']
})
export class PhotoMainViewComponent implements OnInit {

  @ViewChild('scroller', { static: false })
  public mScroller: ElementRef<HTMLDivElement>;

  @ViewChild('searchInput', { static: false })
  public mSearchInput: ElementRef<HTMLInputElement>;

  public searchForm: { text: string };

  private mContainer: PhotoSetParamContainer;
  private mLoader: VegaPhotoLoader;
  private mService: PhotoService;
  private mNextStart: number;
  private mTimer: number;

  public constructor(service: PhotoService) {
    this.searchForm = { text: '' };
    this.mContainer = new PhotoSetParamContainer();
    this.mLoader = new VegaPhotoLoader();
    this.mService = service;
    this.mNextStart = 0;
    this.mTimer = -1;
  }

  public ngOnInit() {
    this.mLoader.load(rawPhotos => {
      const photos = rawPhotos !== null ? rawPhotos : [];
      this.mContainer.update(photos);
    });
  }

  public getPhotoSetModel(): PhotoSetParam[] {
    return this.mContainer.getPhotoSets();
  }

  public onKeyDown(): void {
    clearTimeout(this.mTimer);
    this.mTimer = Number(setTimeout(() => {
      this.searchPhoto();
      this.mTimer = -1;
    }, 600));
  }

  public onScroll(): void {
    const elm = this.mScroller.nativeElement;
    const diff = elm.scrollHeight - elm.scrollTop;
    const threashold = elm.clientHeight * 2;
    if (diff < threashold && !this.mLoader.isLoading()) {
      this.loadMore();
    }
  }

  private searchPhoto(): void {
    const elm = this.mSearchInput.nativeElement;
    this.mNextStart = 0;
    this.mLoader.setStart(0);
    this.mLoader.setQuery(elm.value);
    this.mLoader.load(rawPhotos => {
      const photos = rawPhotos !== null ? rawPhotos : [];
      this.mContainer.update(photos);
    });
  }

  private loadMore(): void {
    this.mNextStart += 100;
    this.mLoader.setStart(this.mNextStart);
    this.mLoader.load(photos => {
      if (!photos) {
        console.warn('load failed');
        return;
      }
      const mutablePhotos = photos.map(
        photo => MutablePhoto.createWithPhoto(photo));
      this.mContainer.upsert(mutablePhotos);
    });
  }
}
