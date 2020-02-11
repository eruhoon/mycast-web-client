import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { MainService } from 'src/app/services/main/main.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  private mMainService: MainService;
  private mChatNetwork: ChatNetworkModel;

  public constructor(mainService: MainService) {
    this.mMainService = mainService;
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
    return this.mMainService.getCurrentChats();
  }
}
