import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare class Plyr {
  constructor(element: any, option: any);
  public on(event: string, callback?: any): void;
}
declare var flvjs: any;

@Component({
  selector: 'app-test-player-page',
  templateUrl: './test-player-page.component.html',
  styleUrls: ['./test-player-page.component.scss']
})
export class TestPlayerPageComponent implements OnInit {

  @ViewChild('player', { static: true })
  public mPlayerView: ElementRef<HTMLVideoElement>;

  private mPlyr: Plyr;
  private mPlayer: any;

  public constructor() {
  }

  ngOnInit() {
    const element = this.mPlayerView.nativeElement;
    if (flvjs.isSupported()) {
      // tslint:disable-next-line: no-unused-expression
      const plyr = new Plyr(element, {
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

      this.mPlayer = flvjs.createPlayer({
        enableWorker: false,
        lazyLoadMaxDuration: 3 * 60,
        type: 'flv',
        isLive: true,
        url: 'https://parasite.banjai.tv:8080/live/mcc1.flv'
      });

      plyr.on('ready', (event: any) => {
        this.mPlayer.play();
      });

      this.mPlayer.attachMediaElement(this.mPlayerView.nativeElement);

      this.mPlayer.load();
    } else {
      console.log('not support');
    }
  }

}
