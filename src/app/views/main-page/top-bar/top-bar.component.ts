import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  @Output()
  public menuClick = new EventEmitter();

  @Output()
  public settingClick = new EventEmitter();

  constructor() { }

  public onMenuClick() {
    this.menuClick.emit();
  }

  public onSettingClick() {
    this.settingClick.emit();
  }

}
