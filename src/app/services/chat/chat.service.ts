import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private mChatUserListShow: boolean;

  public constructor() {
    this.mChatUserListShow = false;
  }

  public isChatUserListShow(): boolean {
    return this.mChatUserListShow;
  }

  public toggleChatUserList(): void {
    this.mChatUserListShow = !this.mChatUserListShow;
  }
}
