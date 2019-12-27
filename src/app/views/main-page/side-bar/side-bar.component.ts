import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExternalStreamListLoader } from 'src/app/models/stream/ExternalStreamListLoader';
import { Stream } from 'src/app/models/stream/Stream';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Output()
  public streamClick = new EventEmitter<Stream>();

  private mTwitchs: Stream[];
  private mKakaos: Stream[];

  constructor() { }

  public ngOnInit() {
    new ExternalStreamListLoader().load(streams => {
      this.mTwitchs = streams.filter(
        stream => stream.getPlatform() === 'twitch');
      this.mKakaos = streams.filter(
        stream => stream.getPlatform() === 'kakaotv');
    });
  }

  public getTwitchList(): Stream[] {
    return this.mTwitchs;
  }

  public getKakaoList(): Stream[] {
    return this.mKakaos;
  }

  protected onStreamClick(stream: Stream): void {
    this.streamClick.emit(stream);
  }
}
