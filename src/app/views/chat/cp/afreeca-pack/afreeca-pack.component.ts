import { MainService } from 'src/app/services/main/main.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';
import { LinkUtils } from 'src/app/models/stream/link/LinkUtils';

@Component({
  selector: 'afreeca-pack',
  templateUrl: './afreeca-pack.component.html',
  styleUrls: ['./afreeca-pack.component.scss'],
})
export class AfreecaPackComponent extends ChatPackDirective implements OnInit {
  keyId: string;
  title: string;
  icon: string;
  link: string;
  error: boolean;

  public constructor(private mMainService: MainService, injector: Injector) {
    super(injector);
    this.title = '';
    this.icon = '';
    this.link = '';
    this.error = false;
  }

  public ngOnInit() {
    try {
      const param: Param = JSON.parse(this.message.getMessage());
      const keyId = param.keyid;
      this.keyId = keyId;
      this.title = param.title;
      this.icon = AfreecaPackComponent.getIcon(keyId);
      this.link = `https://play.afreecatv.com/${keyId}/embed`;
      this.error = false;
    } catch {
      console.log('fuck');
      this.error = true;
    }
  }

  public onClick(): void {
    const link = LinkUtils.addTimestamp(this.link);
    this.mMainService.setCurrentLink(link);
  }

  public onContextMenu(): void {
    window.open(this.link, '_blank', 'width=800');
  }

  public isError(): boolean {
    return this.error;
  }

  private static getIcon(keyId: string): string {
    const keyDict = keyId.substring(0, 2);
    return `https://stimg.afreecatv.com/LOGO/${keyDict}/${keyId}/${keyId}.jpg`;
  }
}

type Param = {
  description: string;
  icon: string;
  keyid: string;
  nickname: string;
  platform: string;
  result: boolean;
  title: string;
};
