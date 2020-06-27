import { ToastService } from 'src/app/services/notification/toast.service';
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
  private mToastService: ToastService;

  public constructor(
    profileService: ProfileService, toastService: ToastService) {

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
    this.mToastService = toastService;
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

  public getLocalId(): string {
    return this.mProfileService.getStreamLocalId();
  }

  public getPlatforms(): PlatformType[] { return this.mPlatforms; }

  public getCurrentPlatform(): string {
    return this.mProfileService.getStreamPlatform();
  }

  public async submit(): Promise<void> {
    const platform = this.mProfileService.getStreamPlatform();
    try {
      await this.mProfileService.requestToChangeStream(
        platform, this.streamForm.backgroundImage, this.streamForm.afreecaId,
        this.streamForm.twitchId, this.streamForm.mixerId);
      this.mToastService.toast('방송설정을 변경했어요!');
    } catch {
      this.mToastService.toast('설정에 문제가 발생했습니다.');
    }
  }

  public close() {
    this.mProfileService.setModifyMode(ProfileModifyMode.NONE);
  }

  public onClick(event: MouseEvent) {
    if (event.target !== event.currentTarget) {
      return;
    }
    close();
  }

}

type StreamForm = {
  backgroundImage: string,
  afreecaId: string,
  twitchId: string,
  mixerId: string,
};

type PlatformType = { id: string, name: string, src: string };
