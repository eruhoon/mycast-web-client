import { Component, Injector, OnInit } from '@angular/core';

import { ChatPackDirective } from '../ChatPack';

@Component({
    selector: 'cv-pack',
    templateUrl: './cv-pack.component.html',
    styleUrls: ['./cv-pack.component.scss', './cv-pack.color.scss']
})
export class CvPackComponent extends ChatPackDirective implements OnInit {

    public name: string;
    public link: string;
    public characters: Character[];

    public constructor(injector: Injector) {
        super(injector);
        this.name = '';
        this.link = '';
        this.characters = [];
    }

    public ngOnInit() {
        try {
            const raw = JSON.parse(this.message.getMessage()) as Param;
            this.bind(raw);
        } catch (e) {
            console.error(e);
        }
    }

    public onClick(): void {
        window.open(this.link, '_blank', 'width=800');
    }

    private bind(raw: Param): void {
        this.name = raw.name;
        this.link = raw.link;
        this.characters = raw.characters.map(rawCharacter => {
            const description = rawCharacter.description;
            const icon = rawCharacter.icon;
            const regex = /\[.*]\[.*]\s*(.*?)\s*\((.*?)\)/;
            const match = regex.exec(description) || [];
            return { name: { ko: match[1], en: match[2] }, icon };
        }).sort((a, b) => {
            const isInvalid = (str: string) => !str || str.length === 0 || str.includes('blank');
            if (isInvalid(a.icon) && isInvalid(b.icon)) {
                return a.name.ko.localeCompare(b.name.ko);
            } else if (isInvalid(a.icon)) {
                return 1;
            } else if (isInvalid(b.icon)) {
                return -1;
            } else {
                return a.name.ko.localeCompare(b.name.ko);
            }
        });
    }
}

type Param = {
    name: string,
    link: string,
    characters: RawCharacterParam[],
};

type RawCharacterParam = {
    description: string,
    icon: string,
};

type Character = {
    name: CharacterName,
    icon: string,
};

type CharacterName = {
    ko: string,
    en: string,
};
