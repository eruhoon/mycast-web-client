import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClipboardImageService } from 'src/app/services/clipboard/clipboard-image.service';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'clipboard-image-popup',
  templateUrl: './clipboard-image-popup.component.html',
  styleUrls: ['./clipboard-image-popup.component.scss'],
})
export class ClipboardImagePopupComponent implements OnInit {
  @ViewChild('focus', { static: true }) mFocus: ElementRef<HTMLImageElement>;

  #clipboardImageService: ClipboardImageService;
  #mainService: MainService;

  public constructor(clipboardImage: ClipboardImageService, main: MainService) {
    this.#clipboardImageService = clipboardImage;
    this.#mainService = main;
  }

  public ngOnInit(): void {
    this.mFocus.nativeElement.focus();
  }

  public getCurrentImage(): string | null {
    return this.#clipboardImageService.getCurrentImage();
  }

  public sendImage(): void {
    const text = `사진::${this.getCurrentImage()}`;
    this.#mainService.chat(text);
    this.#clipboardImageService.clearImage();
  }

  public onCloseClick(): void {
    this.#clipboardImageService.clearImage();
  }
}
