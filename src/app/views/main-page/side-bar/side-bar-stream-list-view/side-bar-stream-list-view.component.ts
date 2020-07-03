import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { SideBarService } from '../side-bar.service';

@Component({
  selector: 'side-bar-stream-list-view',
  templateUrl: './side-bar-stream-list-view.component.html',
  styleUrls: [
    './side-bar-stream-list-view.component.scss',
    './side-bar-stream-list-view.color.scss',
  ]
})
export class SideBarStreamListViewComponent implements OnInit, OnChanges {

  private static readonly DEFAULT_STREAMS: Stream[] = [];

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
    this.streams = SideBarStreamListViewComponent.DEFAULT_STREAMS;
    this.mActiveStreams = SideBarStreamListViewComponent.DEFAULT_STREAMS;
    this.mSelected = false;
  }

  public ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.refreshStreams();
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
    this.mSelected = !this.mSelected;
    this.refreshStreams();
  }

  public onStreamClick(stream: Stream): void {
    if (stream.getPlatform() === 'afreeca') {
      window.open(stream.getUrl(), '_blank', 'width=800');
    } else {
      this.mMainSrv.setCurrentLink(stream.getUrl());
    }
    this.mSideBarSrv.deactivate();
  }

  private refreshStreams(): void {
    this.mActiveStreams = this.mSelected ?
      this.streams : SideBarStreamListViewComponent.DEFAULT_STREAMS;
  }
}
