import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StageStreamCommand } from 'src/app/models/stream/stage/StageStreamCommand';
import { ToastService } from 'src/app/services/notification/toast.service';
import { ProfileModifyMode, ProfileService } from 'src/app/services/profile/profile.service';

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
  public stagedStream: StagedStream | null;
  public searching: boolean;

  public constructor(
    private mProfileSrv: ProfileService,
    private mToastSrv: ToastService,
  ) {
    this.platforms = [
      { id: 'twitch', name: '트위치', icon: '/assets/image/stream/twitch.png' },
      { id: 'afreeca', name: '아프리카', icon: '/assets/image/stream/afreeca.png' },
      // { name: '유튜브', icon: '/assets/image/stream/youtube.png' },
      // { name: '카카오TV', icon: '/assets/image/stream/kakaotv.png' },
    ];
    this.currentPlatform = null;
    this.stagedStream = null;
    this.searching = false;
  }

  public ngOnInit() {
  }

  public search(): void {
    this.searching = true;
    const searchPlatform = this.currentPlatform;
    const searchName = this.mSearchInput.nativeElement.value;
    if (!searchPlatform) {
      this.mToastSrv.toast('플랫폼을 선택해주세요.');
      return;
    }

    if (searchName.length === 0) {
      this.mToastSrv.toast('ID를 입력해주세요.');
      return;
    }

    const command = new StageStreamCommand(searchPlatform.id, searchName);
    command.execute().then(staged => {
      if (staged === null) {
        this.mToastSrv.toast('검색결과가 없습니다.');
        return;
      }
      this.stagedStream = staged;
    }).finally(() => {
      this.searching = false;
    });
  }

  public selectPlatform(platform: PlatformParam): void {
    this.currentPlatform = platform;
  }

  public close() {
    this.mProfileSrv.setModifyMode(ProfileModifyMode.NONE);
  }
}

type PlatformParam = {
  id: string,
  name: string,
  icon: string,
};
