import { ImagePopupService } from 'src/app/services/image/image-popup.service';

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'image-popup-viewer',
  templateUrl: './image-popup-viewer.component.html',
  styleUrls: ['./image-popup-viewer.component.scss'],
})
export class ImagePopupViewerComponent {
  @Output() backgroundClick: EventEmitter<void>;

  private mImagePopupService: ImagePopupService;

  public constructor(imagePopupService: ImagePopupService) {
    this.mImagePopupService = imagePopupService;
    this.backgroundClick = new EventEmitter<void>();
  }

  public getImage(): string {
    const image = this.mImagePopupService.getImage();
    return image !== null ? image : '';
  }

  public onBackgroundClick(): void {
    this.backgroundClick.emit();
  }

  public onImageClick(): boolean {
    return false;
  }
}
