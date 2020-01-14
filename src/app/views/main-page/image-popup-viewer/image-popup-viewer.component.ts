import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'image-popup-viewer',
  templateUrl: './image-popup-viewer.component.html',
  styleUrls: ['./image-popup-viewer.component.scss']
})
export class ImagePopupViewerComponent {

  @Output() backgroundClick: EventEmitter<void>;

  public constructor() {
    this.backgroundClick = new EventEmitter<void>();
  }

  protected onBackgroundClick(): void {
    this.backgroundClick.emit();
  }
}
