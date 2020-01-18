import { Stream } from 'src/app/models/stream/Stream';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stream-viewer',
  templateUrl: './stream-viewer.component.html',
  styleUrls: ['./stream-viewer.component.scss']
})
export class StreamViewerComponent implements OnInit, OnChanges {

  @Input()
  public stream: Stream;

  private mLocalStream: Stream | null;
  private mExternalStream: Stream | null;

  public constructor() {
    this.mLocalStream = null;
    this.mExternalStream = null;
  }

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.isLocal()) {
      this.mLocalStream = this.stream;
      this.mExternalStream = null;
    } else {
      this.mLocalStream = null;
      this.mExternalStream = this.stream;
    }
  }

  public isLocal(): boolean {
    return this.stream.getPlatform() === 'local';
  }

  public getLocalStream(): Stream | null {
    return this.mLocalStream;
  }

  public getExternalStream(): Stream | null {
    return this.mExternalStream;
  }
}
