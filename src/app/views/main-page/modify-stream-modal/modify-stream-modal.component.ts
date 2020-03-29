import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modify-stream-modal',
  templateUrl: './modify-stream-modal.component.html',
  styleUrls: ['./modify-stream-modal.component.scss']
})
export class ModifyStreamModalComponent implements OnInit {

  private mProfileService: ProfileService;

  public constructor(profileService: ProfileService) {
    this.mProfileService = profileService;
  }

  ngOnInit() {
  }

  public close() {
    this.mProfileService.setModifyMode(ProfileModifyMode.NONE);
  }

}
