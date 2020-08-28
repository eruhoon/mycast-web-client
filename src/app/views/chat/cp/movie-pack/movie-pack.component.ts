import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';

@Component({
  selector: 'movie-pack',
  templateUrl: './movie-pack.component.html',
  styleUrls: ['./movie-pack.component.scss'],
})
export class MoviePackComponent extends ChatPackDirective implements OnInit {
  public title: string;
  public image: string;
  public director: string;
  public translator: string;
  public publish: string;
  public pubYear: string;

  private mLink: string;
  private mError: boolean;

  public constructor(
    injector: Injector,
    private mLinkPopupSrv: LinkPopupService
  ) {
    super(injector);
    this.title = '';
    this.image = '';
    this.director = '';
    this.translator = '';
    this.publish = '';
    this.pubYear = '';
    this.mLink = '';
    this.mError = false;
  }

  public ngOnInit() {
    try {
      const raw = JSON.parse(this.message.getMessage()) as Param;
      this.bind(raw);
    } catch {
      this.mError = true;
      console.error('fuck');
    }
  }

  public isError(): boolean {
    return this.mError;
  }

  public onClick(): void {
    if (this.isMobile()) {
      window.open(this.mLink, '_blank');
    } else {
      this.mLinkPopupSrv.addLink(
        new LinkPopupBuilder()
          .title('Movie Info')
          .width(1000)
          .height(600)
          .link(this.mLink)
          .build()
      );
    }
  }

  private bind(raw: Param): void {
    this.title = raw.title;
    this.image = raw.image;
    this.director = raw.director[0] || '';
    this.pubYear = raw.pubDate;
    this.mLink = raw.link;
  }
}

type Param = {
  title: string;
  icon: string;
  image: string;
  director: string[];
  pubDate: string;
  link: string;
};
