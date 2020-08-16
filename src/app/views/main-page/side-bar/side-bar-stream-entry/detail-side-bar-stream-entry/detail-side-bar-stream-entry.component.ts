import { StreamShareCommand } from 'src/app/models/stream/share/StreamShareCommand';
import { Stream } from 'src/app/models/stream/Stream';

import { Component, OnInit } from '@angular/core';

import { SideBarStreamEntryDirective } from '../SideBarStreamEntry';
import { FavoriteStreamService } from 'src/app/services/stream/favorite-stream.service';
import { ToastService } from 'src/app/services/notification/toast.service';

@Component({
    selector: 'detail-side-bar-stream-entry',
    templateUrl: './detail-side-bar-stream-entry.component.html',
    styleUrls: [
        './detail-side-bar-stream-entry.component.scss',
        '../side-bar-stream-entry.color.scss'
    ]
})
export class DetailSideBarStreamEntryComponent
    extends SideBarStreamEntryDirective implements OnInit {

    public thumbnail: string;

    private mKeyId: string;
    private mPlatform: string;

    public constructor(
        private mFavoriteSrv: FavoriteStreamService,
        private mToastSrv: ToastService) {
        super();
    }

    public ngOnInit() {
        this.thumbnail = this.stream.getThumbnail();
        this.mKeyId = this.stream.getKeyId();
        this.mPlatform = this.stream.getPlatform();
    }

    public isFavorite(): boolean {
        return this.mFavoriteSrv.isFavorite(this.mPlatform, this.mKeyId);
    }

    public onFavoriteClick(event: Event, stream: Stream): void {
        event.stopPropagation();
        if (!this.isFavorite()) {
            this.mFavoriteSrv.addFavorite(this.mPlatform, this.mKeyId);
            this.mToastSrv.toast('즐겨찾기로 설정되었습니다.');
        } else {
            this.mFavoriteSrv.removeFavorite(this.mPlatform, this.mKeyId);
            this.mToastSrv.toast('즐겨찾기가 해제되었습니다.');
        }
    }

    public onShareClick(event: Event, stream: Stream): void {
        event.stopPropagation();
        const share = new StreamShareCommand(stream);
        share.execute();
    }

    public onThumbnailError(): void {
        this.thumbnail = '/assets/image/stream/live-no-tum-img.png';
    }

    public onNewWindowClick(event: Event, stream: Stream): void {
        event.stopPropagation();
        window.open(stream.getUrl(), '_blank', 'width=800');
    }
}
