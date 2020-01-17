import { Component, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'link-pack',
  templateUrl: './link-pack.component.html',
  styleUrls: ['./link-pack.component.scss']
})
export class LinkPackComponent extends ChatPack implements OnInit {

  private mLink: string;
  private mTitle: string;
  private mThumbnail: string;
  public constructor() {
    super();
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
