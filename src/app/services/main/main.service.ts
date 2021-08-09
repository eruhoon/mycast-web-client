import { Chat } from 'src/app/models/chat/Chat';
import { ChatNetworkModel } from 'src/app/models/network/ChatNetworkModel';
import { ChatNetworkModelImpl } from 'src/app/models/network/ChatNetworkModelImpl';
import { NullChatNetworkModel } from 'src/app/models/network/NullChatNetworkModel';
import { VegaNotification } from 'src/app/models/notification/VegaNotification';
import { ModifyProfileCommand } from 'src/app/models/profile/ModifyProfileCommand';
import { Profile } from 'src/app/models/profile/Profile';
import { SessionStorage } from 'src/app/models/storage/SessionStorage';
import { User } from 'src/app/models/user/User';

import { Injectable } from '@angular/core';

import { CurrentChatService } from '../chat/current-chat.service';
import { NotificationService } from '../notification/notification.service';
import { ProfileService } from '../profile/profile.service';
import { CurrentUserService } from '../user/current-user.service';
import { UpdateLinkResponse } from 'src/app/models/socket/WebSocketModel';
import { ReactionResponse } from 'src/app/models/socket/VegaChatSocketModel';
import { ChatListService } from 'src/app/views/chat/chat-list/chat-list.service';
import { ChatCommand } from 'src/app/models/network/ChatCommand';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  #profileService: ProfileService;
  #currentChatService: CurrentChatService;
  #currentUserService: CurrentUserService;
  #notificationService: NotificationService;
  #chatNetwork: ChatNetworkModel;
  #currentLink: string;

  #chatCommand: ChatCommand;

  constructor(
    profileService: ProfileService,
    currentChatService: CurrentChatService,
    currentUserService: CurrentUserService,
    notificationService: NotificationService,
    chatListService: ChatListService
  ) {
    this.#profileService = profileService;
    this.#currentChatService = currentChatService;
    this.#currentUserService = currentUserService;
    this.#notificationService = notificationService;
    this.#chatNetwork = this.createChatNetworkModel();
    this.#currentLink = '';

    this.#profileService.setModifyProfileCommand(
      new ModifyProfileCommand(this.#chatNetwork)
    );

    this.#chatCommand = new ChatCommand(chatListService, this.#chatNetwork);
  }

  chat(text: string): void {
    this.#chatCommand.execute(text);
  }

  isOpen(): boolean {
    return this.#chatNetwork.isOpen();
  }

  setCurrentLink(link: string | null) {
    this.#currentLink = link || '';
  }

  getCurrentLink(): string {
    return this.#currentLink;
  }

  onChat(chat: Chat) {
    this.#currentChatService.addChat(chat);
  }

  onReaction(reaction: ReactionResponse): void {
    this.#currentChatService.reaction(reaction);
  }

  reaction(chatHash: string, reaction: string): void {
    this.#chatNetwork.reaction(chatHash, reaction);
  }

  notify(to: string): void {
    this.#chatNetwork.notify(to);
  }

  private createChatNetworkModel(): ChatNetworkModel {
    const privateKey = SessionStorage.getInstance().getPrivateKey();
    if (privateKey === null) {
      return new NullChatNetworkModel();
    }
    const chatNetwork = new ChatNetworkModelImpl(privateKey);
    chatNetwork.setOnRefreshMyProfileCallback((profile) =>
      this.onMyProfileRefresh(profile)
    );
    chatNetwork.setOnUpdateLinkCallback((link) => this.onUpdateLink(link));
    chatNetwork.setOnRefreshChatListCallback((chats) =>
      this.onChatListRefresh(chats)
    );
    chatNetwork.setOnRefreshUserListCallback((users) =>
      this.onUserListRefresh(users)
    );
    chatNetwork.setOnNotificationReceivedCallback((notification) =>
      this.onNotificationRecieved(notification)
    );
    chatNetwork.setOnChatCallback((chat) => this.onChat(chat));
    chatNetwork.setOnReactionCallback((reaction) => this.onReaction(reaction));
    return chatNetwork;
  }

  private onMyProfileRefresh(profile: Profile) {
    this.#profileService.setProfile(profile);
  }

  private onUpdateLink(link: UpdateLinkResponse): void {
    this.#currentChatService.updateLink(link);
  }

  private onChatListRefresh(chats: Chat[]) {
    this.#currentChatService.setCurrentChat(chats);
  }

  private onUserListRefresh(users: User[]): void {
    this.#currentUserService.setUsers(users);
  }

  private onNotificationRecieved(notification: VegaNotification): void {
    this.#notificationService.pushNotification(notification);
  }
}
