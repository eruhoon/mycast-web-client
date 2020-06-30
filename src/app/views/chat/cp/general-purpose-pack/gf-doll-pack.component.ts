import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';
import { GeneralPurposePackComponent } from './general-purpose-pack.component';
import { GeneralPurposeProperty } from './GeneralPurposeProperty';

@Component({
  selector: 'gf-doll-pack',
  templateUrl: './general-purpose-pack.component.html',
  styleUrls: ['./general-purpose-pack.component.scss']
})
export class GfDollPackComponent extends GeneralPurposePackComponent {

  public constructor(injector: Injector) {
    super(injector);
  }

  protected bind(): GeneralPurposeProperty {
    const raw = JSON.parse(this.message.getMessage());
    console.log(raw);
    return {
      icon: raw.icon,
      link: raw.link,
      title: raw.name,
      subtitle: `CV: ${raw.voice}`,
    };
  }
}