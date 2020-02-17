import { DefaultProfile } from 'src/app/models/profile/DefaultProfile';
import { Profile } from 'src/app/models/profile/Profile';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private mProfile: Profile;

  public constructor() {
    this.mProfile = new DefaultProfile();
  }

  public setProfile(profile: Profile): void {
    this.mProfile = profile;
  }

  public getName(): string {
    return this.mProfile.getName();
  }

  public getProfileIcon(): string {
    return this.mProfile.getIcon();
  }

  public getLevel(): number {
    return this.mProfile.getLevel();
  }
}
