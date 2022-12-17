import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TypeForm } from 'src/app/shared/interfaces/authForms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  authForm!: FormGroup;

  @Input() options!: TypeForm;

  response: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private messageService: MessageService,
    private _authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.options.id === 'sign-in') {
      this.authForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    } else {
      this.authForm = this.fb.group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }

  async onSubmit() {
    console.log(this.authForm.value);

    let credentials = this.authForm.value;

    if (credentials.name == '' || credentials.username == '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Registro de usuario',
        detail: 'Por favor complete los campos',
      });
    } else {
      if (this.options.id === 'sign-in') {
        await this._authservice
          .signIn(credentials)
          .then(() => this.redirectUser())
          .catch(({ error }) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Inicio de sesion',
              detail: error.message,
            });
            return throwError(() => new Error(error));
          });
      } else {
        await this._authservice
          .signUp(credentials)
          .then(() => this.router.navigate(['']))
          .catch(({ error }) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Inicio de sesion',
              detail: error.message,
            });
            return throwError(() => new Error(error));
          });
      }
    }
  }

  private redirectUser(): void {
    this.router.navigate(['']);
  }
}
