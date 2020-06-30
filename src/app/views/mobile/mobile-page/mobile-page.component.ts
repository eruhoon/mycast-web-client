import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { ImagePopupService } from 'src/app/services/image/image-popup.service';
import { MainService } from 'src/app/services/main/main.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ToastService } from 'src/app/services/notification/toast.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

import { Component, OnInit } from '@angular/core';

import { SideBarService } from '../../main-page/side-bar/side-bar.service';
import { TopBarService } from '../../main-page/top-bar/top-bar.service';

@Component({
  selector: 'app-mobile-page',
  templateUrl: './mobile-page.component.html',
  styleUrls: ['./mobile-page.component.scss', './mobile-page.color.scss']
})
export class MobilePageComponent implements OnInit {

  public constructor(
    private mMainSrv: MainService,
    private mSideBarSrv: SideBarService,
    private mTopBarSrv: TopBarService,
    private mProfileService: ProfileService,
    private mNotiSrv: NotificationService,
    private mThemeSrv: ThemeService,
    private mImagePopupSrv: ImagePopupService,
    private mToastSrv: ToastService,
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
    this.mSideBarSrv.toggleActive();
  }

  public closeAllMenu(): void {
    this.mTopBarSrv.closeSettingMenu();
  }

  public clearContents(): void {
    this.mMainSrv.setCurrentLink(null);
  }

  public isSideMenuShow(): boolean {
    return this.mSideBarSrv.isActive();
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

  public isNotificationRequestShow(): boolean {
    return this.mNotiSrv.getTarget() !== null;
  }

  public isImagePopup(): boolean {
    return this.mImagePopupSrv.isPopup();
  }

  public isToastListShow(): boolean {
    return this.mToastSrv.getToasts().length > 0;
  }

  public closeImagePopup(): void {
    this.mImagePopupSrv.setImage(null);
  }
}
