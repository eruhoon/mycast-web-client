import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'memo-pack',
  templateUrl: './memo-pack.component.html',
  styleUrls: ['./memo-pack.component.scss']
})
export class MemoPackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() { }
}
