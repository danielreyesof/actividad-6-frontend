import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  cors: {} = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Expose-Headers': '*',
  };

  constructor(private _http: HttpClient) {}

  public setUser() {
    const session = localStorage.getItem('token');
    return session;
  }

  getQuery<T>(path: string, authorization: boolean = false): Observable<T> {
    const headers = authorization
      ? new HttpHeaders(this.cors).set('authorization', `${this.setUser()}`)
      : new HttpHeaders(this.cors);
    return this._http.get<T>(path, { headers: headers });
  }

  postQuery<T>(
    path: string,
    postData?: any,
    authorization: boolean = false
  ): Observable<T> {
    const headers = authorization
      ? new HttpHeaders(this.cors).set('authorization', `${this.setUser()}`)
      : new HttpHeaders(this.cors);
    return this._http.post<T>(path, postData, { headers: headers });
  }

  updQuery<T>(path: string, Data?: any): Observable<T> {
    const headers = new HttpHeaders(this.cors).set(
      'authorization',
      `${this.setUser()}`
    );
    return this._http.patch<T>(path, Data, { headers: headers });
  }

  delQuery<T>(path: string, id?: string): Observable<T> {
    const headers = new HttpHeaders(this.cors).set(
      'authorization',
      `${this.setUser()}`
    );
    return this._http.delete<T>(path, { headers: headers });
  }
}
