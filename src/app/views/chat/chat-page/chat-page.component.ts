import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MainService } from 'src/app/services/main/main.service';

import { Component } from '@angular/core';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  private mChatService: ChatService;
  private mChatNetwork: ChatNetworkModel;

  public constructor(mainService: MainService, chatService: ChatService) {
    this.mChatService = chatService;
    this.mChatNetwork = mainService.getChatNework();
  }

  public isChatUserListShow(): boolean {
    return this.mChatService.isChatUserListShow();
  }

  public onPaste(event: ClipboardEvent): void {
    if (!event.clipboardData || !event.clipboardData.items) return;
    const items = event.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let blob: File | null = null;
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
        console.log(blob);
      }
    }
    //let items = event.originalEvent['clipboardData'].items;

    // let blob: File = null;
    // for (let item of items) {
    //   if (item.type.indexOf('image') === 0) {
    //     blob = item.getAsFile(new Date().getTime() + '.png');
    //   }
    // }

    // if (!blob) return;

    // const formData = new FormData();
    // formData.append('image', blob);
    // let url = 'http://mycast.xyz:8001/cache';
    // $.ajax({
    //   contentType: false,
    //   data: formData,
    //   processData: false,
    //   type: 'POST',
    //   url: url,
    // }).done(data => {
    //   if (!data) return;
    //   let imageUri = data;
    //   let dialog = new ClipboardImageDialog({ imageUri });
    //   dialog.open();
    // });
  }

  public onChatInput(rawChat: string): void {
    this.mChatNetwork.chat(rawChat);
  }

  public onChatEntryIconSelect(icon: string) {
    this.mChatNetwork.chat(icon);
  }
}
