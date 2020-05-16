import { DefaultProfile } from 'src/app/models/profile/DefaultProfile';
import { ModifyProfileCommand } from 'src/app/models/profile/ModifyProfileCommand';
import { Profile } from 'src/app/models/profile/Profile';

import { Injectable } from '@angular/core';
import { StreamProfile } from 'src/app/models/profile/StreamProfile';
import { VegaStreamProfileLoader } from 'src/app/models/profile/VegaStreamProfileLoader';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';
import { ModifyPlatformCommand } from 'src/app/models/profile/stream/ModifyPlatformCommand';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private mModifyMode: ProfileModifyMode;
  private mProfile: Profile;
  private mStreamPlatform: string;
  private mStreamBackgroundImage: string;
  private mStreamTwitchId: string;
  private mStreamAfreecaId: string;
  private mStreamMixerId: string;
  private mModifyProfileCommand: ModifyProfileCommand;
  private mStreamProfileLoader: VegaStreamProfileLoader;
  private mModifyPlatformCommand: ModifyPlatformCommand;

  public constructor() {
    const privKey = SessionStorage.getInstance().getPrivateKey() || '';
    this.mModifyMode = ProfileModifyMode.NONE;
    this.mProfile = new DefaultProfile();
    this.mStreamPlatform = 'local';
    this.mStreamBackgroundImage = '';
    this.mStreamTwitchId = '';
    this.mStreamProfileLoader = new VegaStreamProfileLoader(privKey);
    this.mModifyPlatformCommand = new ModifyPlatformCommand(privKey);
  }

  public async loadStream(): Promise<void> {
    const stream = await this.mStreamProfileLoader.load();
    this.mStreamPlatform = stream.getPlatform();
    this.mStreamBackgroundImage = stream.getBackgroundImage();
    this.mStreamTwitchId = stream.getTwitchId();
    this.mStreamAfreecaId = stream.getAfreecaId();
    this.mStreamMixerId = stream.getMixerId();
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

  public getStreamBackgroundImage(): string {
    return this.mStreamBackgroundImage;
  }

  public getStreamAfreecaId(): string {
    return this.mStreamAfreecaId;
  }

  public getStreamMixerId(): string {
    return this.mStreamMixerId;
  }

  public getStreamTwitchId(): string {
    return this.mStreamTwitchId;
  }

  public setModifyMode(modifyMode: ProfileModifyMode): void {
    this.mModifyMode = modifyMode;
  }

  public requestToModifyProfile(name: string, icon: string): void {
    this.mModifyProfileCommand.execute({ name, icon });
  }

  public requestToChangeStreamPlatform(platform: string): void {
    this.mModifyPlatformCommand.execute(platform).then(result => {
      console.log(result);
      if (result) {
        this.mStreamPlatform = platform;
      }
    });
  }
}

export const enum ProfileModifyMode {
  NONE = 'NONE',
  PROFILE = 'PROFILE',
  STREAM = 'STREAM',
}
