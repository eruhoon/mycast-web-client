import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'twitch-clip-pack',
  templateUrl: './twitch-clip-pack.component.html',
  styleUrls: ['./twitch-clip-pack.component.scss']
})
export class TwitchClipPackComponent extends ChatPack implements OnInit {

  public constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
