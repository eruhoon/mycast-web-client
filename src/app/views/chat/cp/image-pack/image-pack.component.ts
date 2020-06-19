import { ImagePopupService } from 'src/app/services/image/image-popup.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';

import { ChatListService } from '../../chat-list/chat-list.service';
import { ChatPack } from '../ChatPack';
import { ImagePackHandler } from './ImagePackHandler';

@Component({
  selector: 'image-pack',
  templateUrl: './image-pack.component.html',
  styleUrls: ['./image-pack.component.scss']
})
export class ImagePackComponent extends ChatPack implements OnInit {

  @Output() packClick: EventEmitter<string>;

  private mHandler: ImagePackHandler;
  private mOpen: boolean;
  private mCensored: boolean;
  private mError: boolean;

  public constructor(
    injector: Injector,
    private mOptionSrv: OptionService,
    private mChatListSrv: ChatListService,
    imagePopupService: ImagePopupService) {

    super(injector);
    this.mHandler = new ImagePackHandler(imagePopupService);
    this.mOpen = false;
    this.mCensored = false;
    this.mError = false;
  }

  public ngOnInit(): void {
    this.mOpen = this.isDataSaveMode() ? false : true;
    const srcImage = this.message.getMessage().trim();
    this.mHandler.init(srcImage);
  }

  public getImage(): string {
    if (this.mError) {
      return 'https://opgg-com-image.akamaized.net/attach/images/20190413062321.228538.gif';
    } else if (this.isCensored()) {
      return 'https://opgg-com-image.akamaized.net/attach/images/20190413062321.228538.gif';
    } else {
      return this.mHandler.getImage();
    }
  }

  public isOpen(): boolean {
    return this.mOpen;
  }

  public isCensored(): boolean {
    return this.mCensored;
  }

  public isMenuShow(): boolean {
    return this.mHandler.isMenuShow();
  }

  public showMenu(): void {
    this.mHandler.showMenu();
  }

  public hideMenu(): void {
    this.mHandler.hideMenu();
  }

  public openImage(): void {
    this.mOpen = true;
  }

  public toggleCensor(): void {
    this.mCensored = !this.mCensored;
  }

  public onImageClick(): void {
    this.mHandler.onImageClick();
  }

  public onImageError(): void {
    this.mError = true;
  }

  public onImageLoad(): void {
    if (!this.mOptionSrv.isScrollLockMode()) {
      this.mChatListSrv.scrollToBottom(false);
    }
  }
}
