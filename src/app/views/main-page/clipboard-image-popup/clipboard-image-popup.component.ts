import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { MainService } from 'src/app/services/main/main.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'clipboard-image-popup',
  templateUrl: './clipboard-image-popup.component.html',
  styleUrls: ['./clipboard-image-popup.component.scss']
})
export class ClipboardImagePopupComponent implements OnInit {

  @ViewChild('focus', { static: true }) mFocus: ElementRef<HTMLImageElement>;

  private mService: ClipboardImageService;
  private mChatNetwork: ChatNetworkModel;

  public constructor(
    service: ClipboardImageService,
    mainService: MainService
  ) {
    this.mService = service;
    this.mChatNetwork = mainService.getChatNework();
  }

  public ngOnInit(): void {
    this.mFocus.nativeElement.focus();
  }

  public getCurrentImage(): string | null {
    return this.mService.getCurrentImage();
  }

  public sendImage(): void {
    this.mChatNetwork.chat(`사진::${this.getCurrentImage()}`);
    this.mService.clearImage();
  }

  public onCloseClick(): void {
    this.mService.clearImage();
  }
}
