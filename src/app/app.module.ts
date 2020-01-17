import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SafePipe } from './models/pipe/safe.pipe';
import { AppComponent } from './views/app.component';
import { ChatEntryComponent } from './views/chat/chat-entry/chat-entry.component';
import { ChatListComponent } from './views/chat/chat-list/chat-list.component';
import { ChatPageComponent } from './views/chat/chat-page/chat-page.component';
import { LoginPageComponent } from './views/login/login-page/login-page.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { SettingViewComponent } from './views/main-page/setting-view/setting-view.component';
import { SideBarComponent } from './views/main-page/side-bar/side-bar.component';
import { StreamListComponent } from './views/main-page/stream-list/stream-list.component';
import { ExternalViewerComponent } from './views/main-page/stream-viewer/external-viewer/external-viewer.component';
import { LocalViewerComponent } from './views/main-page/stream-viewer/local-viewer/local-viewer.component';
import { StreamViewerComponent } from './views/main-page/stream-viewer/stream-viewer.component';
import { TopBarComponent } from './views/main-page/top-bar/top-bar.component';
import { StreamEntryComponent } from './views/stream/stream-entry/stream-entry.component';
import { JoinPageComponent } from './views/login/join-page/join-page.component';
import { ChatInterfaceComponent } from './views/chat/chat-interface/chat-interface.component';
import { ImagePackComponent } from './views/chat/cp/image-pack/image-pack.component';
import { TextPackComponent } from './views/chat/cp/text-pack/text-pack.component';
import { ImagePopupViewerComponent } from './views/main-page/image-popup-viewer/image-popup-viewer.component';
import { TwitchPackComponent } from './views/chat/cp/twitch-pack/twitch-pack.component';

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
    LoginPageComponent,
    JoinPageComponent,
    ChatInterfaceComponent,
    ImagePackComponent,
    TextPackComponent,
    ImagePopupViewerComponent,
    TwitchPackComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
