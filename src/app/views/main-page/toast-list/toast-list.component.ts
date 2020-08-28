import { Toast } from 'src/app/models/notification/Toast';
import { ToastService } from 'src/app/services/notification/toast.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toast-list',
  templateUrl: './toast-list.component.html',
  styleUrls: ['./toast-list.component.scss'],
})
export class ToastListComponent implements OnInit {
  private mToastService: ToastService;

  public constructor(toastService: ToastService) {
    this.mToastService = toastService;
  }

  public ngOnInit() {}

  public getToasts(): Toast[] {
    return this.mToastService.getToasts();
  }
}
