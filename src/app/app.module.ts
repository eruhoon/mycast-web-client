import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { StreamListComponent } from './views/main-page/stream-list/stream-list.component';
import { TopBarComponent } from './views/main-page/top-bar/top-bar.component';
import { SideBarComponent } from './views/main-page/side-bar/side-bar.component';
import { StreamViewerComponent } from './views/main-page/stream-viewer/stream-viewer.component';
import { SettingViewComponent } from './views/main-page/setting-view/setting-view.component';
import { ExternalViewerComponent } from './views/main-page/stream-viewer/external-viewer/external-viewer.component';
import { SafePipe } from './models/pipe/safe.pipe';
import { LocalViewerComponent } from './views/main-page/stream-viewer/local-viewer/local-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    StreamListComponent,
    TopBarComponent,
    SideBarComponent,
    StreamViewerComponent,
    SettingViewComponent,
    ExternalViewerComponent,
    SafePipe,
    LocalViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
