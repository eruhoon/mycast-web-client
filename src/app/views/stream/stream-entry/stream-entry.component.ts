import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'stream-entry',
  templateUrl: './stream-entry.component.html',
  styleUrls: ['./stream-entry.component.scss']
})
export class StreamEntryComponent implements OnInit {

  @Input() stream: Stream;

  private mMainService: MainService;

  public constructor(mainService: MainService) {
    this.mMainService = mainService;
  }

  public ngOnInit() { }

  public onIconClick(): void {
    this.mMainService.setCurrentLink(this.stream.getUrl());
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
