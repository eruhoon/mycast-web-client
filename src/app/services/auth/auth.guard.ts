import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private mRouter: Router;

  constructor(router: Router) {
    this.mRouter = router;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLogin = true;
    if (isLogin) {
      return true;
    } else {
      this.mRouter.navigate(['login'], {
        queryParams: { redirectTo: state.url }
      });
      return false;
    }
  }
}
