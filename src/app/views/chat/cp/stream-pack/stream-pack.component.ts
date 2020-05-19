import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'stream-pack',
  templateUrl: './stream-pack.component.html',
  styleUrls: ['./stream-pack.component.scss']
})
export class StreamPackComponent extends ChatPack implements OnInit {

  private mId: string;
  private mIcon: string;
  private mName: string;
  private mPlatform: string;

  public constructor(injector: Injector) {
    super(injector);

    this.mId = '';
    this.mIcon = '';
    this.mName = '';
    this.mPlatform = '';
  }

  public ngOnInit() {
    const param = JSON.parse(this.message.getMessage());
    this.mId = param.keyId;
    this.mIcon = param.icon;
    this.mName = param.nickname;
    this.mPlatform = param.platform;
  }

  public getId(): string { return this.mId; }

  public getName(): string { return this.mName; }

  public getIcon(): string { return this.mIcon; }

  public getPlatform(): string { return this.mPlatform; }

}
