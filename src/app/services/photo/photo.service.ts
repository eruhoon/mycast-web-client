import { Injectable } from '@angular/core';
import Axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private mPhotos: any[];

  public constructor() {

    this.mPhotos = [];

    Axios.get<any[]>('http://api.mycast.xyz/photo?start=0&num=10').then(res => {
      console.log(res.data);
      const photos = res.data;
      photos.forEach(photo => {
        console.log(photo);
      });
      this.mPhotos = photos;
    });

  }

  public getPhotos(): any[] {
    return this.mPhotos;
  }
}
