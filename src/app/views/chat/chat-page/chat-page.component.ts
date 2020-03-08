import { Component } from '@angular/core';
import Axios from 'axios';
import { ClipboardManager } from 'src/app/models/clipboard/ClipboardManager';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MainService } from 'src/app/services/main/main.service';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  private mChatService: ChatService;
  private mClipboardImageService: ClipboardImageService;
  private mChatNetwork: ChatNetworkModel;
  private mClipboardManager: ClipboardManager;

  public constructor(
    mainService: MainService,
    chatService: ChatService,
    clipboardImageService: ClipboardImageService) {
    this.mChatService = chatService;
    this.mClipboardImageService = clipboardImageService;
    this.mChatNetwork = mainService.getChatNework();
    this.mClipboardManager = new ClipboardManager();
  }

  public isChatUserListShow(): boolean {
    return this.mChatService.isChatUserListShow();
  }

  public onPaste(event: ClipboardEvent): void {
    if (!event.clipboardData) return;

    this.mClipboardManager.uploadImageCache(event.clipboardData, imageUri => {
      this.mClipboardImageService.setCurrentImage(imageUri);
    });
  }

  public onChatInput(rawChat: string): void {
    this.mChatNetwork.chat(rawChat);
  }

  public onChatEntryIconSelect(icon: string) {
    this.mChatNetwork.chat(icon);
  }
}
