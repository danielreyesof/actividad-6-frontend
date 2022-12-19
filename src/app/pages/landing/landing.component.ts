import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';
import {
  Note,
  NotesResponse,
  SaveNote,
  SaveNoteResponse,
} from '../../shared/interfaces/notes';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, AfterViewInit {
  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['formula'],
      ['image', 'code-block'],
    ],
  };

  notes: Note[] = [];
  noteToEdit!: Note;
  noteToEditId: string = '';

  title: string = '';
  content: SafeHtml | string = '';

  sideVisible: boolean = false;
  buttonLabel: string = 'Guardar nota';
  saveMode: string = 'save';

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  async getNotes() {
    this.notes = [];
    await this.notesService
      .getNotes<NotesResponse>()
      .then(({ response }: NotesResponse) => {
        this.notes.push(...response);
      });
  }

  ngAfterViewInit(): void {
    this.notes.forEach((note: Note) => {
      note.content = this.adjustImage(note.content);
    });
  }

  initText(quill: any) {
    quill.editor.clipboard.addMatcher(
      Node.ELEMENT_NODE,
      function (node: any, delta: any) {
        delta.forEach((e: any) => {
          if (e && e.attributes) {
            delete e.attributes;
          }
        });
        return delta;
      }
    );
  }

  async saveNote() {
    let saveData: SaveNote = {
      title: this.title,
      content: this.content,
    };

    if (this.saveMode == 'save') {
      await this.notesService
        .saveNotes<SaveNoteResponse>(saveData)
        .then(({ status }: SaveNoteResponse) => {
          if (status != 201) return;

          this.messageService.add({
            severity: 'success',
            summary: 'Nota creada',
            detail: 'Nota creada Exitosamente',
          });

          this.resetSettings();
        });
    } else {
      console.log(this.title);

      this.noteToEdit.title = this.title;
      this.noteToEdit.content = this.content;

      await this.notesService
        .editNote(this.noteToEdit)
        .then(({ status }: any) => {
          if (status != 201) return;

          this.messageService.add({
            severity: 'success',
            summary: 'Nota editada',
            detail: 'Nota editada Exitosamente',
          });

          this.resetSettings();
        });
    }
  }

  adjustImage(str: any) {
    try {
      str = str.toString();
      str = str.replace(/<img/g, '<img width = 50% ');
      return this.sanitizer.bypassSecurityTrustHtml(str);
    } catch (error) {
      return this.sanitizer.bypassSecurityTrustHtml(str);
    }
  }

  addSingle(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  async editNote(id: string) {
    this.buttonLabel = 'Editar nota';
    this.saveMode = 'edit';

    await this.notesService.getNotesById(id).then(({ response }: any) => {
      this.noteToEdit = response[0];
      this.title = this.noteToEdit.title;
      this.content = this.noteToEdit.content;
    });
  }

  async deleteNote(id: string) {
    await this.notesService.deleteNote(id).then(({ status }: any) => {
      if (status != 201) return;

      this.messageService.add({
        severity: 'success',
        summary: 'Nota elininada',
        detail: 'Nota elininada Exitosamente',
      });

      this.resetSettings();
    });
  }

  resetSettings() {
    this.title = '';
    this.content = '';
    this.buttonLabel = 'Crear nota';
    this.saveMode = 'save';
    this.getNotes();
  }
}
