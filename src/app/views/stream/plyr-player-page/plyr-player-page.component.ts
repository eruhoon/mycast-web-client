import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PlyrComponent, PlyrDriver } from 'ngx-plyr';
import { VegaPlyrDriver } from './VegaPlyrDriver';

export abstract class PlyrPlayerPageComponent implements OnInit {

    @ViewChild(PlyrComponent, { static: false })
    public plyr: PlyrComponent;

    @ViewChild('player', { static: true })
    public mPlayerView: ElementRef<HTMLVideoElement>;

    public player: Plyr;

    driver: PlyrDriver | null = null;

    opts: Plyr.Options = {
        speed: {
            selected: 1,
            options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        },
        clickToPlay: false,
        controls: [
            'play-large',
            'play',
            'mute',
            'volume',
            'pip',
            'airplay',
            'fullscreen',
        ],
    };

    private mRoute: ActivatedRoute;
    private mPlayerId: string;

    public constructor(route: ActivatedRoute) {
        this.mRoute = route;
    }

    public played(event: Plyr.PlyrEvent): void {
    }

    public ngOnInit() {
        this.mRoute.paramMap.subscribe((params) => this.onParamChanged(params));
    }

    public getPlayerId(): string {
        return this.mPlayerId;
    }

    public onWheel(event: WheelEvent): void {
        const isDownward = event.deltaY > 0;
        if (isDownward) {
            this.decreaseVolume();
        } else {
            this.increaseVolume();
        }
    }

    public onReady(event: Plyr.PlyrEvent): void {
        this.player.play();
    }

    public abstract getUrl(): string;

    private onParamChanged(params: ParamMap): void {
        this.mPlayerId = params.get('playerId') || '';
        this.onPlayerIdChanged();
    }

    private onPlayerIdChanged(): void {
        this.driver = new VegaPlyrDriver(this.getUrl());
    }

    private decreaseVolume(): void {
        this.player.decreaseVolume(0.05);
    }

    private increaseVolume(): void {
        this.player.increaseVolume(0.05);
    }
}
