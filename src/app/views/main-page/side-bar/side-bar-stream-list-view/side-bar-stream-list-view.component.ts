import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, Input, OnInit } from '@angular/core';

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
  private mSelected: boolean;

  public constructor(
    private mMainSrv: MainService,
    private mOptionSrv: OptionService) {
    this.streams = [];
    this.mSelected = false;
  }

  public ngOnInit() {
  }

  public getSelected(): boolean {
    return this.mSelected;
  }

  public isMobile(): boolean {
    return this.mOptionSrv.isMobile();
  }

  public onHeaderClick(): void {
    this.mSelected = !this.mSelected;
  }

  public onStreamClick(stream: Stream): void {
    if (stream.getPlatform() === 'afreeca') {
      window.open(stream.getUrl(), '_blank', 'width=800');
    } else {
      this.mMainSrv.setCurrentLink(stream.getUrl());
    }
    this.mMainSrv.closeSidebar();
  }

}
