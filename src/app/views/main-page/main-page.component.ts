import { LinkPopup } from 'src/app/models/link/LinkPopup';
import { Stream } from 'src/app/models/stream/Stream';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { ImagePopupService } from 'src/app/services/image/image-popup.service';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';
import { MainService } from 'src/app/services/main/main.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ToastService } from 'src/app/services/notification/toast.service';
import { OptionService } from 'src/app/services/option/option.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';

import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { TopBarService } from './top-bar/top-bar.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss', './main-page.color.scss']
})
export class MainPageComponent {

    public mCurrentStream: Stream | null;

    private mMainService: MainService;
    private mNotificationService: NotificationService;
    private mToastService: ToastService;
    private mImagePopupService: ImagePopupService;
    private mLinkPopupService: LinkPopupService;
    private mOptionService: OptionService;
    private mProfileService: ProfileService;
    private mClipboardImageService: ClipboardImageService;
    private mInnerWidth: number;
    private mMoveMode: boolean;
    private mDividerPosition: number;
    private mStreamListShow: boolean;

    public constructor(
        private mTopBarSrv: TopBarService,
        router: Router,
        mainService: MainService,
        notificationService: NotificationService,
        toastService: ToastService,
        imagePopupService: ImagePopupService,
        linkPopupService: LinkPopupService,
        optionService: OptionService,
        profileService: ProfileService,
        clipboardImageService: ClipboardImageService) {

        const userAgent = navigator.userAgent;
        const isMobile = userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || userAgent.match(/LG|SAMSUNG|Samsung/) != null;
        if (isMobile) {
            router.navigate(['/mobile']);
        }
        this.mCurrentStream = null;
        this.mMainService = mainService;
        this.mNotificationService = notificationService;
        this.mToastService = toastService;
        this.mImagePopupService = imagePopupService;
        this.mLinkPopupService = linkPopupService;
        this.mOptionService = optionService;
        this.mProfileService = profileService;
        this.mClipboardImageService = clipboardImageService;

        this.mMoveMode = false;
        this.mDividerPosition = optionService.getChatPosition();
        this.mInnerWidth = window.innerWidth;
        this.mStreamListShow = true;
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event) {
        this.mInnerWidth = window.innerWidth;
    }

    public isClipboardImageMode(): boolean {
        return this.mClipboardImageService.getCurrentImage() !== null;
    }

    public isToastListShow(): boolean {
        return this.mToastService.getToasts().length > 0;
    }

    public getCurrentLink(): string {
        return this.mMainService.getCurrentLink();
    }

    public getCurrentStream(): Stream | null {
        return this.mCurrentStream;
    }

    public isLinkMode(): boolean {
        return this.getCurrentLink() !== null;
    }

    public isStreamActivated(): boolean {
        return this.getCurrentStream() !== null;
    }

    public isMenuShow(): boolean {
        return this.mMainService.isSidebarShow();
    }

    public isMoveMode(): boolean {
        return this.mMoveMode;
    }

    public isChatRight(): boolean {
        const center = window.innerWidth / 2;
        return this.mDividerPosition > center;
    }

    public isImagePopup(): boolean {
        return this.mImagePopupService.isPopup();
    }

    public isNotificationRequestShow(): boolean {
        return this.mNotificationService.getTarget() !== null;
    }

    public closeImagePopup(): void {
        this.mImagePopupService.setImage(null);
    }

    public getChatSize(): number {
        if (this.isChatRight()) {
            return this.mInnerWidth - this.getDividerPosition();
        } else {
            return this.getDividerPosition();
        }
    }

    public getDividerPosition(): number {
        const minSize = 300;
        const minX = minSize;
        const maxX = this.mInnerWidth - minSize;
        const max = (pos: number) => pos > minX ? pos : minX;
        const min = (pos: number) => pos < maxX ? pos : maxX;
        return min(max(this.mDividerPosition));
    }

    public onMenuClick() {
        this.toggleMenu();
    }

    public onOutOfMenuClick() {
        this.closeMenu();
    }

    public onDividerMouseDown(event: MouseEvent): void {
        this.mMoveMode = true;
        this.mDividerPosition = event.clientX;
    }

    public onDividerMove(event: MouseEvent): void {
        if (!this.mMoveMode) {
            return;
        }
        const left = event.clientX;
        this.mDividerPosition = left;
    }

    public onDividerMouseUp(): void {
        this.mMoveMode = false;
        this.mOptionService.setChatPosition(this.mDividerPosition);
    }

    public getLinkPopups(): LinkPopup[] {
        return this.mLinkPopupService.getLinks();
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

    public isStreamListShow(): boolean { return this.mStreamListShow; }

    public toggleStreamList() {
        this.mStreamListShow = !this.mStreamListShow;
    }

    public closeTopBarMenu(): void {
        console.log('click');
        this.mTopBarSrv.closeAllMenu();
    }

    private toggleMenu() {
        this.mMainService.toggleSidebar();
    }

    private closeMenu(): void {
        this.mMainService.closeSidebar();
    }
}
