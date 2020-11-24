import { Profile } from './Profile';

export class MutableProfile implements Profile {
  private mName: string;
  private mIcon: string;
  private mLevel: number;
  private mStatusMessage: string;

  public constructor(profile: Profile | null = null) {
    if (profile === null) {
      this.mName = '';
      this.mIcon = 'https://i.imgur.com/y81MZAJ.png';
      this.mLevel = 1;
      this.mStatusMessage = '';
    } else {
      this.mName = profile.getName();
      this.mIcon = profile.getIcon();
      this.mLevel = profile.getLevel();
      this.mStatusMessage = profile.getStatusMessage();
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

  public setStatusMessage(statusMessage): void {
    this.mStatusMessage = statusMessage;
  }

  public getStatusMessage(): string {
    return this.mStatusMessage;
  }
}
