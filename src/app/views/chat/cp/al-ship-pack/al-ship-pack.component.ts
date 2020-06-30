import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'al-ship-pack',
  templateUrl: './al-ship-pack.component.html',
  styleUrls: ['./al-ship-pack.component.scss']
})
export class AlShipPackComponent extends ChatPack implements OnInit {

  public prop: Param;

  public constructor(
    injector: Injector,
    private mLinkPopupSrv: LinkPopupService) {
    super(injector);
  }

  public ngOnInit() {
    const raw = JSON.parse(this.message.getMessage());
    this.prop = {
      icon: raw.icon,
      link: raw.link,
      title: raw.name,
      subtitle: `${raw.rarity} ${raw.type.name}`,
    };
  }

  public onClick(): void {
    if (this.isMobile()) {
      window.open(this.prop.link, '_blank');
    } else {
      this.mLinkPopupSrv.addLink(new LinkPopupBuilder()
        .title('Item Info')
        .width(800).height(600)
        .link(this.prop.link)
        .build());
    }
    console.log(this.message);
  }
}

type Param = {
  title: string,
  subtitle: string,
  icon: string,
  link: string,
};
