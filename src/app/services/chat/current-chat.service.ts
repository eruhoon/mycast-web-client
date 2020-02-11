import { Chat } from 'src/app/models/chat/Chat';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentChatService {

  private static readonly CHAT_CAPACITY = 100;
  private mChats: Chat[];

  public constructor() {
    this.mChats = [];
  }

  public getChats(): Chat[] {
    return this.mChats;
  }

  public setCurrentChat(chats: Chat[]): void {
    this.mChats = chats;
  }

  public addChat(chat: Chat): void {
    const newChats = [...this.mChats, chat];
    this.mChats = newChats.slice(
      newChats.length - CurrentChatService.CHAT_CAPACITY);
  }
}
