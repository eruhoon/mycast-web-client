import { ProfileLoader } from 'src/app/models/profile/ProfileLoader';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MemoProfileService {
  private mProfileLoader: ProfileLoader;
  private mIcon: string;
  private mName: string;

  public constructor() {
    this.mProfileLoader = new ProfileLoader();
    this.mName = '';
    this.mIcon = '';
  }

  public async loadProfile(): Promise<void> {
    const privKey = SessionStorage.getInstance().getPrivateKey();
    if (!privKey) {
      console.error('null privKey');
      return;
    }

    const profile = await this.mProfileLoader.load(privKey);
    this.mIcon = profile.getIcon();
    this.mName = profile.getName();
  }

  public getIcon(): string {
    return this.mIcon;
  }

  public getName(): string {
    return this.mName;
  }
}
