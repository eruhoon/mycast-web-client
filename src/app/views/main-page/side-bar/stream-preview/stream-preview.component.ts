
import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'stream-preview',
  templateUrl: './stream-preview.component.html',
  styleUrls: [
    './stream-preview.component.scss',
    './stream-preview.color.scss',
  ]
})
export class StreamPreviewComponent implements OnInit, OnChanges {

  @Input()
  public preview: Stream;
  public thumbnail: string;

  public constructor() { }

  public ngOnInit() {
    this.thumbnail = this.preview.getThumbnail();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.thumbnail = this.preview.getThumbnail();
  }

  public onFavoriteClick(event: Event): void {
    event.stopPropagation();
    // TODO
    console.log('TODO: favorite');
  }

  public onShareClick(event: Event): void {
    event.stopPropagation();
    const share = new StreamShareCommand(this.preview);
    share.execute();
  }

  public onThumbnailError(): void {
    this.thumbnail = '/assets/image/stream/live-no-tum-img.png';
  }

  public onNewWindowClick(event: Event, stream: Stream): void {
    event.stopPropagation();
    window.open(stream.getUrl(), '_blank', 'width=800');
  }

}
