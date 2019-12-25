import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Output()
  public menuClick = new EventEmitter();

  @Output()
  public settingClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  protected onMenuClick() {
    console.log('menu clicked');
    this.menuClick.emit();
  }

  protected onSettingClick() {
    this.settingClick.emit();
  }

}
