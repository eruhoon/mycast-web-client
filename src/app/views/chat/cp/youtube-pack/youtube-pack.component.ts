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

  public constructor() {
    super();
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

  public getLink(): string {
    return this.mLink;
  }

  public onClick(): void {

  }
}

type Param = {
  title: string,
  time: number | null,
  description: string,
  thumbnail: string,
  link: string,
};
