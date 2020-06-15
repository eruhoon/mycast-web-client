import { ClipboardImageParser } from 'src/app/models/clipboard/ClipboardImageParser';
import { PhotoService } from 'src/app/services/photo/photo.service';

import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent {

  @ViewChild('uploadInput', { static: true })
  public uploadInput: ElementRef<HTMLInputElement>;

  private mMenus: Menu[];
  private mCurrentMenuId: number;
  private mService: PhotoService;
  private mImageParser: ClipboardImageParser;

  public constructor(service: PhotoService) {
    this.mService = service;
    this.mMenus = [
      { id: 0, icon: 'insert_photo', name: '포토' },
      // { id: 1, icon: 'collections_bookmark', name: '앨범' },
    ];
    this.mCurrentMenuId = 0;
    this.mImageParser = new ClipboardImageParser();
  }
  public onPaste(event: ClipboardEvent): void {
    const imageFile = this.mImageParser.parseImageFile(event.clipboardData);
    this.uploadImageFile(imageFile);
  }

  public onDrop(event: DragEvent): void {
    const imageFile = this.mImageParser.parseImageFile(event.dataTransfer);
    this.uploadImageFile(imageFile);
  }

  public getMenus(): Menu[] {
    return this.mMenus;
  }

  public getCurrentMenuId(): number {
    return this.mCurrentMenuId;
  }

  public setCurrentMenuId(menuId: number): void {
    this.mCurrentMenuId = menuId;
  }

  public isPhotoDetailShow(): boolean {
    return this.mService.getCurrentPhoto() !== null;
  }

  public getUploadingPhoto(): File | null {
    return this.mService.getUploadingFile();
  }

  public getUploadingFileImage(): string {
    const image = this.mService.getUploadingImage();
    return image || '';
  }

  public getUploadingFileName(): string {
    const photo = this.getUploadingPhoto();
    return photo ? photo.name : 'unknown';
  }

  public getUploadingFileSize(): string {
    const photo = this.getUploadingPhoto();
    if (!photo) {
      return '- KB';
    }
    return `${Math.round(photo.size / 1024 * 10) / 10} KB`;
  }

  public getUploadingFileType(): string {
    const photo = this.getUploadingPhoto();
    if (!photo) {
      return 'PNG';
    }
    try {
      return photo.type.split('/')[1].toUpperCase();
    } catch {
      return 'PNG';
    }
  }

  public isUploading(): boolean {
    return this.mService.isUploading();
  }

  public onClickUpload(): void {
    this.uploadInput.nativeElement.click();
  }

  public onUploadFileStaged(): void {
    const elm = this.uploadInput.nativeElement;
    if (!elm.files) {
      return;
    }
    const item = elm.files[0];
    this.uploadImageFile(item);
  }

  private uploadImageFile(imageFile: File | null): void {
    if (!imageFile) {
      console.error('null image');
      return;
    }
    this.mService.addPhotoByFile(imageFile);
  }
}

type Menu = {
  id: number,
  icon: string,
  name: string,
};
