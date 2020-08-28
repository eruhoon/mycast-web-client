import { Profile } from './Profile';

export class MutableProfile implements Profile {
  private mName: string;
  private mIcon: string;
  private mLevel: number;

  public constructor(profile: Profile | null = null) {
    if (profile === null) {
      this.mName = '';
      this.mIcon = 'https://i.imgur.com/y81MZAJ.png';
      this.mLevel = 1;
    } else {
      this.mName = profile.getName();
      this.mIcon = profile.getIcon();
      this.mLevel = profile.getLevel();
    }
  }

  public setName(name: string): void {
    this.mName = name;
  }

  public getName(): string {
    return this.mName;
  }

  public setIcon(icon: string): void {
    this.mIcon = icon;
  }

  public getIcon(): string {
    return this.mIcon;
  }

  public setLevel(level: number): void {
    this.mLevel = level;
  }

  public getLevel(): number {
    return this.mLevel;
  }
}
