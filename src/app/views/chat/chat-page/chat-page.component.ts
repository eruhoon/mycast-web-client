import { ClipboardManager } from 'src/app/models/clipboard/ClipboardManager';
import { ChatCommand } from 'src/app/models/network/ChatCommand';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { MainService } from 'src/app/services/main/main.service';

import { Component } from '@angular/core';

import { ChatListService } from '../chat-list/chat-list.service';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  private mChatService: ChatService;
  private mClipboardImageService: ClipboardImageService;
  private mClipboardManager: ClipboardManager;
  private mChatCommand: ChatCommand;

  public constructor(
    mainService: MainService,
    chatService: ChatService,
    clipboardImageService: ClipboardImageService,
    chatListSrv: ChatListService) {
    this.mChatService = chatService;
    this.mClipboardImageService = clipboardImageService;
    this.mClipboardManager = new ClipboardManager();
    this.mChatCommand = new ChatCommand(chatListSrv, mainService.getChatNework());
  }

  public isChatUserListShow(): boolean {
    return this.mChatService.isChatUserListShow();
  }

  public onPaste(event: ClipboardEvent): void {
    if (!event.clipboardData) {
      return;
    }

    this.mClipboardManager.uploadImageCache(event.clipboardData, imageUri => {
      this.mClipboardImageService.setCurrentImage(imageUri);
    });
  }

  public onDrop(event: DragEvent): boolean {
    const dataTransfer = event.dataTransfer;
    this.mClipboardManager.uploadImageCache(dataTransfer, imageUri => {
      this.mClipboardImageService.setCurrentImage(imageUri);
    });
    return false;
  }

  public onChatInput(rawChat: string): void {
    this.mChatCommand.execute(rawChat);
  }

  public onChatEntryIconSelect(icon: string) {
    this.mChatCommand.execute(icon);
  }
}
