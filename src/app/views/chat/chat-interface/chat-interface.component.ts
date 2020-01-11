import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Keyboard } from 'src/app/models/common/keyboard/Keyboard';

@Component({
  selector: 'chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent implements OnInit {

  @ViewChild('inputBox', { static: false })
  private mInputBox: ElementRef<HTMLInputElement>;

  @Input() chatText: string;

  constructor() { }

  ngOnInit() {
  }

  protected onKeyPress(event: KeyboardEvent): void {
    if (event.keyCode === Keyboard.KEY_ENTER) {
      this.mInputBox.nativeElement.value = '';
    }
  }
}
