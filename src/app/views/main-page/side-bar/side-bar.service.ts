import { Stream } from 'src/app/models/stream/Stream';

import { Injectable } from '@angular/core';
import { SideBarComponent } from './side-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private mView: SideBarComponent | null;
  private mActive: boolean;
  private mStreamPreview: Stream | null;

  public constructor() {
    this.mView = null;
    this.mActive = false;
    this.mStreamPreview = null;
  }

  public setView(view: SideBarComponent): void {
    this.mView = view;
  }

  public isActive(): boolean { return this.mActive; }

  public toggleActive(): void {
    if (this.mActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  public activate(): void {
    this.mActive = true;
    this.notifyActive();
  }

  public deactivate(): void {
    this.mActive = false;
    this.mStreamPreview = null;
    this.notifyDeactive();
  }

  public getStreamPreview(): Stream | null { return this.mStreamPreview; }

  public setStreamPreview(stream: Stream): void {
    this.mStreamPreview = stream;
  }

  private notifyActive(): void {
    if (this.mView !== null) { this.mView.onActivated(); }
  }

  private notifyDeactive(): void {
    if (this.mView !== null) { this.mView.onDeactived(); }
  }
}
