import { Component, Injector, OnInit } from '@angular/core';
import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';
import { MainService } from 'src/app/services/main/main.service';
import { ChatPackDirective } from '../ChatPack';
import { GeneralPurposeProperty } from '../general-purpose-pack/GeneralPurposeProperty';

@Component({
  selector: 'carousel-pack',
  templateUrl: './carousel-pack.component.html',
  styleUrls: ['./carousel-pack.component.scss', './carousel-pack.color.scss'],
})
export class CarouselPackComponent extends ChatPackDirective implements OnInit {
  public props: GeneralPurposeProperty[];
  public bindError: boolean = false;

  private mMainSrv: MainService;
  private mLinkPopupSrv: LinkPopupService;

  public constructor(injector: Injector) {
    super(injector);
    this.mMainSrv = injector.get(MainService);
    this.mLinkPopupSrv = injector.get(LinkPopupService);
    this.props = [];
  }

  public ngOnInit(): void {
    try {
      this.props = this.bind();
    } catch {
      this.props = [
        {
          title: '',
          subtitle: '',
          icon: '',
          link: '',
          showType: 'in-app-browser',
          orientation: 'vertical',
        },
      ];
      this.bindError = true;
    }
  }

  protected bind(): GeneralPurposeProperty[] {
    const raws = JSON.parse(this.message.getMessage()) as any[];
    return raws.map((raw) => {
      const legacyShowType = raw.newWindow ? 'new-window' : 'in-app-browser';
      const showType = raw.showType ? raw.showType : legacyShowType;
      return {
        icon: raw.icon,
        link: raw.link,
        title: raw.title,
        subtitle: raw.subtitle,
        showType,
        orientation: raw.orientation || 'vertical',
      };
    });
  }

  public getErrorMessage(): string {
    return 'error';
  }

  public onClick(prop: GeneralPurposeProperty): void {
    switch (prop.showType) {
      case 'new-window':
        window.open(prop.link, '_blank');
        break;
      case 'content-viewer':
        this.mMainSrv.setCurrentLink(prop.link);
        break;
      case 'in-app-browser':
      default:
        if (this.isMobile()) {
          window.open(prop.link, '_blank');
        } else {
          this.mLinkPopupSrv.addLink(
            new LinkPopupBuilder()
              .title('Item Info')
              .width(800)
              .height(600)
              .link(prop.link)
              .build()
          );
        }
    }
  }
}
