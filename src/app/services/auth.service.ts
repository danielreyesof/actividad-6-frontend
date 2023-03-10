import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, UserInfo } from '../shared/interfaces/authForms';
import { DbService } from './db.service';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: any;
  headerProperty: any;
  url: string = '';

  constructor(
    private _db: DbService,
    private _core: CoreService,
    private readonly router: Router
  ) {
    this.verifyToken();
    this.url = this._core.urlServicesAuth;
  }

  public setUser() {
    const session = localStorage.getItem('token');
    return session;
  }

  set user(data: any) {
    this.userData = data;
  }

  get user() {
    return this.userData;
  }

  public signUp(credentials: any) {
    let url = this._core.concatUrl('auth/signup', 'auth');
    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.postQuery<AuthResponse>(url, credentials).subscribe({
        next: (res: AuthResponse) => {
          if (res.status == 200) localStorage.setItem('token', res.token);
          return resolve(res);
        },
        error: (e: HttpErrorResponse) => reject(e),
      });
    });
  }

  public signIn(credentials: any) {
    let url = this._core.concatUrl('auth/signin', 'auth');

    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.postQuery<AuthResponse>(url, credentials, true).subscribe({
        next: (res: AuthResponse) => {
          if (res.status == 200) localStorage.setItem('token', res.token);
          return resolve(res);
        },
        error: (e: HttpErrorResponse) => reject(e),
      });
    });
  }

  public logOut() {
    let url = this._core.concatUrl('auth/logout', 'auth');

    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.getQuery(url, true).subscribe({
        next: (res: any) => {
          if (res.status == 200) localStorage.removeItem('token');
          return resolve(res);
        },
        error: (e: HttpErrorResponse) => reject(e),
      });
    });
  }

  public verifyToken() {
    let url = this._core.concatUrl('auth/verifytoken', 'auth');

    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.getQuery<UserInfo>(url, true).subscribe({
        next: (res: UserInfo) => {
          vm.user = res.user;
          return resolve(res);
        },
        error: (e: HttpErrorResponse) => {
          localStorage.removeItem('token');
          vm.router.navigate(['sign-in']);
          return reject(e);
        },
      });
    });
  }
}
