import { Photo } from 'src/app/models/photo/Photo';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'photo-entry',
  templateUrl: './photo-entry.component.html',
  styleUrls: ['./photo-entry.component.scss']
})
export class PhotoEntryComponent implements OnInit {

  @Input()
  public photo: Photo;

  public constructor() { }

  public ngOnInit() {
  }

  public getThumbnail(): string {
    return `https://i.imgur.com/${this.photo.getHash()}m.png`;
  }

}
