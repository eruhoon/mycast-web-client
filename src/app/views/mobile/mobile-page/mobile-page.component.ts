import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-mobile-page',
  templateUrl: './mobile-page.component.html',
  styleUrls: ['./mobile-page.component.scss', './mobile-page.color.scss']
})
export class MobilePageComponent implements OnInit {

  public constructor(
    private mMainSrv: MainService,
    private mThemeSrv: ThemeService) { }

  public ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.mMainSrv.toggleSidebar();
  }

  public isSideMenuShow(): boolean {
    return this.mMainSrv.isSidebarShow();
  }
}
