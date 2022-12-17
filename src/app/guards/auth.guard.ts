import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}


@Injectable({ providedIn: 'root' })
export class AuthGuardIn implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['sign-in']);
      return false;
    }
    return true;
  }
}
