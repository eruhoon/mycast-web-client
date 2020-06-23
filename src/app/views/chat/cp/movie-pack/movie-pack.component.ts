import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'movie-pack',
  templateUrl: './movie-pack.component.html',
  styleUrls: ['./movie-pack.component.scss']
})
export class MoviePackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit() { }
}
