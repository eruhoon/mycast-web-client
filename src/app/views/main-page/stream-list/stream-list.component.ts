import { LocalStreamListLoader } from 'src/app/models/stream/LocalStreamListLoader';
import { Stream } from 'src/app/models/stream/Stream';
import { StreamListLoader } from 'src/app/models/stream/StreamListLoader';
import { StreamService } from 'src/app/services/stream/stream.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  private mStreamListLoader: StreamListLoader;
  private mStreams: Stream[];

  constructor(service: StreamService) {
    this.mStreamListLoader = new LocalStreamListLoader();
    this.mStreams = [];
  }

  public async ngOnInit() {
    this.mStreamListLoader.load(streams => {
      if (!streams) {
        console.log('Invalid streams');
        return;
      }
      this.mStreams = streams;
    });
  }

  public getStreams(): Stream[] {
    return this.mStreams;
  }

  protected onShareClick(stream: Stream): void {
    console.log('share', stream);
  }

  protected onNewWindowClick(stream: Stream): void {
    console.log('new window', stream);
  }
}
