import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PlyrPlayerPageComponent } from '../plyr-player-page/plyr-player-page.component';

@Component({
  selector: 'stream-player-page',
  templateUrl: './plyr-player-page.component.html',
  styleUrls: ['./plyr-player-page.component.scss']
})
export class StreamPlayerPageComponent
  extends PlyrPlayerPageComponent implements OnInit {

  public constructor(route: ActivatedRoute) {
    super(route);
  }

  public getUrl(): string {
    return `https://mycast.xyz:8087/live/${this.getPlayerId()}.flv`;
  }
}
