import { MainService } from 'src/app/services/main/main.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';

@Component({
  selector: 'afreeca-pack',
  templateUrl: './afreeca-pack.component.html',
  styleUrls: ['./afreeca-pack.component.scss'],
})
export class AfreecaPackComponent extends ChatPackDirective implements OnInit {
  private mKeyId: string;
  private mTitle: string;
  private mIcon: string;
  private mLink: string;
  private mError: boolean;

  public constructor(private mMainService: MainService, injector: Injector) {
    super(injector);
    this.mKeyId = '';
    this.mTitle = '';
    this.mIcon = '';
    this.mLink = '';
    this.mError = false;
  }

  public ngOnInit() {
    try {
      const param: Param = JSON.parse(this.message.getMessage());
      const keyId = param.keyid;
      this.mKeyId = keyId;
      this.mTitle = param.title;
      this.mIcon = AfreecaPackComponent.getIcon(keyId);
      this.mLink = `http://play.afreecatv.com/${keyId}/embed`;
      this.mError = false;
    } catch {
      console.log('fuck');
      this.mError = true;
    }
  }

  public getId(): string {
    return this.mKeyId;
  }

  public getName(): string {
    return this.mTitle;
  }

  public getIcon(): string {
    return this.mIcon;
  }

  public onClick(): void {
    window.open(this.mLink, '_blank', 'width=800');
  }

  public onContextMenu(): void {
    window.open(this.mLink, '_blank', 'width=800');
  }

  public isError(): boolean {
    return this.mError;
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
