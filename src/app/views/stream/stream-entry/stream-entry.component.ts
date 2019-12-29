import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stream } from 'src/app/models/stream/Stream';

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

  protected onIconClick(): void {
    this.iconClick.emit(this.stream);
  }

  protected onShareClick(stream: Stream): void {
    console.log('share', stream)
  }

  protected onNewWindowClick(stream: Stream): void {
    console.log('new window', stream);
  }
}
