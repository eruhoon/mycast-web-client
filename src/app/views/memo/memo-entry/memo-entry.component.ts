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

  private mParam: MemoParam;
  private mService: MemoService;

  public constructor(service: MemoService) {
    this.mParam = { hash: '', body: '', author: '', linkHash: '' };
    this.mService = service;
  }

  public ngOnInit() {
    this.mParam = {
      hash: this.memo.getHash(),
      author: this.memo.getUserName(),
      body: this.memo.getBody(),
      linkHash: this.memo.getHash(),
    };
  }

  public getBody(): string {
    return this.mParam.body;
  }

  public getAuthor(): string {
    return this.mParam.author;
  }

  public onClick(): void {
    this.mService.setCurrentMemo(this.memo);
  }

  public shareMemo(): void {
    console.log('shareMemo', this.memo.getHash());
  }

}

type MemoParam = {
  hash: string,
  author: string,
  body: string,
  linkHash: string,
};
