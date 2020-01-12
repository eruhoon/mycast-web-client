import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatNetworkModelImpl } from 'src/app/models/network/ChatNetworkModelImpl';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  private static readonly CHAT_CAPACITY = 50;
  private mChatNetwork: ChatNetworkModel | null;
  private mCurrentChats: Chat[];

  constructor() {
    const privateKey = SessionStorage.getInstance().getPrivateKey();
    if (privateKey !== null) {
      this.mChatNetwork = this.createChatNetworkModel(privateKey);
    } else {
      console.error('key was lost');
      this.mChatNetwork = null;
    }
  }

  public ngOnInit() {
  }

  protected onChatInput(rawChat: string): void {
    console.log(rawChat);
    if (this.mChatNetwork !== null) {
      this.mChatNetwork.chat(rawChat);
    }
  }

  protected getCurrentChats(): Chat[] {
    return this.mCurrentChats;
  }

  private createChatNetworkModel(privateKey: string): ChatNetworkModel {
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
    /*this.mCurrentChats.push(chat);
    this.mCurrentChats = this.mCurrentChats.slice(
      this.mCurrentChats.length - ChatPageComponent.CHAT_CAPACITY);*/
    const newChats = [...this.mCurrentChats, chat];
    this.mCurrentChats = newChats.slice(
      newChats.length - ChatPageComponent.CHAT_CAPACITY);
  }
}
