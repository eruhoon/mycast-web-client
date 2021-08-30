import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeCallback } from 'src/app/models/common/callback/TypeCallback';
import { MutableNotification } from 'src/app/models/notification/MutableNotification';
import { NotificationChannelHash } from 'src/app/models/notification/NotificationChannel';
import { StreamSocketModel } from 'src/app/models/stream/socket/StreamSocketModel';
import { Stream } from 'src/app/models/stream/Stream';
import { StreamDto } from 'src/app/models/stream/StreamDto';
import { StreamDtoAdapter } from 'src/app/models/stream/StreamDtoAdapter';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  private mSocket: StreamSocketModel;
  private mLocalStreams: BehaviorSubject<Stream[]>;
  private mExternalStreams: BehaviorSubject<Stream[]>;
  private mObservers: StreamSrvObserver[];

  public constructor(private mNotificationService: NotificationService) {
    this.mSocket = new StreamSocketModel();
    this.mSocket.setOnLocalStreamChanged((streams) =>
      this.onLocalStreamChanged(streams)
    );
    this.mSocket.setOnExtStreamChanged((streams) =>
      this.onExternalStreamChanged(streams)
    );
    this.mSocket.setOnNewLocalStream((stream) => this.onNewLocalStream(stream));

    this.mLocalStreams = new BehaviorSubject<Stream[]>([]);
    this.mExternalStreams = new BehaviorSubject<Stream[]>([]);
    this.mObservers = [];
  }

  public addObserver(observer: StreamSrvObserver): void {
    this.mObservers.push(observer);
  }

  public removeObserver(observer: StreamSrvObserver): void {
    this.mObservers = this.mObservers.filter((o) => o !== observer);
  }

  public getLocalStreams(): Stream[] {
    return this.mLocalStreams.getValue();
  }

  public subscribeLocalStreams(callback: TypeCallback<Stream[]>): void {
    this.mLocalStreams.subscribe(callback);
  }

  public getExternalStreams(): BehaviorSubject<Stream[]> {
    return this.mExternalStreams;
  }

  private onLocalStreamChanged(raws: StreamDto[]): void {
    const streams = raws.map((dto) => new StreamDtoAdapter(dto));
    this.mLocalStreams.next(streams);
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
    return true;
  }

  private onExternalStreamChanged(raws: StreamDto[]): void {
    const streams = raws.map((dto) => new StreamDtoAdapter(dto));
    this.mExternalStreams.next(streams);
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

export interface StreamSrvObserver {
  onLocalStreamChanged(streams: Stream[]): void;
  onExternalStreamChanged(streams: Stream[]): void;
}
