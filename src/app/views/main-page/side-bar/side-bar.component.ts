import { Component, OnInit } from '@angular/core';
import { ExternalStreamListLoader } from 'src/app/models/stream/ExternalStreamListLoader';
import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  private mMainService: MainService;
  private mTwitchListShow: boolean;
  private mKakaoListShow: boolean;
  private mTwitchs: Stream[];
  private mKakaos: Stream[];

  constructor(main: MainService) {
    this.mMainService = main;
    this.mTwitchs = [];
    this.mKakaos = [];
  }

  public ngOnInit() {
    this.mTwitchListShow = false;
    this.mKakaoListShow = false;
    new ExternalStreamListLoader().load(streams => {
      if (!streams) {
        console.warn('Invalid Streams');
        return;
      }
      this.mTwitchs = streams.filter(
        stream => stream.getPlatform() === 'twitch');
      this.mKakaos = streams.filter(
        stream => stream.getPlatform() === 'kakaotv');
    });
  }

  public getTwitchList(): Stream[] {
    return this.mTwitchs;
  }

  public getKakaoList(): Stream[] {
    return this.mKakaos;
  }

  public isTwitchListShow(): boolean {
    return this.mTwitchListShow;
  }

  public isKakaoListShow(): boolean {
    return this.mKakaoListShow;
  }

  public onStreamClick(stream: Stream): void {
    this.mMainService.setCurrentLink(stream.getUrl());
  }

  public onTwitchListClick(): void {
    this.toggleTwtichList();
  }

  public onKakaoListClick(): void {
    this.toggleKakaoList();
  }

  private toggleTwtichList(): void {
    this.mTwitchListShow = !this.mTwitchListShow;
  }

  private toggleKakaoList(): void {
    this.mKakaoListShow = !this.mKakaoListShow;
  }
}
