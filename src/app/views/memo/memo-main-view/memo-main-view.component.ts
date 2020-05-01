import { Memo } from 'src/app/models/memo/Memo';
import { MemoService } from 'src/app/services/memo/memo.service';

import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'memo-main-view',
  templateUrl: './memo-main-view.component.html',
  styleUrls: ['./memo-main-view.component.scss']
})
export class MemoMainViewComponent {

  @ViewChild('scroller', { static: false })
  public mScroller: ElementRef<HTMLDivElement>;

  private mService: MemoService;

  public constructor(service: MemoService) {
    this.mService = service;
  }

  public getMemos(): Memo[] {
    return this.mService.getMemos();
  }

  public onScroll(): void {
    const elm = this.mScroller.nativeElement;
    const diff = elm.scrollHeight - elm.scrollTop;
    const threashold = elm.clientHeight * 2;
    if (diff < threashold && !this.mService.isLoading()) {
      this.mService.loadMore();
    }
  }
}
