import { Photo } from 'src/app/models/photo/Photo';
import { PhotoShareCommand } from 'src/app/models/photo/share/PhotoShareCommand';
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
  private mShareCommand: PhotoShareCommand;

  public constructor(service: PhotoService) {
    this.mService = service;
  }

  public ngOnInit() {
    this.mShareCommand = new PhotoShareCommand(this.photo);
  }

  public getThumbnail(): string {
    return `https://i.imgur.com/${this.photo.getHash()}m.png`;
  }

  public onClick(): void {
    this.mService.setCurrentPhoto(this.photo);
  }

  public onLinkClick(): void {
    console.log('TODO: LinkClick');
    this.mShareCommand.execute();
  }
}
