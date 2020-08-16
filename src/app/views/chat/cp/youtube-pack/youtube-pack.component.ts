import { LinkPopupBuilder } from 'src/app/models/link/LinkPopupBuilder';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';
import { MainService } from 'src/app/services/main/main.service';
import { OptionService } from 'src/app/services/option/option.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';

@Component({
    selector: 'youtube-pack',
    templateUrl: './youtube-pack.component.html',
    styleUrls: ['./youtube-pack.component.scss']
})
export class YoutubePackComponent extends ChatPackDirective implements OnInit {

    public time: number;

    private mTitle: string;
    private mDescription: string;
    private mThumbnail: string;
    private mLink: string;

    private mLinkPopup: LinkPopupService;
    private mMainService: MainService;

    public constructor(
        injector: Injector,
        private mOptionSrv: OptionService,
        linkPopup: LinkPopupService,
        mainService: MainService) {

        super(injector);
        this.time = -1;
        this.mLinkPopup = linkPopup;
        this.mMainService = mainService;
    }

    public ngOnInit() {
        try {
            const param: Param = JSON.parse(this.message.getMessage());
            this.time = param.time ? param.time : -1;
            this.mTitle = param.title;
            this.mDescription = param.description;
            this.mThumbnail = param.thumbnail;
            this.mLink = param.link;
        } catch {
            this.mDescription = '';
        }
    }

    public getTitle(): string {
        return this.mTitle;
    }

    public getDescription(): string {
        return this.mDescription;
    }

    public getThumbnail(): string {
        return this.mThumbnail;
    }

    public getTimeStr(): string {
        const h = Math.floor(this.time / 3600);
        const m = Math.floor((this.time % 3600) / 60);
        const s = this.time % 60;
        const hStr = h > 0 ? `${h}h` : '';
        const mStr = h > 0 || m > 0 ? `${m}m` : '';
        const sStr = `${s}s`;
        return `${hStr} ${mStr} ${sStr}`;
    }

    public onClick(): void {
        if (this.mOptionSrv.isMobile()) {
            this.mMainService.setCurrentLink(this.mLink);
        } else {
            this.mLinkPopup.addLink(new LinkPopupBuilder()
                .title('YouTube Viewer')
                .width(480)
                .height(360)
                .link(this.mLink)
                .build());
        }
    }

    public onContextMenu(): boolean {
        this.mMainService.setCurrentLink(this.mLink);
        return false;
    }
}

type Param = {
    title: string,
    time: number | null,
    description: string,
    thumbnail: string,
    link: string,
};
