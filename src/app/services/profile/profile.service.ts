import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private mIcon: string;

  public constructor() {
    this.mIcon = 'https://i.imgur.com/XjsUghQ.gif';
  }

  public setProfileIcon(icon: string): void {
    this.mIcon = icon;
  }

  public getProfileIcon(): string {
    return this.mIcon;
  }
}
