import { Component, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'lol-user-pack',
  templateUrl: './lol-user-pack.component.html',
  styleUrls: ['./lol-user-pack.component.scss']
})
export class LolUserPackComponent extends ChatPack implements OnInit {

  public constructor() {
    super();
  }

  public ngOnInit() {
  }

}
