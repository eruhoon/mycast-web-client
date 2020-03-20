import { Injectable } from '@angular/core';
import Axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private mLoading: boolean;
  private mPhotos: any[];
  private mNextStart: number;

  public constructor() {

    this.mPhotos = [];
    this.mNextStart = 0;
    this.mLoading = false;

    this.loadMore();
  }

  public getPhotos(): any[] {
    return this.mPhotos;
  }

  public loadMore(): void {
    console.log('loadMore');
    this.mLoading = true;
    const url = `http://api.mycast.xyz/photo?start=${this.mNextStart}&num=100`;
    Axios.get<any[]>(url).then(res => {
      const photos = res.data;
      this.mPhotos = [...this.mPhotos, ...photos];
      this.mNextStart += 100;
      this.mLoading = false;
    });
  }

  public isLoading(): boolean {
    return this.mLoading;
  }
}
