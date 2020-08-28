import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';

@Component({
  selector: 'book-pack',
  templateUrl: './book-pack.component.html',
  styleUrls: ['./book-pack.component.scss'],
})
export class BookPackComponent extends ChatPackDirective implements OnInit {
  public title: string;
  public image: string;
  public author: string;
  public translator: string;
  public publish: string;
  public date: string;

  private mLink: string;
  private mResult: boolean;

  public constructor(
    injector: Injector,
    private mLinkPopupSrv: LinkPopupService
  ) {
    super(injector);
    this.title = '';
    this.image = '';
    this.author = '';
    this.translator = '';
    this.publish = '';
    this.date = '';
    this.mLink = '';
    this.mResult = true;
  }

  public ngOnInit(): void {
    try {
      const raw = JSON.parse(this.message.getMessage()) as Param;
      this.bind(raw);
      console.log(raw);
    } catch {
      console.error('fuck');
    }
  }

  public isError(): boolean {
    return !this.mResult;
  }

  public onClick(): void {
    if (this.isMobile()) {
      window.open(this.mLink, '_blank');
    } else {
      this.mLinkPopupSrv.addLink(
        new LinkPopupBuilder()
          .title('Book Info')
          .width(800)
          .height(600)
          .link(this.mLink)
          .build()
      );
    }
  }

  private bind(raw: Param): void {
    this.title = raw.title;
    this.image = raw.thumbnail;
    this.author = raw.author;
    this.translator = raw.translator || '';
    this.publish = raw.publish;
    this.date = raw.date;
    this.mLink = raw.link;
    this.mResult = raw.result;
  }
}

type Param = {
  result: boolean;
  author: string;
  category: string;
  date: string;
  link: string;
  publish: string;
  thumbnail: string;
  title: string;
  translator: string;
};
