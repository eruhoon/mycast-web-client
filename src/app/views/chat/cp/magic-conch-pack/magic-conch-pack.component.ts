import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'magic-conch-pack',
  templateUrl: './magic-conch-pack.component.html',
  styleUrls: ['./magic-conch-pack.component.scss', './magic-conch-pack.color.scss']
})
export class MagicConchPackComponent extends ChatPack implements OnInit {

  public question: string;
  public answer: string;

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
    try {
      this.question = this.message.getRequest();
      this.answer = this.message.getMessage();
    } catch (e) {
      console.error('parse error');
    }
  }
}
