import { MemoProfileService } from 'src/app/services/memo/memo-profile.service';
import { MemoService } from 'src/app/services/memo/memo.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memo-page',
  templateUrl: './memo-page.component.html',
  styleUrls: ['./memo-page.component.scss']
})
export class MemoPageComponent implements OnInit {

  private mService: MemoService;
  private mProfileService: MemoProfileService;

  public constructor(
    service: MemoService, profileSrv: MemoProfileService,
    private mThemeSrv: ThemeService) {
    this.mService = service;
    this.mProfileService = profileSrv;
  }

  public ngOnInit(): void {
    this.mProfileService.loadProfile();
  }

  public isDetailMode(): boolean {
    return this.mService.getCurrentMemo() !== null;
  }

  public isUploadMode(): boolean {
    return this.mService.isUploadMode();
  }

  public goUploadMode(): void {
    return this.mService.setUploadMode(true);
  }
}
