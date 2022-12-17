import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public urlServicesBD = 'https://act6crud.up.railway.app/api';
  public urlServicesAuth = 'https://act6auth.up.railway.app/api';

  _appVersion: string | undefined;
  _environment: string | undefined;
  isLoading: boolean = false;

  constructor() {
    console.log('App - Ready ✅');
  }

  public concatUrl(path: string, connector: string): string {
    return connector == 'auth'
      ? `${this.urlServicesAuth}/${path}`
      : `${this.urlServicesBD}/${path}`;
  }
}
