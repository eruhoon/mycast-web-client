import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo/photo.service';

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

  public getPhotos(): any[] {
    return this.mService.getPhotos();
  }

}
