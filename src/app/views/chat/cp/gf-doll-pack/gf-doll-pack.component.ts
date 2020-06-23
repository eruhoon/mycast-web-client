import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'gf-doll-pack',
  templateUrl: './gf-doll-pack.component.html',
  styleUrls: ['./gf-doll-pack.component.scss']
})
export class GfDollPackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() { }
}
