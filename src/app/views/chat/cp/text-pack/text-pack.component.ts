import { Component, Injector } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'text-pack',
  templateUrl: './text-pack.component.html',
  styleUrls: ['./text-pack.component.scss']
})
export class TextPackComponent extends ChatPack {

  public constructor(injector: Injector) {
    super(injector);
  }
}
