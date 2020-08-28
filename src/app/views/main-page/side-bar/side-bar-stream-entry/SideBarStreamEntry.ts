import { Stream } from 'src/app/models/stream/Stream';

import { Input, Directive } from '@angular/core';

@Directive()
export class SideBarStreamEntryDirective {
  @Input()
  public stream: Stream;
}
