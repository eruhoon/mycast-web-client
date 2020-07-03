import { FavoriteStream } from 'src/app/models/stream/favorite/FavoriteStream';
import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';
import { FavoriteStreamService } from 'src/app/services/stream/favorite-stream.service';
import { StreamService } from 'src/app/services/stream/stream.service';

import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { SideBarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss', './side-bar.color.scss']
})
export class SideBarComponent implements OnInit {

  private static readonly DEFAULT_STREAMS: Stream[] = [];

  private mLocals: Stream[];
  private mTwitches: Stream[];
  private mAfreecas: Stream[];
  private mYoutubes: Stream[];
  private mKakaos: Stream[];
  private mFavorites: Stream[];

  constructor(
    private mService: SideBarService,
    private mOptionSrv: OptionService,
    private mMainService: MainService,
    private mStreamSrv: StreamService,
    private mFavoriteSrv: FavoriteStreamService,
    private mProfileSrv: ProfileService) {

    this.mLocals = SideBarComponent.DEFAULT_STREAMS;
    this.mTwitches = SideBarComponent.DEFAULT_STREAMS;
    this.mAfreecas = SideBarComponent.DEFAULT_STREAMS;
    this.mYoutubes = SideBarComponent.DEFAULT_STREAMS;
    this.mKakaos = SideBarComponent.DEFAULT_STREAMS;
    this.mFavorites = SideBarComponent.DEFAULT_STREAMS;
  }

  public ngOnInit() {
    this.mService.setView(this);
    this.refreshStreams();
  }

  public onActivated(): void {
    this.refreshStreams();
  }

  private refreshStreams(): void {
    if (this.mService.isActive()) {
      this.mLocals = this.mStreamSrv.getLocalStreams();
      const externals = this.mStreamSrv.getExternalStreams();
      this.mTwitches = externals.filter(
        stream => stream.getPlatform() === 'twitch');
      this.mAfreecas = externals.filter(
        stream => stream.getPlatform() === 'afreeca');
      this.mYoutubes = externals.filter(
        stream => stream.getPlatform() === 'youtube');
      this.mKakaos = externals.filter(
        stream => stream.getPlatform() === 'kakaotv');
      this.mFavorites = externals.filter(stream => {
        const platform = stream.getPlatform();
        const keyId = stream.getKeyId();
        return this.mFavoriteSrv.isFavorite(platform, keyId);
      })
    } else {
      this.mLocals = SideBarComponent.DEFAULT_STREAMS;
      this.mTwitches = SideBarComponent.DEFAULT_STREAMS;
      this.mAfreecas = SideBarComponent.DEFAULT_STREAMS;
      this.mYoutubes = SideBarComponent.DEFAULT_STREAMS;
      this.mKakaos = SideBarComponent.DEFAULT_STREAMS;
      this.mFavorites = SideBarComponent.DEFAULT_STREAMS;
    }
  }

  public isMobile(): boolean {
    return this.mOptionSrv.isMobile();
  }

  public getLocalStreamList(): Stream[] {
    return this.mLocals;
  }

  public hasFavorite(): boolean {
    return this.mFavoriteSrv.getFavorites().length > 0;
  }

  public getFavoriteList(): Stream[] {
    return this.mFavorites;
  }

  public getTwitchList(): Stream[] {
    return this.mTwitches;
  }

  public getAfreecaList(): Stream[] {
    return this.mAfreecas;
  }

  public getYoutubeList(): Stream[] {
    return this.mYoutubes;
  }

  public getKakaoList(): Stream[] {
    return this.mKakaos;
  }

  public onMemoClick(): void {
    this.mMainService.setCurrentLink('./memo');
    this.mService.deactivate();
  }

  public onMemoContextMenu(): boolean {
    window.open('/memo', '_blank', 'width=800');
    return false;
  }

  public onPhotoClick(): void {
    this.mMainService.setCurrentLink('./photo');
    this.mService.deactivate();
  }

  public onPhotoContextMenu(): boolean {
    window.open('/photo', '_blank', 'width=800');
    return false;
  }

  public onStreamConfigClick(): void {
    this.mProfileSrv.setModifyMode(ProfileModifyMode.STREAM_ADD);
  }
}
