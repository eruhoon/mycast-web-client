
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

declare class Plyr {
  constructor(element: any, option: any);
  public on(event: string, callback?: any): void;
  public increaseVolume(step: number): void;
  public decreaseVolume(step: number): void;
}
declare var flvjs: any;

@Component({
  selector: 'stream-player-page',
  templateUrl: './stream-player-page.component.html',
  styleUrls: ['./stream-player-page.component.scss']
})
export class StreamPlayerPageComponent implements OnInit {

  @ViewChild('player', { static: true })
  public mPlayerView: ElementRef<HTMLVideoElement>;

  private mRoute: ActivatedRoute;
  private mPlayerId: string;
  private mPlyr: Plyr | null;
  private mPlayer: any;

  public constructor(route: ActivatedRoute) {
    this.mRoute = route;
    this.mPlyr = null;
    this.mPlayer = null;
  }

  public ngOnInit() {
    this.mRoute.paramMap.subscribe(params => this.onParamChanged(params));
  }

  private onParamChanged(params: ParamMap): void {
    this.mPlayerId = params.get('playerId') || '';
    this.onPlayerIdChanged();
  }

  private onPlayerIdChanged(): void {
    if (flvjs.isSupported()) {
      this.initPlayer();
    }
  }

  public onWheel(event: WheelEvent): void {
    const isDownward = event.deltaY > 0;
    if (isDownward) {
      this.decreaseVolume();
    } else {
      this.increaseVolume();
    }
  }

  private decreaseVolume(): void {
    if (this.mPlyr) {
      this.mPlyr.decreaseVolume(0.05);
    }
  }

  private increaseVolume(): void {
    if (this.mPlyr) {
      this.mPlyr.increaseVolume(0.05);
    }
  }

  private createPlyr(): Plyr {
    const plyr = new Plyr(this.mPlayerView.nativeElement, {
      speed: {
        selected: 1,
        options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
      },
      clickToPlay: false,
      controls: [
        'play-large', 'play', 'mute',
        'volume', 'pip', 'airplay', 'fullscreen'
      ]
    });
    plyr.on('ready', (event: any) => this.onPlayerReady());
    return plyr;
  }

  private createPlayer(): any {
    const player = flvjs.createPlayer({
      enableWorker: false,
      lazyLoadMaxDuration: 3 * 60,
      type: 'flv',
      isLive: true,
      url: `https://mycast.xyz:8087/live/${this.mPlayerId}.flv`
    });

    player.attachMediaElement(this.mPlayerView.nativeElement);
    return player;
  }

  private initPlayer(): void {
    this.mPlyr = this.createPlyr();
    this.mPlayer = this.createPlayer();
    this.mPlayer.load();
  }

  private onPlayerReady() {
    this.mPlayer.play();
  }
}
