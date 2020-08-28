import { LinkPopup } from './LinkPopup';
import { MutableLinkPopup } from './MutableLinkPopup';

export class LinkPopupBuilder {
  private mLinkPopup: MutableLinkPopup;

  public constructor() {
    this.mLinkPopup = new MutableLinkPopup();
  }

  public title(title: string): LinkPopupBuilder {
    this.mLinkPopup.setTitle(title);
    return this;
  }

  public width(w: number): LinkPopupBuilder {
    this.mLinkPopup.setWidth(w);
    return this;
  }

  public height(h: number): LinkPopupBuilder {
    this.mLinkPopup.setHeight(h);
    return this;
  }

  public link(link: string): LinkPopupBuilder {
    this.mLinkPopup.setLink(link);
    return this;
  }

  public build(): LinkPopup {
    return this.mLinkPopup;
  }
}
