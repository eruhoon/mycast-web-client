import { Injectable } from '@angular/core';
import { Toast } from 'src/app/models/notification/Toast';
import { DefaultToast } from 'src/app/models/notification/DefaultToast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private static readonly SHOW_INTERVAL = 3000;

  private mToasts: Toast[];

  public constructor() {
  }

  public toast(msg: string): void {
    const toast = new DefaultToast(msg);
    this.mToasts.push();

    setTimeout(() => {
      this.mToasts = this.mToasts.filter(t => t.getHash === toast.getHash);
    }, ToastService.SHOW_INTERVAL);
  }
}
