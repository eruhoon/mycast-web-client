import { Component, Input, OnInit } from '@angular/core';
import { Stream } from 'src/app/models/stream/Stream';

@Component({
  selector: 'app-external-viewer',
  templateUrl: './external-viewer.component.html',
  styleUrls: ['./external-viewer.component.scss']
})
export class ExternalViewerComponent implements OnInit {

  @Input()
  public stream: Stream;

  constructor() { }

  public ngOnInit() {
  }
}
