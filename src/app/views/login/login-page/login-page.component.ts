import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LoginCommand } from 'src/app/models/login/LoginCommand';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  protected mLoginForm: LoginForm;

  constructor() {
    this.mLoginForm = { id: '', pw: '' };
  }

  ngOnInit() {
  }

  protected onSubmit() {
    console.log(this.mLoginForm);
    const login = new LoginCommand(this.mLoginForm.id, this.mLoginForm.pw);
    login.execute();
  }

}

type LoginForm = {
  id: string,
  pw: string,
}
