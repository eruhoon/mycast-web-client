import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkContentViewService {

  private mLink: string | null;

  public constructor() {
    this.mLink = null;
  }

  public setLink(link: string | null): void {
    this.mLink = link;
    console.log(this.mLink);
  }

  public getLink(): string | null {
    return this.mLink;
  }
}
