import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'youtube-pack',
  templateUrl: './youtube-pack.component.html',
  styleUrls: ['./youtube-pack.component.scss']
})
export class YoutubePackComponent extends ChatPack implements OnInit {

  private mTitle: string;
  private mDescription: string;
  private mThumbnail: string;
  private mLink: string;

  private mLinkPopup: LinkPopupService;
  private mMainService: MainService;

  public constructor(
    injector: Injector,
    private mOptionSrv: OptionService,
    linkPopup: LinkPopupService,
    mainService: MainService) {

    super(injector);
    this.mLinkPopup = linkPopup;
    this.mMainService = mainService;
  }

  public ngOnInit() {
    try {
      const param: Param = JSON.parse(this.message.getMessage());
      this.mTitle = param.title;
      this.mDescription = param.description;
      this.mThumbnail = param.thumbnail;
      this.mLink = param.link;
    } catch {
      this.mDescription = '';
    }
  }

  public getTitle(): string {
    return this.mTitle;
  }

  public getDescription(): string {
    return this.mDescription;
  }

  public getThumbnail(): string {
    return this.mThumbnail;
  }

  public onClick(): void {
    if (this.mOptionSrv.isMobile()) {
      this.mMainService.setCurrentLink(this.mLink);
    } else {
      this.mLinkPopup.addLink(new LinkPopupBuilder()
        .title('YouTube Viewer')
        .width(480)
        .height(360)
        .link(this.mLink)
        .build());
    }
  }

  public onContextMenu(): boolean {
    this.mMainService.setCurrentLink(this.mLink);
    return false;
  }
}

type Param = {
  title: string,
  time: number | null,
  description: string,
  thumbnail: string,
  link: string,
};
