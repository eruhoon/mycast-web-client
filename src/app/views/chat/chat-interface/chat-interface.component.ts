import { ChatHistoryList } from 'src/app/models/chat/history/ChatHistoryList';
import { ClipboardManager } from 'src/app/models/clipboard/ClipboardManager';
import { ChatService } from 'src/app/services/chat/chat.service';
import { CurrentChatService } from 'src/app/services/chat/current-chat.service';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { OptionService } from 'src/app/services/option/option.service';

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { ChatListService } from '../chat-list/chat-list.service';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss', './chat-interface.color.scss'],
})
export class ChatInterfaceComponent implements OnInit {
  @Input()
  chatText: string;

  @Output()
  chatInput = new EventEmitter<string>();

  @ViewChild('inputBox', { static: false })
  private mInputBox: ElementRef<HTMLInputElement>;
  @ViewChild('imageInput', { static: false })
  private mImageInput: ElementRef<HTMLInputElement>;
  private mChatHistoryList: ChatHistoryList;
  private mChatService: ChatService;
  private mOptionService: OptionService;
  private mCurrentChatService: CurrentChatService;
  private mClipboardManager: ClipboardManager;
  private mEmojiMenuActive: boolean;

  constructor(
    private mMainSrv: MainService,
    chatService: ChatService,
    optionService: OptionService,
    currentChatService: CurrentChatService,
    private mClipboardImageService: ClipboardImageService,
    private mChatListService: ChatListService
  ) {
    this.mChatService = chatService;
    this.mOptionService = optionService;
    this.mCurrentChatService = currentChatService;
    this.mChatHistoryList = new ChatHistoryList();
    this.mClipboardManager = new ClipboardManager();
    this.mEmojiMenuActive = false;
  }

  ngOnInit() {}

  public isOpen(): boolean {
    return this.mMainSrv.isOpen();
  }

  public setInput(input: string): void {
    this.getInputBox().value = input;
  }

  public getInput(): string {
    const inputBox = this.mInputBox.nativeElement;
    return inputBox.value;
  }

  public clearInput(): void {
    this.setInput('');
  }

  public isChatUserListShow(): boolean {
    return this.mChatService.isChatUserListShow();
  }

  public onChatUserButtonClick(): void {
    this.mChatService.toggleChatUserList();
  }

  public onChatClearButtonClick(): void {
    this.mCurrentChatService.clearChat();
  }

  public onPressEnter(): boolean {
    const input = this.getInput();
    this.sendChat(input);
    this.clearInput();
    return false;
  }

  public onPressUp(): boolean {
    this.setInput(this.getPrevChat());
    return false;
  }

  public onPressDown(): boolean {
    this.setInput(this.getNextChat());
    return false;
  }

  public isMobile(): boolean {
    return this.mOptionService.isMobile();
  }

  public isScrollLockMode(): boolean {
    return this.mOptionService.isScrollLockMode();
  }

  public enableScrollLockMode(): void {
    this.mOptionService.setScrollLockMode(true);
  }

  public disableScrollLockMode(): void {
    this.mOptionService.setScrollLockMode(false);
    this.mChatListService.scrollToBottom(false);
  }

  public toggleScrollLockMode(): void {
    const scrollLock = this.mOptionService.isScrollLockMode();
    if (scrollLock) {
      this.disableScrollLockMode();
    } else {
      this.enableScrollLockMode();
    }
  }

  public openUploadImageDialog(): void {
    this.mImageInput.nativeElement.click();
  }

  public toggleEmojiMenu(): void {
    this.mChatService.toggleEmojiAttachView();
    /*if (this.mEmojiMenuActive) {
            this.closeEmojiMenu();
        } else {
            this.openEmojiMenu();
        }*/
  }

  public openEmojiMenu(): void {
    this.mEmojiMenuActive = true;
    this.chatInput.emit('🤔');
  }

  public closeEmojiMenu(): void {
    this.mEmojiMenuActive = false;
  }

  public uploadImage(): void {
    const elm = this.mImageInput.nativeElement;
    const files = elm ? elm.files : null;
    const file = files ? files.item(0) : null;
    if (!file) {
      console.warn('image not found');
      return;
    }
    this.mClipboardManager.uploadImageCacheWithFile(file, (imageUri) => {
      this.mClipboardImageService.setCurrentImage(imageUri);
      elm.value = '';
    });
  }

  private sendChat(input: string | null): void {
    if (!input) {
      return;
    }
    this.chatInput.emit(input);
    this.mChatHistoryList.addHistory(input);
    this.mChatHistoryList.resetIndex();
  }

  private getPrevChat(): string {
    if (this.mChatHistoryList.isEmpty()) {
      return '';
    }
    return this.mChatHistoryList.getPrev();
  }

  private getNextChat(): string {
    if (this.mChatHistoryList.isEmpty()) {
      return '';
    }
    return this.mChatHistoryList.getNext();
  }

  private getInputBox(): HTMLInputElement {
    return this.mInputBox.nativeElement;
  }
}
