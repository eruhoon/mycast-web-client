import { LocalStreamListLoader } from 'src/app/models/stream/LocalStreamListLoader';
import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';
import { StreamListLoader } from 'src/app/models/stream/StreamListLoader';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  @Output()
  public streamIconClick = new EventEmitter<Stream>();

  private mStreamListLoader: StreamListLoader;
  private mStreams: Stream[];

  constructor() {
    this.mStreamListLoader = new LocalStreamListLoader();
    this.mStreams = [];
  }

  public async ngOnInit() {
    this.mStreamListLoader.load(streams => {
      this.mStreams = streams;
    });
  }

  public getStreams(): Stream[] {
    return this.mStreams;
  }

  protected onIconClick(stream: Stream): void {
    this.streamIconClick.emit(stream);
  }

  protected onShareClick(stream: Stream): void {
    console.log('share', stream);
  }

  protected onNewWindowClick(stream: Stream): void {
    console.log('new window', stream);
  }
}
