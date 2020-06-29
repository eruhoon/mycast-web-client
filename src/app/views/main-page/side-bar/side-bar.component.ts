import { FavoriteStream } from 'src/app/models/stream/favorite/FavoriteStream';
import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';
import { FavoriteStreamService } from 'src/app/services/stream/favorite-stream.service';
import { StreamService } from 'src/app/services/stream/stream.service';

import { Component, OnInit } from '@angular/core';

import { SideBarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss', './side-bar.color.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    private mService: SideBarService,
    private mOptionSrv: OptionService,
    private mMainService: MainService,
    private mStreamSrv: StreamService,
    private mFavoriteSrv: FavoriteStreamService,
    private mProfileSrv: ProfileService) {
  }

  public ngOnInit() { }

  public isMobile(): boolean {
    return this.mOptionSrv.isMobile();
  }

  public getLocalStreamList(): Stream[] {
    return this.mStreamSrv.getLocalStreams();
  }

  public hasFavorite(): boolean {
    return this.mFavoriteSrv.getFavorites().length > 0;
  }

  public getFavoriteList(): Stream[] {
    return this.mStreamSrv.getExternalStreams().filter(stream => {
      const platform = stream.getPlatform();
      const keyId = stream.getKeyId();
      return this.mFavoriteSrv.isFavorite(platform, keyId);
    });
  }

  public getTwitchList(): Stream[] {
    return this.mStreamSrv.getExternalStreams()
      .filter(stream => stream.getPlatform() === 'twitch');
  }

  public getAfreecaList(): Stream[] {
    return this.mStreamSrv.getExternalStreams()
      .filter(stream => stream.getPlatform() === 'afreeca');
  }

  public getYoutubeList(): Stream[] {
    return this.mStreamSrv.getExternalStreams()
      .filter(stream => stream.getPlatform() === 'youtube');
  }

  public getKakaoList(): Stream[] {
    return this.mStreamSrv.getExternalStreams()
      .filter(stream => stream.getPlatform() === 'kakaotv');
  }

  public onMemoClick(): void {
    this.mMainService.setCurrentLink('./memo');
    this.mService.deactivate();
  }

  public onPhotoClick(): void {
    this.mMainService.setCurrentLink('./photo');
    this.mService.deactivate();
  }

  public onStreamConfigClick(): void {
    this.mProfileSrv.setModifyMode(ProfileModifyMode.STREAM_ADD);
  }
}
