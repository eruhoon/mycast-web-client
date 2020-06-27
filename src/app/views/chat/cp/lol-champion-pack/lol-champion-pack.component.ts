import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'lol-champion-pack',
  templateUrl: './lol-champion-pack.component.html',
  styleUrls: ['./lol-champion-pack.component.scss']
})
export class LolChampionPackComponent extends ChatPack implements OnInit {

  public name: string;
  public icon: string;
  public description: string;

  private mSkins: SkinParam[];
  private mLink: string;

  public constructor(
    injector: Injector,
    private mLinkPopupSrv: LinkPopupService) {

    super(injector);
    this.name = '';
    this.icon = '';
    this.description = '';
    this.mSkins = [];
    this.mLink = '';
  }

  public ngOnInit() {
    console.log(this.message);
    console.log(this.message.getMessage());
    const raw = JSON.parse(this.message.getMessage()) as Param;
    console.log(raw);
    this.bind(raw);
  }

  public getBackground(): string {
    return this.mSkins[0].splash;
  }

  public onClick(): void {
    if (this.isMobile()) {
      window.open(this.mLink, '_blank');
    } else {
      this.mLinkPopupSrv.addLink(new LinkPopupBuilder()
        .title('LOL Champion Info')
        .width(800).height(600)
        .link(this.mLink)
        .build());
    }
  }

  private bind(raw: Param): void {
    this.name = raw.name;
    this.description = raw.description;
    this.icon = raw.icon;
    this.mSkins = raw.skin;
    this.mLink = raw.link;
  }
}

type Param = {
  description: string,
  icon: string,
  key: string,
  link: string,
  lore: string,
  name: string,
  skin: SkinParam[],
};

type SkinParam = { name: string, splash: string };
