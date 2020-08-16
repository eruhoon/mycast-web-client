import { Stream } from 'src/app/models/stream/Stream';

import { Input, Directive } from '@angular/core';

@Directive()
export class SideBarStreamEntry {
    @Input()
    public stream: Stream;
}
