import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

declare class Plyr {
  constructor(element: any, option: any);
  public on(event: string, callback?: any): void;
}
declare var flvjs: any;

@Component({
  selector: 'totoro-player-page',
  templateUrl: './totoro-player-page.component.html',
  styleUrls: ['./totoro-player-page.component.scss']
})
export class TotoroPlayerPageComponent implements OnInit {

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
      url: `http://parasite.banjai.tv:8080/live/${this.mPlayerId}.flv`
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
