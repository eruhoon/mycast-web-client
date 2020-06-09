import { Injectable } from '@angular/core';
import { ChatListComponent } from './chat-list.component';

@Injectable({
  providedIn: 'root'
})
export class ChatListService {

  private mScroller: ChatListComponent | null;

  public constructor() {
    this.mScroller = null;
  }

  public setScroller(scroller: ChatListComponent): void {
    this.mScroller = scroller;
  }

  public scrollToBottom(isFirst: boolean): void {
    if (this.mScroller) {
      this.mScroller.scrollToBottom(isFirst);
    }
  }
}
