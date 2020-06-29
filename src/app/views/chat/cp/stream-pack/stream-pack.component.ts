import { platform } from 'os';
import { MainService } from 'src/app/services/main/main.service';

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
  private mThumbnail: string;
  private mLink: string;

  public constructor(
    injector: Injector,
    private mMainSrv: MainService) {

    super(injector);

    this.mId = '';
    this.mIcon = '';
    this.mName = '';
    this.mPlatform = '';
    this.mThumbnail = '';
  }

  public ngOnInit() {
    const param = JSON.parse(this.message.getMessage());
    this.mId = param.keyId;
    this.mIcon = param.icon;
    this.mName = param.nickname;
    this.mPlatform = param.platform;
    this.mThumbnail = param.thumbnail;
    this.mLink = StreamPackComponent.getLink(param.platform, param.keyId);
  }

  public getId(): string { return this.mId; }

  public getName(): string { return this.mName; }

  public getIcon(): string { return this.mIcon; }

  public getPlatform(): string { return this.mPlatform; }

  public getThumbnail(): string { return this.mThumbnail; }

  // TODO: Optimize PlatformIcon
  public getPlatformIcon(): string {
    return `http://mycast.xyz/home/asset/chat.original/img/stream-pack-plaform-${this.mPlatform}.png`;
  }

  public onClick(): void {
    if (this.mPlatform === 'afreeca') {
      window.open(this.mLink, '_blank', 'width=800');
    } else {
      this.mMainSrv.setCurrentLink(this.mLink);
    }
  }

  private static getLink(streamPlatform: string, keyId: string): string {
    switch (streamPlatform) {
      case 'local': return `//mycast.xyz/player/${keyId}`;
      case 'twitch':
        return `//player.twitch.tv/?channel=${keyId}&parent=${location.hostname}`;
      case 'afreeca': return `http://play.afreecatv.com/${keyId}/embed`;
      case 'kakaotv': return `//tv.kakao.com/embed/player/livelink/${keyId}`;
    }
  }

}
