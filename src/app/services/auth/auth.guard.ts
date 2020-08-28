import { Observable } from 'rxjs';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private mRouter: Router;
  private mSessionStorage: SessionStorage;

  constructor(router: Router) {
    this.mRouter = router;
    this.mSessionStorage = SessionStorage.getInstance();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogin = this.mSessionStorage.getSessionId();
    if (isLogin) {
      return true;
    } else {
      this.mRouter.navigate(['login'], {
        queryParams: { redirectTo: state.url },
      });
      return false;
    }
  }
}
