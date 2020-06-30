import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';
import { GeneralPurposeProperty } from './GeneralPurposeProperty';

@Component({
  selector: 'app-general-purpose-pack',
  templateUrl: './general-purpose-pack.component.html',
  styleUrls: ['./general-purpose-pack.component.scss']
})
export abstract class GeneralPurposePackComponent extends ChatPack implements OnInit {

  public prop: GeneralPurposeProperty;

  private mLinkPopupSrv: LinkPopupService;

  public constructor(injector: Injector) {
    super(injector);
    this.mLinkPopupSrv = injector.get(LinkPopupService);
  }

  public ngOnInit() {
    try {
      this.prop = this.bind();
    } catch {
      this.prop = {
        title: '',
        subtitle: '',
        icon: '',
        link: '',
      };
    }
  }

  protected abstract bind(): GeneralPurposeProperty;

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
  }
}
