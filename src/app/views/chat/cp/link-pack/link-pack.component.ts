import { MainService } from 'src/app/services/main/main.service';

import { Component, Injector, OnInit } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';

@Component({
    selector: 'link-pack',
    templateUrl: './link-pack.component.html',
    styleUrls: ['./link-pack.component.scss']
})
export class LinkPackComponent extends ChatPackDirective implements OnInit {

    private mMainService: MainService;
    private mLink: string;
    private mTitle: string;
    private mThumbnail: string;

    public constructor(injector: Injector, mainService: MainService) {
        super(injector);
        this.mMainService = mainService;
    }

    public ngOnInit() {
        try {
            const param: Param = JSON.parse(this.message.getMessage());
            this.mTitle = param.info.title;
            this.mLink = param.uri;
            this.mThumbnail = param.info.thumbnail;
        } catch {
            this.mTitle = 'Link';
            this.mLink = 'link';
            this.mThumbnail = '';
        }
    }

    public onClick(): boolean {
        window.open(this.mLink, '_blank');
        return false;
    }

    public onContextMenu(): boolean {
        this.mMainService.setCurrentLink(this.mLink);
        return false;
    }

    public getThumbnail(): string {
        return this.mThumbnail;
    }

    public getTitle(): string {
        return this.mTitle;
    }

    public getLink(): string {
        return this.mLink;
    }
}

type Param = {
    hash: string,
    uri: string,
    info: {
        host: string,
        thumbnail: string,
        title: string,
    }
};
