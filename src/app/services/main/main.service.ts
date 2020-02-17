import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatNetworkModelImpl } from 'src/app/models/network/ChatNetworkModelImpl';
import { NullChatNetworkModel } from 'src/app/models/network/NullChatNetworkModel';
import { Profile } from 'src/app/models/profile/Profile';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';
import { User } from 'src/app/models/user/User';

import { Injectable } from '@angular/core';

import { CurrentChatService } from '../chat/current-chat.service';
import { ProfileService } from '../profile/profile.service';
import { CurrentUserService } from '../user/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private mProfileService: ProfileService;
  private mCurrentChatService: CurrentChatService;
  private mCurrentUserService: CurrentUserService;
  private mChatNetwork: ChatNetworkModel;

  public constructor(
    profileService: ProfileService,
    currentChatService: CurrentChatService,
    currentUserService: CurrentUserService) {

    this.mProfileService = profileService;
    this.mCurrentChatService = currentChatService;
    this.mCurrentUserService = currentUserService;
    this.mChatNetwork = this.createChatNetworkModel();
  }

  // TODO: Remove
  public getChatNework(): ChatNetworkModel {
    return this.mChatNetwork;
  }

  private createChatNetworkModel(): ChatNetworkModel {
    const privateKey = SessionStorage.getInstance().getPrivateKey();
    if (privateKey === null) {
      return new NullChatNetworkModel();
    }
    const chatNetwork = new ChatNetworkModelImpl(privateKey);
    chatNetwork.setOnRefreshMyProfileCallback(
      profile => this.onMyProfileRefresh(profile));
    chatNetwork.setOnRefreshChatListCallback(
      chats => this.onChatListRefresh(chats));
    chatNetwork.setOnRefreshUserListCallback(
      users => this.onUserListRefresh(users));
    chatNetwork.setOnChatCallback(chat => this.onChat(chat));
    return chatNetwork;
  }

  private onMyProfileRefresh(profile: Profile) {
    this.mProfileService.setProfile(profile);
  }

  private onChatListRefresh(chats: Chat[]) {
    this.mCurrentChatService.setCurrentChat(chats);
  }

  private onUserListRefresh(users: User[]): void {
    this.mCurrentUserService.setUsers(users);
  }

  public onChat(chat: Chat) {
    this.mCurrentChatService.addChat(chat);
  }

}
