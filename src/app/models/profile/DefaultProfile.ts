import { Profile } from './Profile';

export class DefaultProfile implements Profile {
  public getName(): string {
    return 'Default';
  }

  public getIcon(): string {
    return 'https://i.imgur.com/y81MZAJ.png';
  }

  public getLevel(): number {
    return 1;
  }
}
