import { LinkPopup } from 'src/app/models/link/LinkPopup';
import { Stream } from 'src/app/models/stream/Stream';
import { ImagePopupService } from 'src/app/services/image/image-popup.service';
import { LinkContentViewService } from 'src/app/services/link/link-content-view.service';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';
import { MainService } from 'src/app/services/main/main.service';

import { Component, HostListener, ViewChild } from '@angular/core';

import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

    @ViewChild(TopBarComponent, { static: false })
    private mTopBar: TopBarComponent;

    public mCurrentStream: Stream | null;

    private mMainService: MainService;
    private mImagePopupService: ImagePopupService;
    private mLinkPopupService: LinkPopupService;
    private mLinkContentViewService: LinkContentViewService;
    private mMenuShow: boolean;
    private mSettingShow: boolean;
    private mInnerWidth: number;
    private mMoveMode: boolean;
    private mDividerPosition: number;

    public constructor(
        mainService: MainService,
        imagePopupService: ImagePopupService,
        linkPopupService: LinkPopupService,
        linkContentViewService: LinkContentViewService) {

        this.mMenuShow = false;
        this.mSettingShow = false;
        this.mCurrentStream = null;
        this.mMainService = mainService;
        this.mImagePopupService = imagePopupService;
        this.mLinkPopupService = linkPopupService;
        this.mLinkContentViewService = linkContentViewService;
        this.mMoveMode = false;
        this.mDividerPosition = 300;
        this.mInnerWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event) {
        this.mInnerWidth = window.innerWidth;
    }

    public getCurrentStream(): Stream | null {
        return this.mCurrentStream;
    }

    public getCurrentLink(): string | null {
        return this.mLinkContentViewService.getLink();
    }

    public isLinkMode(): boolean {
        return this.getCurrentLink() !== null;
    }

    public isStreamActivated(): boolean {
        return this.getCurrentStream() !== null;
    }

    public isMenuShow(): boolean {
        return this.mMenuShow;
    }

    public isSettingShow(): boolean {
        return this.mSettingShow;
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

    public onSettingClick() {
        this.toggleSetting();
    }

    public onStreamClick(stream: Stream): void {
        this.setCurrentStream(stream);
        this.closeMenu();
    }

    public onStreamIconClick(stream: Stream): void {
        this.setCurrentStream(stream);
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
    }

    public getLinkPopups(): LinkPopup[] {
        return this.mLinkPopupService.getLinks();
    }

    private toggleMenu() {
        this.mMenuShow = !this.mMenuShow;
    }

    private closeMenu(): void {
        this.mMenuShow = false;
    }

    private toggleSetting() {
        this.mSettingShow = !this.mSettingShow;
    }

    private setCurrentStream(stream: Stream): void {
        this.mLinkContentViewService.setLink(stream.getUrl());
    }
}
