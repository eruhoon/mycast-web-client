import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'link-content-viewer',
  templateUrl: './link-content-viewer.component.html',
  styleUrls: ['./link-content-viewer.component.scss']
})
export class LinkContentViewerComponent implements OnInit {

  @Input() link: string | null;

  public constructor() {
    this.link = null;
  }

  ngOnInit() { }

}
