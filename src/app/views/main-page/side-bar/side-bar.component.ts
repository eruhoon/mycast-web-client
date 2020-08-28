import { Component, OnInit } from '@angular/core';
import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';
import {
  ProfileModifyMode,
  ProfileService,
} from 'src/app/services/profile/profile.service';
import { FavoriteStreamService } from 'src/app/services/stream/favorite-stream.service';
import {
  StreamService,
  StreamSrvObserver,
} from 'src/app/services/stream/stream.service';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss', './side-bar.color.scss'],
})
export class SideBarComponent implements OnInit, StreamSrvObserver {
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
    private mProfileSrv: ProfileService
  ) {
    this.mLocals = SideBarComponent.DEFAULT_STREAMS;
    this.mTwitches = SideBarComponent.DEFAULT_STREAMS;
    this.mAfreecas = SideBarComponent.DEFAULT_STREAMS;
    this.mYoutubes = SideBarComponent.DEFAULT_STREAMS;
    this.mKakaos = SideBarComponent.DEFAULT_STREAMS;
    this.mFavorites = SideBarComponent.DEFAULT_STREAMS;
  }

  public ngOnInit() {
    this.mService.setView(this);
    this.mStreamSrv.getLocalStreams().subscribe((streams) => {
      this.refreshLocalStreams();
    });
    this.mStreamSrv.getExternalStreams().subscribe((streams) => {
      this.refreshExternalStreams();
    });
    this.refreshStreams();
  }

  public onActivated(): void {
    this.refreshStreams();
  }

  public onDeactived(): void {
    this.refreshStreams();
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

  public onLocalStreamChanged(streams: Stream[]): void {
    this.refreshLocalStreams();
  }

  public onExternalStreamChanged(streams: Stream[]): void {
    this.refreshExternalStreams();
  }

  private refreshStreams(): void {
    this.refreshLocalStreams();
    this.refreshExternalStreams();
  }

  private refreshLocalStreams(): void {
    if (this.mService.isActive()) {
      this.mLocals = this.mStreamSrv.getLocalStreams().getValue();
    } else {
      this.mLocals = SideBarComponent.DEFAULT_STREAMS;
    }
  }

  private refreshExternalStreams(): void {
    if (this.mService.isActive()) {
      const externals = this.mStreamSrv.getExternalStreams().getValue();
      this.mTwitches = externals.filter(
        (stream) => stream.getPlatform() === 'twitch'
      );
      this.mAfreecas = externals.filter(
        (stream) => stream.getPlatform() === 'afreeca'
      );
      this.mYoutubes = externals.filter(
        (stream) => stream.getPlatform() === 'youtube'
      );
      this.mKakaos = externals.filter(
        (stream) => stream.getPlatform() === 'kakaotv'
      );
      this.mFavorites = externals.filter((stream) => {
        const platform = stream.getPlatform();
        const keyId = stream.getKeyId();
        return this.mFavoriteSrv.isFavorite(platform, keyId);
      });
    } else {
      this.mTwitches = SideBarComponent.DEFAULT_STREAMS;
      this.mAfreecas = SideBarComponent.DEFAULT_STREAMS;
      this.mYoutubes = SideBarComponent.DEFAULT_STREAMS;
      this.mKakaos = SideBarComponent.DEFAULT_STREAMS;
      this.mFavorites = SideBarComponent.DEFAULT_STREAMS;
    }
  }
}
