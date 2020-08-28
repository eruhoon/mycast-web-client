import { LinkPopup } from 'src/app/models/link/LinkPopup';
import { LinkPopupService } from 'src/app/services/link/link-popup.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'link-popup',
  templateUrl: './link-popup.component.html',
  styleUrls: ['./link-popup.component.scss'],
})
export class LinkPopupComponent implements OnInit {
  @Input() linkPopup: LinkPopup;

  public title: string;
  private mWidth: number;
  private mHeight: number;
  private mLink: string;
  private mMoveMode: boolean;
  private mService: LinkPopupService;

  public constructor(linkPopupService: LinkPopupService) {
    this.title = 'Untitled';
    this.mWidth = 0;
    this.mHeight = 0;
    this.mLink = '';
    this.mMoveMode = false;
    this.mService = linkPopupService;
  }

  public ngOnInit() {
    this.title = this.linkPopup.getTitle();
    this.mWidth = this.linkPopup.getWidth();
    this.mHeight = this.linkPopup.getHeight();
    this.mLink = this.linkPopup.getLink();
  }

  public isMoveMode(): boolean {
    return this.mMoveMode;
  }

  public getLink(): string {
    return this.mLink;
  }

  public getWidth(): number {
    return this.mWidth;
  }

  public getHeight(): number {
    return this.mHeight;
  }

  public onExit(): void {
    this.mService.removeLink(this.linkPopup);
  }

  public onDragStart(): void {
    this.mMoveMode = true;
  }

  public onDragEnd(): void {
    this.mMoveMode = false;
  }
}
