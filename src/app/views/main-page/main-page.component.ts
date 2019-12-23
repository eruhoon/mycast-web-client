import { Component, OnInit, ViewChild } from '@angular/core';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';

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

    private mMenuShow: boolean;

    public constructor() {
        this.mMenuShow = false;
    }

    public ngOnInit() {
    }

    public isMenuShow(): boolean {
        return this.mMenuShow;
    }

    protected onMenuClick() {
        this.toggleMenu();
        console.log(this.mMenuShow);
    }

    private toggleMenu() {
        this.mMenuShow = !this.mMenuShow;
    }
}
