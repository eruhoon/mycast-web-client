import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCommand } from 'src/app/models/login/LoginCommand';
import { PageNavigator } from 'src/app/models/page-navigator/PageNavigator';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public mLoginForm: LoginForm;
  private mRoute: ActivatedRoute;
  private mPageNavigator: PageNavigator;
  private mRenderer: Renderer2;
  private mSessionStorage: SessionStorage;

  private mRedirctTo: string | null;

  constructor(route: ActivatedRoute, router: Router, renderer: Renderer2) {

    this.mLoginForm = { id: '', pw: '' };
    this.mRoute = route;
    this.mPageNavigator = new PageNavigator(router);
    this.mRenderer = renderer;
    this.mSessionStorage = SessionStorage.getInstance();
    this.mRedirctTo = null;
  }

  public ngOnInit() {
    console.log(this.mSessionStorage.getSessionId());
    console.log(this.mSessionStorage.getPrivateKey());

    this.mRoute.queryParams.subscribe(params => {
      if (params.redirectTo) {
        this.mRedirctTo = params.redirectTo as string;
      }
    });
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
      this.mPageNavigator.navigate(this.mRedirctTo);
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
