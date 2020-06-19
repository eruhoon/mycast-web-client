import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'twitch-clip-pack',
  templateUrl: './twitch-clip-pack.component.html',
  styleUrls: ['./twitch-clip-pack.component.scss']
})
export class TwitchClipPackComponent extends ChatPack implements OnInit {

  public icon: string;
  public type: string;
  public title: string;
  public thumbnail: string;
  private mLink: string;

  public constructor(
    injector: Injector,
    private mMainSrv: MainService,
    private mOptionSrv: OptionService,
    private mLinkPopupSrv: LinkPopupService) {
    super(injector);
  }

  public ngOnInit(): void {
    const raw = JSON.parse(this.message.getMessage()) as Param;
    this.icon = raw.icon;
    this.type = raw.game;
    this.title = raw.title;
    this.thumbnail = raw.thumbnail;
    this.mLink = TwitchClipPackComponent.createLink(raw.link);
  }

  public onClick(): void {
    if (this.mOptionSrv.isMobile()) {
      this.mMainSrv.setCurrentLink(this.mLink);
    } else {
      this.mLinkPopupSrv.addLink(new LinkPopupBuilder()
        .title('Twitch Clip Viewer')
        .width(480)
        .height(360)
        .link(this.mLink)
        .build());
    }
  }

  public onContextMenu(): void {
    this.mMainSrv.setCurrentLink(this.mLink);
  }

  private static createLink(link: string): string {
    return `${link}&parent=${location.hostname}`;
  }
}

type Param = {
  game: string,
  icon: string,
  link: string,
  thumbnail: string,
  title: string,
};
