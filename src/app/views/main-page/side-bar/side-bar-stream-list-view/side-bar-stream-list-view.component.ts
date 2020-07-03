import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, Input, OnInit } from '@angular/core';

import { SideBarService } from '../side-bar.service';

@Component({
  selector: 'side-bar-stream-list-view',
  templateUrl: './side-bar-stream-list-view.component.html',
  styleUrls: [
    './side-bar-stream-list-view.component.scss',
    './side-bar-stream-list-view.color.scss',
  ]
})
export class SideBarStreamListViewComponent implements OnInit {

  @Input()
  public streams: Stream[];
  @Input()
  public title: Stream[];
  private mActiveStreams: Stream[];
  private mSelected: boolean;

  public constructor(
    private mMainSrv: MainService,
    private mSideBarSrv: SideBarService,
    private mOptionSrv: OptionService) {
    this.streams = [];
    this.mActiveStreams = [];
    this.mSelected = false;
  }

  public ngOnInit() {
  }

  public getSize(): number {
    return this.streams.length;
  }

  public getSelected(): boolean {
    return this.mSelected;
  }

  public getActiveStreams(): Stream[] {
    return this.mActiveStreams;
  }

  public isMobile(): boolean {
    return this.mOptionSrv.isMobile();
  }

  public onHeaderClick(): void {
    if (this.mSelected) {
      this.deselect();
    } else {
      this.select();
    }
  }

  private select(): void {
    this.mSelected = true;
    this.mActiveStreams = this.streams;
  }

  private deselect(): void {
    this.mSelected = false;
    this.mActiveStreams = [];
  }

  public onStreamClick(stream: Stream): void {
    if (stream.getPlatform() === 'afreeca') {
      window.open(stream.getUrl(), '_blank', 'width=800');
    } else {
      this.mMainSrv.setCurrentLink(stream.getUrl());
    }
    this.mSideBarSrv.deactivate();
  }

}
