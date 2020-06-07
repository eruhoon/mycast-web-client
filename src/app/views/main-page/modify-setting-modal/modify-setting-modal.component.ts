import { NotificationSound } from 'src/app/models/notification/NotificationSound';
import { NotificationSounds } from 'src/app/models/notification/NotificationSounds';
import { OptionService } from 'src/app/services/option/option.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modify-setting-modal',
  templateUrl: './modify-setting-modal.component.html',
  styleUrls: ['./modify-setting-modal.component.scss']
})
export class ModifySettingModalComponent implements OnInit {

  private mNotificationSounds: NotificationSounds;
  private mNotificationSoundId: string;

  public constructor(
    private mProfileSrv: ProfileService,
    private mOptionSrv: OptionService) {
    this.mNotificationSounds = new NotificationSounds();
    this.mNotificationSoundId = NotificationSound.getDefaultSound().getId();
  }

  public ngOnInit(): void {
    this.mNotificationSoundId = this.mOptionSrv.getNotificationSound().getId();
  }

  public isNotificationEnabled(): boolean {
    return this.mOptionSrv.isNotificationEnabled();
  }

  public getNotficationSoundId(): string {
    return this.mNotificationSoundId;
  }

  public getNotificationSounds(): NotificationSound[] {
    return this.mNotificationSounds.getList();
  }

  public isDataSaveMode(): boolean {
    return this.mOptionSrv.isDataSaveMode();
  }

  public toggleDataSaveMode(): void {
    const option = this.mOptionSrv.isDataSaveMode();
    return this.mOptionSrv.setDataSaveMode(!option);
  }

  public isTimestampShow(): boolean {
    return this.mOptionSrv.isTimestampShow();
  }

  public toggleNotificationEnable(): void {
    const option = this.mOptionSrv.isNotificationEnabled();
    this.mOptionSrv.setNotificationEnabled(!option);
  }

  public toggleChatTimestamp(): void {
    const option = this.mOptionSrv.isTimestampShow();
    return this.mOptionSrv.setTimestampShow(!option);
  }

  public onNotificationSoundClick(option: NotificationSound): void {
    const soundId = option.getId();
    this.mNotificationSoundId = soundId;
    this.mOptionSrv.setNotificationSound(soundId);
  }

  public close(): void {
    this.mProfileSrv.setModifyMode(ProfileModifyMode.NONE);
  }
}
