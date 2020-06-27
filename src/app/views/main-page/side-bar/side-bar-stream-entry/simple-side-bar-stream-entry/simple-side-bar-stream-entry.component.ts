import { Component, OnInit } from '@angular/core';

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

  public constructor() {
    super();
  }

  public ngOnInit() {
  }
}
