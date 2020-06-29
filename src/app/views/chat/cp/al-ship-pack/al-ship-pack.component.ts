import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'al-ship-pack',
  templateUrl: './al-ship-pack.component.html',
  styleUrls: ['./al-ship-pack.component.scss']
})
export class AlShipPackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
    console.log(this.message);
  }

  public onClick(): void {
    console.log(this.message);
  }
}
