import { ImagePopupService } from 'src/app/services/image/image-popup.service';

export class ImagePackHandler {

  private mImagePopupService: ImagePopupService;

  private mMenuShow: boolean;
  private mSrcImage: string;

  public constructor(imagePopupService: ImagePopupService) {
    this.mImagePopupService = imagePopupService;
    this.mSrcImage = '';
  }

  public init(src: string): void {
    this.mSrcImage = src;
  }

  public getImage(): string {
    return this.mSrcImage;
  }

  public isMenuShow(): boolean {
    return this.mMenuShow;
  }

  public onHover(hover: boolean): void {
    if (hover) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }

  public showMenu(): void {
    this.mMenuShow = true;
  }

  public hideMenu(): void {
    this.mMenuShow = false;
  }

  public onImageClick(): void {
    this.mImagePopupService.setImage(this.mSrcImage);
  }
}
