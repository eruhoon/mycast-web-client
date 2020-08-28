import { LinkPopup } from 'src/app/models/link/LinkPopup';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkPopupService {
  private mLinks: LinkPopup[];

  public constructor() {
    this.mLinks = [];
  }

  public addLink(link: LinkPopup): boolean {
    if (this.mLinks.every((l) => l.getLink() !== link.getLink())) {
      this.mLinks = [...this.mLinks, link];
      return true;
    } else {
      return false;
    }
  }

  public removeLink(link: LinkPopup): void {
    this.mLinks = this.mLinks.filter((l) => l !== link);
  }

  public getLinks(): LinkPopup[] {
    return this.mLinks;
  }
}
