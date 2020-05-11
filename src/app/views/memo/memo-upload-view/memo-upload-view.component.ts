import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';
import { MemoService } from 'src/app/services/memo/memo.service';

@Component({
  selector: 'memo-upload-view',
  templateUrl: './memo-upload-view.component.html',
  styleUrls: ['./memo-upload-view.component.scss']
})
export class MemoUploadViewComponent implements OnInit {

  public memoForm: MemoForm;
  private mService: ProfileService;
  private mMemoService: MemoService;
  private mPrivKey: string;
  private mIcon: string;
  private mName: string;
  private mDateString: string;

  public constructor(service: ProfileService, memoService: MemoService) {
    this.memoForm = { memo: '' };
    this.mService = service;
    this.mMemoService = memoService;
    this.mPrivKey = '';
    this.mIcon = '';
    this.mName = '';
    this.mDateString = '';
  }

  public ngOnInit() {
    this.mPrivKey = SessionStorage.getInstance().getPrivateKey() || '';
    this.mIcon = this.mService.getProfileIcon();
    this.mName = this.mService.getName();
    this.mDateString = MemoUploadViewComponent.getDateString(new Date());
  }

  public getIcon(): string {
    return this.mIcon;
  }

  public getName(): string {
    return this.mName;
  }

  public getDateString(): string {
    return this.mDateString;
  }

  public upload(): void {
    // TODO: Implement Upload Module
    console.log('upload', this.mPrivKey, this.memoForm.memo);
  }

  public close(): void {
    this.mMemoService.setUploadMode(false);
  }

  private static getDateString(dateObj: Date): string {
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return `${month}월 ${date}일`;
  }
}

type MemoForm = { memo: string };
