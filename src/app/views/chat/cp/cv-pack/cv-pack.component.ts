import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'cv-pack',
  templateUrl: './cv-pack.component.html',
  styleUrls: ['./cv-pack.component.scss']
})
export class CvPackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() {
  }

}
