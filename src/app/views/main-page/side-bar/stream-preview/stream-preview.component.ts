
import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FavoriteStreamService } from 'src/app/services/stream/favorite-stream.service';
import { ToastService } from 'src/app/services/notification/toast.service';

@Component({
  selector: 'stream-preview',
  templateUrl: './stream-preview.component.html',
  styleUrls: [
    './stream-preview.component.scss',
    './stream-preview.color.scss',
  ]
})
export class StreamPreviewComponent implements OnInit, OnChanges {

  @Input()
  public preview: Stream;
  public thumbnail: string;

  private mKeyId: string;
  private mPlatform: string;

  public constructor(
    private mFavoriteSrv: FavoriteStreamService,
    private mToastSrv: ToastService) { }

  public ngOnInit() {
    this.thumbnail = this.preview.getThumbnail();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.mKeyId = this.preview.getKeyId();
    this.mPlatform = this.preview.getPlatform();
    this.thumbnail = this.preview.getThumbnail();
  }

  public isFavorite(): boolean {
    return this.mFavoriteSrv.isFavorite(this.mPlatform, this.mKeyId);
  }

  public onFavoriteClick(event: Event): void {
    event.stopPropagation();
    if (!this.isFavorite()) {
      this.mFavoriteSrv.addFavorite(this.mPlatform, this.mKeyId);
      this.mToastSrv.toast('즐겨찾기로 설정되었습니다.');
    } else {
      this.mFavoriteSrv.removeFavorite(this.mPlatform, this.mKeyId);
      this.mToastSrv.toast('즐겨찾기가 해제되었습니다.');
    }
  }

  public onShareClick(event: Event): void {
    event.stopPropagation();
    const share = new StreamShareCommand(this.preview);
    share.execute();
  }

  public onThumbnailError(): void {
    this.thumbnail = '/assets/image/stream/live-no-tum-img.png';
  }

  public onNewWindowClick(event: Event, stream: Stream): void {
    event.stopPropagation();
    window.open(stream.getUrl(), '_blank', 'width=800');
  }

}
