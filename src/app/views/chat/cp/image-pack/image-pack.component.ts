import { ImagePopupService } from 'src/app/services/image/image-popup.service';

import { Component, EventEmitter, Output } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'image-pack',
  templateUrl: './image-pack.component.html',
  styleUrls: ['./image-pack.component.scss']
})
export class ImagePackComponent extends ChatPack {

  @Output() packClick: EventEmitter<string>;

  private mImagePopupService: ImagePopupService;

  public constructor(imagePopupService: ImagePopupService) {
    super();
    this.mImagePopupService = imagePopupService;
  }

  public getImage(): string {
    return this.message.getMessage().trim();
  }

  public onImageClick(): void {
    const image = this.message.getMessage();
    this.mImagePopupService.setImage(image);
  }
}
