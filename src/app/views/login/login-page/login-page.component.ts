import { Keyboard } from 'src/app/models/common/keyboard/Keyboard';
import { LoginCommand } from 'src/app/models/login/LoginCommand';
import { PageNavigator } from 'src/app/models/page-navigator/PageNavigator';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public mLoginForm: LoginForm;
  private mPageNavigator: PageNavigator;
  private mRenderer: Renderer2;
  private mSessionStorage: SessionStorage;

  constructor(router: Router, renderer: Renderer2) {

    this.mLoginForm = { id: '', pw: '' };

    this.mPageNavigator = new PageNavigator(router);
    this.mRenderer = renderer;
    this.mSessionStorage = SessionStorage.getInstance();
  }

  public ngOnInit() {
    console.log(this.mSessionStorage.getSessionId());
    console.log(this.mSessionStorage.getPrivateKey());
  }

  public onIdKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.setFocusPassword();
    }
  }

  public onPasswordKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.requestLogin();
    }
  }

  public onSubmit(): void {
    this.requestLogin();
  }

  public onJoinClick(): void {
    this.mPageNavigator.navigateJoinPage();
  }

  private setFocusPassword() {
    const passwordInput = this.mRenderer.selectRootElement('#pw');
    console.log(passwordInput);
    passwordInput.focus();
  }

  private requestLogin(): void {
    const login = new LoginCommand(this.mLoginForm.id, this.mLoginForm.pw);
    login.onSuccess(res => {
      this.mSessionStorage.setSessionId(res.sid);
      this.mSessionStorage.setPrivateKey(res.hash);
      this.mPageNavigator.navigateMainPage();
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
};
