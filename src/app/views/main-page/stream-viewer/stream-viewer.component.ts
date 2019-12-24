import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Stream } from 'src/app/models/stream/Stream';

declare var hdwplayer: any;

@Component({
  selector: 'app-stream-viewer',
  templateUrl: './stream-viewer.component.html',
  styleUrls: ['./stream-viewer.component.scss']
})
export class StreamViewerComponent implements OnInit, OnChanges {

  @Input() stream: Stream;

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    //throw new Error("Method not implemented.");

    const keyId = this.stream.getKeyId();
    console.log(keyId);
    // if (player !== null) {
    //   console.log(player);
    //   player.stopVideo();
    //   player = null;
    // }
    hdwplayer({
      id: 'player',
      swf: './assets/hdwplayer/player/player.swf?api=true',
      width: '640',
      height: '360',
      type: 'rtmp',
      video: keyId,
      streamer: 'rtmp://mycast.xyz/live/',
      autoStart: 'true',
    });
    console.log(player);
  }

}
