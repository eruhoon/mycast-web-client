import { Component, Injector, OnInit } from '@angular/core';
import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';
import { ChatPackDirective } from '../ChatPack';
import { GeneralPurposeProperty } from '../general-purpose-pack/GeneralPurposeProperty';

@Component({
  selector: 'carousel-pack',
  templateUrl: './carousel-pack.component.html',
  styleUrls: ['./carousel-pack.component.scss'],
})
export class CarouselPackComponent extends ChatPackDirective implements OnInit {
  public props: GeneralPurposeProperty[];
  public bindError: boolean = false;

  private mLinkPopupSrv: LinkPopupService;

  public constructor(injector: Injector) {
    super(injector);
    this.mLinkPopupSrv = injector.get(LinkPopupService);
    this.props = [];
  }

  public ngOnInit(): void {
    try {
      this.props = this.bind();
    } catch (e) {
      console.log(e);
      this.props = [
        {
          title: '',
          subtitle: '',
          icon: '',
          link: '',
          newWindow: false,
        },
      ];
      this.bindError = true;
    }
  }

  protected bind(): GeneralPurposeProperty[] {
    const raws = JSON.parse(this.message.getMessage()) as any[];
    return raws.map((raw) => {
      return {
        icon: raw.icon,
        link: raw.link,
        title: raw.title,
        subtitle: raw.subtitle,
        newWindow: raw.newWindow,
      };
    });
  }

  public getErrorMessage(): string {
    return 'error';
  }

  public onClick(prop: GeneralPurposeProperty): void {
    if (this.isMobile()) {
      window.open(prop.link, '_blank');
      return;
    }

    if (prop.newWindow) {
      window.open(prop.link, '_blank');
      return;
    }

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
