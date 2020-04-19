import { MemoService } from 'src/app/services/memo/memo.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memo-detail-view',
  templateUrl: './memo-detail-view.component.html',
  styleUrls: ['./memo-detail-view.component.scss']
})
export class MemoDetailViewComponent implements OnInit {

  private mService: MemoService;

  public constructor(service: MemoService) {
    this.mService = service;
  }

  ngOnInit() {
  }

  public closeDetailView(): void {
    this.mService.setCurrentMemo(null);
  }

  public getUserIcon(): string {
    const memo = this.mService.getCurrentMemo();
    return memo !== null ? memo.getUserIcon() : '';
  }

  public getUserName(): string {
    const memo = this.mService.getCurrentMemo();
    return memo !== null ? memo.getUserName() : '';
  }

  public getBody(): string {
    const memo = this.mService.getCurrentMemo();
    return memo !== null ? memo.getBody() : '';
  }

  public hasLink(): boolean {
    const body = this.getBody();
    return /https?\:\/\//.test(body);
  }

  public getLink(): string | null {
    const body = this.getBody();
    const match = /https?\:\/\/[^\s]+/.exec(body);
    return match ? match[0] : null;
  }

}
