import { LinkContentViewService } from 'src/app/services/link/link-content-view.service';

import { Component, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'link-pack',
  templateUrl: './link-pack.component.html',
  styleUrls: ['./link-pack.component.scss']
})
export class LinkPackComponent extends ChatPack implements OnInit {

  private mLinkViewService: LinkContentViewService;
  private mLink: string;
  private mTitle: string;
  private mThumbnail: string;

  public constructor(linkViewService: LinkContentViewService) {
    super();
    this.mLinkViewService = linkViewService;
  }

  public ngOnInit() {
    try {
      const param: Param = JSON.parse(this.message.getMessage());
      this.mTitle = param.info.title;
      this.mLink = param.uri;
      this.mThumbnail = param.info.thumbnail;
    } catch {
      this.mTitle = 'Link';
      this.mLink = 'link';
      this.mThumbnail = '';
    }
  }

  public onClick(): boolean {
    window.open(this.mLink, '_blank');
    return false;
  }

  public onContextMenu(): boolean {
    this.mLinkViewService.setLink(this.mLink);
    return false;
  }

  public getThumbnail(): string {
    return this.mThumbnail;
  }

  public getTitle(): string {
    return this.mTitle;
  }

  public getLink(): string {
    return this.mLink;
  }
}

type Param = {
  hash: string,
  uri: string,
  info: {
    host: string,
    thumbnail: string,
    title: string,
  }
};
