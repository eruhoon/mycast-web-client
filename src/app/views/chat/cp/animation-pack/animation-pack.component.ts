import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'animation-pack',
  templateUrl: './animation-pack.component.html',
  styleUrls: ['./animation-pack.component.scss']
})
export class AnimationPackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
  }

}
