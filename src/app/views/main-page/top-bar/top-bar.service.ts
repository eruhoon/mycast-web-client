import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {

  private mSettingMenuShow = false;

  public constructor() { }

  public isSettingMenuShow(): boolean { return this.mSettingMenuShow; }

  public openSettingMenu(): void { this.mSettingMenuShow = true; }

  public closeSettingMenu(): void { this.mSettingMenuShow = false; }

  public toggleSettingMenu(): void {
    this.mSettingMenuShow = !this.mSettingMenuShow;
  }
}
