import { NotificationChannel } from 'src/app/models/notification/NotificationChannel';
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

  private mNotificationChannels: NotificationChannel[];
  private mNotificationSounds: NotificationSounds;
  private mNotificationSoundId: string;

  public constructor(
    private mProfileSrv: ProfileService,
    private mOptionSrv: OptionService) {
    this.mNotificationChannels = [
      { hash: 'alarm', name: '호출 알림', browser: true, os: true },
      { hash: 'local-stream', name: '방송 알림', browser: true, os: true },
    ];
    this.mNotificationSounds = new NotificationSounds();
    this.mNotificationSoundId = NotificationSound.getDefaultSound().getId();
  }

  public ngOnInit(): void {
    this.mNotificationSoundId = this.mOptionSrv.getNotificationSound().getId();
  }

  public isNotificationEnabled(): boolean {
    return this.mOptionSrv.isNotificationEnabled();
  }

  public getNotifcationChannels(): NotificationChannel[] {
    return this.mNotificationChannels;
  }

  public toggleNotificationBrowserChannel(hash: string) {
    const channel = this.mNotificationChannels.find(c => c.hash === hash);
    if (!channel) {
      console.warn('invalid channel');
      return;
    }
    channel.browser = !channel.browser;
  }

  public toggleNotificationOsChannel(hash: string) {
    const channel = this.mNotificationChannels.find(c => c.hash === hash);
    if (!channel) {
      console.warn('invalid channel');
      return;
    }
    channel.os = !channel.os;
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

  private applyNotificationChannel() {

  }
}
