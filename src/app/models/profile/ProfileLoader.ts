import Axios from 'axios';

import { MutableProfile } from './MutableProfile';
import { Profile } from './Profile';

export class ProfileLoader {
  public async load(privKey: string): Promise<Profile> {
    const url = this.getUrl(privKey);
    const res = await Axios.get(url);
    const user = res.data as UserDto;
    return this.createProfile(user);
  }

  private getUrl(privKey: string): string {
    return `https://mycast.xyz:9011/user/${privKey}`;
  }

  private createProfile(user: UserDto): Profile {
    const profile = new MutableProfile();
    profile.setIcon(user.icon);
    profile.setName(user.nickname);
    return profile;
  }
}

type UserDto = {
  id: string;
  nickname: string;
  icon: string;
};
