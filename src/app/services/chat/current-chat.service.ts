import { Observable, Subject } from 'rxjs';
import { Chat } from 'src/app/models/chat/Chat';
import { ChatContianer as ChatContainer } from 'src/app/models/chat/ChatContainer';
import { TypeCallback } from 'src/app/models/common/callback/TypeCallback';

import { Injectable } from '@angular/core';
import { UpdateLinkResponse } from 'src/app/models/socket/WebSocketModel';
import { ReactionResponse } from 'src/app/models/socket/VegaChatSocketModel';

@Injectable({
  providedIn: 'root',
})
export class CurrentChatService {
  private mChatSubject: Subject<Chat[]>;
  private mChatContainer: ChatContainer;

  public constructor() {
    this.mChatSubject = new Subject<Chat[]>();
    this.mChatContainer = new ChatContainer([]);
  }

  public subscribeChat(callback: TypeCallback<Chat[]>): void {
    const observable = this.mChatSubject.asObservable();
    observable.subscribe(callback);
  }

  public getChats(): Observable<Chat[]> {
    return this.mChatSubject.asObservable();
  }

  public updateLink(link: UpdateLinkResponse): void {
    this.mChatContainer.updateLink(link);
    this.mChatSubject.next(this.mChatContainer.toArray());
  }

  public setCurrentChat(chats: Chat[]): void {
    this.mChatContainer = new ChatContainer(chats);
    this.mChatSubject.next(this.mChatContainer.toArray());
  }

  public addChat(chat: Chat): void {
    this.mChatContainer.addChat(chat);
    this.mChatSubject.next(this.mChatContainer.toArray());
  }

  reaction(reaction: ReactionResponse): void {
    this.mChatContainer.addReaction(reaction);
    this.mChatSubject.next(this.mChatContainer.toArray());
  }

  public clearChat(): void {
    this.setCurrentChat([]);
  }
}
