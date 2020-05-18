import { Component, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'cq-hero-pack',
  templateUrl: './cq-hero-pack.component.html',
  styleUrls: ['./cq-hero-pack.component.scss']
})
export class CqHeroPackComponent extends ChatPack implements OnInit {

  public constructor() {
    super();
  }

  public ngOnInit() {
  }

}
