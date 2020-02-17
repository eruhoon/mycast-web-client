import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  @Output()
  public menuClick = new EventEmitter();

  @Output()
  public settingClick = new EventEmitter();

  private mProfileService: ProfileService;

  public constructor(profileService: ProfileService) {
    this.mProfileService = profileService;
  }

  public getProfileIcon(): string {
    return this.mProfileService.getProfileIcon();
  }

  public onMenuClick() {
    this.menuClick.emit();
  }

  public onSettingClick() {
    this.settingClick.emit();
  }

}
