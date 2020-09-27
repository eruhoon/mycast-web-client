import { Component, Injector, OnInit } from '@angular/core';
import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';
import { ChatPackDirective } from '../ChatPack';

@Component({
  selector: 'twitch-video-pack',
  templateUrl: './twitch-video-pack.component.html',
  styleUrls: ['./twitch-video-pack.component.scss'],
})
export class TwitchVideoPackComponent
  extends ChatPackDirective
  implements OnInit {
  public icon: string;
  public user: string;
  public title: string;
  public thumbnail: string;
  private mLink: string;

  public constructor(
    injector: Injector,
    private mMainSrv: MainService,
    private mOptionSrv: OptionService,
    private mLinkPopupSrv: LinkPopupService
  ) {
    super(injector);
  }

  public ngOnInit(): void {
    const raw = JSON.parse(this.message.getMessage()) as Param;
    this.user = raw.user;
    this.title = raw.title;
    this.thumbnail = TwitchVideoPackComponent.createThumbnail(
      raw.thumbnail,
      360,
      240
    );
    this.mLink = TwitchVideoPackComponent.createLink(raw.id);
  }

  public onClick(): void {
    if (this.mOptionSrv.isMobile()) {
      this.mMainSrv.setCurrentLink(this.mLink);
    } else {
      this.mLinkPopupSrv.addLink(
        new LinkPopupBuilder()
          .title('Twitch Video Viewer')
          .width(480)
          .height(360)
          .link(this.mLink)
          .build()
      );
    }
  }

  public onContextMenu(): void {
    this.mMainSrv.setCurrentLink(this.mLink);
  }

  private static createLink(id: string): string {
    const host = 'https://player.twitch.tv/';
    const query = `parent=${location.hostname}&video=${id}`;
    return `${host}?${query}`;
  }

  private static createThumbnail(
    link: string,
    width: number,
    height: number
  ): string {
    return link
      .replace('%{width}', width.toString())
      .replace('%{height}', height.toString());
  }
}

type Param = {
  id: string;
  user: string;
  thumbnail: string;
  title: string;
};
