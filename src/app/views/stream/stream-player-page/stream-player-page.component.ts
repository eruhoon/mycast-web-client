
import { Stream } from 'src/app/models/stream/Stream';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var Clappr: any;
declare var RTMP: any;

@Component({
  selector: 'stream-player-page',
  templateUrl: './stream-player-page.component.html',
  styleUrls: ['./stream-player-page.component.scss']
})
export class StreamPlayerPageComponent implements OnInit {

  private mRoute: ActivatedRoute;
  @Input() stream: Stream;

  public mPlayerId: string;

  private mPlayer: any | null;

  constructor(route: ActivatedRoute) {
    this.mRoute = route;
    this.mPlayer = null;
  }

  public ngOnInit() {
    this.mRoute.paramMap.subscribe(params => {
      this.mPlayerId = params.get('playerId') || '';
      this.getPlayer().load(`rtmp://mycast.xyz/live/${this.mPlayerId}`, 'mpeg/flv', true);
    });
  }

  private getPlayer(): any {
    if (this.mPlayer === null) {
      this.mPlayer = this.loadPlayer();
    }
    return this.mPlayer;
  }

  private loadPlayer(): any {
    return new Clappr.Player({
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

}
