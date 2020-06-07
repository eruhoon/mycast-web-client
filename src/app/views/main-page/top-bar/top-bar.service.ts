import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {

  private mSettingMenu: Menu;
  private mNotiList: Menu;
  private mMenus: Menu[];

  public constructor() {
    this.mSettingMenu = { name: 'SettingMenu', open: false };
    this.mNotiList = { name: 'NotificationList', open: false };
    this.mMenus = [this.mSettingMenu, this.mNotiList];
  }

  public closeAllMenu(): void {
    this.mMenus.forEach(menu => { menu.open = false; });
  }

  public isSettingMenuOpen(): boolean {
    return this.isMenuOpen(this.mSettingMenu);
  }

  public isNotiListOpen(): boolean {
    return this.isMenuOpen(this.mNotiList);
  }

  public openSettingMenu(): void { this.openMenu(this.mSettingMenu); }

  public openNotiList(): void { this.openMenu(this.mNotiList); }

  public closeSettingMenu(): void { this.closeMenu(this.mSettingMenu); }

  public closeNotiList(): void { this.closeMenu(this.mNotiList); }

  public toggleSettingMenu(): void { this.toggleMenu(this.mSettingMenu); }

  public toggleNotiList(): void { this.toggleMenu(this.mNotiList); }

  private isMenuOpen(menu: Menu): boolean {
    return menu.open;
  }

  private openMenu(menu: Menu): void {
    this.closeAllMenu();
    menu.open = true;
  }

  private closeMenu(menu: Menu): void {
    menu.open = false;
  }

  private toggleMenu(menu: Menu): void {
    if (menu.open) {
      this.closeMenu(menu);
    } else {
      this.openMenu(menu);
    }
  }
}

type Menu = { name: string, open: boolean };
