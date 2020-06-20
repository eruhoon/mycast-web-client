import { ImagePopupService } from 'src/app/services/image/image-popup.service';

import { ImagePackHandler } from './ImagePackHandler';

export class ImagePackMobileHandler extends ImagePackHandler {

    private mStatus: Status;

    public constructor(imagePopupSrv: ImagePopupService) {
        super(imagePopupSrv);

        this.mStatus = Status.DEFAULT;
    }

    public onImageClick(): void {
        switch (this.mStatus) {
            case Status.DEFAULT:
                this.showMenu();
                this.mStatus = Status.FOCUS;
                break;
            case Status.FOCUS:
                super.onImageClick();
                this.mStatus = Status.DEFAULT;
                break;
            default:
                console.error('invalid status');
        }
    }

    public onHover(hover: boolean): void {
        if (!hover) {
            this.hideMenu();
            this.mStatus = Status.DEFAULT;
        }
    }
}

const enum Status {
    DEFAULT,
    FOCUS,
}
