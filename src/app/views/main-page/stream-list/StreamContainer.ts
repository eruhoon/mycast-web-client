import { Stream } from 'src/app/models/stream/Stream';
import { MutableStream } from 'src/app/models/stream/MutableStream';

export class StreamContainer {
  private mStreams: MutableStream[];

  public constructor() {
    this.mStreams = [];
  }

  public updateAll(streams: Stream[]): void {
    this.mStreams = this.mStreams.filter((oldStream) =>
      streams.some((newStream) => this.isEquals(oldStream, newStream))
    );
    streams.forEach((newStream) => {
      this.upsert(newStream);
    });
  }

  public upsert(stream: Stream): void {
    const found = this.mStreams.find((s) => this.isEquals(s, stream));
    if (found) {
      found.update(stream);
    } else {
      const newStream = new MutableStream();
      newStream.update(stream);
      this.mStreams.push(newStream);
    }
  }

  public get(): Stream[] {
    return this.mStreams;
  }

  private isEquals(a: Stream, b: Stream): boolean {
    return a.getPlatform() === b.getPlatform() && a.getKeyId() === b.getKeyId();
  }
}
