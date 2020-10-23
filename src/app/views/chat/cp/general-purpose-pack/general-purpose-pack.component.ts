import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Injector, OnInit, Directive } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';
import { GeneralPurposeProperty } from './GeneralPurposeProperty';

@Directive()
export abstract class GeneralPurposePackDirective
  extends ChatPackDirective
  implements OnInit {
  public prop: GeneralPurposeProperty;
  public bindError: boolean;

  private mLinkPopupSrv: LinkPopupService;

  public constructor(injector: Injector) {
    super(injector);
    this.mLinkPopupSrv = injector.get(LinkPopupService);
    this.bindError = false;
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
        newWindow: false,
      };
      this.bindError = true;
    }
  }

  protected abstract bind(): GeneralPurposeProperty;

  public getErrorMessage(): string {
    return 'error';
  }

  public onClick(): void {
    if (this.isMobile()) {
      window.open(this.prop.link, '_blank');
      return;
    }

    if (this.prop.newWindow) {
      window.open(this.prop.link, '_blank');
      return;
    }

    this.mLinkPopupSrv.addLink(
      new LinkPopupBuilder()
        .title('Item Info')
        .width(800)
        .height(600)
        .link(this.prop.link)
        .build()
    );
  }
}
