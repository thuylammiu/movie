import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
      return true;
    /*return this.loginService.user.pipe(
      take(1),
      map(user => {
        debugger;
        const isAuth = !!user && user.UserName !== '';
        console.log("isAuth", isAuth);
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
      
    );*/
  }
}
