import { ImagePopupService } from 'src/app/services/image/image-popup.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'image-pack',
  templateUrl: './image-pack.component.html',
  styleUrls: ['./image-pack.component.scss']
})
export class ImagePackComponent extends ChatPack implements OnInit {

  @Output() packClick: EventEmitter<string>;

  private mImagePopupService: ImagePopupService;
  private mOptionService: OptionService;
  private mOpen: boolean;

  public constructor(
    imagePopupService: ImagePopupService,
    optionService: OptionService) {

    super();
    this.mImagePopupService = imagePopupService;
    this.mOptionService = optionService;
    this.mOpen = false;
  }

  public ngOnInit(): void {
    this.mOpen = this.mOptionService.isDataSaveMode() ? false : true;
  }

  public getImage(): string {
    return this.message.getMessage().trim();
  }

  public isOpen(): boolean {
    return this.mOpen;
  }

  public openImage(): void {
    this.mOpen = true;
  }

  public onImageClick(): void {
    const image = this.message.getMessage();
    this.mImagePopupService.setImage(image);
  }
}
