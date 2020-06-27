import { Stream } from 'src/app/models/stream/Stream';

import { Input } from '@angular/core';

export class SideBarStreamEntry {
    @Input()
    public stream: Stream;
}
