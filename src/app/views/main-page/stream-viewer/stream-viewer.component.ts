import { Stream } from 'src/app/models/stream/Stream';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

declare var Clappr: any;
declare var RTMP: any;

@Component({
  selector: 'app-stream-viewer',
  templateUrl: './stream-viewer.component.html',
  styleUrls: ['./stream-viewer.component.scss']
})
export class StreamViewerComponent implements OnInit, OnChanges {

  @Input() stream: Stream;

  private mPlayer: any;

  public constructor() {
    this.mPlayer = null;
  }

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {

    const keyId = this.stream.getKeyId();
    console.log(keyId);

    this.getPlayer().load(`rtmp://mycast.xyz/live/${keyId}`, 'mpeg/flv', true);

  }

  private getPlayer() {
    if (this.mPlayer === null) {
      this.mPlayer = new Clappr.Player({
        parentId: '#player',
        width: '100%',
        height: '100%',
        plugins: { playback: [RTMP] },
        rtmpConfig: {
          swfPath: './assets/clappr/player/RTMP.swf',
          scaling: 'stretch',
          playbackType: 'live',
          bufferTime: 1,
          startLevel: 0,
          switchRules: {
            SufficientBandwidthRule: {
              bandwidthSafetyMultiple: 1.15,
              minDroppedFps: 2
            },
            InsufficientBufferRule: {
              minBufferLength: 2
            },
            DroppedFramesRule: {
              downSwitchByOne: 10,
              downSwitchByTwo: 20,
              downSwitchToZero: 24
            },
            InsufficientBandwidthRule: {
              bitrateMultiplier: 1.15
            }
          }
        },
      });
    }
    return this.mPlayer;
  }

}
