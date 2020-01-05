import { LoginCommand } from 'src/app/models/login/LoginCommand';

import { Component, Input, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from 'src/app/models/common/keyboard/Keyboard';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  protected mLoginForm: LoginForm;

  constructor(
    private mRouter: Router,
    private mRenderer: Renderer2) {

    this.mLoginForm = { id: '', pw: '' };

    console.log(this.mRenderer);
  }

  ngOnInit() {
  }

  protected onIdKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Keyboard.KEY_ENTER) {
      this.setFocusPassword();
    }
  }

  protected onPasswordKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Keyboard.KEY_ENTER) {
      this.requestLogin();
    }
  }

  protected onSubmit(): void {
    this.requestLogin();
  }

  protected onJoinClick(): void {
    this.mRouter.navigate(['/join']);
  }

  private setFocusPassword() {
    const passwordInput = this.mRenderer.selectRootElement('#pw');
    console.log(passwordInput);
    passwordInput.focus();
  }

  private requestLogin(): void {
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
