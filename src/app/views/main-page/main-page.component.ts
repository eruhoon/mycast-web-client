import { Stream } from 'src/app/models/stream/Stream';

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

    @ViewChild(TopBarComponent, { static: false })
    private mTopBar: TopBarComponent;

    @ViewChild(SideBarComponent, { static: false })
    private mSideBar: SideBarComponent;

    public mCurrentStream: Stream | null;
    private mMenuShow: boolean;
    private mSettingShow: boolean;
    private mPrevInnerWidth: number;
    private mInnerWidth: number;
    private mMoveMode: boolean;
    private mDividerPosition: number;

    public constructor() {
        this.mMenuShow = false;
        this.mSettingShow = false;
        this.mCurrentStream = null;
        this.mMoveMode = false;
        this.mDividerPosition = 300;
        this.mPrevInnerWidth = window.innerWidth;
        this.mInnerWidth = window.innerWidth;
    }

    public ngOnInit() {
    }

    @HostListener('window:resize', ['$event'])
    protected onResize(event: Event) {
        this.mPrevInnerWidth = this.mInnerWidth;
        this.mInnerWidth = window.innerWidth;
    }

    public getCurrentStream(): Stream {
        return this.mCurrentStream;
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

    public getChatSize(): number {
        if (this.isChatRight()) {
            return this.mInnerWidth - this.getDividerPosition();
        } else {
            return this.getDividerPosition()
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

    protected onMenuClick() {
        this.toggleMenu();
    }

    protected onOutOfMenuClick() {
        this.closeMenu();
    }

    protected onSettingClick() {
        this.toggleSetting();
    }

    protected onStreamClick(stream: Stream): void {
        this.mCurrentStream = stream;
        this.closeMenu();
    }

    protected onStreamIconClick(stream: Stream): void {
        this.mCurrentStream = stream;
    }

    protected onDividerMouseDown(event: MouseEvent): void {
        this.mMoveMode = true;
        this.mDividerPosition = event.clientX;
    }

    protected onDividerMove(event: MouseEvent): void {
        if (!this.mMoveMode) {
            return;
        }
        const left = event.clientX;
        this.mDividerPosition = left;
    }

    protected onDividerMouseUp(): void {
        this.mMoveMode = false;
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
}
