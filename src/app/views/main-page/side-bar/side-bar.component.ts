import { Stream } from 'src/app/models/stream/Stream';
import { MainService } from 'src/app/services/main/main.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';
import { StreamService } from 'src/app/services/stream/stream.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss', './side-bar.color.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    private mMainService: MainService,
    private mStreamSrv: StreamService,
    private mProfileSrv: ProfileService) {
  }

  public ngOnInit() { }

  public getLocalStreamList(): Stream[] {
    return this.mStreamSrv.getLocalStreams();
  }

  public getTwitchList(): Stream[] {
    return this.mStreamSrv.getExternalStreams()
      .filter(stream => stream.getPlatform() === 'twitch');
  }

  public getAfreecaList(): Stream[] {
    return this.mStreamSrv.getExternalStreams()
      .filter(stream => stream.getPlatform() === 'afreeca');
  }

  public getYoutubeList(): Stream[] {
    return this.mStreamSrv.getExternalStreams()
      .filter(stream => stream.getPlatform() === 'youtube');
  }

  public getKakaoList(): Stream[] {
    return this.mStreamSrv.getExternalStreams()
      .filter(stream => stream.getPlatform() === 'kakaotv');
  }

  public onMemoClick(): void {
    this.mMainService.setCurrentLink('./memo');
    this.mMainService.closeSidebar();
  }

  public onPhotoClick(): void {
    this.mMainService.setCurrentLink('./photo');
    this.mMainService.closeSidebar();
  }

  public onStreamConfigClick(): void {
    this.mProfileSrv.setModifyMode(ProfileModifyMode.STREAM_ADD);
  }
}
