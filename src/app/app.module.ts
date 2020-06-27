import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { SafePipe } from './models/pipe/safe.pipe';
import { AppComponent } from './views/app.component';
import { ChatEntryComponent } from './views/chat/chat-entry/chat-entry.component';
import { ChatInterfaceComponent } from './views/chat/chat-interface/chat-interface.component';
import { ChatListComponent } from './views/chat/chat-list/chat-list.component';
import {
    ChatMessageEntryComponent
} from './views/chat/chat-message-entry/chat-message-entry.component';
import { ChatPageComponent } from './views/chat/chat-page/chat-page.component';
import { ChatUserEntryComponent } from './views/chat/chat-user-entry/chat-user-entry.component';
import { ChatUserListComponent } from './views/chat/chat-user-list/chat-user-list.component';
import { AfreecaPackComponent } from './views/chat/cp/afreeca-pack/afreeca-pack.component';
import { AnimationPackComponent } from './views/chat/cp/animation-pack/animation-pack.component';
import { BookPackComponent } from './views/chat/cp/book-pack/book-pack.component';
import { CqHeroPackComponent } from './views/chat/cp/cq-hero-pack/cq-hero-pack.component';
import { CvPackComponent } from './views/chat/cp/cv-pack/cv-pack.component';
import { ImagePackComponent } from './views/chat/cp/image-pack/image-pack.component';
import { LinkPackComponent } from './views/chat/cp/link-pack/link-pack.component';
import {
    LolChampionPackComponent
} from './views/chat/cp/lol-champion-pack/lol-champion-pack.component';
import { LolUserPackComponent } from './views/chat/cp/lol-user-pack/lol-user-pack.component';
import {
    MagicConchPackComponent
} from './views/chat/cp/magic-conch-pack/magic-conch-pack.component';
import { StreamPackComponent } from './views/chat/cp/stream-pack/stream-pack.component';
import { TextPackComponent } from './views/chat/cp/text-pack/text-pack.component';
import {
    TwitchClipPackComponent
} from './views/chat/cp/twitch-clip-pack/twitch-clip-pack.component';
import { TwitchPackComponent } from './views/chat/cp/twitch-pack/twitch-pack.component';
import { YoutubePackComponent } from './views/chat/cp/youtube-pack/youtube-pack.component';
import { HomePageComponent } from './views/home/home-page/home-page.component';
import { JoinPageComponent } from './views/login/join-page/join-page.component';
import { LoginPageComponent } from './views/login/login-page/login-page.component';
import {
    ClipboardImagePopupComponent
} from './views/main-page/clipboard-image-popup/clipboard-image-popup.component';
import {
    ImagePopupViewerComponent
} from './views/main-page/image-popup-viewer/image-popup-viewer.component';
import { LinkPopupComponent } from './views/main-page/link-popup/link-popup.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import {
    ModifyCheckerModalComponent
} from './views/main-page/modify-checker-modal/modify-checker-modal.component';
import {
    ModifyProfileModalComponent
} from './views/main-page/modify-profile-modal/modify-profile-modal.component';
import {
    ModifySettingModalComponent
} from './views/main-page/modify-setting-modal/modify-setting-modal.component';
import {
    ModifyStreamModalComponent
} from './views/main-page/modify-stream-modal/modify-stream-modal.component';
import {
    NotificationListComponent
} from './views/main-page/notification-list/notification-list.component';
import {
    NotificationPushListComponent
} from './views/main-page/notification-push-list/notification-push-list.component';
import {
    NotificationRequestPopupComponent
} from './views/main-page/notification-request-popup/notification-request-popup.component';
import { SettingViewComponent } from './views/main-page/setting-view/setting-view.component';
import { SideBarComponent } from './views/main-page/side-bar/side-bar.component';
import { StreamListComponent } from './views/main-page/stream-list/stream-list.component';
import {
    ExternalViewerComponent
} from './views/main-page/stream-viewer/external-viewer/external-viewer.component';
import {
    LocalViewerComponent
} from './views/main-page/stream-viewer/local-viewer/local-viewer.component';
import { StreamViewerComponent } from './views/main-page/stream-viewer/stream-viewer.component';
import { ToastListComponent } from './views/main-page/toast-list/toast-list.component';
import { TopBarComponent } from './views/main-page/top-bar/top-bar.component';
import { MemoDetailViewComponent } from './views/memo/memo-detail-view/memo-detail-view.component';
import { MemoEntryComponent } from './views/memo/memo-entry/memo-entry.component';
import { MemoMainViewComponent } from './views/memo/memo-main-view/memo-main-view.component';
import { MemoPageComponent } from './views/memo/memo-page/memo-page.component';
import { MemoUploadViewComponent } from './views/memo/memo-upload-view/memo-upload-view.component';
import { MobilePageComponent } from './views/mobile/mobile-page/mobile-page.component';
import { PhotoAlbumViewComponent } from './views/photo/photo-album-view/photo-album-view.component';
import {
    PhotoDetailViewComponent
} from './views/photo/photo-detail-view/photo-detail-view.component';
import { PhotoEntryComponent } from './views/photo/photo-entry/photo-entry.component';
import { PhotoMainViewComponent } from './views/photo/photo-main-view/photo-main-view.component';
import { PhotoPageComponent } from './views/photo/photo-page/photo-page.component';
import { StreamEntryComponent } from './views/stream/stream-entry/stream-entry.component';
import {
    StreamPlayerPageComponent
} from './views/stream/stream-player-page/stream-player-page.component';
import {
    TestPlayerPageComponent
} from './views/stream/test-player-page/test-player-page.component';
import {
    TotoroPlayerPageComponent
} from './views/stream/totoro-player-page/totoro-player-page.component';
import { MoviePackComponent } from './views/chat/cp/movie-pack/movie-pack.component';
import { MemoPackComponent } from './views/chat/cp/memo-pack/memo-pack.component';
import { AlShipPackComponent } from './views/chat/cp/al-ship-pack/al-ship-pack.component';
import { GfDollPackComponent } from './views/chat/cp/gf-doll-pack/gf-doll-pack.component';
import { DetailSideBarStreamEntryComponent } from './views/main-page/side-bar/side-bar-stream-entry/detail-side-bar-stream-entry/detail-side-bar-stream-entry.component';
import { SimpleSideBarStreamEntryComponent } from './views/main-page/side-bar/side-bar-stream-entry/simple-side-bar-stream-entry/simple-side-bar-stream-entry.component';
import { SideBarStreamListViewComponent } from './views/main-page/side-bar/side-bar-stream-list-view/side-bar-stream-list-view.component';

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
        LinkPackComponent,
        YoutubePackComponent,
        LinkPopupComponent,
        StreamPlayerPageComponent,
        ChatUserListComponent,
        ChatUserEntryComponent,
        NotificationPushListComponent,
        NotificationListComponent,
        ModifyProfileModalComponent,
        ClipboardImagePopupComponent,
        TestPlayerPageComponent,
        TotoroPlayerPageComponent,
        NotificationRequestPopupComponent,
        ToastListComponent,
        PhotoPageComponent,
        MemoPageComponent,
        PhotoEntryComponent,
        PhotoDetailViewComponent,
        PhotoMainViewComponent,
        PhotoAlbumViewComponent,
        ModifyStreamModalComponent,
        MemoDetailViewComponent,
        MemoEntryComponent,
        MemoMainViewComponent,
        MemoUploadViewComponent,
        LolUserPackComponent,
        LolChampionPackComponent,
        BookPackComponent,
        StreamPackComponent,
        CqHeroPackComponent,
        AfreecaPackComponent,
        MagicConchPackComponent,
        MobilePageComponent,
        ChatMessageEntryComponent,
        ModifySettingModalComponent,
        HomePageComponent,
        AnimationPackComponent,
        CvPackComponent,
        ModifyCheckerModalComponent,
        TwitchClipPackComponent,
        MoviePackComponent,
        MemoPackComponent,
        AlShipPackComponent,
        GfDollPackComponent,
        DetailSideBarStreamEntryComponent,
        SimpleSideBarStreamEntryComponent,
        SideBarStreamListViewComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        DragDropModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
