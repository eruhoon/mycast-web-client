import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';
import { StreamService } from 'src/app/services/stream/stream.service';

import { Component, OnInit } from '@angular/core';
import { ProfileService, ProfileModifyMode } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss', './side-bar.color.scss']
})
export class SideBarComponent implements OnInit {

  private mMainService: MainService;
  private mLocalStreamListShow: boolean;
  private mTwitchListShow: boolean;
  private mAfreecaListShow: boolean;
  public youtubeListShow: boolean;
  private mKakaoListShow: boolean;

  constructor(
    main: MainService,
    private mStreamSrv: StreamService,
    private mProfileSrv: ProfileService,
    private mOptionSrv: OptionService) {
    this.mMainService = main;

    this.youtubeListShow = false;
  }

  public ngOnInit() {
    this.mLocalStreamListShow = false;
    this.mTwitchListShow = false;
    this.mKakaoListShow = false;
  }

  public getLocalStreamList(): Stream[] {
    return this.mStreamSrv.getLocalStreams();
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

  public isLocalStreamListShow(): boolean {
    return this.mLocalStreamListShow;
  }

  public isTwitchListShow(): boolean {
    return this.mTwitchListShow;
  }

  public isAfreecaListShow(): boolean {
    return this.mAfreecaListShow;
  }

  public isYoutubeListShow(): boolean {
    return this.youtubeListShow;
  }

  public isKakaoListShow(): boolean {
    return this.mKakaoListShow;
  }

  public isMobile(): boolean {
    return this.mOptionSrv.isMobile();
  }

  public onStreamClick(stream: Stream): void {
    if (stream.getPlatform() === 'afreeca') {
      window.open(stream.getUrl(), '_blank', 'width=800');
    } else {
      this.mMainService.setCurrentLink(stream.getUrl());
    }
    this.mMainService.closeSidebar();
  }

  public onFavoriteClick(event: Event, stream: Stream): void {
    event.stopPropagation();
    // TODO
    console.log('TODO: favorite');
  }

  public onShareClick(event: Event, stream: Stream): void {
    event.stopPropagation();
    const share = new StreamShareCommand(stream);
    share.execute();
  }

  public onNewWindowClick(event: Event, stream: Stream): void {
    event.stopPropagation();
    window.open(stream.getUrl(), '_blank', 'width=800');
  }

  public onMemoClick(): void {
    this.mMainService.setCurrentLink('./memo');
    this.mMainService.closeSidebar();
  }

  public onPhotoClick(): void {
    this.mMainService.setCurrentLink('./photo');
    this.mMainService.closeSidebar();
  }

  public onStreamConfigClick(): void {
    this.mProfileSrv.setModifyMode(ProfileModifyMode.STREAM_ADD);
  }

  public onLocalStreamListClick(): void {
    this.toggleLocalStreamList();
  }

  public onTwitchListClick(): void {
    this.toggleTwtichList();
  }

  public onAfreecaListClick(): void {
    this.toggleAfreecaList();
  }

  public onKakaoListClick(): void {
    this.toggleKakaoList();
  }

  private toggleLocalStreamList(): void {
    this.mLocalStreamListShow = !this.mLocalStreamListShow;
  }

  private toggleTwtichList(): void {
    this.mTwitchListShow = !this.mTwitchListShow;
  }

  private toggleAfreecaList(): void {
    this.mAfreecaListShow = !this.mAfreecaListShow;
  }

  public toggleYoutubeList(): void {
    this.youtubeListShow = !this.youtubeListShow;
  }

  private toggleKakaoList(): void {
    this.mKakaoListShow = !this.mKakaoListShow;
  }
}
