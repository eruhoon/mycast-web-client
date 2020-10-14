import { Injectable } from '@angular/core';
import { PageType } from './PageType';

@Injectable({
  providedIn: 'root',
})
export class MobilePageService {
  private mPageType: PageType;

  public constructor() {}

  public setPageType(pageType: PageType): void {
    this.mPageType = pageType;
  }

  public getPageType(): PageType {
    return this.mPageType;
  }
}
