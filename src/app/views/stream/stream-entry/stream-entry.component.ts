import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'stream-entry',
  templateUrl: './stream-entry.component.html',
  styleUrls: ['./stream-entry.component.scss']
})
export class StreamEntryComponent implements OnInit {

  @Input() stream: Stream;
  @Output() iconClick = new EventEmitter<Stream>();

  public constructor() { }

  public ngOnInit() { }

  public onIconClick(): void {
    this.iconClick.emit(this.stream);
  }

  public onShareClick(stream: Stream): void {
    console.log('share', stream)
    const share = new StreamShareCommand(stream);
    share.execute();
  }

  public onNewWindowClick(stream: Stream): void {
    console.log('new window', stream);
  }
}
