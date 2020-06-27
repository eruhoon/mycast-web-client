import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, OnInit } from '@angular/core';

import { SideBarStreamEntry } from '../SideBarStreamEntry';

@Component({
  selector: 'detail-side-bar-stream-entry',
  templateUrl: './detail-side-bar-stream-entry.component.html',
  styleUrls: [
    './detail-side-bar-stream-entry.component.scss',
    '../side-bar-stream-entry.color.scss'
  ]
})
export class DetailSideBarStreamEntryComponent
  extends SideBarStreamEntry implements OnInit {

  public thumbnail: string;

  public constructor() {
    super();
  }

  public ngOnInit() {
    this.thumbnail = this.stream.getThumbnail();
  }

  public onFavoriteClick(event: Event, stream: Stream): void {
    event.stopPropagation();
    // TODO
    console.log('TODO: favorite');
  }

  public onShareClick(event: Event, stream: Stream): void {
    event.stopPropagation();
    const share = new StreamShareCommand(stream);
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
