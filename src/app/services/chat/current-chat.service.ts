import { Observable, Subject } from 'rxjs';
import { Chat } from 'src/app/models/chat/Chat';
import { ChatContianer as ChatContainer } from 'src/app/models/chat/ChatContainer';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentChatService {

  private mChatSubject: Subject<Chat[]>;
  private mChatContainer: ChatContainer;

  public constructor() {
    this.mChatSubject = new Subject<Chat[]>();
    this.mChatContainer = new ChatContainer([]);
  }

  public getChats(): Observable<Chat[]> {
    return this.mChatSubject.asObservable();
  }

  public setCurrentChat(chats: Chat[]): void {
    this.mChatContainer = new ChatContainer(chats);
    this.mChatSubject.next(this.mChatContainer.toArray());
  }

  public addChat(chat: Chat): void {
    this.mChatContainer.addChat(chat);
    this.mChatSubject.next(this.mChatContainer.toArray());
  }

  public clearChat(): void {
    this.setCurrentChat([]);
  }
}
