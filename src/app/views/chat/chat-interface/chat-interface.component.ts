import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent implements OnInit {

  @Input() chatText: string;

  @Output() chatInput = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  protected onEnter(chatStr: string): void {
    this.chatInput.emit(chatStr);
  }
}
