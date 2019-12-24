import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { Stream } from 'src/app/models/stream/Stream';

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

    public constructor() {
        this.mMenuShow = false;
        this.mCurrentStream = null;
    }

    public ngOnInit() {
    }

    public getCurrentStream(): Stream {
        return this.mCurrentStream;
    }

    public isMenuShow(): boolean {
        return this.mMenuShow;
    }

    protected onMenuClick() {
        this.toggleMenu();
    }

    protected onStreamIconClick(stream: Stream): void {
        console.log('streamIconClick', stream);
        this.mCurrentStream = stream;
    }

    private toggleMenu() {
        this.mMenuShow = !this.mMenuShow;
    }
}
