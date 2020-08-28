import { MemoShareCommand } from 'src/app/models/memo/command/MemoShareCommand';
import { Memo } from 'src/app/models/memo/Memo';
import { MemoService } from 'src/app/services/memo/memo.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'memo-entry',
  templateUrl: './memo-entry.component.html',
  styleUrls: ['./memo-entry.component.scss', './memo-entry.color.scss'],
})
export class MemoEntryComponent implements OnInit {
  @Input() memo: Memo;

  private mParam: MemoParam;
  private mRegDate: Date;
  private mService: MemoService;
  private mShareCommand: MemoShareCommand | null;

  public constructor(service: MemoService) {
    this.mParam = {
      hash: '',
      body: '',
      author: '',
      linkHash: '',
    };
    this.mRegDate = new Date(0);
    this.mService = service;
    this.mShareCommand = null;
  }

  public ngOnInit() {
    this.mParam = {
      hash: this.memo.getHash(),
      author: this.memo.getUserName(),
      body: this.memo.getBody(),
      linkHash: this.memo.getHash(),
    };
    this.mRegDate = this.memo.getRegDate();
    this.mShareCommand = new MemoShareCommand(this.memo.getHash());
  }

  public getBody(): string {
    return this.mParam.body;
  }

  public getAuthor(): string {
    return this.mParam.author;
  }

  public getRegDate(): string {
    const padZero = (n: number) => (n < 10 ? '0' + n : '' + n);
    const month = this.mRegDate.getMonth() + 1;
    const date = this.mRegDate.getDate();
    return `${padZero(month)}.${padZero(date)}`;
  }

  public onClick(): void {
    this.mService.setCurrentMemo(this.memo);
  }

  public shareMemo(): void {
    if (this.mShareCommand) {
      this.mShareCommand.execute();
    }
  }
}

type MemoParam = {
  hash: string;
  author: string;
  body: string;
  linkHash: string;
};
