import { LinkPopup } from 'src/app/models/link/LinkPopup';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Component, OnInit } from '@angular/core';

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

  public constructor(linkPopup: LinkPopupService) {
    super();
    this.mLinkPopup = linkPopup;
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
    this.mLinkPopup.addLink(new YoutubeLinkPopup(this.mLink));
  }

  public onContextMenu(): boolean {
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

class YoutubeLinkPopup implements LinkPopup {
  private mLink: string;
  public constructor(link: string) {
    this.mLink = link;
  }
  public getWidth(): number {
    return 480;
  }
  public getHeight(): number {
    return 360;
  }
  public getLink(): string {
    return this.mLink;
  }
}
