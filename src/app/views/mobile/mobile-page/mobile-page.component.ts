import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';

@Component({
  selector: 'app-mobile-page',
  templateUrl: './mobile-page.component.html',
  styleUrls: ['./mobile-page.component.scss', './mobile-page.color.scss']
})
export class MobilePageComponent implements OnInit {

  public constructor(
    private mMainSrv: MainService,
    private mThemeSrv: ThemeService,
    private mClipboardImageSrv: ClipboardImageService) { }

  public ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.mMainSrv.toggleSidebar();
  }

  public isSideMenuShow(): boolean {
    return this.mMainSrv.isSidebarShow();
  }

  public isClipboardImageMode(): boolean {
    return this.mClipboardImageSrv.getCurrentImage() !== null;
  }
}
