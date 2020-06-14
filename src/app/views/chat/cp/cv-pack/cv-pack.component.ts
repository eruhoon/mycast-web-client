import { Component, OnInit, Injector } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'cv-pack',
  templateUrl: './cv-pack.component.html',
  styleUrls: ['./cv-pack.component.scss']
})
export class CvPackComponent extends ChatPack implements OnInit {

  public name: string;
  public link: string;
  public characters: CharacterParam[];

  public constructor(injector: Injector) {
    super(injector);
    this.name = '';
    this.link = '';
    this.characters = [];
  }

  public ngOnInit() {
    try {
      const raw = JSON.parse(this.message.getMessage()) as Param;
      this.bind(raw);
    } catch (e) {
      console.error(e);
    }
  }

  public onClick(): void {
    window.open(this.link, '_blank', 'width=800');
  }

  private bind(raw: Param): void {
    this.name = raw.name;
    this.link = raw.link;
    this.characters = raw.characters;
  }
}

type Param = {
  name: string,
  link: string,
  characters: CharacterParam[],
};

type CharacterParam = {
  description: string,
  icon: string,
};
