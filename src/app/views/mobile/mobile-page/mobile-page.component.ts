import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { ImagePopupService } from 'src/app/services/image/image-popup.service';
import { MainService } from 'src/app/services/main/main.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

import { Component, OnInit } from '@angular/core';

import { TopBarService } from '../../main-page/top-bar/top-bar.service';

@Component({
  selector: 'app-mobile-page',
  templateUrl: './mobile-page.component.html',
  styleUrls: ['./mobile-page.component.scss', './mobile-page.color.scss']
})
export class MobilePageComponent implements OnInit {

  public constructor(
    private mMainSrv: MainService,
    private mTopBarSrv: TopBarService,
    private mProfileService: ProfileService,
    private mThemeSrv: ThemeService,
    private mImagePopupSrv: ImagePopupService,
    private mClipboardImageSrv: ClipboardImageService) {
  }

  public ngOnInit(): void {
  }

  public getCurrentLink(): string {
    return this.mMainSrv.getCurrentLink();
  }

  public isContentMode(): boolean {
    return this.getCurrentLink().length > 0;
  }

  public toggleMenu(): void {
    this.mMainSrv.toggleSidebar();
  }

  public closeAllMenu(): void {
    this.mTopBarSrv.closeSettingMenu();
  }

  public clearContents(): void {
    this.mMainSrv.setCurrentLink(null);
  }

  public isSideMenuShow(): boolean {
    return this.mMainSrv.isSidebarShow();
  }

  public isClipboardImageMode(): boolean {
    return this.mClipboardImageSrv.getCurrentImage() !== null;
  }

  public isModifyProfileMode(): boolean {
    const mode = this.mProfileService.getModifyMode();
    return mode === ProfileModifyMode.PROFILE;
  }

  public isModifyStreamMode(): boolean {
    const mode = this.mProfileService.getModifyMode();
    return mode === ProfileModifyMode.STREAM;
  }

  public isModifySettingMode(): boolean {
    const mode = this.mProfileService.getModifyMode();
    return mode === ProfileModifyMode.SETTING;
  }

  public isImagePopup(): boolean {
    return this.mImagePopupSrv.isPopup();
  }

  public closeImagePopup(): void {
    this.mImagePopupSrv.setImage(null);
  }
}
