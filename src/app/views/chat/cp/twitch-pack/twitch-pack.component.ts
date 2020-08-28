import { MainService } from 'src/app/services/main/main.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';

@Component({
  selector: 'twitch-pack',
  templateUrl: './twitch-pack.component.html',
  styleUrls: ['./twitch-pack.component.scss'],
})
export class TwitchPackComponent extends ChatPackDirective implements OnInit {
  private mId: string;
  private mIcon: string;
  private mName: string;

  constructor(private mMainService: MainService, injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {
    try {
      const param: TwitchPackParam = JSON.parse(this.message.getMessage());

      const channel = param.stream.channel;
      this.mId = channel.name;
      this.mIcon = channel.profile_banner;
      this.mName = channel.display_name;
    } catch {
      console.log('fuck');
    }
  }

  public getId(): string {
    return this.mId;
  }

  public getIcon(): string {
    return this.mIcon;
  }

  public getName(): string {
    return this.mName;
  }

  public getLink(): string {
    return `https://player.twitch.tv/?channel=${this.mId}&parent=${location.hostname}`;
  }

  public onClick(): void {
    this.mMainService.setCurrentLink(this.getLink());
  }

  public onContextMenu(): void {
    window.open(this.getLink(), '_blank', 'width=800');
  }
}

type TwitchPackParam = {
  stream: {
    channel: {
      profile_banner: string;
      name: string;
      display_name: string;
    };
  };
};
