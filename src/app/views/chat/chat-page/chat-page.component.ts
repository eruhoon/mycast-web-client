import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MainService } from 'src/app/services/main/main.service';

import { Component } from '@angular/core';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  private mChatService: ChatService;
  private mChatNetwork: ChatNetworkModel;

  public constructor(mainService: MainService, chatService: ChatService) {
    this.mChatService = chatService;
    this.mChatNetwork = mainService.getChatNework();
  }

  public isChatUserListShow(): boolean {
    return this.mChatService.isChatUserListShow();
  }

  public onChatInput(rawChat: string): void {
    this.mChatNetwork.chat(rawChat);
  }

  public onChatEntryIconSelect(icon: string) {
    this.mChatNetwork.chat(icon);
  }
}
