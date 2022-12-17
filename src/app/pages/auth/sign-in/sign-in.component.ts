import { ACTIONS, AuthLabel } from './../../../shared/constants';
import { TypeForm } from 'src/app/shared/interfaces/authForms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  template: `<app-form [options]="options"></app-form>`,
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  options: TypeForm = {
    id: AuthLabel.signIn,
    label: ACTIONS.signIn,
  };
}
