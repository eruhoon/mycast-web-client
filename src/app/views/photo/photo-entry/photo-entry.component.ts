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
  public thumbnail: string;
  public isAdult: boolean;
  public isAnimated: boolean;

  private mHash: string;
  private mFilterCommand: PhotoAdultFilterCommand;
  private mShareCommand: PhotoShareCommand;

  public constructor(private mService: PhotoService) {
    this.mHash = '';
    this.thumbnail = '';
    this.isAdult = false;
    this.isAnimated = false;
  }

  public ngOnInit() {
    this.bind(this.photo);
  }

  public bind(photo: Photo): void {
    const hash = photo.getHash();
    this.mHash = hash;
    this.thumbnail = PhotoEntryComponent.getThumbanil(hash, false);
    this.isAdult = photo.isForAdult();
    this.isAnimated = PhotoEntryComponent.isGif(photo.getMimeType());
    this.mFilterCommand = new PhotoAdultFilterCommand(this.photo);
    this.mShareCommand = new PhotoShareCommand(this.photo);
  }

  public setHover(hover: boolean): void {
    this.thumbnail = PhotoEntryComponent.getThumbanil(this.mHash, hover);
  }

  public onClick(): void {
    this.mService.setCurrentPhoto(this.photo);
  }

  public onFilterClick(): void {
    const adult = !this.photo.isForAdult();
    this.mFilterCommand.execute(adult).then(result => {
      if (result) {
        this.mService.setAdult(this.photo.getHash(), adult);
        this.isAdult = adult;
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
