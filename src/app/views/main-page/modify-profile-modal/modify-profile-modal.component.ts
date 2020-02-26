import { ProfileService } from 'src/app/services/profile/profile.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modify-profile-modal',
  templateUrl: './modify-profile-modal.component.html',
  styleUrls: ['./modify-profile-modal.component.scss']
})
export class ModifyProfileModalComponent implements OnInit {

  public profileForm = { name: '', icon: '' };

  private mProfileService: ProfileService;

  public constructor(profileService: ProfileService) {
    this.profileForm.name = profileService.getName();
    this.profileForm.icon = profileService.getProfileIcon();
    this.mProfileService = profileService;
  }

  public ngOnInit() {
  }

  public onSubmitClick(): void {
    console.log(this.profileForm.name, this.profileForm.icon);
    this.mProfileService.requestToModifyProfile(
      this.profileForm.name, this.profileForm.icon);
  }
}
