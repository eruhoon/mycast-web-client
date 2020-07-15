import { Stream } from 'src/app/models/stream/Stream';
import { StreamService, StreamSrvObserver } from 'src/app/services/stream/stream.service';

import { Component, OnInit } from '@angular/core';
import { FavoriteStreamService } from 'src/app/services/stream/favorite-stream.service';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  private mService: StreamService;
  private mLocalStreams: Stream[];
  private mFavorites: Stream[];

  constructor(
    service: StreamService,
    private mFavoriteSrv: FavoriteStreamService) {
    this.mService = service;
    this.mLocalStreams = [];
    this.mFavorites = [];
  }

  public onLocalStreamChanged(streams: Stream[]): void {
    this.mLocalStreams = streams;
  }

  public onExternalStreamChanged(streams: Stream[]): void {
    this.mFavorites = this.getFavoriteStreams(streams);
  }

  public ngOnInit() {
    this.mService.getLocalStreams().subscribe(
      streams => this.onLocalStreamChanged(streams));

    this.mService.getExternalStreams().subscribe(
      streams => this.onExternalStreamChanged(streams));
  }

  public getStreams(): Stream[] {
    return this.mLocalStreams;
  }

  public getFavorites(): Stream[] {
    return this.mFavorites;
  }

  private getFavoriteStreams(externals: Stream[]): Stream[] {
    const favorites = this.mFavoriteSrv.getFavorites();
    return externals.filter(stream => {
      const platform = stream.getPlatform();
      const keyId = stream.getKeyId();
      return favorites.some(favorite =>
        favorite.getPlatform() === platform && favorite.getKeyId() === keyId);
    });
  }
}
