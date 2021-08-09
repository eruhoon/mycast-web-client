import { Component } from '@angular/core';
import { ClipboardManager } from 'src/app/models/clipboard/ClipboardManager';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {
  private mClipboardImageService: ClipboardImageService;
  private mClipboardManager: ClipboardManager;
  #mainService: MainService;
  #chatService: ChatService;

  public constructor(
    mainService: MainService,
    chatService: ChatService,
    clipboardImageService: ClipboardImageService
  ) {
    this.#mainService = mainService;
    this.#chatService = chatService;
    this.mClipboardImageService = clipboardImageService;
    this.mClipboardManager = new ClipboardManager();
  }

  public isChatUserListShow(): boolean {
    return this.#chatService.isChatUserListShow();
  }

  public isEmojiAttachViewShow(): boolean {
    return this.#chatService.isEmojiAttachViewShow();
  }

  public onPaste(event: ClipboardEvent): void {
    if (!event.clipboardData) {
      return;
    }

    this.mClipboardManager.uploadImageCache(event.clipboardData, (imageUri) => {
      this.mClipboardImageService.setCurrentImage(imageUri);
    });
  }

  public onDrop(event: DragEvent): boolean {
    const data = event.dataTransfer;
    const dropResult = this.mClipboardManager.uploadImageCache(data, (uri) => {
      this.mClipboardImageService.setCurrentImage(uri);
    });
    if (!dropResult) {
      this.mClipboardManager.uploadImageCacheWithUrl(data, (uri) => {
        this.mClipboardImageService.setCurrentImage(uri);
      });
    }
    return false;
  }

  public onChatInput(rawChat: string): void {
    this.#mainService.chat(rawChat);
  }

  public onChatEntryIconSelect(icon: string) {
    this.#mainService.chat(icon);
  }
}
