import { DefaultProfile } from 'src/app/models/profile/DefaultProfile';
import { ModifyProfileCommand } from 'src/app/models/profile/ModifyProfileCommand';
import { Profile } from 'src/app/models/profile/Profile';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private mModifyMode: ProfileModifyMode;
  private mProfile: Profile;
  private mModifyProfileCommand: ModifyProfileCommand;

  public constructor() {
    this.mModifyMode = ProfileModifyMode.NONE;
    this.mProfile = new DefaultProfile();
  }

  public setModifyProfileCommand(command: ModifyProfileCommand): void {
    this.mModifyProfileCommand = command;
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

  public getModifyMode(): ProfileModifyMode {
    return this.mModifyMode;
  }

  public setModifyMode(modifyMode: ProfileModifyMode): void {
    this.mModifyMode = modifyMode;
  }

  public requestToModifyProfile(name: string, icon: string): void {
    this.mModifyProfileCommand.execute({ name, icon });
  }
}

export const enum ProfileModifyMode {
  NONE = 'NONE',
  PROFILE = 'PROFILE',
  STREAM = 'STREAM',
}
