import { OptionService } from 'src/app/services/option/option.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public constructor(
    private mOption: OptionService
  ) {
  }

  public ngOnInit() {
  }

  public isMobile(): boolean { return this.mOption.isMobile(); }
}
