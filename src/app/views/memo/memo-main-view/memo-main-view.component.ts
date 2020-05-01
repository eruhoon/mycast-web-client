import { Memo } from 'src/app/models/memo/Memo';
import { MemoService } from 'src/app/services/memo/memo.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memo-main-view',
  templateUrl: './memo-main-view.component.html',
  styleUrls: ['./memo-main-view.component.scss']
})
export class MemoMainViewComponent {

  private mService: MemoService;

  public constructor(service: MemoService) {
    this.mService = service;
  }

  public getMemos(): Memo[] {
    console.log('memoes', this.mService.getMemos());
    return this.mService.getMemos();
  }

  public isDetailMode(): boolean {
    return this.mService.getCurrentMemo() !== null;
  }
}
