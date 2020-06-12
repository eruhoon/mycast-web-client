import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { StreamService } from 'src/app/services/stream/stream.service';

import { Component, OnInit } from '@angular/core';

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
  private mKakaoListShow: boolean;

  constructor(main: MainService, private mStreamSrv: StreamService) {
    this.mMainService = main;
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

  public isKakaoListShow(): boolean {
    return this.mKakaoListShow;
  }

  public onStreamClick(stream: Stream): void {
    this.mMainService.setCurrentLink(stream.getUrl());
    this.mMainService.closeSidebar();
  }

  public onMemoClick(): void {
    this.mMainService.setCurrentLink('./memo');
    this.mMainService.closeSidebar();
  }

  public onPhotoClick(): void {
    this.mMainService.setCurrentLink('./photo');
    this.mMainService.closeSidebar();
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

  private toggleKakaoList(): void {
    this.mKakaoListShow = !this.mKakaoListShow;
  }
}
