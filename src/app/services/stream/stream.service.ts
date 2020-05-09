
import { StreamSocketModel } from 'src/app/models/stream/socket/StreamSocketModel';
import { Stream } from 'src/app/models/stream/Stream';
import { StreamDtoAdapter } from 'src/app/models/stream/StreamDtoAdapter';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  private mSocket: StreamSocketModel;

  public constructor() {
    this.mSocket = new StreamSocketModel();
  }

  public getLocalStreams(): Stream[] {
    const dtos = this.mSocket.getLocalStreamDtos();
    return dtos.map(dto => new StreamDtoAdapter(dto));
  }

  public getExtreamStreams(): Stream[] {
    const dtos = this.mSocket.getExternalStreamDtos();
    return dtos.map(dto => new StreamDtoAdapter(dto));
  }
}
