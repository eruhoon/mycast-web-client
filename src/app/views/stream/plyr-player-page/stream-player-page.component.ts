import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlyrPlayerPageDirective } from '../plyr-player-page/plyr-player-page.component';

@Component({
  selector: 'stream-player-page',
  templateUrl: './plyr-player-page.component.html',
  styleUrls: ['./plyr-player-page.component.scss'],
})
export class StreamPlayerPageComponent
  extends PlyrPlayerPageDirective
  implements OnInit {
  public constructor(route: ActivatedRoute) {
    super(route);
  }

  public getUrl(): string {
    return `https://mycast.xyz:8087/live/${this.getPlayerId()}.flv`;
  }
}
