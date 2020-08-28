import { User } from 'src/app/models/user/User';
import { CurrentUserService } from 'src/app/services/user/current-user.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss', './chat-user-list.color.scss'],
})
export class ChatUserListComponent implements OnInit {
  private mService: CurrentUserService;
  private mUsers: User[];

  public constructor(service: CurrentUserService) {
    this.mService = service;
    this.mUsers = [];
  }

  public ngOnInit() {
    this.mUsers = this.mService.getUsers();
    this.mService.getUsersObservable().subscribe((users) => {
      this.mUsers = users;
    });
  }

  public getUserList(): User[] {
    return this.mUsers;
  }
}
