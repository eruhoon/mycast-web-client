import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Injector, OnInit, Directive } from '@angular/core';

import { ChatPack } from '../ChatPack';
import { GeneralPurposeProperty } from './GeneralPurposeProperty';

@Directive()
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
