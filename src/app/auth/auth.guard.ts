import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as storage from '../data/store/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // read current path
    const path: any = route.url ? route.url[0].path : '';

    //  check if error navigate to login page
    if (storage.getItem('auth') == null) {
      this.router.navigate(['login']);
    } else {
      // check if login path and already exists navigate to home
      if (path == 'login') this.router.navigate(['home']);
    }

    // return result;
    return storage.getItem('auth') != null;
  }
}
