import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modify-stream-modal',
  templateUrl: './modify-stream-modal.component.html',
  styleUrls: ['./modify-stream-modal.component.scss']
})
export class ModifyStreamModalComponent implements OnInit {

  private mPlatforms: PlatformType[];
  private mProfileService: ProfileService;

  public constructor(profileService: ProfileService) {
    this.mPlatforms = [
      { id: 'local', name: '로컬서버', src: '/assets/image/stream/mycast.png' },
      { id: 'totoro', name: '이웃서버', src: '/assets/image/stream/totoro.png' },
      { id: 'afreeca', name: '아프리카', src: '/assets/image/stream/afreeca.png' },
      { id: 'twitch', name: '트위치', src: '/assets/image/stream/twitch.png' },
      { id: 'mixer', name: '믹서', src: '/assets/image/stream/mixer.png' },
    ];
    this.mProfileService = profileService;
  }

  public ngOnInit() {
    this.mProfileService.loadStream();
  }

  public onPlatformClick(platform: PlatformType): void {
    this.mProfileService.requestToChangeStreamPlatform(platform.id);
  }

  public getPlatforms(): PlatformType[] { return this.mPlatforms; }

  public getCurrentPlatform(): string {
    return this.mProfileService.getStreamPlatform();
  }

  public close() {
    this.mProfileService.setModifyMode(ProfileModifyMode.NONE);
  }

}

type PlatformType = { id: string, name: string, src: string };
