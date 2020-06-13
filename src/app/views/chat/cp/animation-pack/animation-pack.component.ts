import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'animation-pack',
  templateUrl: './animation-pack.component.html',
  styleUrls: ['./animation-pack.component.scss']
})
export class AnimationPackComponent extends ChatPack implements OnInit {

  public title: string;
  public thumbnail: string;
  public date: string;

  public constructor(injector: Injector) {
    super(injector);
    this.title = '';
    this.thumbnail = '';
  }

  public ngOnInit() {
    try {
      const raw = JSON.parse(this.message.getMessage()) as Param;
      this.title = raw.title;
      this.thumbnail = raw.thumbnail;
      this.date = raw.date;
    } catch (e) {
      console.error('fuck', e);
    }
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
