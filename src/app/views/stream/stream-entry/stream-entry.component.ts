import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stream-entry',
  templateUrl: './stream-entry.component.html',
  styleUrls: ['./stream-entry.component.scss']
})
export class StreamEntryComponent implements OnInit {

  @Input() stream: Stream;

  private mTitle: string;
  private mThumbnail: string;

  // private mMainService: MainService;
  private mThumbnailShow: boolean;

  public constructor(mainService: MainService) {
    this.mTitle = '';
    this.mThumbnail = '';
    // this.mMainService = mainService;
    this.mThumbnailShow = false;
  }

  public ngOnInit() {
    this.mTitle = this.stream.getTitle();
    this.mThumbnail = this.stream.getThumbnail();
    this.mThumbnailShow = true;
  }

  public getTitle(): string { return this.mTitle; }

  public getThumbnail(): string { return this.mThumbnail; }

  public onIconClick(): void {
    // this.mMainService.setCurrentLink(this.stream.getUrl());
  }

  public onThumbnailError(): void {
    this.mThumbnail = '';
    this.mThumbnailShow = false;
  }

  public isThumbnailShow(): boolean {
    return this.mThumbnailShow;
  }

  public onShareClick(stream: Stream): void {
    console.log('share', stream);
    const share = new StreamShareCommand(stream);
    share.execute();
  }

  public onNewWindowClick(stream: Stream): void {
    console.log('new window', stream);
  }
}
