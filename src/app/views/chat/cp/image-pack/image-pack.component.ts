import { ImagePopupService } from 'src/app/services/image/image-popup.service';

import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';

import { ChatListService } from '../../chat-list/chat-list.service';
import { ChatPack } from '../ChatPack';

@Component({
  selector: 'image-pack',
  templateUrl: './image-pack.component.html',
  styleUrls: ['./image-pack.component.scss']
})
export class ImagePackComponent extends ChatPack implements OnInit {

  @Output() packClick: EventEmitter<string>;

  private mImagePopupService: ImagePopupService;
  private mOpen: boolean;
  private mCensored: boolean;
  private mMenuShow: boolean;

  public constructor(
    injector: Injector,
    private mChatListSrv: ChatListService,
    imagePopupService: ImagePopupService) {

    super(injector);
    this.mImagePopupService = imagePopupService;
    this.mOpen = false;
    this.mCensored = false;
    this.mMenuShow = false;
  }

  public ngOnInit(): void {
    this.mOpen = this.isDataSaveMode() ? false : true;
  }

  public getImage(): string {
    if (this.isCensored()) {
      return 'https://opgg-com-image.akamaized.net/attach/images/20190413062321.228538.gif';
    } else {
      return this.message.getMessage().trim();
    }
  }

  public isOpen(): boolean {
    return this.mOpen;
  }

  public isCensored(): boolean {
    return this.mCensored;
  }

  public isMenuShow(): boolean {
    return this.mMenuShow;
  }

  public showMenu(): void {
    this.mMenuShow = true;
  }

  public hideMenu(): void {
    this.mMenuShow = false;
  }

  public openImage(): void {
    this.mOpen = true;
  }

  public toggleCensor(): void {
    this.mCensored = !this.mCensored;
  }

  public onImageClick(): void {
    const image = this.message.getMessage();
    this.mImagePopupService.setImage(image);
  }

  public setErrorImage(): void {
    console.log('todo: errorImage');
  }

  public onImageLoad(): void {
    this.mChatListSrv.scrollToBottom(false);
  }
}
