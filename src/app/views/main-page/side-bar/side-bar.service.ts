import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private mActive: boolean;

  public constructor() {
    this.mActive = false;
  }

  public isActive(): boolean { return this.mActive; }

  public toggleActive(): void { this.mActive = !this.mActive; }

  public setActive(active: boolean): void { this.mActive = active; }
}
