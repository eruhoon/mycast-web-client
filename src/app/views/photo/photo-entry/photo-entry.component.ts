import { PhotoAdultFilterCommand } from 'src/app/models/photo/command/PhotoAdultFilterCommand';
import { PhotoShareCommand } from 'src/app/models/photo/command/PhotoShareCommand';
import { Photo } from 'src/app/models/photo/Photo';
import { PhotoService } from 'src/app/services/photo/photo.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'photo-entry',
  templateUrl: './photo-entry.component.html',
  styleUrls: ['./photo-entry.component.scss']
})
export class PhotoEntryComponent implements OnInit {

  @Input()
  public photo: Photo;

  private mHash: string;
  private mThumbnail: string;
  private mAdult: boolean;
  private mAnimated: boolean;
  private mFilterCommand: PhotoAdultFilterCommand;
  private mShareCommand: PhotoShareCommand;

  public constructor(private mService: PhotoService) {
    this.mHash = '';
    this.mThumbnail = '';
    this.mAdult = false;
    this.mAnimated = false;
  }

  public ngOnInit() {
    this.bind(this.photo);
  }

  public bind(photo: Photo): void {
    const hash = photo.getHash();
    this.mHash = hash;
    this.mThumbnail = PhotoEntryComponent.getThumbanil(hash, false);
    this.mAdult = photo.isForAdult();
    this.mAnimated = PhotoEntryComponent.isGif(photo.getMimeType());
    this.mFilterCommand = new PhotoAdultFilterCommand(this.photo);
    this.mShareCommand = new PhotoShareCommand(this.photo);
  }

  public getThumbnail(): string { return this.mThumbnail; }

  public isForAdult(): boolean { return this.mAdult; }

  public isAnimated(): boolean { return this.mAnimated; }

  public setHover(hover: boolean): void {
    this.mThumbnail = PhotoEntryComponent.getThumbanil(this.mHash, hover);
  }

  public onClick(): void {
    this.mService.setCurrentPhoto(this.photo);
  }

  public onFilterClick(): void {
    const adult = !this.photo.isForAdult();
    this.mFilterCommand.execute(adult).then(result => {
      if (result) {
        this.mService.setAdult(this.photo.getHash(), adult);
        this.mAdult = adult;
      }
    });
  }

  public onLinkClick(): void {
    this.mShareCommand.execute();
  }

  private static isGif(mimeType: string): boolean {
    return !mimeType ? false : mimeType.includes('gif');
  }

  private static getThumbanil(hash: string, hover: boolean): string {
    const suffix = hover ? '' : 'm';
    return `https://i.imgur.com/${hash}${suffix}.png`;
  }
}
