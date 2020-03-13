import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth/auth.guard';
import { ChatPageComponent } from './views/chat/chat-page/chat-page.component';
import { JoinPageComponent } from './views/login/join-page/join-page.component';
import { LoginPageComponent } from './views/login/login-page/login-page.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import {
  StreamPlayerPageComponent
} from './views/stream/stream-player-page/stream-player-page.component';
import {
  TestPlayerPageComponent
} from './views/stream/test-player-page/test-player-page.component';
import { TotoroPlayerPageComponent } from './views/stream/totoro-player-page/totoro-player-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainPageComponent }
    ]
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
  },
  {
    path: 'player/:playerId',
    component: StreamPlayerPageComponent
  },
  {
    path: 'player/totoro/:playerId',
    component: TotoroPlayerPageComponent
  },
  {
    path: 'player_dev',
    component: TestPlayerPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
