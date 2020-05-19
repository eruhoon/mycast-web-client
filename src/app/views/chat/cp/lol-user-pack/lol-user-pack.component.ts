import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'lol-user-pack',
  templateUrl: './lol-user-pack.component.html',
  styleUrls: ['./lol-user-pack.component.scss']
})
export class LolUserPackComponent extends ChatPack implements OnInit {

  private mName: string;
  private mTier: string;
  private mDivision: string;
  private mPoint: number;

  public constructor(injector: Injector) {
    super(injector);
    this.mName = '';
    this.mTier = '';
    this.mDivision = '';
    this.mPoint = 0;
  }

  public ngOnInit() {
    const param = JSON.parse(this.message.getMessage()) as Param;

    // console.log(param);
    this.mName = param.name;
    this.mTier = param.tier.tier;
    this.mDivision = param.tier.division;
    this.mPoint = param.tier.point;
  }

  public getName(): string { return this.mName; }

  public getTier(): string { return this.mTier; }

  public getDivision(): string { return this.mDivision; }

  public getPoint(): number { return this.mPoint; }

}


type Param = {
  /*icon: "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/profileicon/1298.png", "id": "PbjxOHtSve7VjlVuMU3HR9zDpwb-xKsD619EqiBJMuUUfw", "level": 146, "mmr": { "fow": 1111, "opgg": 1111 }, "most": { "rank": [], "top": [{ "background": "https://cdn.communitydragon.org/10.10.3208608/champion/Rumble/splash-art/skin/0", "icon": "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/champion/Rumble.png", "name": "럼블" }, { "background": "https://cdn.communitydragon.org/10.10.3208608/champion/Sona/splash-art/skin/0", "icon": "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/champion/Sona.png", "name": "소나" }, { "background": "https://cdn.communitydragon.org/10.10.3208608/champion/Lulu/splash-art/skin/0", "icon": "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/champion/Lulu.png", "name": "룰루" }, { "background": "https://cdn.communitydragon.org/10.10.3208608/champion/Zyra/splash-art/skin/0", "icon": "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/champion/Zyra.png", "name": "자이라" }, { "background": "https://cdn.communitydragon.org/10.10.3208608/champion/Elise/splash-art/skin/0", "icon": "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/champion/Elise.png", "name": "엘리스" }] },*/
  name: string,
  tier: { division: "II", point: 21, tier: "SILVER" }
}
