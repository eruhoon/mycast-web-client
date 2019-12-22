import Axios from 'axios';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, OnInit } from '@angular/core';
import { MutableStream } from 'src/app/models/stream/MutableStream';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  private mStreams: Stream[];

  constructor() {
    this.mStreams = [];
  }

  public async ngOnInit() {
    //let ttt = await Axios.get('https://mycast.xyz:9000/local/');
    this.mStreams = StreamListComponent.createStreams();
  }

  public getStreams(): Stream[] {
    /*const streams = [];
    streams.push(1);
    streams.push(2);*/
    return this.mStreams;
  }

  private static createStreams(): Stream[] {
    const streams: Stream[] = [];
    const stream = new MutableStream();
    stream.setIcon('https://i.imgur.com/KUbNw6O.gif');
    stream.setThumbnail('https://i.imgur.com/5hgzZcl.gif');
    streams.push(stream);
    const stream2 = new MutableStream();
    stream2.setIcon('');
    streams.push(stream2);
    return streams;
  }
}
