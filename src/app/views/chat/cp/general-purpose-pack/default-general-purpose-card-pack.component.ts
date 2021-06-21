import { Component, Injector } from '@angular/core';
import { GeneralPurposePackDirective } from './general-purpose-pack.component';
import { GeneralPurposeProperty } from './GeneralPurposeProperty';

@Component({
  selector: 'default-general-purpose-card-pack',
  templateUrl: './general-purpose-pack.component.html',
  styleUrls: [
    './general-purpose-pack.component.scss',
    './general-purpose-pack.color.scss',
  ],
})
export class DefaultGeneralPurposeCardPackComponent extends GeneralPurposePackDirective {
  public constructor(injector: Injector) {
    super(injector);
  }

  protected bind(): GeneralPurposeProperty {
    const raw = JSON.parse(this.message.getMessage());
    console.log(raw);
    return {
      icon: raw.icon,
      link: raw.link,
      title: raw.title,
      subtitle: raw.subtitle,
      newWindow: raw.newWindow,
      orientation: raw.orientation || 'horizontal',
    };
  }
}
