import { ChatCommand } from 'src/app/models/network/ChatCommand';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { MainService } from 'src/app/services/main/main.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ChatListService } from '../../chat/chat-list/chat-list.service';

@Component({
  selector: 'clipboard-image-popup',
  templateUrl: './clipboard-image-popup.component.html',
  styleUrls: ['./clipboard-image-popup.component.scss'],
})
export class ClipboardImagePopupComponent implements OnInit {
  @ViewChild('focus', { static: true }) mFocus: ElementRef<HTMLImageElement>;

  private mService: ClipboardImageService;
  private mChatCommand: ChatCommand;

  public constructor(
    service: ClipboardImageService,
    chatListSrv: ChatListService,
    mainSrv: MainService
  ) {
    this.mService = service;
    this.mChatCommand = new ChatCommand(chatListSrv, mainSrv.getChatNework());
  }

  public ngOnInit(): void {
    this.mFocus.nativeElement.focus();
  }

  public getCurrentImage(): string | null {
    return this.mService.getCurrentImage();
  }

  public sendImage(): void {
    const text = `사진::${this.getCurrentImage()}`;
    this.mChatCommand.execute(text);
    this.mService.clearImage();
  }

  public onCloseClick(): void {
    this.mService.clearImage();
  }
}
