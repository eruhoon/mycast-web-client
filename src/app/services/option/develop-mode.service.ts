import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DevelopModeService {
  enabled: boolean;

  constructor() {
    this.enabled = false;
  }
}
