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


}
