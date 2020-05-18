import { Component, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'afreeca-pack',
  templateUrl: './afreeca-pack.component.html',
  styleUrls: ['./afreeca-pack.component.scss']
})
export class AfreecaPackComponent extends ChatPack implements OnInit {

  public constructor() {
    super();
  }

  public ngOnInit() {
  }

}
