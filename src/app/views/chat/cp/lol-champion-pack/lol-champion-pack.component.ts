import { Component, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'lol-champion-pack',
  templateUrl: './lol-champion-pack.component.html',
  styleUrls: ['./lol-champion-pack.component.scss']
})
export class LolChampionPackComponent extends ChatPack implements OnInit {

  public constructor() {
    super();
  }

  public ngOnInit() {
  }

}
