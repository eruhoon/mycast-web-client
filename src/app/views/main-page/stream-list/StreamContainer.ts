import { Stream } from 'src/app/models/stream/Stream';

export class StreamContainer {
  private mStreams: Stream[];

  public constructor() {
    this.mStreams = [];
  }

  public upsert(streams: Stream[]): void {
    this.mStreams = streams;
  }

  public get(): Stream[] {
    return this.mStreams;
  }
}
