import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatPageComponent } from './views/chat/chat-page/chat-page.component';
import { LoginPageComponent } from './views/login/login-page/login-page.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { JoinPageComponent } from './views/login/join-page/join-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'join',
    component: JoinPageComponent
  },
  {
    path: 'chat',
    component: ChatPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
