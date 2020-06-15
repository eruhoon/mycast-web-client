import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'lol-user-pack',
  templateUrl: './lol-user-pack.component.html',
  styleUrls: ['./lol-user-pack.component.scss']
})
export class LolUserPackComponent extends ChatPack implements OnInit {

  private mName: string;
  private mLevel: number;
  private mIcon: string;
  private mTierText: string;
  private mTier: string;
  private mDivision: string;
  private mPoint: number;
  private mMostChamps: ChampParam[];

  public constructor(
    injector: Injector,
    private mLinkPopup: LinkPopupService) {
    super(injector);
    this.mName = '';
    this.mLevel = 0;
    this.mIcon = '';
    this.mTierText = '';
    this.mTier = '';
    this.mDivision = '';
    this.mPoint = 0;
    this.mMostChamps = [];
  }

  public ngOnInit() {
    try {
      const param = JSON.parse(this.message.getMessage()) as Param;

      this.mIcon = param.icon;
      this.mLevel = param.level;
      this.mName = param.name;
      this.mTierText = LolUserPackComponent.getTierText(param.tier);
      this.mTier = param.tier.tier;
      this.mDivision = param.tier.division;
      this.mPoint = param.tier.point;
      this.mMostChamps = param.most.top;
    } catch (e) {
      console.error('fuck');
    }
  }

  public getIcon(): string { return this.mIcon; }

  public getLevel(): number { return this.mLevel; }

  public getName(): string { return this.mName; }

  public getTierText(): string { return this.mTierText; }

  public getTier(): string { return this.mTier; }

  public getDivision(): string { return this.mDivision; }

  public getPoint(): number { return this.mPoint; }

  public getMostChamps(): ChampParam[] { return this.mMostChamps; }

  public onClick(): void {
    this.mLinkPopup.addLink(new LinkPopupBuilder()
      .title('LOL User Info')
      .width(800).height(600)
      .link(`https://www.op.gg/summoner/userName=${this.mName}`)
      .build());
  }

  private static getTierText(tierObj: TierParam): string {
    const tier = tierObj.tier;
    const division = tier === 'CHALLENGER' ||
      tier === 'GRANDMASTER' ||
      tier === 'MASTER' ||
      tier === 'UNRANK' ? '' : tierObj.division;

    const point = tierObj.point > 0 ? `${tierObj.point}P` : '';

    return [tier, division, point].join(' ');
  }

}

type Param = {
  icon: string,
  name: string,
  level: number,
  most: {
    top: ChampParam[]
  },
  tier: TierParam,
};

type ChampParam = { background: string, icon: string, name: string };

type TierParam = { division: string, point: number, tier: string };
