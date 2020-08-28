import { Component, Injector, OnInit } from '@angular/core';
import { LinkUtils } from 'src/app/models/stream/link/LinkUtils';
import { StreamPlatformUtils } from 'src/app/models/stream/platform/StreamPlatformUtils';
import { MainService } from 'src/app/services/main/main.service';
import { ChatPackDirective } from '../ChatPack';

@Component({
  selector: 'stream-pack',
  templateUrl: './stream-pack.component.html',
  styleUrls: ['./stream-pack.component.scss'],
})
export class StreamPackComponent extends ChatPackDirective implements OnInit {
  public platformIconSrc: string;

  private mId: string;
  private mIcon: string;
  private mName: string;
  private mPlatform: string;
  private mThumbnail: string;
  private mLink: string;

  public constructor(injector: Injector, private mMainSrv: MainService) {
    super(injector);

    this.platformIconSrc = '';

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
    this.platformIconSrc = StreamPlatformUtils.getIcon(param.platform);
    this.mThumbnail = param.thumbnail;
    this.mLink = param.link;
  }

  public getId(): string {
    return this.mId;
  }

  public getName(): string {
    return this.mName;
  }

  public getIcon(): string {
    return this.mIcon;
  }

  public getPlatform(): string {
    return this.mPlatform;
  }

  public getThumbnail(): string {
    return this.mThumbnail;
  }

  public onClick(): void {
    if (this.mPlatform === 'afreeca') {
      window.open(this.mLink, '_blank', 'width=800');
    } else {
      const link = LinkUtils.addTimestamp(this.mLink);
      this.mMainSrv.setCurrentLink(link);
    }
  }
}
