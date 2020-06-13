import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';
import { LinkPopup } from 'src/app/models/link/LinkPopup';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

@Component({
  selector: 'animation-pack',
  templateUrl: './animation-pack.component.html',
  styleUrls: ['./animation-pack.component.scss']
})
export class AnimationPackComponent extends ChatPack implements OnInit {

  public title: string;
  public thumbnail: string;
  public date: string;
  public error: boolean;
  private mLink: string;

  public constructor(
    injector: Injector,
    private mLinkPopup: LinkPopupService) {
    super(injector);
    this.title = '';
    this.thumbnail = '';
    this.error = false;
    this.mLink = '';
  }

  public ngOnInit() {
    try {
      const raw = JSON.parse(this.message.getMessage()) as Param;
      if (!raw) {
        this.error = true;
        return;
      }
      this.title = raw.title;
      this.thumbnail = raw.thumbnail;
      this.date = raw.date;
      this.mLink = raw.link;
    } catch (e) {
      this.error = true;
      console.error('fuck', e);
    }
  }

  public onClick(): void {
    window.open(this.mLink, '_blank', 'width=800');
  }
}

type Param = {
  date: string,
  genre: string,
  link: string,
  media: string,
  thumbnail: string,
  title: string,
};
