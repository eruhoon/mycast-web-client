import { Component, OnInit } from '@angular/core';
import { MemoProfileService } from 'src/app/services/memo/memo-profile.service';
import { MemoService } from 'src/app/services/memo/memo.service';

@Component({
    selector: 'memo-upload-view',
    templateUrl: './memo-upload-view.component.html',
    styleUrls: ['./memo-upload-view.component.scss', './memo-upload-view.color.scss']
})
export class MemoUploadViewComponent implements OnInit {

    public memoForm: MemoForm;
    private mProfileSrv: MemoProfileService;
    private mMemoService: MemoService;
    private mIcon: string;
    private mName: string;
    private mDateString: string;

    public constructor(service: MemoProfileService, memoService: MemoService) {
        this.memoForm = { memo: '' };
        this.mProfileSrv = service;
        this.mMemoService = memoService;
        this.mIcon = '';
        this.mName = '';
        this.mDateString = '';
    }

    public ngOnInit() {
        this.mIcon = this.mProfileSrv.getIcon();
        this.mName = this.mProfileSrv.getName();
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
        this.mMemoService.upload(this.memoForm.memo);
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
