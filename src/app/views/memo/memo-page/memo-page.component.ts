import { Memo } from 'src/app/models/memo/Memo';
import { MemoService } from 'src/app/services/memo/memo.service';

import { Component } from '@angular/core';

@Component({
  selector: 'memo-page',
  templateUrl: './memo-page.component.html',
  styleUrls: ['./memo-page.component.scss']
})
export class MemoPageComponent {

  private mService: MemoService;

  public constructor(service: MemoService) {
    this.mService = service;
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
