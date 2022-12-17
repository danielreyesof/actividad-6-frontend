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
  SaveNoteResponse
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

  title: string = '';
  content: SafeHtml | string = '';

  sideVisible: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private notesService: NotesService,
    private authService: AuthService,
    private readonly router: Router
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

    await this.notesService
      .saveNotes<SaveNoteResponse>(saveData)
      .then(({ status }: SaveNoteResponse) => {
        if (status != 201) return;

        this.messageService.add({
          severity: 'success',
          summary: 'Nota creada',
          detail: 'Nota creada Exitosamente',
        });

        this.title = '';
        this.content = '';

        this.getNotes();
      });
  }

  async logout() {
    await this.authService.logOut().then((res) => {
      this.router.navigate(['sign-in']);
    });
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
}
