import { Component, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'stream-pack',
  templateUrl: './stream-pack.component.html',
  styleUrls: ['./stream-pack.component.scss']
})
export class StreamPackComponent extends ChatPack implements OnInit {

  public constructor() {
    super();
  }

  public ngOnInit() {
  }

}
