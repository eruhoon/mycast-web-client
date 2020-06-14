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
    try {
      console.log(this.message);
      console.log(this.message.getMessage());
      console.log(this.message.getRequest());
      const raw = JSON.parse(this.message.getMessage());
      console.log(raw);
    } catch (e) {
      console.error('parse error');
    }
  }

}
