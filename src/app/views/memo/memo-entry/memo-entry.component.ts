import { Memo } from 'src/app/models/memo/Memo';
import { MemoService } from 'src/app/services/memo/memo.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'memo-entry',
  templateUrl: './memo-entry.component.html',
  styleUrls: ['./memo-entry.component.scss']
})
export class MemoEntryComponent implements OnInit {

  @Input() memo: Memo;

  private mService: MemoService;

  public constructor(service: MemoService) {
    this.mService = service;
  }

  public getBody(): string {
    return this.memo.getBody();
  }

  public getUserName(): string {
    return this.memo.getUserName();
  }

  public onClick(): void {
    this.mService.setCurrentMemo(this.memo);
  }

  ngOnInit() {
  }

}

type MemoParam = {
  body: string,
};
