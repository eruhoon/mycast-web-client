import { Photo } from 'src/app/models/photo/Photo';
import { DateUtils } from 'src/app/models/util/DateUtils';
import { PhotoService } from 'src/app/services/photo/photo.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent {

  private mMenus: Menu[];
  private mCurrentMenuId: number;
  private mService: PhotoService;

  public constructor(service: PhotoService) {
    this.mService = service;
    this.mMenus = [
      { id: 0, icon: 'insert_photo', name: '포토' },
      { id: 1, icon: 'collections_bookmark', name: '앨범' },
    ];
    this.mCurrentMenuId = 0;
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
}

type Menu = {
  id: number,
  icon: string,
  name: string,
};
