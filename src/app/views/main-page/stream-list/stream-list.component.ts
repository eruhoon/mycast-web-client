import Axios from 'axios';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  private mStreams = [1, 2, 3];
  constructor() { }

  public async ngOnInit() {
    let ttt = await Axios.get('https://mycast.xyz:9000/local/');
    console.log(ttt);
  }

  public getStreams(): Stream[] {
    const streams = [];
    streams.push(1);
    streams.push(2);
    return streams;
  }
}
