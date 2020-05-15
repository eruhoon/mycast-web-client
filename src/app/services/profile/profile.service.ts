import { DefaultProfile } from 'src/app/models/profile/DefaultProfile';
import { ModifyProfileCommand } from 'src/app/models/profile/ModifyProfileCommand';
import { Profile } from 'src/app/models/profile/Profile';

import { Injectable } from '@angular/core';
import { StreamProfile } from 'src/app/models/profile/StreamProfile';
import { VegaStreamProfileLoader } from 'src/app/models/profile/VegaStreamProfileLoader';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private mModifyMode: ProfileModifyMode;
  private mProfile: Profile;
  private mStreamPlatform: string;
  private mModifyProfileCommand: ModifyProfileCommand;
  private mStreamProfileLoader: VegaStreamProfileLoader;

  public constructor() {
    const privKey = SessionStorage.getInstance().getPrivateKey() || '';
    this.mModifyMode = ProfileModifyMode.NONE;
    this.mProfile = new DefaultProfile();
    this.mStreamPlatform = 'local';
    this.mStreamProfileLoader = new VegaStreamProfileLoader(privKey);
  }

  public async loadStream(): Promise<void> {
    const stream = await this.mStreamProfileLoader.load();
    this.mStreamPlatform = stream.getPlatform();
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

  public getStreamPlatform(): string {
    return this.mStreamPlatform;
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
