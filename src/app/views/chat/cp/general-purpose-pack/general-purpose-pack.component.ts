import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Injector, OnInit, Directive, inject } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';
import { GeneralPurposeProperty } from './GeneralPurposeProperty';
import { MainService } from 'src/app/services/main/main.service';

@Directive()
export abstract class GeneralPurposePackDirective
  extends ChatPackDirective
  implements OnInit {
  public prop: GeneralPurposeProperty;
  public bindError: boolean;

  private mMainSrv: MainService;
  private mLinkPopupSrv: LinkPopupService;

  public constructor(injector: Injector) {
    super(injector);
    this.mMainSrv = injector.get(MainService);
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
        showType: 'in-app-browser',
        orientation: 'horizontal',
      };
      this.bindError = true;
    }
  }

  protected abstract bind(): GeneralPurposeProperty;

  public getErrorMessage(): string {
    return 'error';
  }

  public onClick(): void {
    switch (this.prop.showType) {
      case 'new-window':
        window.open(this.prop.link, '_blank');
        break;
      case 'content-viewer':
        this.mMainSrv.setCurrentLink(this.prop.link);
        break;
      case 'in-app-browser':
      default:
        if (this.isMobile()) {
          window.open(this.prop.link, '_blank');
        } else {
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
  }
}
