import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatNetworkModelImpl } from 'src/app/models/network/ChatNetworkModelImpl';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Component, OnInit } from '@angular/core';
import { NullChatNetworkModel } from 'src/app/models/network/NullChatNetworkModel';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  private static readonly CHAT_CAPACITY = 50;
  private mChatNetwork: ChatNetworkModel;
  private mCurrentChats: Chat[];

  constructor() {
    this.mChatNetwork = this.createChatNetworkModel();
  }

  public ngOnInit() {
  }

  protected onChatInput(rawChat: string): void {
    console.log(rawChat);
    this.mChatNetwork.chat(rawChat);
  }

  protected onChatEntryIconSelect(icon: string) {
    this.mChatNetwork.chat(icon);
  }

  protected getCurrentChats(): Chat[] {
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

  private onChat(chat: Chat) {
    const newChats = [...this.mCurrentChats, chat];
    this.mCurrentChats = newChats.slice(
      newChats.length - ChatPageComponent.CHAT_CAPACITY);
  }
}
