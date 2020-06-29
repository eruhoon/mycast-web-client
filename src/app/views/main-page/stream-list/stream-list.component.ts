import { Stream } from 'src/app/models/stream/Stream';
import { StreamService } from 'src/app/services/stream/stream.service';

import { Component, OnInit } from '@angular/core';
import { FavoriteStreamService } from 'src/app/services/stream/favorite-stream.service';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  private mService: StreamService;

  constructor(
    service: StreamService,
    private mFavoriteSrv: FavoriteStreamService) {
    this.mService = service;
  }

  public async ngOnInit() {
  }

  public getStreams(): Stream[] {
    return this.mService.getLocalStreams();
  }

  public getFavorites(): Stream[] {
    const favorites = this.mFavoriteSrv.getFavorites();
    return this.mService.getExternalStreams().filter(stream => {
      const platform = stream.getPlatform();
      const keyId = stream.getKeyId();
      return favorites.some(favorite =>
        favorite.getPlatform() === platform && favorite.getKeyId() === keyId);
    });
  }

  protected onShareClick(stream: Stream): void {
    console.log('share', stream);
  }

  protected onNewWindowClick(stream: Stream): void {
    console.log('new window', stream);
  }
}
