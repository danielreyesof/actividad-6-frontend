import { Component, OnInit } from '@angular/core';
import { ACTIONS, AuthLabel } from 'src/app/shared/constants';
import { TypeForm } from 'src/app/shared/interfaces/authForms';

@Component({
  selector: 'app-sign-up',
  template: `<app-form [options]="options"></app-form>`,
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  options: TypeForm = {
    id: AuthLabel.signUp,
    label: ACTIONS.signUp,
  };
}