import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

@Component({
  selector: 'memo-upload-view',
  templateUrl: './memo-upload-view.component.html',
  styleUrls: ['./memo-upload-view.component.scss']
})
export class MemoUploadViewComponent implements OnInit {

  private mService: ProfileService;

  private mIcon: string;
  private mName: string;
  private mDateString: string;

  public constructor(service: ProfileService) {
    this.mService = service;
    this.mIcon = '';
    this.mName = '';
    this.mDateString = '';
  }

  public ngOnInit() {
    console.log(SessionStorage.getInstance().getPrivateKey());
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

  private static getDateString(dateObj: Date): string {
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return `${month}월 ${date}일`;
  }
}
