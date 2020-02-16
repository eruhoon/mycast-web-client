import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user/User';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private mUserSubject: Subject<User[]>;
  private mUsers: User[];

  public constructor() {
    this.mUserSubject = new Subject<User[]>();
    this.mUsers = [];
  }

  public getUsers(): Observable<User[]> {
    return this.mUserSubject.asObservable();
  }

  public setUsers(users: User[]): void {
    this.mUsers = users;
    this.mUserSubject.next(this.mUsers);
  }
}
