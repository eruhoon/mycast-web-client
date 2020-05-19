import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'magic-conch-pack',
  templateUrl: './magic-conch-pack.component.html',
  styleUrls: ['./magic-conch-pack.component.scss']
})
export class MagicConchPackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
  }

}
