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

  public getMemos(): Memo[] {
    console.log('memoes', this.mService.getMemos());
    return this.mService.getMemos();
  }

  public isDetailMode(): boolean {
    return this.mService.getCurrentMemo() !== null;
  }

}
