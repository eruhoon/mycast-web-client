import { Component, OnInit, Injector } from '@angular/core';
import { ChatPackDirective } from '../ChatPack';

@Component({
  selector: 'memo-pack',
  templateUrl: './memo-pack.component.html',
  styleUrls: ['./memo-pack.component.scss'],
})
export class MemoPackComponent extends ChatPackDirective implements OnInit {
  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() {}
}
