import { ChatMessage } from 'src/app/models/chat/ChatMessage';

import { Component, Input } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'image-pack',
  templateUrl: './image-pack.component.html',
  styleUrls: ['./image-pack.component.scss']
})
export class ImagePackComponent extends ChatPack {

  public constructor() {
    super();
  }
}
