import { ChatMessage } from 'src/app/models/chat/ChatMessage';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-pack',
  templateUrl: './image-pack.component.html',
  styleUrls: ['./image-pack.component.scss']
})
export class ImagePackComponent {

  @Input() message: ChatMessage;

  public constructor() {

  }
}
