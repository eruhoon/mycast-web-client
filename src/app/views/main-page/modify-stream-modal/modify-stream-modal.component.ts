import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modify-stream-modal',
  templateUrl: './modify-stream-modal.component.html',
  styleUrls: ['./modify-stream-modal.component.scss']
})
export class ModifyStreamModalComponent implements OnInit {

  public streamForm: StreamForm;
  private mPlatforms: PlatformType[];
  private mProfileService: ProfileService;

  public constructor(profileService: ProfileService) {
    this.streamForm = {
      backgroundImage: '',
      afreecaId: '',
      mixerId: '',
      twitchId: '',
    };
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
    this.mProfileService.loadStream().then(() => {
      this.streamForm.backgroundImage = this.mProfileService.getStreamBackgroundImage();
      this.streamForm.afreecaId = this.mProfileService.getStreamAfreecaId();
      this.streamForm.twitchId = this.mProfileService.getStreamTwitchId();
      this.streamForm.mixerId = this.mProfileService.getStreamMixerId();
      console.log(this.streamForm);
    });
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

type StreamForm = {
  backgroundImage: string,
  afreecaId: string,
  twitchId: string,
  mixerId: string,
};

type PlatformType = { id: string, name: string, src: string };
