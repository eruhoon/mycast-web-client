import { Photo } from 'src/app/models/photo/Photo';

import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'photo-entry',
  templateUrl: './photo-entry.component.html',
  styleUrls: ['./photo-entry.component.scss']
})
export class PhotoEntryComponent implements OnInit {

  @Input()
  public photo: Photo;

  private mService: PhotoService;

  public constructor(service: PhotoService) {
    this.mService = service;
  }

  public ngOnInit() {
  }

  public getThumbnail(): string {
    return `https://i.imgur.com/${this.photo.getHash()}m.png`;
  }

  public onClick(): void {
    this.mService.setCurrentPhoto(this.photo);
  }

  public onLinkClick(): void {
    console.log('TODO: LinkClick');
  }
}
