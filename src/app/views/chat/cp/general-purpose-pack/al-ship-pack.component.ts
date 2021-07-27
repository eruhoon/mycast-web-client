import { Component, Injector } from '@angular/core';

import { GeneralPurposePackDirective } from './general-purpose-pack.component';
import { GeneralPurposeProperty } from './GeneralPurposeProperty';

@Component({
  selector: 'al-ship-pack',
  templateUrl: './general-purpose-pack.component.html',
  styleUrls: [
    './general-purpose-pack.component.scss',
    './general-purpose-pack.color.scss',
  ],
})
export class AlShipPackComponent extends GeneralPurposePackDirective {
  public constructor(injector: Injector) {
    super(injector);
  }

  protected bind(): GeneralPurposeProperty {
    const raw = JSON.parse(this.message.getMessage());
    return {
      icon: raw.icon,
      link: raw.link,
      title: raw.name,
      subtitle: `${raw.rarity} ${raw.type.name}`,
      showType: 'in-app-browser',
      orientation: 'horizontal',
    };
  }
}
