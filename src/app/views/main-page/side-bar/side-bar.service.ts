import { Stream } from 'src/app/models/stream/Stream';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private mActive: boolean;
  private mStreamPreview: Stream | null;

  public constructor() {
    this.mActive = false;
    this.mStreamPreview = null;
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
  }

  public deactivate(): void {
    this.mActive = false;
    this.mStreamPreview = null;
  }

  public getStreamPreview(): Stream | null { return this.mStreamPreview; }

  public setStreamPreview(stream: Stream): void {
    this.mStreamPreview = stream;
  }
}
