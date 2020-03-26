import { Photo } from 'src/app/models/photo/Photo';
import { DateUtils } from 'src/app/models/util/DateUtils';
import { PhotoService } from 'src/app/services/photo/photo.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent implements OnInit {

  private mService: PhotoService;

  public constructor(service: PhotoService) {
    this.mService = service;
  }

  public ngOnInit() {
  }

  public isPhotoDetailShow(): boolean {
    return this.mService.getCurrentPhoto() !== null;
  }
}
