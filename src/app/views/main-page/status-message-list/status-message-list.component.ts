import { Component, OnInit } from '@angular/core';
import Axios from 'axios';

@Component({
  selector: 'status-message-list',
  templateUrl: './status-message-list.component.html',
  styleUrls: ['./status-message-list.component.scss'],
})
export class StatusMessageListComponent implements OnInit {
  public statusMessages: StatusMessageDto[];

  public constructor() {
    this.statusMessages = [];
  }

  public ngOnInit(): void {
    this.load();
  }

  private async load() {
    const { data } = await Axios.get<StatusMessageDto[] | null>(
      'https://mycast.xyz:9011/users/statusmessage'
    );
    this.statusMessages = data ? data : [];
  }
}

type StatusMessageDto = {
  nickname: string;
  icon: string;
  statusMessage: string;
};
