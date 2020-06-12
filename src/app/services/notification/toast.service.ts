import { DefaultToast } from 'src/app/models/notification/DefaultToast';
import { Toast } from 'src/app/models/notification/Toast';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private static readonly SHOW_INTERVAL = 3000;

  private mToasts: Toast[];

  public constructor() {
    this.mToasts = [];
  }

  public toast(msg: string): void {
    const toast = new DefaultToast(msg);
    this.mToasts.push(toast);

    setTimeout(() => {
      this.mToasts = this.mToasts.filter(
        t => t.getHash() !== toast.getHash());
    }, ToastService.SHOW_INTERVAL);
  }

  public getToasts(): Toast[] {
    return this.mToasts;
  }
}
