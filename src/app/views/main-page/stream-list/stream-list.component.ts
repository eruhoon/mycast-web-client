import { Component, OnInit } from '@angular/core';
import { MockStreamListLoader } from 'src/app/models/stream/MockStreamListLoader';
import { Stream } from 'src/app/models/stream/Stream';
import { StreamListLoader } from 'src/app/models/stream/StreamListLoader';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  private mStreamListLoader: StreamListLoader;
  private mStreams: Stream[];

  constructor() {
    this.mStreamListLoader = new MockStreamListLoader();
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
}
