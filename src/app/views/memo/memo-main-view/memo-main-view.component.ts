import { Memo } from 'src/app/models/memo/Memo';
import { MemoService } from 'src/app/services/memo/memo.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'memo-main-view',
  templateUrl: './memo-main-view.component.html',
  styleUrls: ['./memo-main-view.component.scss', './memo-main-view.color.scss'],
})
export class MemoMainViewComponent implements OnInit {
  @ViewChild('scroller', { static: false })
  public mScroller: ElementRef<HTMLDivElement>;

  private mService: MemoService;

  public constructor(service: MemoService) {
    this.mService = service;
  }

  public ngOnInit(): void {
    this.mService.loadMemos();
  }

  public getMemos(): Memo[] {
    return this.mService.getMemos();
  }
}
