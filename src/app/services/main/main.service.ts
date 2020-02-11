import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatNetworkModelImpl } from 'src/app/models/network/ChatNetworkModelImpl';
import { NullChatNetworkModel } from 'src/app/models/network/NullChatNetworkModel';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private static readonly CHAT_CAPACITY = 50;

  private mChatNetwork: ChatNetworkModel;
  private mCurrentChats: Chat[];

  constructor() {
    this.mChatNetwork = this.createChatNetworkModel();
    this.mCurrentChats = [];
  }

  // TODO: Remove
  public getChatNework(): ChatNetworkModel {
    return this.mChatNetwork;
  }

  // TODO: Remove
  public getCurrentChats(): Chat[] {
    return this.mCurrentChats;
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
    this.mCurrentChats = chats;
  }

  public onChat(chat: Chat) {
    const newChats = [...this.mCurrentChats, chat];
    this.mCurrentChats = newChats.slice(
      newChats.length - MainService.CHAT_CAPACITY);
  }

}
