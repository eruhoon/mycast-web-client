import { Observable, Subject } from 'rxjs';
import { Chat } from 'src/app/models/chat/Chat';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentChatService {

  private static readonly CHAT_CAPACITY = 100;
  private mChatSubject: Subject<Chat[]>;
  private mChats: Chat[];

  public constructor() {
    this.mChatSubject = new Subject<Chat[]>();
    this.mChats = [];
  }

  public getChats(): Observable<Chat[]> {
    return this.mChatSubject.asObservable();
  }

  public setCurrentChat(chats: Chat[]): void {
    this.mChats = chats;
    this.mChatSubject.next(this.mChats);
  }

  public addChat(chat: Chat): void {
    const newChats = [...this.mChats, chat];
    this.setCurrentChat(newChats.slice(
      newChats.length - CurrentChatService.CHAT_CAPACITY));
  }
}
