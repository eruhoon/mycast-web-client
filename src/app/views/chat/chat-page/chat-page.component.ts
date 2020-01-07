import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatNetworkModelImpl } from 'src/app/models/network/ChatNetworkModelImpl';
import { WebSocketModel } from 'src/app/models/socket/WebSocketModel';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  private mCurrentChats: Chat[];

  constructor() {
    const privateKey = SessionStorage.getInstance().getPrivateKey();
    if (privateKey !== null) {
      this.initChatNetworkModel(privateKey);
    } else {
      console.error('key was lost');
    }
  }

  public ngOnInit() {
  }

  protected getCurrentChats(): Chat[] {
    return this.mCurrentChats;
  }

  private initChatNetworkModel(privateKey: string) {
    const chatNetwork = new ChatNetworkModelImpl(privateKey);
    chatNetwork.setOnRefreshChatListCallback(
      chats => this.onChatListRefresh(chats));

  }

  private onChatListRefresh(chats: Chat[]) {
    this.mCurrentChats = chats;
  }
}
