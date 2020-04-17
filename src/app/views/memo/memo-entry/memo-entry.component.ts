import { Memo } from 'src/app/models/memo/Memo';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'memo-entry',
  templateUrl: './memo-entry.component.html',
  styleUrls: ['./memo-entry.component.scss']
})
export class MemoEntryComponent implements OnInit {

  @Input() memo: Memo;

  public constructor() { }

  public getBody(): string {
    return this.memo.getBody();
  }

  ngOnInit() {
  }

}

type MemoParam = {
  body: string,
};
