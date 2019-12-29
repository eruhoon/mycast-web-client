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
import { ChatListComponent } from './views/chat/chat-list/chat-list.component';
import { ChatPageComponent } from './views/chat/chat-page/chat-page.component';
import { ChatEntryComponent } from './views/chat/chat-entry/chat-entry.component';
import { StreamEntryComponent } from './views/stream/stream-entry/stream-entry.component';

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
    ChatListComponent,
    ChatPageComponent,
    ChatEntryComponent,
    StreamEntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
