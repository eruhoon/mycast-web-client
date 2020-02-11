import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatNetworkModelImpl } from 'src/app/models/network/ChatNetworkModelImpl';
import { NullChatNetworkModel } from 'src/app/models/network/NullChatNetworkModel';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Injectable } from '@angular/core';

import { CurrentChatService } from '../chat/current-chat.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private mCurrentChatService: CurrentChatService;
  private mChatNetwork: ChatNetworkModel;

  public constructor(currentChatService: CurrentChatService) {
    this.mCurrentChatService = currentChatService;
    this.mChatNetwork = this.createChatNetworkModel();
  }

  // TODO: Remove
  public getChatNework(): ChatNetworkModel {
    return this.mChatNetwork;
  }

  private createChatNetworkModel(): ChatNetworkModel {
    const privateKey = SessionStorage.getInstance().getPrivateKey();
    if (privateKey === null) {
      return new NullChatNetworkModel();
    }
    const chatNetwork = new ChatNetworkModelImpl(privateKey);
    chatNetwork.setOnRefreshChatListCallback(
      chats => this.onChatListRefresh(chats));
    chatNetwork.setOnChatCallback(chat => this.onChat(chat));
    return chatNetwork;
  }

  private onChatListRefresh(chats: Chat[]) {
    this.mCurrentChatService.setCurrentChat(chats);
  }

  public onChat(chat: Chat) {
    this.mCurrentChatService.addChat(chat);
  }

}
