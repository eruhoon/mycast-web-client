import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'book-pack',
  templateUrl: './book-pack.component.html',
  styleUrls: ['./book-pack.component.scss']
})
export class BookPackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
  }

}
