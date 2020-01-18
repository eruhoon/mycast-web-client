import { Chat } from 'src/app/models/chat/Chat';

import {
    Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';

@Component({
  selector: 'chat-entry',
  templateUrl: './chat-entry.component.html',
  styleUrls: ['./chat-entry.component.scss']
})
export class ChatEntryComponent {

  @Input() chat: Chat;

  @ViewChild('icon', { static: false }) mIconView: ElementRef<HTMLImageElement>;

  @Output()
  public profileIconSelect = new EventEmitter<string>();

  public constructor() { }

  public getIcon(): string {
    return this.chat.getSender().getIcon().trim();
  }

  public onIconContextMenu(): boolean {
    const iconElm = this.mIconView.nativeElement;
    this.profileIconSelect.emit(iconElm.src);
    return false;
  }

  public onImagePackClick(image: string): void {
    console.log(image);
  }
}
