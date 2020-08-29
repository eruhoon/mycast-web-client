import { Component, OnInit } from '@angular/core';
import { Stream } from 'src/app/models/stream/Stream';
import { FavoriteStreamService } from 'src/app/services/stream/favorite-stream.service';
import { StreamService } from 'src/app/services/stream/stream.service';
import { StreamContainer } from './StreamContainer';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss'],
})
export class StreamListComponent implements OnInit {
  private mService: StreamService;
  private mLocalStreams: StreamContainer;
  private mFavorites: Stream[];

  constructor(
    service: StreamService,
    private mFavoriteSrv: FavoriteStreamService
  ) {
    this.mService = service;
    this.mLocalStreams = new StreamContainer();
    this.mFavorites = [];
  }

  public onLocalStreamChanged(streams: Stream[]): void {
    this.mergeLocals(streams);
  }

  public mergeLocals(streams: Stream[]): void {
    this.mLocalStreams.upsert(streams);
  }

  public onExternalStreamChanged(streams: Stream[]): void {
    this.mFavorites = this.getFavoriteStreams(streams);
  }

  public ngOnInit() {
    this.mService.subscribeLocalStreams((streams) => {
      this.onLocalStreamChanged(streams);
    });
    this.mService
      .getExternalStreams()
      .subscribe((streams) => this.onExternalStreamChanged(streams));
  }

  public getStreams(): Stream[] {
    return this.mLocalStreams.get();
  }

  public getFavorites(): Stream[] {
    return this.mFavorites;
  }

  private getFavoriteStreams(externals: Stream[]): Stream[] {
    const favorites = this.mFavoriteSrv.getFavorites();
    return externals.filter((stream) => {
      const platform = stream.getPlatform();
      const keyId = stream.getKeyId();
      return favorites.some(
        (favorite) =>
          favorite.getPlatform() === platform && favorite.getKeyId() === keyId
      );
    });
  }
}
