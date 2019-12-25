import { MockStreamListLoader } from 'src/app/models/stream/MockStreamListLoader';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  private mTwitchStreams: Stream[];

  constructor() { }

  public ngOnInit() {
    new MockStreamListLoader().load(streams => {
      this.mTwitchStreams = streams;
    });
  }

  public getTwitchList(): Stream[] {
    return this.mTwitchStreams;
  }

}
