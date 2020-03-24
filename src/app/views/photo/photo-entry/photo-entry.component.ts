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

  private mService: PhotoService;
  private mFilterCommand: PhotoAdultFilterCommand;
  private mShareCommand: PhotoShareCommand;

  public constructor(service: PhotoService) {
    this.mService = service;
  }

  public ngOnInit() {
    this.mFilterCommand = new PhotoAdultFilterCommand(this.photo);
    this.mShareCommand = new PhotoShareCommand(this.photo);
  }

  public getThumbnail(): string {
    return `https://i.imgur.com/${this.photo.getHash()}m.png`;
  }

  public isForAdult(): boolean {
    return this.photo.isForAdult();
  }

  public isAnimated(): boolean {
    const mimeType = this.photo.getMimeType();
    return !mimeType ? false : mimeType.includes('gif');
  }

  public onClick(): void {
    this.mService.setCurrentPhoto(this.photo);
  }

  public onFilterClick(): void {
    this.mFilterCommand.execute();
  }

  public onLinkClick(): void {
    this.mShareCommand.execute();
  }
}
