import { LoginCommand } from 'src/app/models/login/LoginCommand';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  protected mLoginForm: LoginForm;

  constructor(private mRouter: Router) {
    this.mLoginForm = { id: '', pw: '' };
  }

  ngOnInit() {
  }

  protected onSubmit() {
    const login = new LoginCommand(this.mLoginForm.id, this.mLoginForm.pw);
    login.onSuccess(() => {
      this.mRouter.navigate(['/']);
    });
    login.onFailure(() => {
      console.warn('failed');
    });
    login.execute();
  }

}

type LoginForm = {
  id: string,
  pw: string,
}
