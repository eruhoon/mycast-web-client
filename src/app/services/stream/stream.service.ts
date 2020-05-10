
import { Injectable } from '@angular/core';
import { StreamSocketModel } from 'src/app/models/stream/socket/StreamSocketModel';
import { Stream } from 'src/app/models/stream/Stream';
import { StreamDto } from 'src/app/models/stream/StreamDto';
import { StreamDtoAdapter } from 'src/app/models/stream/StreamDtoAdapter';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  private mSocket: StreamSocketModel;
  private mLocalStreams: Stream[];
  private mExternalStreams: Stream[];

  public constructor() {
    this.mSocket = new StreamSocketModel();
    this.mSocket.setOnLocalStreamChanged(
      streams => this.onLocalStreamChanged(streams));
    this.mSocket.setOnExtStreamChanged(
      streams => this.onExternalStreamChanged(streams));
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
    this.mLocalStreams = streams;
  }

  private onExternalStreamChanged(raws: StreamDto[]): void {
    const streams = raws.map(dto => new StreamDtoAdapter(dto));
    this.mExternalStreams = streams;
  }
}
