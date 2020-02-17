import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss']
})
export class SettingViewComponent {

  private mProfileService: ProfileService;

  public constructor(profileService: ProfileService) {
    this.mProfileService = profileService;
  }

  public getName(): string {
    return this.mProfileService.getName();
  }

  public getIcon(): string {
    return this.mProfileService.getProfileIcon();
  }

  public getLevel(): number {
    return this.mProfileService.getLevel();
  }
}
