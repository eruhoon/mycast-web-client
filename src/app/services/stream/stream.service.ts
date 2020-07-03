import { MutableNotification } from 'src/app/models/notification/MutableNotification';
import { NotificationChannelHash } from 'src/app/models/notification/NotificationChannel';
import { StreamSocketModel } from 'src/app/models/stream/socket/StreamSocketModel';
import { Stream } from 'src/app/models/stream/Stream';
import { StreamDto } from 'src/app/models/stream/StreamDto';
import { StreamDtoAdapter } from 'src/app/models/stream/StreamDtoAdapter';

import { Injectable } from '@angular/core';

import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  private mSocket: StreamSocketModel;
  private mLocalStreams: Stream[];
  private mExternalStreams: Stream[];

  public constructor(
    private mNotificationService: NotificationService) {

    this.mSocket = new StreamSocketModel();
    this.mSocket.setOnLocalStreamChanged(
      streams => this.onLocalStreamChanged(streams));
    this.mSocket.setOnExtStreamChanged(
      streams => this.onExternalStreamChanged(streams));
    this.mSocket.setOnNewLocalStream(
      stream => this.onNewLocalStream(stream));
    this.mLocalStreams = [];
    this.mExternalStreams = [];
  }

  public getLocalStreams(): Stream[] {
    return this.mLocalStreams;
  }

  public getExternalStreams(): Stream[] {
    return this.mExternalStreams;
  }

  private onLocalStreamChanged(raws: StreamDto[]): void {
    const streams = raws.map(dto => new StreamDtoAdapter(dto));
    this.mLocalStreams = this.mergeStreams(this.mLocalStreams, streams);
  }

  private mergeStreams(origins: Stream[], srcs: Stream[]): Stream[] {
    if (this.isEquivalent(origins, srcs)) {
      return origins;
    }
    const duplicated = origins.filter(
      origin => srcs.some(src => src.isEquivalent(origin)));
    const newStreams = srcs.filter(
      src => origins.every(origin => !origin.isEquivalent(src)));
    return [...duplicated, ...newStreams];
  }

  private isEquivalent(a: Stream[], b: Stream[]): boolean {
    if (a.length !== b.length) {
      return false;
    }

    const length = a.length;
    for (let i = 0; i < length; i++) {
      if (!a[i].isEquivalent(b[i])) {
        return false;
      }
    }
    console.log('equal');
    return true;
  }

  private onExternalStreamChanged(raws: StreamDto[]): void {
    const streams = raws.map(dto => new StreamDtoAdapter(dto));
    this.mExternalStreams = this.mergeStreams(this.mExternalStreams, streams);
  }

  private onNewLocalStream(raw: StreamDto): void {
    const noti = new MutableNotification();
    noti.setTitle('새 방송 알림');
    noti.setIcon(raw.icon);
    noti.setBody(`${raw.nickname} 방송을 시작합니다`);
    noti.setMute(true);
    noti.setChannel(NotificationChannelHash.LOCAL_STREAM);
    this.mNotificationService.pushNotification(noti);
  }
}
