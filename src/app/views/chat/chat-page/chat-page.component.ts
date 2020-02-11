import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { CurrentChatService } from 'src/app/services/chat/current-chat.service';
import { MainService } from 'src/app/services/main/main.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  private mCurrentChatService: CurrentChatService;
  private mChatNetwork: ChatNetworkModel;

  public constructor(
    mainService: MainService, currentChatService: CurrentChatService) {

    this.mCurrentChatService = currentChatService;
    this.mChatNetwork = mainService.getChatNework();
  }

  public ngOnInit() {
  }

  public onChatInput(rawChat: string): void {
    this.mChatNetwork.chat(rawChat);
  }

  public onChatEntryIconSelect(icon: string) {
    this.mChatNetwork.chat(icon);
  }

  public getCurrentChats(): Chat[] {
    return this.mCurrentChatService.getChats();
  }
}
