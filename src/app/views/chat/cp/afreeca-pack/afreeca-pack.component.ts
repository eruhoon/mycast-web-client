import { MainService } from 'src/app/services/main/main.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'afreeca-pack',
  templateUrl: './afreeca-pack.component.html',
  styleUrls: ['./afreeca-pack.component.scss']
})
export class AfreecaPackComponent extends ChatPack implements OnInit {

  private mKeyId: string;
  private mTitle: string;
  private mIcon: string;
  private mLink: string;

  public constructor(
    private mMainService: MainService,
    injector: Injector) {

    super(injector);
    this.mKeyId = '';
    this.mTitle = '';
    this.mIcon = '';
    this.mLink = '';
  }

  public ngOnInit() {
    try {
      const param: Param = JSON.parse(this.message.getMessage());
      const keyId = param.keyid;
      this.mKeyId = keyId;
      this.mTitle = param.title;
      this.mIcon = AfreecaPackComponent.getIcon(keyId);
      this.mLink = `http://play.afreecatv.com/${keyId}/embed`;
    } catch {
      console.log('fuck');
    }
  }

  public getId(): string { return this.mKeyId; }

  public getName(): string { return this.mTitle; }

  public getIcon(): string { return this.mIcon; }

  public onClick(): void {
    window.open(this.mLink, '_blank', 'width=800');
  }

  public onContextMenu(): void {
    window.open(this.mLink, '_blank', 'width=800');
  }

  private static getIcon(keyId: string): string {
    const keyDict = keyId.substring(0, 2);
    return `https://stimg.afreecatv.com/LOGO/${keyDict}/${keyId}/${keyId}.jpg`;
  }
}

type Param = {
  description: string,
  icon: string,
  keyid: string,
  nickname: string,
  platform: string,
  result: boolean,
  title: string,
};
