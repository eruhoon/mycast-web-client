import { Component, EventEmitter, Output } from '@angular/core';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'image-pack',
  templateUrl: './image-pack.component.html',
  styleUrls: ['./image-pack.component.scss']
})
export class ImagePackComponent extends ChatPack {

  @Output() packClick: EventEmitter<string>;

  public constructor() {
    super();
    this.packClick = new EventEmitter<string>();
  }

  protected onImageClick(): void {
    const image = this.message.getMessage();
    this.packClick.emit(image);
  }
}
