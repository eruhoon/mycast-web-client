import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VegaPhotoLoader } from 'src/app/models/photo/loader/VegaPhotoLoader';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { PhotoSetParam } from './PhotoSetParam';
import { PhotoSetParamContainer } from './PhotoSetParamContainer';

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
  private mTimer: number;

  public constructor(service: PhotoService) {
    this.searchForm = { text: '' };
    this.mContainer = new PhotoSetParamContainer();
    this.mLoader = new VegaPhotoLoader();
    this.mService = service;
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
      const elm = this.mSearchInput.nativeElement;
      console.log('tick', this.searchForm.text, elm.value);
      this.searchPhoto();
      this.mTimer = -1;
    }, 600));
  }

  public onScroll(): void {
    const elm = this.mScroller.nativeElement;
    const diff = elm.scrollHeight - elm.scrollTop;
    const threashold = elm.clientHeight * 2;
    if (diff < threashold && !this.mService.isLoading()) {
      this.mService.loadMore();
    }
  }

  private searchPhoto(): void {
    const elm = this.mSearchInput.nativeElement;
    this.mLoader.setQuery(elm.value);
    this.mLoader.load(rawPhotos => {
      const photos = rawPhotos !== null ? rawPhotos : [];
      this.mContainer.update(photos);
    });
  }
}
