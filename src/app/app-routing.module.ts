import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatListComponent } from './views/chat/chat-list/chat-list.component';
import { MainPageComponent } from './views/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
