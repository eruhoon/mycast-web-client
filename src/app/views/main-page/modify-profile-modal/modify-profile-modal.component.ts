import {
  ProfileModifyMode,
  ProfileService,
} from 'src/app/services/profile/profile.service';

import { Component } from '@angular/core';

@Component({
  selector: 'modify-profile-modal',
  templateUrl: './modify-profile-modal.component.html',
  styleUrls: ['./modify-profile-modal.component.scss'],
})
export class ModifyProfileModalComponent {
  public profileForm: ProfileForm;

  private mProfileService: ProfileService;

  public constructor(profileService: ProfileService) {
    this.profileForm = {
      name: profileService.getName(),
      icon: profileService.getProfileIcon(),
      statusMessage: profileService.getStatusMessage(),
    };
    this.mProfileService = profileService;
  }

  public onSubmitClick(): void {
    this.mProfileService.requestToModifyProfile(
      this.profileForm.name,
      this.profileForm.icon,
      this.profileForm.statusMessage
    );
    this.close();
  }

  public onCloseClick(): void {
    this.close();
  }

  public onProfileIconError(event: Event): void {
    if (!event || !event.target) {
      return;
    }
    const img = event.target as HTMLImageElement;
    img.src = 'https://i.imgur.com/HcBf3yq.png';
  }

  public isNameError(): boolean {
    return !this.profileForm.name || this.profileForm.name.length === 0;
  }

  public isIconError(): boolean {
    return !this.profileForm.icon || this.profileForm.icon.length === 0;
  }

  public close(): void {
    this.mProfileService.setModifyMode(ProfileModifyMode.NONE);
  }
}

type ProfileForm = { name: string; icon: string; statusMessage: string };
