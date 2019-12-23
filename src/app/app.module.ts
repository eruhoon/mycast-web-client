import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { StreamListComponent } from './views/main-page/stream-list/stream-list.component';
import { TopBarComponent } from './views/main-page/top-bar/top-bar.component';
import { SideBarComponent } from './views/main-page/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    StreamListComponent,
    TopBarComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
