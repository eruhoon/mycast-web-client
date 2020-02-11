import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { MainService } from 'src/app/services/main/main.service';

import { Component } from '@angular/core';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  private mChatNetwork: ChatNetworkModel;

  public constructor(mainService: MainService) {
    this.mChatNetwork = mainService.getChatNework();
  }

  public onChatInput(rawChat: string): void {
    this.mChatNetwork.chat(rawChat);
  }

  public onChatEntryIconSelect(icon: string) {
    this.mChatNetwork.chat(icon);
  }
}
