import { Component, OnInit } from '@angular/core';
import { ProfileService, ProfileModifyMode } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'modify-checker-modal',
  templateUrl: './modify-checker-modal.component.html',
  styleUrls: ['./modify-checker-modal.component.scss']
})
export class ModifyCheckerModalComponent implements OnInit {

  public platforms: string[];

  public constructor(private mProfileSrv: ProfileService) {
    this.platforms = [
      'afreeca',
      'twitch',
      'youtube',
      'mixer',
    ];
  }

  public ngOnInit() {
  }

  public close() {
    this.mProfileSrv.setModifyMode(ProfileModifyMode.NONE);
  }
}
