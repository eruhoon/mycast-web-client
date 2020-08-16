import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PlyrPlayerPageDirective } from './plyr-player-page.component';

@Component({
    selector: 'totoro-player-page',
    templateUrl: './plyr-player-page.component.html',
    styleUrls: ['./plyr-player-page.component.scss']
})
export class TotoroPlayerPageComponent
    extends PlyrPlayerPageDirective implements OnInit {

    public constructor(route: ActivatedRoute) {
        super(route);
    }

    public getUrl(): string {
        return `https://parasite.banjai.tv/live/${this.getPlayerId()}.flv`;
    }
}
