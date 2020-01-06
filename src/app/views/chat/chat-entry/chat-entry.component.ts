import { Component, OnInit, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat/Chat';

@Component({
  selector: 'chat-entry',
  templateUrl: './chat-entry.component.html',
  styleUrls: ['./chat-entry.component.scss']
})
export class ChatEntryComponent implements OnInit {

  @Input() chat: Chat;

  public constructor() { }

  public ngOnInit() { }

}
