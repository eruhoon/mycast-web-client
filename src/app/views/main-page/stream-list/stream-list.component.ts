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

  private mService: StreamService;

  constructor(service: StreamService) {
    this.mService = service;
  }

  public async ngOnInit() {
  }

  public getStreams(): Stream[] {
    return this.mService.getLocalStreams();
  }

  protected onShareClick(stream: Stream): void {
    console.log('share', stream);
  }

  protected onNewWindowClick(stream: Stream): void {
    console.log('new window', stream);
  }
}
