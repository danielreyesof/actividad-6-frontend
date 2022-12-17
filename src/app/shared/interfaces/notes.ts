import { SafeHtml } from '@angular/platform-browser';

export interface NotesResponse {
  status: number;
  response: Note[];
}

export interface Note {
  _id: string;
  title: string;
  content: SafeHtml | string;
  status: number;
  date_create: Date;
  date_update: Date;
  date_delete: null;
  user_create: string;
  user_update: string;
  user_delete: null;
}

export interface SaveNote {
  title: string;
  content: SafeHtml | string;
}

export interface SaveNoteResponse {
  status: number;
  saveNote: SaveNoteRes;
}

export interface SaveNoteRes {
  title: string;
  content: SafeHtml | string;
  status: number;
  date_create: Date;
  date_update: Date;
  date_delete: null;
  user_create: string;
  user_update: string;
  user_delete: null;
  _id: string;
}
