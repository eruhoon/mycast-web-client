import Axios from 'axios';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, OnInit } from '@angular/core';
import { MutableStream } from 'src/app/models/stream/MutableStream';
import { StreamListLoader } from 'src/app/models/stream/StreamListLoader';
import { MockStreamListLoader } from 'src/app/models/stream/MockStreamListLoader';

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
