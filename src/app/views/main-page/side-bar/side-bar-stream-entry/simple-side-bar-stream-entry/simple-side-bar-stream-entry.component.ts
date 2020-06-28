import { Component, OnInit } from '@angular/core';

import { SideBarService } from '../../side-bar.service';
import { SideBarStreamEntry } from '../SideBarStreamEntry';

@Component({
  selector: 'simple-side-bar-stream-entry',
  templateUrl: './simple-side-bar-stream-entry.component.html',
  styleUrls: [
    './simple-side-bar-stream-entry.component.scss',
    '../side-bar-stream-entry.color.scss'
  ]
})
export class SimpleSideBarStreamEntryComponent
  extends SideBarStreamEntry implements OnInit {

  public constructor(private mSideBarSrv: SideBarService) {
    super();
  }

  public ngOnInit() {
  }

  public onSelect(): void {
    this.mSideBarSrv.setStreamPreview(this.stream);
  }
}
