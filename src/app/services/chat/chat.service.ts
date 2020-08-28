import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private mChatUserListShow: boolean;
  private mEmojiAttachViewShow: boolean;

  public constructor() {
    this.mChatUserListShow = false;
    this.mEmojiAttachViewShow = false;
  }

  public isChatUserListShow(): boolean {
    return this.mChatUserListShow;
  }

  public isEmojiAttachViewShow(): boolean {
    return this.mEmojiAttachViewShow;
  }

  public toggleChatUserList(): void {
    this.mChatUserListShow = !this.mChatUserListShow;
  }

  public toggleEmojiAttachView(): void {
    this.mEmojiAttachViewShow = !this.mEmojiAttachViewShow;
  }
}
