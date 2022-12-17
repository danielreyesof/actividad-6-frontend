import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaveNote } from '../shared/interfaces/notes';
import { CoreService } from './core.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  url: string = '';

  constructor(private _db: DbService, private _core: CoreService) {
    this.url = this._core.urlServicesBD;
  }

  public getNotes<T>(): Promise<T> {
    let url = this._core.concatUrl('notes/get', 'notes');

    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.getQuery<T>(url, true).subscribe({
        next: (res: T) => resolve(res),
        error: (e: HttpErrorResponse) => reject(e),
      });
    });
  }

  public saveNotes<T>(data: SaveNote): Promise<T> {
    let url = this._core.concatUrl('notes/create', 'notes');

    let vm = this;
    return new Promise(function (resolve, reject) {
      vm._db.postQuery<T>(url, data, true).subscribe({
        next: (res: T) => resolve(res),
        error: (e: HttpErrorResponse) => reject(e),
      });
    });
  }
}
