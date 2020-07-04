import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService, ProfileModifyMode } from 'src/app/services/profile/profile.service';

import { MutableStream } from 'src/app/models/stream/MutableStream';
import { Stream } from 'src/app/models/stream/Stream';

@Component({
  selector: 'modify-checker-modal',
  templateUrl: './modify-checker-modal.component.html',
  styleUrls: ['./modify-checker-modal.component.scss']
})
export class ModifyCheckerModalComponent implements OnInit {

  @ViewChild('searchName', { static: false })
  public mSearchInput: ElementRef<HTMLInputElement>;
  public platforms: PlatformParam[];
  public currentPlatform: PlatformParam | null;
  public stagedStream: Stream | null;

  public constructor(private mProfileSrv: ProfileService) {
    this.platforms = [
      { name: '트위치', icon: '/assets/image/stream/twitch.png' },
      { name: '아프리카', icon: '/assets/image/stream/afreeca.png' },
      // { name: '유튜브', icon: '/assets/image/stream/youtube.png' },
      // { name: '카카오TV', icon: '/assets/image/stream/kakaotv.png' },
    ];
    this.currentPlatform = null;
    this.stagedStream = null;
  }

  public ngOnInit() {
  }

  public search(): void {
    const searchName = this.mSearchInput.nativeElement.value;
    const searchPlatform = this.currentPlatform;
    this.stagedStream = this.createMockStream();
    console.log('search', searchName, searchPlatform);
  }

  private createMockStream(): Stream {
    const stream = new MutableStream();
    stream.setIcon('https://static-cdn.jtvnw.net/jtv_user_pictures/89e29e2e-f165-40e6-bc0c-d42205935216-profile_image-300x300.png');
    stream.setTitle('침착맨');
    stream.setKeyId('hello');
    stream.setPlatform('twitch');
    return stream;
  }

  public selectPlatform(platform: PlatformParam): void {
    this.currentPlatform = platform;
  }

  public close() {
    this.mProfileSrv.setModifyMode(ProfileModifyMode.NONE);
  }
}

type PlatformParam = {
  name: string,
  icon: string,
};
